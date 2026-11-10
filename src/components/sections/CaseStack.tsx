"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Pila di casi reali: una carta davanti (foto, cliente, due numeri, una riga) e le altre dietro, sfalsate e
 * inclinate. Ogni pochi secondi quella davanti vola via e la successiva sale; un clic sulla pila la fa avanzare.
 */
export function CaseStack() {
  const items = site.results.items;
  const N = items.length;
  const ref = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(t);
      if (e?.isIntersecting) t = window.setInterval(() => setCur((c) => (c + 1) % N), 3200);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(t);
    };
  }, [N]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-sm">
      <span aria-hidden="true" className="phone-glow !w-[130%]" />
      <button type="button" aria-label="Mostra il prossimo caso" onClick={() => setCur((c) => (c + 1) % N)} className="cs3 relative block h-[25rem] w-full text-left">
        {items.map((c, i) => {
          const d = (i - cur + N) % N; // 0 davanti
          const vis = d < 3 || d === N - 1;
          return (
            <div
              key={c.id}
              className={cn("cs3-card absolute inset-x-0 top-0 overflow-hidden rounded-[1.5rem] border bg-[linear-gradient(165deg,var(--color-surface-2),var(--color-night-raised))] shadow-[0_30px_60px_-28px_rgb(0_0_0/0.95)]", d === 0 ? "border-gold-300/60" : "border-white/10")}
              style={{
                transform: d === N - 1 ? "translate3d(-120%, 30px, 0) rotate(-14deg)" : `translate3d(${d * 14}px, ${d * 14}px, 0) rotate(${d * 3}deg) scale(${1 - d * 0.05})`,
                opacity: vis ? (d === N - 1 ? 0 : 1 - d * 0.25) : 0,
                zIndex: N - d,
              }}
            >
              <div className="relative h-40">
                <Image src={c.image} alt="" fill sizes="24rem" className="object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
                <span className="absolute bottom-3 left-4 rounded-full bg-night/70 px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-gold-200 backdrop-blur">{c.tag}</span>
              </div>
              <div className="p-5">
                <p className="font-display text-[1.25rem] font-bold text-fg">{c.client}</p>
                <p className="text-[0.75rem] text-fg-3">
                  {c.sector} · {c.place}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-3">
                  {c.stats.map((st, k) => (
                    <div key={st.label}>
                      <p className={cn("font-display text-[1.75rem] font-bold leading-none tracking-[-0.03em]", k === 0 ? "text-gold" : "text-azure-300")}>{st.value}</p>
                      <p className="mt-1 text-[0.625rem] font-semibold uppercase tracking-wider text-fg-3">{st.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </button>
      <div className="mt-2 flex justify-center gap-1.5">
        {items.map((c, i) => (
          <button key={c.id} type="button" aria-label={c.client} onClick={() => setCur(i)} className={cn("h-1.5 rounded-full transition-all duration-500", i === cur ? "w-6 bg-gold-300" : "w-1.5 bg-white/25")} />
        ))}
      </div>
    </div>
  );
}
