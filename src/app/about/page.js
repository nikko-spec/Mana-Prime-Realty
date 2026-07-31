import { getPage } from "@/lib/listings";

export const metadata = { title: "About Us | Mana Prime Realty" };

export default function AboutPage() {
  const page = getPage("about");

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="eyebrow">{page?.title || "About Us"}</p>
      <h1 className="mt-2 font-display text-4xl italic text-ink">
        {page?.heading}
      </h1>
      <div className="prose prose-headings:font-display mt-8 max-w-none whitespace-pre-line text-ink/80">
        {page?.body}
      </div>
    </div>
  );
}
