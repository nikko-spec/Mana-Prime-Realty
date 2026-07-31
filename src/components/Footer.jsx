import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-banyan text-cream/80 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-xl italic text-cream">Mana Prime Realty</p>
          <p className="mt-2 text-sm text-cream/70 max-w-xs">
            A boutique brokerage working across the Philippines — condos,
            house and lot, townhouses, and titled lots.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Site</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-gold-light">Home</Link></li>
            <li><Link href="/properties" className="hover:text-gold-light">Properties</Link></li>
            <li><Link href="/about" className="hover:text-gold-light">About Us</Link></li>
            <li><Link href="/buyers-guide" className="hover:text-gold-light">Buyers Guide</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>hello@manaprimerealty.com</li>
            <li>+63 900 000 0000</li>
            <li>Metro Manila, Philippines</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 px-6 py-4 text-xs text-cream/50 text-center">
        © {new Date().getFullYear()} Mana Prime Realty. All rights reserved.
      </div>
    </footer>
  );
}
