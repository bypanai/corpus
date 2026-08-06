import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./anatomy-atelier.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const serif = DM_Serif_Display({ variable: "--font-serif", subsets: ["latin"], weight: "400" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = { metadataBase: new URL("https://corpus-3d.vercel.app"), title: { default: "Corpus — Interactive 3D Anatomy", template: "%s | Corpus" }, description: "Corpus is a calm, evidence-aligned 3D anatomy workspace with guided landmark stories and nine verified specimens. Free, no ads.", applicationName: "Corpus", alternates: { canonical: "/" }, openGraph: { type: "website", locale: "en_US", url: "/", siteName: "Corpus", title: "Corpus — Interactive 3D Anatomy", description: "Calm, accessible 3D anatomy with guided landmark tours, system views, and nine featured specimens.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Corpus — interactive 3D anatomy workspace" }] }, twitter: { card: "summary_large_image", title: "Corpus — Interactive 3D Anatomy", description: "Calm, accessible 3D anatomy with guided landmark tours, system views, and nine featured specimens.", images: ["/opengraph-image"] } };
export const viewport = { themeColor: "#f3f6fb" };
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}><body className="min-h-full flex flex-col">{children}</body></html>; }
