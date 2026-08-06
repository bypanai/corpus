import { ThoraxRegionViewer } from "@/components/anatomy/ThoraxRegionViewer";
import Link from "next/link";

export const metadata = { title: "Thorax region" };

export default function ThoraxRegionPage() {
  return <main className="atelier-shell region-page"><header className="atelier-topbar"><Link className="atelier-brand" href="/"><strong>Corpus</strong><sup>°</sup><em>Visual anatomy, without clutter</em></Link><nav className="atelier-nav"><Link href="/anatomy">Explore</Link><Link href="/library">Library</Link><Link className="active" href="/regions/thorax">Regions</Link><Link href="/guide">Guide</Link></nav><span className="atelier-model-count">1 regional model</span></header><ThoraxRegionViewer /></main>;
}
