import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./anatomy-atelier.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const serif = DM_Serif_Display({ variable: "--font-serif", subsets: ["latin"], weight: "400" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = { metadataBase: new URL("https://corpus-3d.vercel.app"), title: { default: "Corpus - Explore Human Anatomy in 3D", template: "%s | Corpus" }, description: "Nine interactive 3D specimens with guided landmark tours and a segmented regional atlas. Free, no ads, and reviewed anatomy content.", applicationName: "Corpus", alternates: { canonical: "/" }, openGraph: { type: "website", locale: "en_US", url: "/", siteName: "Corpus", title: "Corpus — Explore Human Anatomy in 3D", description: "Nine interactive 3D specimens, guided landmark tours, and a segmented regional atlas. Free, no ads.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Corpus — explore human anatomy in 3D" }] }, twitter: { card: "summary_large_image", title: "Corpus — Explore Human Anatomy in 3D", description: "Nine interactive 3D specimens, guided landmark tours, and a segmented regional atlas. Free, no ads.", images: ["/opengraph-image"] } };
export const viewport = { themeColor: "#f3f6fb" };
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}><body className="min-h-full flex flex-col">{children}</body></html>; }
