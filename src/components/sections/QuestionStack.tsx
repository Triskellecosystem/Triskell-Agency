"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Domande a comparsa, compatte: la domanda attiva in primo piano (una riga, grande), sotto l'elenco di tutte le
 * domande come barre cliccabili che si riempiono mentre aspettano il turno. Cambia da sola; un clic la sceglie.
 */
export function QuestionStack() {
  const items = site.forWho.items;
  const ref = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(t);
      setRun(!!e?.isIntersecting);
      if (e?.isIntersecting) t = window.setInterval(() => setCur((c) => (c + 1) % items.length), 2800);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(t);
    };
  }, [items.length]);

  return (
    <div ref={ref} className="w-full">
      <div className="relative h-[6.5rem] overflow-hidden rounded-[1.25rem] border border-gold-300/50 bg-[linear-gradient(120deg,#13314f,#082036_70%)] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9),0_0_40px_-18px_rgb(247_200_92/0.5)]">
        <span aria-hidden="true" className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-gold-300 to-azure-300" />
        <p key={cur} className="qs2 absolute inset-0 flex items-center gap-4 px-6 sm:px-8">
          <span className="font-mono text-[0.8125rem] font-bold text-gold-300">{String(cur + 1).padStart(2, "0")}</span>
          <span className="font-display text-[clamp(1.25rem,1rem+1.2vw,2rem)] font-bold leading-tight tracking-[-0.03em] text-fg">{items[cur]!.title}</span>
        </p>
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((it, i) => (
          <li key={it.title}>
            <button type="button" onClick={() => setCur(i)} className={cn("relative w-full overflow-hidden rounded-xl border px-3 py-2 text-left text-[0.75rem] font-semibold leading-snug transition-colors duration-300", i === cur ? "border-gold-300/60 bg-gold-300/[0.08] text-fg" : "border-white/10 bg-white/[0.03] text-fg-3 hover:text-fg-2")}>
              {it.title}
              {i === cur && <span key={`${cur}-${run}`} className={cn("absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gold-300", run ? "sx-progress" : "")} style={{ animationDuration: "2800ms" }} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
