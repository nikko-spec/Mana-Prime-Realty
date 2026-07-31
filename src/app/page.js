import { Suspense } from "react";
import Carousel from "@/components/Carousel";
import FilterBox from "@/components/FilterBox";
import PropertyCard from "@/components/PropertyCard";
import InquiryForm from "@/components/InquiryForm";
import { getAllListings, getFeaturedListings, getFilterOptions } from "@/lib/listings";

export default function HomePage() {
  const featured = getFeaturedListings();
  const allListings = getAllListings();
  const { projectTypes, locations } = getFilterOptions();

  return (
    <div>
      <Carousel listings={featured.length ? featured : allListings.slice(0, 3)} />

      <Suspense fallback={null}>
        <FilterBox projectTypes={projectTypes} locations={locations} />
      </Suspense>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-10 md:grid-cols-[1fr_320px]">
          <div>
            <p className="eyebrow">Curated for you</p>
            <h2 className="mt-2 font-display text-3xl italic text-ink">
              Featured Listings
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {(featured.length ? featured : allListings).map((listing) => (
                <PropertyCard key={listing.slug} listing={listing} />
              ))}
            </div>
          </div>

          <aside className="md:sticky md:top-24 h-fit">
            <InquiryForm listings={allListings} />
          </aside>
        </div>
      </section>
    </div>
  );
}
