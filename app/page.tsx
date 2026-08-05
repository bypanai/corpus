import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.17),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.14),_transparent_20%),linear-gradient(180deg,_rgba(15,23,42,0.95),_rgba(15,23,42,0.95))]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl opacity-60" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        <header className="flex flex-wrap items-center justify-between gap-6 pb-12 text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg font-semibold text-white shadow-inner shadow-white/5">
              C
            </div>
            <span className="font-medium tracking-[0.2em] uppercase text-slate-300">Corpus</span>
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-slate-300">
            <a href="#" className="transition hover:text-white">Home</a>
            <a href="#" className="transition hover:text-white">Anatomy</a>
            <a href="#" className="transition hover:text-white">Search</a>
            <a href="#" className="transition hover:text-white">About</a>
          </nav>
        </header>

        <section className="relative flex flex-1 flex-col items-start justify-center gap-12 pb-16 lg:flex-row lg:items-center lg:gap-20">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.32em] text-slate-400 shadow-lg shadow-slate-950/30 ring-1 ring-white/5">
              AI anatomy reimagined
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Learn Human Anatomy in 3D
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
                Interactive anatomy with AI, search, labels and clinical learning.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button className="rounded-full bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-[0_24px_80px_-32px_rgba(56,189,248,0.9)] transition duration-300 hover:bg-white/15 hover:-translate-y-0.5">
                Explore Anatomy
              </Button>
            </div>
          </div>

          <div className="relative flex w-full justify-center lg:w-auto">
            <div className="relative isolate flex h-[420px] w-[420px] items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_50px_120px_-40px_rgba(14,165,233,0.45)] sm:h-[480px] sm:w-[480px]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.14),_transparent_22%)]" />
              <div className="absolute -left-12 top-10 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute right-6 bottom-12 h-20 w-20 rounded-full bg-violet-500/20 blur-3xl" />

              <div className="relative z-10 grid h-full w-full place-items-center">
                <div className="relative flex h-[280px] w-[280px] items-center justify-center rounded-full border border-white/10 bg-slate-950/90 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.9)]">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(148,163,184,0.12),_transparent_60%)]" />
                  <div className="flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-slate-400 shadow-lg shadow-cyan-500/10">
                    <span className="text-sm uppercase tracking-[0.3em] text-slate-400">Anatomy Sphere</span>
                  </div>
                  <div className="absolute -right-10 top-8 h-12 w-12 rounded-full border border-white/10 bg-white/5 blur-sm" />
                  <div className="absolute left-8 -bottom-10 h-16 w-16 rounded-full border border-white/10 bg-white/5 blur-sm" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
