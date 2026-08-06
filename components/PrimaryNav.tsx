"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const items = [
  { href: "/anatomy", label: "Explore" },
  { href: "/library", label: "Library" },
  { href: "/regions", label: "Regions" },
  { href: "/guide", label: "Guide" },
];

export function PrimaryNav({ active }: { active?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-[#dbe2ec] bg-white/85 px-5 backdrop-blur-xl sm:px-9 lg:px-14">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-5">
        <Link className="text-[15px] font-medium tracking-tight text-[#202733]" href="/">
          Corpus<span className="text-[#4f7fe8]">✦</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-4 text-[13px] text-[#657083] md:flex">
          {items.map((item, index) => (
            <span className="flex items-center gap-4" key={item.href}>
              {index > 0 && <i className="not-italic text-[#dbe2ec]">·</i>}
              <Link
                className={active === item.href ? "border-b border-[#4f7fe8] pb-1 text-[#202733]" : "transition-colors hover:text-[#202733]"}
                href={item.href}
              >
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link className="rounded-full border border-[#4f7fe8]/40 bg-[#e7efff] px-4 py-2 text-[13px] font-medium text-[#4f7fe8] hover:bg-[#4f7fe8] hover:text-white" href="/anatomy">
            Open explorer
          </Link>
          <button
            aria-expanded={mobileOpen}
            aria-label="Toggle mobile menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#dbe2ec] text-[#657083] hover:bg-[#f3f6fb] hover:text-[#202733] md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            type="button"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-[#dbe2ec] py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active === item.href ? "bg-[#e7efff] text-[#4f7fe8]" : "text-[#657083] hover:bg-[#f3f6fb] hover:text-[#202733]"}`}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
