import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import "./anatomy-atelier.css";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://corpus-3d.vercel.app"),
  title: {
    default: "Corpus - Explore Human Anatomy in 3D",
    template: "%s | Corpus",
  },
  description: "A free, visual 3D anatomy explorer for understanding structures, spatial relationships, and clinically reviewed reference points.",
  applicationName: "Corpus",
  keywords: ["3D anatomy", "human anatomy", "medical education", "anatomy atlas", "anatomical relationships"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", url: "/", siteName: "Corpus", title: "Corpus — Explore Human Anatomy in 3D", description: "A calm, free 3D anatomy explorer for understanding human form and spatial relationships.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Corpus — explore human anatomy in 3D" }] },
  twitter: { card: "summary_large_image", title: "Corpus — Explore Human Anatomy in 3D", description: "A calm, free 3D anatomy explorer for understanding human form and spatial relationships.", images: ["/opengraph-image"] },
};

export const viewport = { themeColor: "#f8f1e8" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><script dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "EducationalOrganization", name: "Corpus", url: "https://corpus-3d.vercel.app", description: "A free visual 3D anatomy explorer for understanding human anatomy.", educationalCredentialAwarded: undefined }) }} type="application/ld+json" />{children}</body>
    </html>
  );
}
