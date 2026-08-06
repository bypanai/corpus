import Link from "next/link";
import { ArrowRight, Layers3, ScanSearch } from "lucide-react";

const regions = [
  { href: "/regions/thorax", name: "Thorax", detail: "Heart, rib cage, bronchial trees and trachea", state: "Segmented now", icon: ScanSearch },
  { href: "/regions/head-neck", name: "Head & neck", detail: "Independent head and neck regional structures", state: "Regional layers", icon: Layers3 },
  { href: "/regions/abdomen", name: "Abdomen", detail: "Digestive and urinary structures in relation", state: "Regional layers", icon: Layers3 },
  { href: "/regions/limbs", name: "Limbs", detail: "Paired upper and lower limb structures", state: "Regional layers", icon: Layers3 },
];

export const metadata = { title: "Regional anatomy" };

export default function RegionsPage() {
  return <main className="min-h-screen bg-[#f8f1e8] px-5 py-6 text-[#332d29] sm:px-9 lg:px-14">
    <header className="mx-auto flex max-w-7xl items-center justify-between gap-5"><Link className="font-[family-name:var(--font-serif)] text-4xl tracking-[-.05em]" href="/">Corpus<span className="ml-1 align-top font-[family-name:var(--font-sans)] text-sm text-[#eb7c6b]">✦</span></Link><nav className="hidden items-center gap-5 text-sm text-[#675d56] sm:flex"><Link href="/anatomy">Explore</Link><Link href="/library">Library</Link><Link className="font-semibold text-[#3f3530]" href="/regions">Regions</Link><Link href="/guide">Guide</Link></nav><Link className="rounded-full border border-[#b88c76]/35 bg-white/45 px-4 py-2 text-sm font-medium" href="/anatomy">Open explorer</Link></header>
    <section className="mx-auto max-w-7xl py-14 sm:py-20"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#477b70]">Segmented regional atlas</p><h1 className="mt-4 max-w-3xl font-[family-name:var(--font-serif)] text-5xl leading-[.95] tracking-[-.05em] sm:text-7xl">See structures<br /><em className="font-normal text-[#6c8f83]">in relation.</em></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#625850]">Regional models use independently controlled anatomy parts. This is where hide, restore, and isolate describe genuine model behaviour rather than an overlay effect.</p></section>
    <section className="mx-auto grid max-w-7xl gap-5 pb-16 sm:grid-cols-2">{regions.map(({ detail, href, icon: Icon, name, state }) => <article className="rounded-[1.7rem] border border-[#8ca99b]/25 bg-white/45 p-6 shadow-[0_16px_35px_-28px_rgba(54,102,89,.5)]" key={href}><div className="flex items-start justify-between gap-4"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e8f2ed] text-[#397165]"><Icon size={21} /></span><span className="rounded-full bg-[#edf5f0] px-3 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#477b70]">{state}</span></div><h2 className="mt-8 font-[family-name:var(--font-serif)] text-4xl tracking-[-.04em]">{name}</h2><p className="mt-3 min-h-12 text-sm leading-6 text-[#625850]">{detail}</p><Link className="mt-6 inline-flex items-center gap-1 rounded-full bg-[#397165] px-4 py-2.5 text-xs font-semibold text-white" href={href}>Open region <ArrowRight size={14} /></Link></article>)}</section>
    <footer className="mx-auto border-t border-[#b88c76]/20 py-7 text-sm text-[#74675f]">Regional assets derived from BodyParts3D, DBCLS and attributed under CC BY-SA 2.1 JP.</footer>
  </main>;
}
