"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Il percorso di Irelia, a comparsa: sei tappe in fila (pallini collegati) e una scheda grande che mostra una tappa
 * alla volta, entrando da destra. Avanza da sola quando è visibile; si può scegliere la tappa cliccando i pallini.
 */
export function AiStepper() {
  const steps = site.ai.steps;
  const ref = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(t);
      if (e?.isIntersecting) t = window.setInterval(() => setCur((c) => (c + 1) % steps.length), 2200);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(t);
    };
  }, [auto, steps.length]);

  const s = steps[cur]!;
  return (
    <div ref={ref} className="mt-6">
      <ol className="relative flex items-center justify-between">
        <span aria-hidden="true" className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 bg-white/10" />
        <span aria-hidden="true" className="absolute left-4 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-azure-300 to-gold-300 transition-[width] duration-700 ease-out-expo" style={{ width: `calc((100% - 2rem) * ${cur / (steps.length - 1)})` }} />
        {steps.map((st, i) => (
          <li key={st.title} className="relative">
            <button
              type="button"
              aria-label={st.title}
              aria-current={i === cur}
              onClick={() => {
                setAuto(false);
                setCur(i);
              }}
              className={cn("grid h-9 w-9 place-items-center rounded-full border-2 transition-[transform,background-color,border-color,color] duration-500", i === cur ? "scale-125 border-gold-300 bg-gold-300 text-night shadow-[0_0_24px_rgb(247_200_92/0.7)]" : i < cur ? "border-azure-300 bg-azure-300/20 text-azure-300" : "border-white/20 bg-night text-fg-3")}
            >
              <Icon name={st.icon} className="h-4 w-4" strokeWidth={2} />
            </button>
          </li>
        ))}
      </ol>
      <div className="relative mt-5 flex items-center gap-2">
        <button type="button" aria-label="Passaggio precedente" onClick={() => { setAuto(false); setCur((c) => (c - 1 + steps.length) % steps.length); }} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-fg-2 transition-colors hover:border-gold-300 hover:text-gold-300">
          <Icon name="chevron-left" className="h-5 w-5" strokeWidth={2.2} />
        </button>
      <div className="relative h-[5.5rem] flex-1 overflow-hidden">
        <div key={cur} className="ais-card absolute inset-0 flex items-center gap-4 rounded-2xl border border-gold-300/40 bg-[linear-gradient(120deg,rgb(247_200_92/0.1),rgb(13_39_61/0.7))] px-5">
          <span className="font-display text-[2.5rem] font-bold leading-none tracking-[-0.05em] text-gold">{String(cur + 1).padStart(2, "0")}</span>
          <span>
            <span className="block font-display text-[1.25rem] font-bold leading-tight text-fg">{s.title}</span>
            <span className="block text-[0.875rem] text-fg-2">{s.text}</span>
          </span>
        </div>
      </div>
        <button type="button" aria-label="Passaggio successivo" onClick={() => { setAuto(false); setCur((c) => (c + 1) % steps.length); }} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-fg-2 transition-colors hover:border-gold-300 hover:text-gold-300">
          <Icon name="chevron-right" className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
