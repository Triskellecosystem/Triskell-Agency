"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/** Emblema "come funziona": tre nodi collegati da un filo su cui scorre un impulso (il flusso dei messaggi). */
function FlowMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none">
      <path d="M8 30 C 8 18, 20 22, 20 12 M20 12 C 20 22, 32 18, 32 30" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.6" />
      <path className="dm-pulse" d="M8 30 C 8 18, 20 22, 20 12 C 20 22, 32 18, 32 30" stroke="#fde08a" strokeWidth="1.8" strokeLinecap="round" pathLength={100} />
      <circle cx="20" cy="10" r="4" fill="#fde08a" />
      <circle cx="8" cy="31" r="3.2" stroke="#fde08a" strokeWidth="1.6" />
      <circle cx="32" cy="31" r="3.2" stroke="#fde08a" strokeWidth="1.6" />
    </svg>
  );
}

/** Emblema "vantaggi": un diamante sfaccettato con un riflesso che lo attraversa. */
function GemMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none">
      <path d="M12 8h16l7 9-15 16L5 17z" stroke="#fde08a" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M5 17h30M12 8l8 25M28 8l-8 25M12 8l4 9 4-9 4 9 4-9" stroke="#fde08a" strokeOpacity="0.55" strokeWidth="1.1" strokeLinejoin="round" />
      <path className="dm-gem" d="M12 8h16l7 9-15 16L5 17z" fill="url(#dmg)" />
      <defs>
        <linearGradient id="dmg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fde08a" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fde08a" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Drawer({ id, mark, title, open, onToggle, children }: { id: string; mark: React.ReactNode; title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-[1.25rem] border transition-[border-color,background-color] duration-300", open ? "border-gold-300/60 bg-[linear-gradient(140deg,rgb(247_200_92/0.08),rgb(13_39_61/0.7))]" : "border-white/10 bg-white/[0.02] hover:border-gold-300/40")}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="flex items-center gap-3">
          <span className="dm-tile relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-gold-300/40 bg-[radial-gradient(circle_at_30%_25%,rgb(247_200_92/0.22),rgb(4_22_40/0.9)_70%)] text-gold-200 shadow-[0_0_24px_-8px_rgb(247_200_92/0.6)]">
            {mark}
          </span>
          <span className="font-display text-[1rem] font-bold text-fg sm:text-[1.0625rem]">{title}</span>
        </span>
        <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300", open ? "rotate-45 border-gold-300 bg-gold-300 text-night" : "border-white/20 text-fg-2")}>
          <Icon name="plus" className="h-4 w-4" strokeWidth={2.4} />
        </span>
      </button>
      <div id={id} inert={!open} className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

/** Due tendine: come funziona Irelia (passaggi in elenco + garanzie) e i vantaggi dell'assistente digitale. */
export function AiAdvantages() {
  const a = site.ai;
  const [open, setOpen] = useState<number | null>(null);
  const t = (i: number) => setOpen((o) => (o === i ? null : i));
  return (
    <div className="grid gap-2.5">
      <Drawer id="ai-how" mark={<FlowMark />} title="Come funziona Irelia" open={open === 0} onToggle={() => t(0)}>
        <ol className="space-y-2 px-5 pb-5">
          {a.steps.map((s, i) => (
            <li key={s.title} className={cn("flex items-center gap-3 rounded-xl border border-white/[0.07] bg-night/40 px-3 py-2.5", open === 0 && "adv-in")} style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="font-mono text-[0.6875rem] font-bold text-gold-300">0{i + 1}</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gold-300/10 text-gold-300">
                <Icon name={s.icon} className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="text-[0.875rem] text-fg">
                <strong className="font-semibold">{s.title}</strong> <span className="text-fg-2">· {s.text}</span>
              </span>
            </li>
          ))}
          <li className="flex flex-wrap gap-1.5 pt-2">
            {a.badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/40 bg-gold-300/[0.08] px-3 py-1 text-[0.75rem] font-semibold text-gold-200">
                <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                {b}
              </span>
            ))}
          </li>
        </ol>
      </Drawer>
      <Drawer id="ai-adv" mark={<GemMark />} title={a.advantagesLabel} open={open === 1} onToggle={() => t(1)}>
        <ul className="grid gap-2 px-5 pb-5 sm:grid-cols-2">
          {a.advantages.map((v, i) => (
            <li key={v.title} className={cn("group/adv rounded-xl border border-white/[0.07] bg-[linear-gradient(150deg,rgb(247_200_92/0.06),rgb(1_15_28/0.5))] p-3 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold-300/60", open === 1 && "adv-flip")} style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="flex items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[linear-gradient(135deg,#fde08a,#e9a33a)] text-night">
                  <Icon name={v.icon} className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
                <span className="font-display text-[0.875rem] font-bold leading-tight text-fg">{v.title}</span>
              </span>
              <span className="mt-1.5 block text-[0.75rem] leading-snug text-fg-2">{v.text}</span>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
}
