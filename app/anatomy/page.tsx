import { Suspense } from "react";
import Link from "next/link";
import { AnatomyRouteClient } from "@/components/anatomy/AnatomyRouteClient";

function AnatomyFallback() {
  return <main className="min-h-screen bg-[#f8f1e8] px-6 py-16 text-[#332d29]"><section className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a46a5f]">Corpus · visual anatomy</p><h1 className="mt-5 font-[family-name:var(--font-serif)] text-6xl tracking-[-.05em]">Explore human anatomy in 3D.</h1><p className="mt-5 max-w-2xl font-[family-name:var(--font-serif)] text-xl leading-8 text-[#675d56]">Browse medically reviewed reference points, relationships, and concise facts while the interactive anatomy viewer loads.</p><div className="mt-9 flex flex-wrap gap-3"><Link className="rounded-full bg-[#403632] px-5 py-3 text-sm font-semibold text-white" href="/anatomy/heart">Explore the heart</Link><Link className="rounded-full border border-[#b88c76]/35 bg-white/50 px-5 py-3 text-sm" href="/library">Browse the library</Link></div></section></main>;
}

export default function AnatomyPage() {
  return <Suspense fallback={<AnatomyFallback />}><AnatomyRouteClient /></Suspense>;
}
