"use client";

import { useEffect, useRef, useState } from "react";
import type { Service } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const AUTO_MS = 5200;

/**
 * Esploratore dei servizi: a sinistra l'elenco numerato (la voce attiva si accende e una barra d'oro si riempie
 * mentre aspetta il turno successivo), a destra un pannello grande con icona gigante, cosa facciamo e il risultato
 * tipico. Scorre da solo quando è visibile; al primo clic o passaggio del mouse si ferma e decide l'utente.
 * Accessibile: elenco di schede (tablist) con frecce su/giù.
 */
export function ServiceExplorer({ items }: { items: Service[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || paused || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % items.length), AUTO_MS);
    return () => window.clearTimeout(t);
  }, [active, auto, paused, visible, items.length]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = items.length;
    const go = (to: number) => {
      e.preventDefault();
      const k = (to + n) % n;
      choose(k);
      tabs.current[k]?.focus();
    };
    if (e.key === "ArrowDown" || e.key === "ArrowRight") go(i + 1);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(i - 1);
  };

  const s = items[active]!;
  const running = auto && !paused && visible;

  return (
    <div
      ref={rootRef}
      className="sx grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* elenco */}
      <div role="tablist" aria-orientation="vertical" aria-label="Servizi" className="sx-list flex gap-2 overflow-x-auto pb-1 max-lg:-mx-[var(--gutter)] max-lg:px-[var(--gutter)] max-lg:[scrollbar-width:none] lg:flex-col lg:overflow-visible">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`sx-tab-${i}`}
              aria-selected={on}
              aria-controls="sx-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "group/sx relative flex shrink-0 items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-[background-color,border-color,transform] duration-[var(--dur-base)] ease-out-expo lg:py-4",
                on ? "border-gold-300/70 bg-gold-300/[0.08] lg:translate-x-2" : "border-line bg-night/40 hover:border-gold-400/40 hover:bg-surface",
              )}
            >
              <span className={cn("font-mono text-[0.8125rem] font-semibold tabular-nums", on ? "text-gold-300" : "text-fg-3")}>{String(i + 1).padStart(2, "0")}</span>
              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-colors", on ? "border-gold-300/60 bg-gold-300 text-night" : "border-line-strong text-fg-2 group-hover/sx:text-gold-300")}>
                <Icon name={it.icon} className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.8} />
              </span>
              <span className={cn("whitespace-nowrap font-display text-[1rem] font-semibold tracking-tight lg:text-[1.0625rem]", on ? "text-fg" : "text-fg-2")}>{it.title}</span>
              <Icon name="arrow-right" className={cn("ml-auto hidden h-4 w-4 transition-[opacity,transform] duration-[var(--dur-base)] lg:block", on ? "translate-x-0 text-gold-300 opacity-100" : "-translate-x-2 opacity-0")} />
              {on && (
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-line">
                  <span key={`${active}-${running}`} className={cn("block h-full origin-left bg-gradient-to-r from-gold-500 via-gold-300 to-azure-300", running ? "sx-progress" : "scale-x-100")} style={{ animationDuration: `${AUTO_MS}ms` }} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* pannello */}
      <div id="sx-panel" role="tabpanel" aria-labelledby={`sx-tab-${active}`} className="relative min-h-[26rem] overflow-hidden rounded-[1.75rem] border border-gold-400/35 bg-[linear-gradient(150deg,var(--color-cobalt-700),var(--color-surface-2)_45%,var(--color-night-raised))] p-6 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.85)] sm:p-9">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(70%_60%_at_80%_20%,#000,transparent)]" />
        <div aria-hidden="true" className="sx-orb pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full" />
        <span key={`big-${active}`} aria-hidden="true" className="sx-bigicon pointer-events-none absolute -bottom-10 -right-6 text-gold-300/[0.07]">
          <Icon name={s.icon} className="h-72 w-72" strokeWidth={1} />
        </span>

        <div key={active} className="sx-in relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-gold-btn)] text-night shadow-glow-gold">
              <Icon name={s.icon} className="h-8 w-8" strokeWidth={1.7} />
            </span>
            <span className="font-mono text-[0.8125rem] font-semibold tabular-nums text-fg-3">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-6 font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.625rem)] font-bold leading-[1.05] tracking-[-0.035em] text-fg">{s.title}</h3>
          <p className="mt-2 max-w-md text-lead text-fg-2">{s.text}</p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {s.details.map((d, i) => (
              <li key={d} className="sx-item flex items-start gap-2.5 rounded-xl border border-line bg-night/40 px-3 py-2.5 text-[0.9375rem] leading-snug text-fg" style={{ animationDelay: `${0.12 + i * 0.07}s` }}>
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-300/15 text-gold-300">
                  <Icon name="check" className="h-3 w-3" strokeWidth={2.8} />
                </span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-8">
            {s.kpi && (
              <div>
                <p className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.75rem)] font-bold leading-none tracking-[-0.05em] text-gold">{s.kpi.value}</p>
                <p className="mt-1.5 text-[0.75rem] font-semibold uppercase tracking-wider text-fg-2">{s.kpi.label}</p>
              </div>
            )}
            <Button href="/contatti" size="md" icon="arrow-right">
              Lo voglio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
