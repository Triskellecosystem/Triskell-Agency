"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const ROLES = ["shs-pos--front", "shs-pos--left", "shs-pos--right", "shs-pos--hide"] as const;

/**
 * Apertura Siti web: Sfizi Partenopei, Stay in Sicily e Chiodo in finestre del browser luminose che girano in 3D sopra
 * un anello d'oro. Avanzano da sole; basta passare il mouse su una finestra laterale per portarla davanti (anche clic,
 * trascinamento o pallini).
 */
export function SitesHeroStack() {
  const items = ["sfizi", "mani", "chiodo"].map((id) => site.sitiWeb.items.find((s) => s.id === id)!);
  const n = items.length;
  const [cur, setCur] = useState(0);
  const [hold, setHold] = useState(false);
  const drag = useRef<number | null>(null);
  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setCur((c) => (c + 1) % n), 3200);
    return () => window.clearInterval(t);
  }, [hold, n]);
  const role = (i: number) => {
    const d = (i - cur + n) % n;
    return d === 0 ? ROLES[0] : d === 1 ? ROLES[2] : d === n - 1 ? ROLES[1] : ROLES[3];
  };
  return (
    <div
      className="shs relative mx-auto aspect-[5/4] w-full max-w-[38rem] touch-pan-y select-none"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onPointerDown={(e) => (drag.current = e.clientX)}
      onPointerUp={(e) => {
        if (drag.current !== null && Math.abs(e.clientX - drag.current) > 30) setCur((c) => (c + (e.clientX < drag.current! ? 1 : n - 1)) % n);
        drag.current = null;
      }}
    >
      <span aria-hidden="true" className="shs-ring" />
      {items.map((it, i) => {
        const r = role(i);
        return (
          <button
            key={it.id}
            type="button"
            tabIndex={r === "shs-pos--hide" ? -1 : 0}
            aria-label={`Mostra il sito ${it.name}`}
            onClick={() => setCur(i)}
            onMouseEnter={(e) => {
              if (r === "shs-pos--front") return;
              const t = e.currentTarget;
              // basta passare sopra con il mouse (con un attimo di sosta) per portarla davanti
              const id = window.setTimeout(() => setCur(i), 180);
              t.addEventListener("mouseleave", () => window.clearTimeout(id), { once: true });
            }}
            className={cn("shs-card text-left", r)}
          >
            <span className="flex items-center gap-1.5 border-b border-white/10 bg-[#0a1b2e] px-3 py-1.5">
              <i className="h-2 w-2 rounded-full bg-ember-400/90" />
              <i className="h-2 w-2 rounded-full bg-gold-300/90" />
              <i className="h-2 w-2 rounded-full bg-lime-300/90" />
              <span className="ml-2 truncate text-[0.625rem] text-fg-3">{it.domain}</span>
            </span>
            <span className="relative block aspect-[16/10]">
              <Image src={it.image} alt="" fill sizes="26rem" draggable={false} className="object-cover object-top" />
            </span>
          </button>
        );
      })}
      <div className="absolute -bottom-9 left-1/2 flex -translate-x-1/2 gap-1.5">
        {items.map((it, i) => (
          <button key={it.id} type="button" aria-label={`Sito ${i + 1}`} onClick={() => setCur(i)} className={cn("h-1.5 rounded-full transition-all duration-300", i === cur ? "w-6 bg-gold-300" : "w-1.5 bg-white/30 hover:bg-white/60")} />
        ))}
      </div>
    </div>
  );
}
