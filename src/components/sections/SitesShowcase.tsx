"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Vetrina siti, stabile e comoda col mouse: a sinistra un grande browser che mostra il sito scelto (dissolvenza
 * morbida, la pagina scorre piano dall'alto in basso), a destra l'elenco dei siti. Passando o cliccando su un nome
 * cambia il sito; da solo avanza ogni 5 secondi e si ferma quando ci sei sopra. Nessun elemento che salta.
 */
export function SitesShowcase() {
  const items = site.sitiWeb.items.filter((s) => !s.demo);
  const [cur, setCur] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setCur((c) => (c + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [hold, items.length]);

  const it = items[cur]!;
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.75fr)]" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="ssc-frame relative">
        <span aria-hidden="true" className="ssc-glow" />
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-night shadow-[0_40px_80px_-36px_rgb(0_0_0/0.95)]">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-surface-2 px-3 py-2">
            <i className="h-2 w-2 rounded-full bg-ember-400/80" />
            <i className="h-2 w-2 rounded-full bg-gold-300/80" />
            <i className="h-2 w-2 rounded-full bg-lime-300/80" />
            <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-night/60 px-3 py-0.5 text-[0.6875rem] text-fg-3">
              <Icon name="shield" className="h-3 w-3 text-lime-300" strokeWidth={2.2} />
              <span className="truncate">{it.domain}</span>
            </span>
          </div>
          <div className="relative aspect-[16/10]">
            {items.map((s, i) => (
              <div key={s.id} aria-hidden={i !== cur} className={cn("absolute inset-0 transition-[opacity,transform] duration-700 ease-out-expo", i === cur ? "opacity-100" : "scale-[1.02] opacity-0")}>
                <Image src={s.image} alt={i === cur ? `Sito ${s.name}` : ""} fill sizes="(min-width: 1024px) 50rem, 92vw" className={cn("object-cover object-top", i === cur && "ssc-pan")} />
              </div>
            ))}
            <span key={cur} aria-hidden="true" className={cn("ssc-bar absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[image:var(--gradient-gold-btn)]", hold && "[animation-play-state:paused]")} />
          </div>
        </div>
      </div>

      <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1" aria-label="Siti realizzati">
        {items.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onMouseEnter={() => setCur(i)}
              onFocus={() => setCur(i)}
              onClick={() => setCur(i)}
              aria-pressed={i === cur}
              className={cn("flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-[background-color,border-color] duration-300", i === cur ? "border-gold-300/50 bg-gold-300/[0.07]" : "border-transparent hover:bg-white/[0.03]")}
            >
              <span className={cn("font-mono text-[0.625rem] font-bold transition-colors", i === cur ? "text-gold-300" : "text-fg-3")}>{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className={cn("block truncate font-display text-[0.9375rem] font-semibold transition-colors", i === cur ? "text-fg" : "text-fg-2")}>{s.name}</span>
                <span className="block truncate text-[0.6875rem] text-fg-3">{s.category}</span>
              </span>
              <Icon name="arrow-right" className={cn("h-3.5 w-3.5 shrink-0 transition-[opacity,color]", i === cur ? "text-gold-300 opacity-100" : "opacity-0")} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
