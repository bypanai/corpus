"use client"

import { motion } from "framer-motion"

export function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90">
      <motion.div
        className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 shadow-[0_32px_80px_-40px_rgba(14,165,233,0.75)]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
      >
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-950">
          <div className="absolute h-10 w-10 rounded-full border border-cyan-300/80" />
          <div className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(56,189,248,0.55)]" />
        </div>
      </motion.div>
    </div>
  )
}
