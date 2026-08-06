import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { organs } from "@/components/anatomy/organ-data";
import { LandingScene } from "@/components/LandingScene";
import { PrimaryNav } from "@/components/PrimaryNav";

const modes = [["01", "Library", "Nine interactive specimens. Browse by organ or system, open directly in the 3D explorer.", "/library", "Browse library →"], ["02", "Guided", "Follow each organ landmark by landmark, then trace a spatial story through its physiology.", "/guide", "Start a guide →"], ["03", "Regional", "Segmented models where structures can be independently hidden, isolated, and restored.", "/regions", "Open regions →"]] as const;

const heroBenefits = [
  ["Interactive proof", "Live specimen previews, labeled landmarks, and 3D navigation that show the product upfront."],
  ["Reviewed content", "Every specimen is anchored in trusted anatomy references and source citations."],
  ["Guided learning", "Short landmark tours and spatial stories help learners build context before memorizing."],
  ["Open access", "No ads, no paywall — just anatomy models built for clarity and review."],
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f6fb] text-[#202733]">
      <PrimaryNav />

      <section className="mx-auto grid min-h-[calc(100svh-56px)] max-w-7xl items-center gap-10 px-5 py-16 sm:px-9 lg:grid-cols-[1.4fr_1fr] lg:px-14">
        <div>
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[.08em] text-[#8792a5]">
            Interactive 3D anatomy proof
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-[clamp(3.5rem,8vw,6.4rem)] leading-[1.02] tracking-[-.045em]">
            See anatomy in its place.
          </h1>
          <p className="mt-6 max-w-[520px] text-[16px] leading-[1.75] text-[#4f5969]">
            Corpus is a free anatomy workspace built around labeled 3D models, guided specimen tours, and reviewed reference points so learners can grasp how structures fit together.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-[#4f7fe8] px-[22px] py-[11px] text-[13px] font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-[#3f6fd5]"
              href="/anatomy?organ=heart"
            >
              Explore the heart
              <ArrowRight size={15} />
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-[#dbe2ec] bg-white px-[22px] py-[11px] text-[13px] font-semibold text-[#202733] transition hover:bg-[#f3f6fb]"
              href="/library"
            >
              Browse the specimen library
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {heroBenefits.map(([title, detail]) => (
              <div key={title} className="rounded-3xl border border-[#dbe2ec] bg-white p-5 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#4f7fe8]">{title}</p>
                <p className="mt-3 text-[14px] leading-6 text-[#657083]">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-[#dbe2ec] bg-white/80 p-4 shadow-[0_35px_90px_rgba(15,23,42,.08)]">
          <div className="rounded-[1.75rem] overflow-hidden bg-slate-950">
            <LandingScene />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-[13px] text-[#657083] sm:grid-cols-2">
            <span className="rounded-2xl bg-[#eef2f7] px-3 py-2">9 specimens</span>
            <span className="rounded-2xl bg-[#eef2f7] px-3 py-2">Landmarks & labels</span>
            <span className="rounded-2xl bg-[#eef2f7] px-3 py-2">Guided tours</span>
            <span className="rounded-2xl bg-[#eef2f7] px-3 py-2">Source citations</span>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dbe2ec] bg-white py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-9 lg:px-14">
          <p className="mb-8 text-center text-[11px] font-medium uppercase tracking-[.08em] text-[#8792a5]">
            Available specimens
          </p>
          <div className="flex gap-4 overflow-x-auto pb-2 sm:justify-center">
            {organs.map((organ) => (
              <Link
                className="flex min-w-[88px] shrink-0 flex-col items-center gap-2 text-center text-[11px] text-[#657083] transition hover:text-[#202733]"
                href={`/anatomy?organ=${organ.id}`}
                key={organ.id}
              >
                <div className="grid h-18 w-18 place-items-center overflow-hidden rounded-full border border-[#dbe2ec] bg-[#eef2f7] p-2">
                  <img alt="" className="h-full w-full object-contain" src={`/anatomy/${organ.id}/thumb.webp`} />
                </div>
                <span>{organ.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="mx-auto max-w-7xl px-5 py-24 sm:px-9 lg:px-14">
        <p className="mb-8 text-center text-[11px] font-medium uppercase tracking-[.08em] text-[#8792a5]">
          How Corpus works
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {modes.map(([number, title, body, href, link]) => (
            <article
              className="rounded-lg border border-[#dbe2ec] bg-[#f9fbff] p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-[#91b0f4] hover:shadow-[0_8px_32px_rgba(67,92,128,.12)]"
              key={title}
            >
              <p className="font-mono text-[11px] text-[#4f7fe8]">{number}</p>
              <h2 className="mt-4 text-[22px] font-semibold">{title}</h2>
              <p className="mt-3 text-[14px] leading-7 text-[#4f5969]">{body}</p>
              <Link
                className="mt-7 inline-block text-[13px] font-medium text-[#4f7fe8] hover:text-[#202733] hover:underline"
                href={href}
              >
                {link}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#dbe2ec] px-5 py-24 text-center sm:px-9 lg:px-14">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl">Build understanding before memorizing.</h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-7 text-[#657083]">
          Corpus surfaces anatomy as spatial structure, not just names. Use the explorer to follow landmarks, compare regions, and step through specimen stories.
        </p>
        <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-[#eef2f7] px-5 py-6 text-left">
            <strong className="block text-sm text-[#202733]">Fast orientation</strong>
            <p className="mt-2 text-[14px] text-[#657083]">Jump straight to the most important structures.</p>
          </div>
          <div className="rounded-3xl bg-[#eef2f7] px-5 py-6 text-left">
            <strong className="block text-sm text-[#202733]">Sourced review</strong>
            <p className="mt-2 text-[14px] text-[#657083]">Each organ includes citation-backed reference content.</p>
          </div>
          <div className="rounded-3xl bg-[#eef2f7] px-5 py-6 text-left">
            <strong className="block text-sm text-[#202733]">Clear next steps</strong>
            <p className="mt-2 text-[14px] text-[#657083]">Explore a specimen, start a guide, or compare regions.</p>
          </div>
        </div>
        <Link
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#4f7fe8] px-[22px] py-[11px] text-[13px] font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-[#3f6fd5]"
          href="/anatomy?organ=heart"
        >
          Explore the heart
          <ArrowRight size={15} />
        </Link>
      </section>
    </main>
  );
}

