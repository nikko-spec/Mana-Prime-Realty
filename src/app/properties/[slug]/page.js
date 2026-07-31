import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InquiryForm from "@/components/InquiryForm";
import { getAllListings, getListingBySlug, getYoutubeId } from "@/lib/listings";

export function generateStaticParams() {
  return getAllListings().map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }) {
  const listing = getListingBySlug(params.slug);
  if (!listing) return {};
  return {
    title: `${listing.title} | Mana Prime Realty`,
    description: listing.excerpt,
  };
}

export default function PropertyDetailPage({ params }) {
  const listing = getListingBySlug(params.slug);
  const allListings = getAllListings();
  if (!listing) notFound();

  const videoId = getYoutubeId(listing.youtubeUrl);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/properties" className="font-mono text-xs text-banyan/60 hover:text-banyan">
        ← Back to Properties
      </Link>

      <div className="mt-6 grid gap-12 md:grid-cols-[1fr_320px]">
        <div>
          <p className="eyebrow">{listing.projectType}</p>
          <h1 className="mt-2 font-display text-4xl italic text-ink">{listing.title}</h1>
          <p className="mt-2 text-ink/60">{listing.location}</p>

          <div className="relative mt-8 aspect-[16/10] overflow-hidden">
            <Image
              src={listing.images?.[0] || "/images/placeholder-1.svg"}
              alt={listing.title}
              fill
              className="object-cover"
              priority
            />
            <span className="swing-tag text-base">{listing.priceLabel}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-6 border-y border-banyan/10 py-4 font-mono text-sm text-banyan/80">
            <span>{listing.sizeLabel}</span>
            {listing.bedrooms > 0 && <span>{listing.bedrooms} Bedrooms</span>}
            {listing.bathrooms > 0 && <span>{listing.bathrooms} Bathrooms</span>}
          </div>

          <div className="prose prose-headings:font-display mt-8 max-w-none whitespace-pre-line text-ink/80">
            {listing.description}
          </div>

          {videoId && (
            <div className="mt-10">
              <p className="eyebrow mb-3">Property Video</p>
              <a
                href={listing.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-video overflow-hidden bg-banyan"
              >
                <Image
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={`${listing.title} video`}
                  fill
                  className="object-cover opacity-90 transition-opacity group-hover:opacity-70"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/90">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#16302B">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          )}
        </div>

        <aside className="md:sticky md:top-24 h-fit">
          <InquiryForm listings={allListings} defaultListing={listing.title} />
        </aside>
      </div>
    </div>
  );
}
