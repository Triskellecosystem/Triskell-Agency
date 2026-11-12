"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/** Emblema "come funziona": tre nodi collegati da un filo su cui scorre un impulso (il flusso dei messaggi). */
function FlowMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none">
      <path d="M8 30 C 8 18, 20 22, 20 12 M20 12 C 20 22, 32 18, 32 30" stroke="currentColor" strokeWidth="2" />
      <path className="dm-pulse" d="M8 30 C 8 18, 20 22, 20 12 C 20 22, 32 18, 32 30" stroke="#fff6d8" strokeWidth="2.2" strokeLinecap="round" pathLength={100} />
      <circle cx="20" cy="10" r="4.2" fill="currentColor" />
      <circle cx="8" cy="31" r="3.6" fill="currentColor" />
      <circle cx="32" cy="31" r="3.6" fill="currentColor" />
    </svg>
  );
}

/** Emblema "vantaggi": un diamante sfaccettato con un riflesso che lo attraversa. */
function GemMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none">
      <path d="M12 8h16l7 9-15 16L5 17z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M5 17h30M12 8l8 25M28 8l-8 25M12 8l4 9 4-9 4 9 4-9" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.4" strokeLinejoin="round" />
      <path className="dm-gem" d="M12 8h16l7 9-15 16L5 17z" fill="url(#dmg)" />
      <defs>
        <linearGradient id="dmg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Drawer({ id, mark, title, open, onToggle, children }: { id: string; mark: React.ReactNode; title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className={cn("gl-card rounded-[1.25rem] transition-[border-color,background-color] duration-300", open && "gl-card--gold")}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="flex items-center gap-3">
          <span className="dm-tile relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-gold-btn)] text-night shadow-[0_8px_24px_-8px_rgb(247_200_92/0.7)]">
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
const WHO = {
  ads: { label: "Campagna", cls: "irf--ads" },
  ai: { label: "Irelia", cls: "irf--ai" },
  tu: { label: "Tu", cls: "irf--tu" },
} as const;

/** Vantaggi in forma breve: icona + 2-3 parole. Il dettaglio completo resta in site.ai.advantages. */
const ADV_SHORT: Record<string, string> = {
  "Risponde in pochi secondi": "Risponde in secondi",
  "Scrive come una persona": "Tono umano",
  "Nessun lead perso": "Zero lead persi",
  "Raccoglie la fascia oraria": "Sa quando richiamare",
  "Ricorda gli appuntamenti": "Meno assenze",
  "Collegato al tuo CRM": "Collegato al CRM",
  "Seguito da noi": "Seguito da noi",
};

export function AiAdvantages() {
  const a = site.ai;
  const [open, setOpen] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const t = (i: number) => setOpen((o) => (o === i ? null : i));
  const cur = a.steps[step] ?? a.steps[0]!;
  const advs = a.advantages.filter((v) => v.title in ADV_SHORT);
  const hours = a.advantages.find((v) => v.icon === "hourglass");
  return (
    <div className="grid gap-2.5">
      <Drawer id="ai-how" mark={<FlowMark />} title="Come funziona Irelia" open={open === 0} onToggle={() => t(0)}>
        <div className="px-4 pb-5 sm:px-5">
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-fg-3">
            {Object.values(WHO).map((w) => (
              <span key={w.label} className={cn("irf-leg inline-flex items-center gap-1.5", w.cls)}>
                <span className="irf-dot h-2 w-2 rounded-full" />
                {w.label}
              </span>
            ))}
          </div>
          <ol className="irf grid grid-cols-3 gap-x-5 gap-y-3">
            {a.steps.map((s, i) => (
              <li key={s.title} className={cn("irf-node", WHO[s.who].cls, open === 0 && "adv-in")} style={{ animationDelay: `${i * 0.07}s` }}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  aria-pressed={step === i}
                  className={cn("irf-btn flex w-full flex-col items-center gap-1.5 rounded-xl border px-1.5 py-2.5 text-center transition-[border-color,background-color,transform] duration-300", step === i ? "irf-btn--on" : "border-white/[0.08] bg-night/40 hover:-translate-y-0.5")}
                >
                  <span className="irf-ic relative grid h-9 w-9 place-items-center rounded-full">
                    <Icon name={s.icon} className="h-4 w-4" strokeWidth={2.2} />
                    <span className="absolute -right-1.5 -top-1 grid h-4 w-4 place-items-center rounded-full bg-night font-mono text-[0.5625rem] font-bold text-fg ring-1 ring-white/25">{i + 1}</span>
                  </span>
                  <span className="text-[0.75rem] font-semibold leading-tight text-fg sm:text-[0.8125rem]">{s.short}</span>
                </button>
              </li>
            ))}
          </ol>
          <p key={step} aria-live="polite" className="adv-in mt-3 flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-night/50 px-3.5 py-2.5 text-[0.8125rem] leading-snug text-fg-2">
            <span className={cn("irf-tag mt-px shrink-0 rounded-full px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.1em]", WHO[cur.who].cls)}>{step + 1} · {WHO[cur.who].label}</span>
            <span>{cur.text}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {a.badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/40 bg-gold-300/[0.08] px-3 py-1 text-[0.75rem] font-semibold text-gold-200">
                <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                {b}
              </span>
            ))}
          </div>
        </div>
      </Drawer>
      <Drawer id="ai-adv" mark={<GemMark />} title={a.advantagesLabel} open={open === 1} onToggle={() => t(1)}>
        <div className="px-4 pb-5 sm:px-5">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {advs.map((v, i) => (
              <li key={v.title} title={v.text} className={cn("flex flex-col items-center gap-2 rounded-xl border border-white/[0.08] bg-night/40 px-2 py-3 text-center transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold-300/60", open === 1 && "adv-flip")} style={{ animationDelay: `${i * 0.05}s` }}>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#fde08a,#e9a33a)] text-night">
                  <Icon name={v.icon} className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <span className="text-[0.75rem] font-semibold leading-tight text-fg sm:text-[0.8125rem]">{ADV_SHORT[v.title]}</span>
              </li>
            ))}
            {hours && (
              <li className={cn("flex flex-col items-center justify-center gap-1 rounded-xl border border-gold-300/45 bg-gold-300/[0.07] px-2 py-3 text-center", open === 1 && "adv-flip")} style={{ animationDelay: `${advs.length * 0.05}s` }}>
                <span className="font-display text-[1.5rem] font-bold leading-none text-gold-200">≈6 h</span>
                <span className="text-[0.75rem] font-semibold leading-tight text-fg-2">libere a settimana</span>
              </li>
            )}
          </ul>
        </div>
      </Drawer>
    </div>
  );
}
