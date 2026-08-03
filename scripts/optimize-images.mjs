import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const UPLOADS_DIR = path.join(process.cwd(), "public/images/uploads");
const MAX_WIDTH = 2000;
const MAX_BYTES = 2 * 1024 * 1024;
const RESIZABLE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function listImageFiles(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }

  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return listImageFiles(fullPath);
      return RESIZABLE_EXT.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
    })
  );
  return files.flat();
}

async function optimize(filePath) {
  const original = await readFile(filePath);
  const image = sharp(original, { failOn: "none" });
  const metadata = await image.metadata();

  // EXIF orientation 5-8 mean the camera stored the image on its side, so the
  // width/height you'd actually see on screen are swapped from the raw pixel data.
  const orientation = metadata.orientation || 1;
  const swapsDimensions = orientation >= 5 && orientation <= 8;
  const displayWidth = swapsDimensions ? metadata.height : metadata.width;

  const needsResize = displayWidth && displayWidth > MAX_WIDTH;
  const needsCompression = original.byteLength > MAX_BYTES;
  const needsRotationFix = orientation !== 1;
  if (!needsResize && !needsCompression && !needsRotationFix) return false;

  // .rotate() with no args bakes the EXIF orientation into the pixels and
  // strips the tag, so every consumer displays it upright without relying on
  // EXIF support (sharp otherwise drops EXIF metadata on output by default).
  let pipeline = image.rotate();
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
  } else if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9 });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: 82 });
  }

  const optimized = await pipeline.toBuffer();
  const onlyCompressing = !needsResize && !needsRotationFix;
  if (onlyCompressing && optimized.byteLength >= original.byteLength) return false;

  await writeFile(filePath, optimized);
  const beforeKb = (original.byteLength / 1024).toFixed(0);
  const afterKb = (optimized.byteLength / 1024).toFixed(0);
  console.log(`optimized ${path.relative(process.cwd(), filePath)}: ${beforeKb}KB -> ${afterKb}KB`);
  return true;
}

const files = await listImageFiles(UPLOADS_DIR);
let changedCount = 0;
for (const file of files) {
  if (await optimize(file)) changedCount += 1;
}

console.log(`${changedCount} of ${files.length} listing photo(s) optimized.`);
