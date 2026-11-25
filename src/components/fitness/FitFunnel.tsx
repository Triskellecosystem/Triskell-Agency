"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { fit } from "./data";

/** Il percorso da contenuto a iscritto: i sei quadrati si accendono uno dopo l'altro (o al passaggio del mouse). */
export function FitFunnel() {
  const ref = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [seen, setSeen] = useState(false);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(!!e?.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen || hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setCur((c) => (c + 1) % fit.funnel.length), 1700);
    return () => window.clearInterval(t);
  }, [seen, hold]);
  const step = fit.funnel[cur]!;
  return (
    <div ref={ref} onMouseLeave={() => setHold(false)}>
      <ol className="fit-funnel grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
        {fit.funnel.map((s, i) => (
          <li key={s.title} className="fit-pop" style={{ "--i": i } as React.CSSProperties}>
            <button
              type="button"
              onMouseEnter={() => { setHold(true); setCur(i); }}
              onClick={() => { setHold(true); setCur(i); }}
              aria-pressed={cur === i}
              className={cn("fit-sq group relative flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl text-center", i <= cur && "fit-sq--done", cur === i && "fit-sq--on")}
            >
              <span className="absolute left-2 top-1.5 font-mono text-[0.625rem] font-bold text-fit-300/70">0{i + 1}</span>
              <Icon name={s.icon} className="h-7 w-7 sm:h-9 sm:w-9" strokeWidth={1.7} />
              <span className="fit-h text-[0.8125rem] sm:text-[1rem]">{s.title}</span>
              {i < fit.funnel.length - 1 && <span aria-hidden="true" className="fit-arrow" />}
            </button>
          </li>
        ))}
      </ol>
      <p key={cur} aria-live="polite" className="fit-detail mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-[0.9375rem] text-white/80">
        <span className="fit-h shrink-0 rounded-md bg-fit-300 px-2 py-0.5 text-[0.75rem] text-black">0{cur + 1} · {step.title}</span>
        {step.text}
      </p>
    </div>
  );
}
