"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { BeamCard } from "@/components/ui/BeamCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CountUp } from "@/components/motion/CountUp";

/** La base più scelta: tre numeri grandi in una scheda con bordo oro rotante e la tendina "Scopri cosa include". */
export function BestPackage() {
  const b = site.metodo.best;
  const [open, setOpen] = useState(false);
  return (
    <BeamCard className="best-pulse mx-auto max-w-5xl">
      <div className="relative overflow-hidden rounded-[inherit] bg-[linear-gradient(150deg,#2b2410,var(--color-night-raised)_45%,#0b2a46)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-7">
          <p className="flex items-center gap-2 font-display text-[1.0625rem] font-bold text-fg">
            <Icon name="award" className="h-5 w-5 text-gold-300" strokeWidth={1.9} />
            {b.overline}
          </p>
          <span className="rounded-full border border-lime-300/50 px-3 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-lime-300">{b.badge}</span>
        </div>
        <dl className="grid divide-white/10 sm:grid-cols-3 sm:divide-x">
          {b.numbers.map((n, i) => {
            const m = n.value.match(/^(.*?)(\d+)$/);
            return (
            <div key={n.unit} className="bp-cell relative px-5 py-6 text-center sm:py-8" style={{ "--i": i } as React.CSSProperties}>
              <span aria-hidden="true" className="bp-ring" />
              <dd className="font-display text-[clamp(3rem,2rem+3.6vw,4.75rem)] font-bold leading-none tracking-[-0.06em]">
                {m ? <CountUp value={Number(m[2])} prefix={m[1]} className="text-gold" duration={1.4} /> : <span className="text-gold">{n.value}</span>}
              </dd>
              <dt className="mt-2 font-display text-[1.0625rem] font-bold text-fg">{n.unit}</dt>
              <p className="mt-0.5 text-[0.75rem] text-fg-3">{n.note}</p>
            </div>
            );
          })}
        </dl>
        <button type="button" aria-expanded={open} aria-controls="best-inc" onClick={() => setOpen(!open)} className="bp-toggle relative flex w-full overflow-hidden items-center justify-center gap-2 border-t border-white/10 py-3.5 font-display text-[0.9375rem] font-bold text-gold-200 transition-colors hover:bg-gold-300/[0.06]">
          {b.toggle}
          <Icon name="chevron-down" className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")} strokeWidth={2.4} />
        </button>
        <div id="best-inc" inert={!open} className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
          <div className="overflow-hidden">
            <div className="grid gap-3 px-5 pb-6 sm:grid-cols-2 sm:px-7 lg:grid-cols-4">
              {b.groups.map((g, i) => (
                <div key={g.title} className={cn("rounded-xl border border-white/[0.08] bg-night/50 p-4", open && "adv-in")} style={{ animationDelay: `${i * 0.07}s` }}>
                  <p className="flex items-center gap-2 font-display text-[0.9375rem] font-bold text-fg">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-gold-300/10 text-gold-300">
                      <Icon name={g.icon} className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    {g.title}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-1.5 text-[0.8125rem] leading-snug text-fg-2">
                        <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-300" strokeWidth={2.6} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 px-5 pb-6">
              <p className="inline-flex items-center gap-2 text-[0.8125rem] text-fg-2">
                <Icon name="monitor" className="h-4 w-4 text-gold-300" strokeWidth={1.9} />
                {b.extra}
              </p>
              <Button href="/contatti" size="md" icon="calendar" iconPosition="start" pulse>
                Prenota la call gratuita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BeamCard>
  );
}
