import { getPage } from "@/lib/listings";

export const metadata = { title: "Buyers Guide | Mana Prime Realty" };

export default function BuyersGuidePage() {
  const page = getPage("buyers-guide");

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="eyebrow">{page?.title || "Buyers Guide"}</p>
      <h1 className="mt-2 font-display text-4xl italic text-ink">
        {page?.heading}
      </h1>
      <div
        className="prose prose-headings:font-display mt-8 max-w-none text-ink/80"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(page?.body || "") }}
      />
    </div>
  );
}

// Minimal markdown-to-HTML for simple ## headings and paragraphs,
// avoids pulling in a full markdown renderer for one page.
function markdownToHtml(md) {
  return md
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("## ")) {
        return `<h2>${block.replace("## ", "")}</h2>`;
      }
      return `<p>${block}</p>`;
    })
    .join("\n");
}
