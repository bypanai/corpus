import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { organs } from "@/components/anatomy/organ-data";

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
  return <main className="min-h-screen bg-[#f8f1e8] px-5 py-7 text-[#332d29] sm:px-9 lg:px-14"><script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
    <header className="mx-auto flex max-w-6xl items-center justify-between"><Link className="font-[family-name:var(--font-serif)] text-3xl tracking-[-.05em]" href="/">Corpus</Link><Link className="rounded-full border border-[#b88c76]/35 bg-white/50 px-4 py-2 text-sm" href={`/anatomy?organ=${organ.id}`}>Open 3D explorer</Link></header>
    <article className="mx-auto grid max-w-6xl gap-10 py-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="relative grid min-h-80 place-items-center overflow-hidden rounded-[2rem] border border-[#b88c76]/25 bg-[radial-gradient(circle,white,rgba(246,228,215,.76))]"><Image alt={`Anatomical ${organ.name.toLowerCase()} illustration`} className="h-auto w-3/4 object-contain mix-blend-multiply" height={520} priority src={`/anatomy/${organ.id}/organ.webp`} width={520} /></div><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a46a5f]">{organ.system} · {organ.region}</p><h1 className="mt-4 font-[family-name:var(--font-serif)] text-6xl leading-none tracking-[-.055em]">{organ.name}</h1><p className="mt-5 max-w-2xl font-[family-name:var(--font-serif)] text-xl leading-8 text-[#5e544d]">{organ.description}</p><p className="mt-5 text-sm text-[#776a61]">Reviewed educational anatomy content · <a className="underline underline-offset-4" href={organ.contentSource.href} rel="noreferrer" target="_blank">{organ.contentSource.label}</a></p><Link className="mt-8 inline-flex rounded-full bg-[#403632] px-5 py-3 text-sm font-semibold text-white" href={`/anatomy?organ=${organ.id}`}>Explore {organ.name} in 3D</Link></div></article>
    <section className="mx-auto grid max-w-6xl gap-6 border-t border-[#b88c76]/20 py-12 md:grid-cols-2"><div><h2 className="font-[family-name:var(--font-serif)] text-3xl">Key facts</h2><dl className="mt-5 space-y-3">{facts.map(([label, value]) => <div className="grid grid-cols-[120px_1fr] border-b border-[#b88c76]/15 pb-3" key={label}><dt className="font-medium">{label}</dt><dd className="text-[#675d56]">{value}</dd></div>)}</dl></div><div><h2 className="font-[family-name:var(--font-serif)] text-3xl">Reference points</h2><ul className="mt-5 space-y-3">{landmarks.map((landmark) => <li className="border-l-2 border-[#ee7c6a] pl-3" key={landmark.id}><b>{landmark.label}</b><p className="mt-1 text-sm leading-5 text-[#675d56]">{landmark.detail}</p></li>)}</ul></div></section>
  </main>;
}
