"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/anatomy/Scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-[2rem] bg-slate-950/95" />,
});

export function LandingScene() {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl shadow-slate-950/40">
      <Scene />
    </div>
  );
}
