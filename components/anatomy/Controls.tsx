"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const controls = [
  { label: "Search", action: "search" },
  { label: "Reset Camera", action: "reset" },
  { label: "Toggle Labels", action: "labels" },
  { label: "Fullscreen", action: "fullscreen" },
] as const

export function Controls() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
      <div className="text-sm uppercase tracking-[0.32em] text-slate-500">Viewer Controls</div>
      <div className="grid gap-3 sm:grid-cols-2">
        {controls.map((control) => (
          <motion.button
            key={control.action}
            type="button"
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -1 }}
            onClick={() => setActive(control.action)}
            className={`rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-left text-sm text-slate-100 transition duration-200 hover:border-cyan-400/40 hover:bg-slate-900/95 ${
              active === control.action ? "ring-1 ring-cyan-400/50" : ""
            }`}
          >
            <div className="font-semibold text-slate-100">{control.label}</div>
            <div className="mt-1 text-xs text-slate-400">Ready to use</div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
