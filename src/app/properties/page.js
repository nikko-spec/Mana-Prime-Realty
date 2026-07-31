import { Suspense } from "react";
import FilterBox from "@/components/FilterBox";
import PropertyCard from "@/components/PropertyCard";
import { getAllListings, getFilterOptions } from "@/lib/listings";

export const metadata = {
  title: "Properties | Mana Prime Realty",
};

export default function PropertiesPage({ searchParams }) {
  const allListings = getAllListings();
  const { projectTypes, locations } = getFilterOptions();

  const { type, location, minPrice, maxPrice } = searchParams || {};

  const filtered = allListings.filter((l) => {
    if (type && l.projectType !== type) return false;
    if (location && l.location !== location) return false;
    if (minPrice && l.price < Number(minPrice)) return false;
    if (maxPrice && l.price > Number(maxPrice)) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow">Browse</p>
      <h1 className="mt-2 font-display text-4xl italic text-ink">Properties</h1>
      <p className="mt-3 text-ink/60 max-w-lg">
        {filtered.length} listing{filtered.length === 1 ? "" : "s"} matching your search.
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <FilterBox projectTypes={projectTypes} locations={locations} floating={false} />
        </Suspense>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((listing) => (
          <PropertyCard key={listing.slug} listing={listing} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-ink/50">
          No listings match those filters yet — try widening your search.
        </p>
      )}
    </div>
  );
}
