import Link from "next/link";
import Image from "next/image";

export default function PropertyCard({ listing }) {
  return (
    <Link
      href={`/properties/${listing.slug}`}
      className="group block bg-cream border border-banyan/10 hover:border-gold/50 transition-colors"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.images?.[0] || "/images/placeholder-1.svg"}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="swing-tag">{listing.priceLabel}</span>
      </div>

      <div className="p-5">
        <p className="eyebrow">{listing.projectType}</p>
        <h3 className="mt-1 font-display text-xl text-ink leading-snug">
          {listing.title}
        </h3>
        <p className="mt-1 text-sm text-ink/60">{listing.location}</p>

        <div className="mt-4 flex items-center gap-4 font-mono text-xs text-banyan/80 border-t border-banyan/10 pt-3">
          <span>{listing.sizeLabel}</span>
          {listing.bedrooms > 0 && <span>{listing.bedrooms} BR</span>}
          {listing.bathrooms > 0 && <span>{listing.bathrooms} BA</span>}
        </div>
      </div>
    </Link>
  );
}
