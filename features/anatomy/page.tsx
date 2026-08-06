"use client"

import Scene from "@/components/anatomy/Scene"
import { Controls } from "@/components/anatomy/Controls"

export default function AnatomyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Anatomy Viewer</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Explore anatomy in immersive 3D
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            A polished, premium anatomy workspace built with React Three Fiber, Drei, and Framer Motion.
          </p>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
          <Scene />
          <div className="space-y-6">
            <Controls />
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/30">
              <h2 className="text-lg font-semibold text-white">Quick tips</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>• Use orbit controls to rotate the model.</li>
                <li>• Reset camera when you want a fresh view.</li>
                <li>• Toggle labels once an anatomy model is added.</li>
                <li>• Fullscreen makes the viewer immersive.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
