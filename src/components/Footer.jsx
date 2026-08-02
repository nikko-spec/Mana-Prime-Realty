import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-banyan text-cream/80 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo.png"
              alt="Mana Prime Realty"
              width={960}
              height={391}
              className="h-12 w-auto"
            />
          </Link>
          <p className="mt-3 text-sm text-cream/70 max-w-xs">
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
            <li>nikkomana@gmail.com</li>
            <li>+63 919 007 5001 (Viber &amp; WhatsApp)</li>
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
