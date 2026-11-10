"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/** Tendina "Scopri i vantaggi del nostro assistente digitale": si apre con un clic e mostra gli otto vantaggi. */
export function AiAdvantages() {
  const a = site.ai;
  const [open, setOpen] = useState(false);
  const [lit, setLit] = useState(0);
  useEffect(() => {
    if (!open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setLit((l) => (l + 1) % a.advantages.length), 1100);
    return () => window.clearInterval(t);
  }, [open, a.advantages.length]);
  return (
    <div className={cn("rounded-[1.25rem] border transition-colors duration-[var(--dur-base)]", open ? "border-lime-300/40 bg-lime-300/[0.03]" : "border-white/10 bg-white/[0.02] hover:border-lime-300/40")}>
      <button type="button" aria-expanded={open} aria-controls="ai-adv" onClick={() => setOpen(!open)} className="adv-btn relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-[inherit] px-5 py-4 text-left">
        {!open && <span aria-hidden="true" className="cta-gold-shine opacity-40" />}
        <span className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime-300/15 text-lime-300">
            <Icon name="sparkles" className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="font-display text-[1rem] font-bold text-fg sm:text-[1.0625rem]">{a.advantagesLabel}</span>
        </span>
        <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300", open ? "rotate-45 border-lime-300 bg-lime-300 text-night" : "border-white/20 text-fg-2")}>
          <Icon name="plus" className="h-4 w-4" strokeWidth={2.4} />
        </span>
      </button>
      <div id="ai-adv" inert={!open} className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <ul className="grid gap-2 px-5 pb-5 sm:grid-cols-2 lg:grid-cols-4">
            {a.advantages.map((v, i) => (
              <li key={v.title} onMouseEnter={() => setLit(i)} className={cn("adv-card rounded-xl border p-3.5 transition-[transform,border-color,background-color,box-shadow] duration-500", open && "adv-flip", lit === i ? "-translate-y-1 border-lime-300/70 bg-lime-300/[0.08] shadow-[0_0_30px_-10px_rgb(127_224_160/0.6)]" : "border-white/[0.07] bg-night/50")} style={{ animationDelay: `${i * 0.08}s` }}>
                <span className={cn("grid h-8 w-8 place-items-center rounded-lg transition-[transform,background-color,color] duration-500", lit === i ? "rotate-[360deg] bg-lime-300 text-night" : "bg-lime-300/10 text-lime-300")}>
                  <Icon name={v.icon} className="h-4 w-4" strokeWidth={2} />
                </span>
                <p className="mt-2.5 font-display text-[0.9375rem] font-bold leading-tight text-fg">{v.title}</p>
                <p className="mt-1 text-[0.75rem] leading-snug text-fg-3">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
