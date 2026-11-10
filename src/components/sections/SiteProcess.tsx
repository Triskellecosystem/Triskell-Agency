"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Il percorso del sito, raccontato costruendolo: a sinistra i passi (si sceglie col mouse o col dito), a destra un
 * browser che a ogni passo si completa — la call, la palette, lo scheletro delle pagine, la prima versione, le
 * revisioni, la pubblicazione e l'assistenza. Avanza da solo quando è sullo schermo e si ferma se ci passi sopra.
 * Toni scuri e calmi, poca luce.
 */
export function SiteProcess() {
  const steps = site.sitiProcess.steps;
  const [cur, setCur] = useState(0);
  const [hold, setHold] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const shot = site.sitiWeb.items.find((s) => s.id === "sfizi")!;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(!!e?.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen || hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setCur((c) => (c + 1) % steps.length), 3600);
    return () => clearInterval(t);
  }, [seen, hold, steps.length]);

  const s = steps[cur]!;
  return (
    <div ref={ref} className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <ol className="relative space-y-1">
        <span aria-hidden="true" className="absolute bottom-5 left-[1.3rem] top-5 w-px bg-white/10" />
        <span aria-hidden="true" className="absolute left-[1.3rem] top-5 w-px bg-gold-300/70 transition-[height] duration-700 ease-out-expo" style={{ height: `calc((100% - 2.5rem) * ${cur / (steps.length - 1)})` }} />
        {steps.map((st, i) => (
          <li key={st.title}>
            <button type="button" onMouseEnter={() => setCur(i)} onFocus={() => setCur(i)} onClick={() => setCur(i)} aria-pressed={i === cur} className="group flex w-full items-start gap-3 rounded-xl px-1.5 py-2 text-left">
              <span className={cn("relative z-[1] grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color] duration-300", i === cur ? "border-gold-300 bg-gold-300 text-night" : i < cur ? "border-gold-300/50 bg-night text-gold-300" : "border-white/15 bg-night text-fg-3")}>
                <Icon name={st.icon} className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="min-w-0 pt-1">
                <span className={cn("block font-display text-[0.9375rem] font-semibold leading-tight transition-colors", i === cur ? "text-fg" : "text-fg-2 group-hover:text-fg")}>
                  <span className="mr-1.5 font-mono text-[0.625rem] text-gold-300/80">0{i + 1}</span>
                  {st.title}
                </span>
                <span className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo", i === cur ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <span className="overflow-hidden">
                    <span className="block pt-1 text-[0.8125rem] leading-snug text-fg-3">{st.text}</span>
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#06192b] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.95)]">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-surface-2 px-3 py-2">
            <i className="h-2 w-2 rounded-full bg-ember-400/80" />
            <i className="h-2 w-2 rounded-full bg-gold-300/80" />
            <i className="h-2 w-2 rounded-full bg-lime-300/80" />
            <span className="mx-auto flex items-center gap-1.5 rounded-md bg-night/60 px-3 py-0.5 text-[0.6875rem] text-fg-3">
              <Icon name={cur >= 5 ? "shield" : "loader"} className={cn("h-3 w-3", cur >= 5 ? "text-lime-300" : "text-fg-3")} strokeWidth={2.2} />
              {cur >= 5 ? "iltuosito.it" : "anteprima.triskell"}
            </span>
          </div>
          <div className="relative aspect-[16/10]">
            {/* 0 call */}
            <Layer on={cur === 0}>
              <div className="flex h-full items-center justify-center gap-4 p-6">
                {["Tu", "Triskell"].map((n, k) => (
                  <div key={n} className="spc-pop grid h-[58%] w-[38%] place-items-center rounded-xl border border-white/10 bg-night/70" style={{ animationDelay: `${k * 0.15}s` }}>
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-300/15 text-gold-200"><Icon name={k ? "users" : "user"} className="h-6 w-6" strokeWidth={1.6} /></span>
                    <span className="text-[0.75rem] text-fg-2">{n}</span>
                  </div>
                ))}
                <span className="spc-live absolute left-1/2 top-[14%] -translate-x-1/2 rounded-full bg-[#ff3b30]/90 px-2 py-0.5 text-[0.625rem] font-bold text-white">● CALL</span>
              </div>
            </Layer>
            {/* 1 stile */}
            <Layer on={cur === 1}>
              <div className="flex h-full flex-col items-center justify-center gap-5 p-6">
                <div className="flex gap-3">
                  {["#0b2a46", "#f7c85c", "#3aa4d4", "#f4efe6", "#e8613c"].map((c, k) => (
                    <span key={c} className="spc-pop h-14 w-14 rounded-xl border border-white/15 sm:h-16 sm:w-16" style={{ background: c, animationDelay: `${k * 0.08}s` }} />
                  ))}
                </div>
                <p className="spc-pop font-display text-[1.75rem] font-bold tracking-[-0.03em] text-fg" style={{ animationDelay: "0.4s" }}>Aa <span className="font-normal italic text-gold-200">Aa</span></p>
              </div>
            </Layer>
            {/* 2 struttura */}
            <Layer on={cur === 2}>
              <div className="grid h-full grid-rows-[0.5fr_1.2fr_1fr] gap-2.5 p-5">
                <span className="spc-pop rounded-md border border-dashed border-white/20" />
                <span className="spc-pop rounded-md border border-dashed border-gold-300/40 bg-gold-300/[0.04]" style={{ animationDelay: "0.1s" }} />
                <span className="grid grid-cols-3 gap-2.5">
                  {[0, 1, 2].map((k) => <span key={k} className="spc-pop rounded-md border border-dashed border-white/20" style={{ animationDelay: `${0.2 + k * 0.08}s` }} />)}
                </span>
              </div>
            </Layer>
            {/* 3-6 sito vero */}
            <Layer on={cur >= 3}>
              <Image src={shot.image} alt="" fill sizes="(min-width: 1024px) 44rem, 92vw" className={cn("object-cover object-top transition-[filter] duration-700", cur === 3 && "spc-reveal")} />
              {cur === 4 && (
                <>
                  {[{ l: "12%", t: "22%" }, { l: "60%", t: "48%" }, { l: "28%", t: "72%" }].map((p, k) => (
                    <span key={k} className="spc-pop absolute grid h-7 w-7 place-items-center rounded-full bg-gold-300 text-night shadow-[0_0_0_5px_rgb(247_200_92/0.25)]" style={{ left: p.l, top: p.t, animationDelay: `${k * 0.25}s` }}>
                      <Icon name="pen" className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </span>
                  ))}
                </>
              )}
              {cur === 5 && (
                <span className="spc-pop absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-lime-300/50 bg-night/85 px-4 py-2 text-[0.8125rem] font-semibold text-lime-300 backdrop-blur">
                  <Icon name="rocket" className="h-4 w-4" strokeWidth={2} /> Online · form e WhatsApp collegati
                </span>
              )}
              {cur === 6 && (
                <span className="spc-pop absolute bottom-4 right-4 max-w-[16rem] rounded-2xl rounded-br-md border border-white/10 bg-night/90 px-4 py-2.5 text-[0.8125rem] text-fg backdrop-blur">
                  <span className="block text-[0.625rem] font-bold uppercase tracking-wider text-gold-300">Triskell</span>
                  Fatto! Ho aggiornato il menu come mi hai chiesto 👍
                </span>
              )}
            </Layer>
          </div>
        </div>
        <p className="mt-3 flex items-center gap-2 text-[0.8125rem] text-fg-2">
          <Icon name="check" className="h-4 w-4 text-gold-300" strokeWidth={2.6} />
          Cosa ricevi: <strong className="font-semibold text-fg">{s.get}</strong>
        </p>
      </div>
    </div>
  );
}

function Layer({ on, children }: { on: boolean; children: React.ReactNode }) {
  return <div aria-hidden="true" className={cn("absolute inset-0 transition-opacity duration-500", on ? "opacity-100" : "pointer-events-none opacity-0")}>{on ? children : null}</div>;
}
