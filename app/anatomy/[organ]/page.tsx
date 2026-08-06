import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { organs } from "@/components/anatomy/organ-data";
import { PrimaryNav } from "@/components/PrimaryNav";

type PageProps = { params: Promise<{ organ: string }> };

function findOrgan(id: string) { return organs.find((organ) => organ.id === id); }

export function generateStaticParams() { return organs.map((organ) => ({ organ: organ.id })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const organ = findOrgan((await params).organ);
  if (!organ) return {};
  return { title: `${organ.name} anatomy`, description: organ.description, alternates: { canonical: `/anatomy/${organ.id}` } };
}

export default async function OrganPage({ params }: PageProps) {
  const organ = findOrgan((await params).organ);
  if (!organ) notFound();
  const facts = organ.facts.slice(0, 4);
  const landmarks = organ.hotspots.slice(0, 5);
  const jsonLd = { "@context": "https://schema.org", "@type": "MedicalEntity", name: organ.name, description: organ.description, relevantSpecialty: organ.system, url: `https://corpus-3d.vercel.app/anatomy/${organ.id}` };

  return <div className="min-h-screen bg-[#f3f6fb] text-[#202733]">
    <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
    <PrimaryNav active="/anatomy" />
    <main className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-9 lg:px-14">
      <article className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="relative grid min-h-80 place-items-center overflow-hidden rounded-[2rem] border border-[#dbe2ec] bg-[radial-gradient(circle_at_50%_42%,#ffffff_0%,#f7f9fc_54%,#e9eef6_100%)] shadow-[0_24px_70px_rgba(32,39,51,.08)]">
          <Image alt={`Anatomical ${organ.name.toLowerCase()} illustration`} className="h-auto w-3/4 object-contain mix-blend-multiply" height={520} priority src={`/anatomy/${organ.id}/organ.webp`} width={520} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#4f7fe8]">{organ.system} · {organ.region}</p>
          <h1 className="mt-4 font-[family-name:var(--font-serif)] text-6xl leading-none tracking-[-.055em]">{organ.name}</h1>
          <p className="mt-5 max-w-2xl font-[family-name:var(--font-serif)] text-xl leading-8 text-[#4f5969]">{organ.description}</p>
          <p className="mt-5 text-sm text-[#657083]">Reviewed educational anatomy content · <a className="underline decoration-[#a9b8d0] underline-offset-4" href={organ.contentSource.href} rel="noreferrer" target="_blank">{organ.contentSource.label}</a></p>
          <Link className="mt-8 inline-flex rounded-full bg-[#202733] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4f7fe8]" href={`/anatomy?organ=${organ.id}`}>Explore {organ.name} in 3D</Link>
        </div>
      </article>
      <section className="mt-14 grid gap-6 border-t border-[#dbe2ec] pt-10 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-[#dbe2ec] bg-white p-6 shadow-[0_16px_50px_rgba(32,39,51,.05)]"><h2 className="font-[family-name:var(--font-serif)] text-3xl">Key facts</h2><dl className="mt-5 space-y-3">{facts.map(([label, value]) => <div className="grid grid-cols-[120px_1fr] border-b border-[#e7ebf1] pb-3 last:border-0" key={label}><dt className="font-medium">{label}</dt><dd className="text-[#657083]">{value}</dd></div>)}</dl></div>
        <div className="rounded-[1.75rem] border border-[#dbe2ec] bg-white p-6 shadow-[0_16px_50px_rgba(32,39,51,.05)]"><h2 className="font-[family-name:var(--font-serif)] text-3xl">Reference points</h2><ul className="mt-5 space-y-3">{landmarks.map((landmark) => <li className="border-l-2 border-[#4f7fe8] pl-3" key={landmark.id}><b>{landmark.label}</b><p className="mt-1 text-sm leading-5 text-[#657083]">{landmark.detail}</p></li>)}</ul></div>
      </section>
    </main>
  </div>;
}
