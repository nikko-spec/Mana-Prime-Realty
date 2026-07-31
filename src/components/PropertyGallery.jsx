"use client";

import Image from "next/image";
import { useState } from "react";

export default function PropertyGallery({ images, alt, priceLabel }) {
  const photos = images?.length ? images : ["/images/placeholder-1.svg"];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={photos[activeIndex]}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
        {priceLabel && <span className="swing-tag text-base">{priceLabel}</span>}
      </div>

      {photos.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
          {photos.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === activeIndex}
              className={`relative h-16 w-24 flex-none overflow-hidden rounded-sm border transition-all ${
                i === activeIndex
                  ? "border-2 border-gold opacity-100"
                  : "border-banyan/10 opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
