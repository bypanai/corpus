import { RegionModelViewer } from "@/components/anatomy/RegionModelViewer";
import { notFound } from "next/navigation";

const regions = ["head-neck", "abdomen", "limbs"] as const;

export function generateStaticParams() { return regions.map((region) => ({ region })); }
export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) { const { region } = await params; if (!regions.includes(region as (typeof regions)[number])) notFound(); return <main className="atelier-shell region-page"><RegionModelViewer region={region as (typeof regions)[number]} /></main>; }
