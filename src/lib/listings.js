import fs from "fs";
import path from "path";
import matter from "gray-matter";

const LISTINGS_DIR = path.join(process.cwd(), "content", "listings");
const PAGES_DIR = path.join(process.cwd(), "content", "pages");

export function getYoutubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function getYoutubeThumbnail(url) {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export function getAllListings() {
  if (!fs.existsSync(LISTINGS_DIR)) return [];

  const files = fs.readdirSync(LISTINGS_DIR).filter((f) => f.endsWith(".md"));

  const listings = files.map((filename) => {
    const raw = fs.readFileSync(path.join(LISTINGS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    return {
      ...data,
      slug: data.slug || filename.replace(/\.md$/, ""),
      body: content,
      youtubeThumbnail: getYoutubeThumbnail(data.youtubeUrl),
    };
  });

  return listings.sort((a, b) => (b.featured === true) - (a.featured === true));
}

export function getFeaturedListings() {
  return getAllListings().filter((l) => l.featured);
}

export function getListingBySlug(slug) {
  return getAllListings().find((l) => l.slug === slug) || null;
}

export function getFilterOptions() {
  const listings = getAllListings();
  const projectTypes = [...new Set(listings.map((l) => l.projectType).filter(Boolean))];
  const locations = [...new Set(listings.map((l) => l.location).filter(Boolean))];
  const prices = listings.map((l) => l.price).filter((p) => typeof p === "number");
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  return { projectTypes, locations, minPrice, maxPrice };
}

export function getPage(name) {
  const file = path.join(PAGES_DIR, `${name}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { ...data, body: content };
}
