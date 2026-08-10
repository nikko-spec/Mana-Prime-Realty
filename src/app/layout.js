import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const IDENTITY_REDIRECT_SCRIPT = `
(function () {
  var hash = window.location.hash;
  if (!hash) return;
  var tokens = ["invite_token", "confirmation_token", "recovery_token", "email_change_token"];
  var hasToken = tokens.some(function (t) { return hash.indexOf(t) !== -1; });
  if (hasToken && window.location.pathname !== "/admin/") {
    window.location.replace("/admin/" + hash);
  }
})();
`;

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Mana Prime Realty | Philippines Real Estate",
  description:
    "Mana Prime Realty — condos, house and lot, townhouses, and titled lots across the Philippines. Talk to an agent who has actually seen the unit.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
        <Script
          id="netlify-identity-redirect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: IDENTITY_REDIRECT_SCRIPT }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
