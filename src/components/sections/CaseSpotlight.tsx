"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const CaseModal = dynamic(() => import("./CaseModal").then((m) => m.CaseModal), { ssr: false });
const AUTO_MS = 6000;

/**
 * Casi studio "in vetrina": un cliente alla volta a tutta larghezza, con la sua foto che si muove piano, i due
 * numeri enormi e la sintesi; a lato gli altri clienti in miniatura con il risultato principale. Cambia da solo
 * finché l'utente non sceglie; "Scopri il case study" apre la scheda completa.
 */
export function CaseSpotlight() {
  const items = site.results.items;
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible || modal) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % items.length), AUTO_MS);
    return () => window.clearTimeout(t);
  }, [active, auto, visible, modal, items.length]);

  const c = items[active]!;
  const running = auto && visible && !modal;

  return (
    <div ref={rootRef} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-6">
      {/* caso in primo piano */}
      <article aria-live="polite" className="relative isolate min-h-[30rem] overflow-hidden rounded-[1.75rem] border border-line-strong shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] sm:min-h-[34rem]">
        <div key={`img-${c.id}`} className="cs-img absolute inset-0 -z-10">
          <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 52rem, 94vw" className="object-cover" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(1_15_28/0.97)_0%,rgb(1_15_28/0.88)_45%,rgb(1_15_28/0.35)_100%)] max-sm:bg-[linear-gradient(0deg,rgb(1_15_28/0.98)_35%,rgb(1_15_28/0.6))]" />
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-20 [mask-image:linear-gradient(90deg,#000,transparent_60%)]" />

        <div key={c.id} className="cs-in relative flex h-full min-h-[inherit] flex-col p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[image:var(--gradient-gold-btn)] px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-night">
              <Icon name={c.icon} className="h-3.5 w-3.5" strokeWidth={2} />
              {c.tag}
            </span>
            <span className="rounded-full border border-white/20 bg-night/60 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-2 backdrop-blur">
              {c.sector} · {c.place}
            </span>
          </div>

          <h3 className="mt-5 font-display text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-fg">{c.client}</h3>
          <p className="mt-3 max-w-md text-[1.0625rem] leading-snug text-fg-2">{c.text}</p>

          <dl className="mt-auto grid max-w-xl grid-cols-2 gap-6 pt-10">
            {c.stats.map((st, i) => (
              <div key={st.label} className="cs-stat" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                <dd className={cn("whitespace-nowrap font-display text-[clamp(2.25rem,1.4rem+2.8vw,4rem)] font-bold leading-none tracking-[-0.05em]", i === 0 ? "text-gold" : "text-azure-300")}>{st.value}</dd>
                <dt className="mt-2 text-[0.75rem] font-semibold uppercase tracking-wider text-fg-2">{st.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="md" icon="arrow-right" onClick={() => setModal(true)} aria-haspopup="dialog">
              {site.portfolio.open}
            </Button>
            <span className="font-mono text-[0.8125rem] tabular-nums text-fg-3">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
          <span key={`${active}-${running}`} className={cn("block h-full origin-left bg-gradient-to-r from-gold-500 via-gold-300 to-azure-300", running ? "sx-progress" : "scale-x-0")} style={{ animationDuration: `${AUTO_MS}ms` }} />
        </span>
      </article>

      {/* altri clienti */}
      <div role="group" aria-label="Scegli un cliente" className="flex gap-3 overflow-x-auto pb-1 max-lg:-mx-[var(--gutter)] max-lg:px-[var(--gutter)] max-lg:[scrollbar-width:none] lg:flex-col lg:overflow-visible">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setAuto(false);
                setActive(i);
              }}
              className={cn(
                "group/cs flex w-64 shrink-0 items-center gap-3 rounded-2xl border p-2.5 text-left transition-[border-color,background-color,transform] duration-[var(--dur-base)] ease-out-expo lg:w-auto",
                on ? "border-gold-300/70 bg-gold-300/[0.08] lg:-translate-x-2" : "border-line bg-night/40 hover:border-gold-400/40",
              )}
            >
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <Image src={it.image} alt="" fill sizes="48px" className={cn("object-cover transition-[filter] duration-500", on ? "" : "grayscale-[0.7] group-hover/cs:grayscale-0")} />
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block truncate font-display text-[0.9375rem] font-semibold", on ? "text-fg" : "text-fg-2")}>{it.client}</span>
                <span className="block truncate text-[0.75rem] text-fg-3">
                  <span className={on ? "font-semibold text-gold-300" : "font-semibold text-azure-300"}>{it.stats[0].value}</span> {it.stats[0].label.toLowerCase()}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {modal && <CaseModal item={c} onClose={() => setModal(false)} />}
    </div>
  );
}
