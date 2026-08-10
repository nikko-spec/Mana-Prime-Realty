"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PRICE_BANDS = [
  { label: "Any Price", min: "", max: "" },
  { label: "Under ₱3M", min: "", max: "3000000" },
  { label: "₱3M - ₱6M", min: "3000000", max: "6000000" },
  { label: "₱6M - ₱10M", min: "6000000", max: "10000000" },
  { label: "Above ₱10M", min: "10000000", max: "" },
];

export default function FilterBox({ projectTypes, locations, floating = true }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [type, setType] = useState(searchParams.get("type") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [priceIndex, setPriceIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (location) params.set("location", location);
    const band = PRICE_BANDS[priceIndex];
    if (band.min) params.set("minPrice", band.min);
    if (band.max) params.set("maxPrice", band.max);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        floating
          ? "relative z-20 mx-auto -mt-10 mb-16 w-[92%] max-w-4xl rounded-sm bg-cream shadow-xl md:-mt-16"
          : "w-full rounded-sm bg-cream shadow-sm border border-banyan/10"
      }
    >
      <div className="grid gap-4 p-6 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <label className="block">
          <span className="eyebrow text-banyan/60">Project Type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full rounded-sm border border-banyan/20 bg-white px-3 py-2 font-body text-sm text-ink"
          >
            <option value="">All Types</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="eyebrow text-banyan/60">Location</span>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-sm border border-banyan/20 bg-white px-3 py-2 font-body text-sm text-ink"
          >
            <option value="">All Locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="eyebrow text-banyan/60">Price Range</span>
          <select
            value={priceIndex}
            onChange={(e) => setPriceIndex(Number(e.target.value))}
            className="mt-1 w-full rounded-sm border border-banyan/20 bg-white px-3 py-2 font-body text-sm text-ink"
          >
            {PRICE_BANDS.map((band, i) => (
              <option key={band.label} value={i}>{band.label}</option>
            ))}
          </select>
        </label>

        <button type="submit" className="btn-primary h-fit">
          Search
        </button>
      </div>
    </form>
  );
}
