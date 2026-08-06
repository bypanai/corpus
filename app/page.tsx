import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Search, Sparkles } from "lucide-react";
import { organs } from "@/components/anatomy/organ-data";

const promises = [
  [Box, "Explore in 3D", "Rotate, zoom, and inspect every available specimen."],
  [Search, "Find what matters", "Search organs and systems without a maze of menus."],
  [Sparkles, "Learn spatially", "Connect names, form, position, and function in one calm view."],
] as const;

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f1e8] px-5 py-6 text-[#332d29] sm:px-9 lg:px-14">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <Link className="font-[family-name:var(--font-serif)] text-4xl tracking-[-0.05em]" href="/">Corpus<span className="ml-1 align-top font-[family-name:var(--font-sans)] text-sm text-[#eb7c6b]">✦</span></Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-sm text-[#675d56] md:flex"><a href="#approach">Approach</a><Link href="/library">Library</Link><Link href="/guide">Guide</Link><Link href="/anatomy">Explore</Link></nav>
        <Link className="rounded-full border border-[#b88c76]/35 bg-white/45 px-5 py-2.5 text-sm font-medium transition hover:bg-white" href="/anatomy">Open explorer</Link>
      </header>

      <section className="relative mx-auto grid max-w-7xl gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-24">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#a46a5f]">Free visual anatomy</p>
          <h1 className="font-[family-name:var(--font-serif)] text-6xl leading-[.91] tracking-[-0.055em] sm:text-7xl lg:text-8xl">See anatomy<br /><em className="font-normal text-[#8d6bcc]">in its place.</em></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#625850] sm:text-xl">Corpus is a calm, interactive 3D anatomy workspace for seeing structures, their neighbours, and how the body fits together.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link className="inline-flex items-center gap-2 rounded-full bg-[#3f3530] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_35px_-18px_rgba(63,53,48,.8)] transition hover:-translate-y-0.5" href="/anatomy">Explore the body <ArrowRight size={16} /></Link>
            <a className="inline-flex items-center rounded-full border border-[#b88c76]/35 bg-white/45 px-6 py-3.5 text-sm font-medium transition hover:bg-white" href="#approach">How it works</a>
          </div>
          <p className="mt-5 text-sm text-[#84766c]">Free to use. No ads, subscriptions, or exam prep clutter.</p>
        </div>

        <div className="relative mx-auto grid w-full max-w-md place-items-center lg:max-w-none">
          <div className="absolute h-80 w-80 rounded-full bg-[#f4c9bb]/55 blur-3xl" />
          <div className="relative grid h-[390px] w-full max-w-[500px] place-items-center overflow-hidden rounded-[2.2rem] border border-[#b88c76]/25 bg-[radial-gradient(circle_at_52%_38%,rgba(255,255,255,.95),rgba(255,249,241,.7)_55%,rgba(246,228,215,.75))] shadow-[0_28px_70px_-36px_rgba(87,62,43,.45)] sm:h-[470px]">
            <div className="absolute left-7 top-7 rounded-full border border-[#b88c76]/25 bg-white/60 px-3 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#8c7463]">Interactive specimen</div>
            <Image alt="Anatomical heart illustration" className="h-auto w-[67%] object-contain mix-blend-multiply drop-shadow-[0_28px_25px_rgba(92,47,44,.22)]" height={520} priority src="/anatomy/heart/organ.webp" width={520} />
            <div className="absolute bottom-7 right-7 rounded-2xl border border-[#d7b4a7]/35 bg-[#fff4bf] px-4 py-3 font-[family-name:var(--font-serif)] text-sm leading-5 text-[#685345] shadow-lg">Learn form<br />before memorising.</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-[#b88c76]/20 py-12" aria-labelledby="available-models">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#a46a5f]">Available now</p><h2 id="available-models" className="mt-2 font-[family-name:var(--font-serif)] text-4xl tracking-[-.04em]">A growing visual library.</h2></div><Link className="text-sm font-medium text-[#76574c] underline underline-offset-4" href="/library">Browse all models</Link></div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{organs.slice(0, 5).map((organ) => <Link className="group rounded-2xl border border-[#b88c76]/20 bg-white/35 p-3 transition hover:-translate-y-0.5 hover:bg-white/60" href={`/anatomy/${organ.id}`} key={organ.id}><Image alt={`Anatomical ${organ.name.toLowerCase()} illustration`} className="aspect-square w-full rounded-xl object-cover mix-blend-multiply" height={180} src={`/anatomy/${organ.id}/thumb.webp`} width={180} /><span className="mt-3 block font-[family-name:var(--font-serif)] text-xl">{organ.name}</span><span className="mt-1 block text-xs text-[#7b6e65]">{organ.system}</span></Link>)}</div>
      </section>

      <section id="approach" className="mx-auto max-w-7xl border-t border-[#b88c76]/20 py-12 lg:py-16">
        <p className="mb-7 text-xs font-bold uppercase tracking-[0.22em] text-[#a46a5f]">Designed for understanding</p>
        <div className="grid gap-5 md:grid-cols-3">
          {promises.map(([Icon, title, copy]) => <article className="rounded-3xl border border-[#b88c76]/20 bg-white/35 p-6" key={title}><Icon className="mb-8 text-[#8d6bcc]" size={22} strokeWidth={1.6} /><h2 className="font-[family-name:var(--font-serif)] text-3xl tracking-[-.03em]">{title}</h2><p className="mt-3 leading-6 text-[#6a5f57]">{copy}</p></article>)}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-6 text-[#746860]">Corpus is independently built as a free educational resource. Anatomy notes are cited and progressively reviewed as each structure is mapped.</p>
      </section>
      <section id="explore" className="sr-only">Open the interactive anatomy explorer to view currently available organs in 3D.</section>
    </main>
  );
}
