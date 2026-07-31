"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

export default function Carousel({ listings }) {
  const [index, setIndex] = useState(0);
  const count = listings.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, count]);

  if (count === 0) return null;
  const active = listings[index];

  return (
    <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-banyan">
      {listings.map((listing, i) => (
        <div
          key={listing.slug}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={listing.images?.[0] || "/images/placeholder-1.svg"}
            alt={listing.title}
            fill
            priority={i === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-banyan via-banyan/30 to-banyan/10" />
        </div>
      ))}

      <div className="relative z-10 flex h-full max-w-6xl mx-auto flex-col justify-end px-6 pb-32 md:pb-40">
        <p className="eyebrow text-gold-light">Featured Listing</p>
        <h1 className="mt-3 max-w-xl font-display text-4xl md:text-6xl italic text-cream leading-[1.05]">
          {active.title}
        </h1>
        <p className="mt-4 max-w-md text-cream/80 font-body">{active.excerpt}</p>
        <div className="mt-6 flex items-center gap-4">
          <Link href={`/properties/${active.slug}`} className="btn-primary">
            View Details
          </Link>
          <span className="font-mono text-cream/90">{active.priceLabel}</span>
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous listing"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next listing"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {listings.map((l, i) => (
              <button
                key={l.slug}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-gold" : "w-1.5 bg-cream/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
