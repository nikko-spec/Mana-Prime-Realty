"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About Us" },
  { href: "/buyers-guide", label: "Buyers Guide" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-banyan text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-display text-2xl italic tracking-tight">
            Mana Prime
          </span>
          <span className="eyebrow text-gold-light group-hover:text-cream transition-colors">
            Realty
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm tracking-wide text-cream/90 hover:text-gold-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden text-cream"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {open ? (
              <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-1 px-6 pb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 font-body text-sm text-cream/90 hover:text-gold-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
