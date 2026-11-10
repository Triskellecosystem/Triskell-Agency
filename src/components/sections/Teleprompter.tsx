"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

const SCRIPT = [
  { cue: "Inquadratura frontale · luce dalla finestra", line: "Ciao! Oggi ti mostro 3 errori da evitare in palestra." },
  { cue: "Primo piano · avvicinati al telefono", line: "Il primo? Allenarsi sempre allo stesso ritmo." },
  { cue: "Cambio inquadratura · di lato", line: "Il secondo: saltare il riscaldamento." },
  { cue: "Piano americano · sorridi", line: "E il terzo… lo scopri nella prova gratuita!" },
];

/**
 * "Registri tu": un telefono in modalità ripresa con il nostro script che scorre come un gobbo (teleprompter):
 * frase da dire in grande, indicazione dell'inquadratura sopra, REC che lampeggia e griglia dei terzi.
 * Fa capire che chi registra da solo ha già tutto pronto. Gira solo quando è visibile.
 */
export function Teleprompter() {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(t);
      if (e?.isIntersecting) t = window.setInterval(() => setK((x) => (x + 1) % SCRIPT.length), 2600);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(t);
    };
  }, []);
  const s = SCRIPT[k]!;
  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto w-full max-w-[18rem]">
      <span className="phone-glow" />
      <div className="relative aspect-[9/17] overflow-hidden rounded-[2.2rem] border-[6px] border-[#1d2a3a] bg-[radial-gradient(120%_80%_at_50%_30%,#3a3f4a,#12161c_70%)] shadow-[0_50px_100px_-40px_rgb(0_0_0/0.95)]">
        {/* griglia dei terzi */}
        <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent_33%,rgb(255_255_255/0.15)_33%,rgb(255_255_255/0.15)_33.4%,transparent_33.4%,transparent_66.6%,rgb(255_255_255/0.15)_66.6%,rgb(255_255_255/0.15)_67%,transparent_67%),linear-gradient(transparent_33%,rgb(255_255_255/0.15)_33%,rgb(255_255_255/0.15)_33.3%,transparent_33.3%,transparent_66.6%,rgb(255_255_255/0.15)_66.6%,rgb(255_255_255/0.15)_66.9%,transparent_66.9%)]" />
        {/* sagoma */}
        <span className="absolute bottom-0 left-1/2 h-[55%] w-[70%] -translate-x-1/2 rounded-t-[50%] bg-[radial-gradient(60%_50%_at_50%_25%,#5b6370,#2a2f37_70%)] opacity-80" />
        <span className="absolute left-1/2 top-[30%] h-[18%] w-[30%] -translate-x-1/2 rounded-full bg-[#6a717d] opacity-80" />
        <span className="absolute left-3 top-6 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-0.5 font-mono text-[0.625rem] font-bold text-white">
          <i className="scv-rec h-2 w-2 rounded-full bg-[#ff3b30]" />
          REC 00:{String(8 + k * 6).padStart(2, "0")}
        </span>
        <span className="absolute right-3 top-6 rounded-full bg-black/50 px-2 py-0.5 text-[0.625rem] font-bold text-gold-200">Script Triskell</span>
        {/* gobbo */}
        <div className="absolute inset-x-3 top-14">
          <div key={k} className="tp-in rounded-2xl border border-gold-300/50 bg-black/70 p-3 backdrop-blur-md">
            <p className="flex items-center gap-1.5 text-[0.625rem] font-bold uppercase tracking-wider text-gold-300">
              <Icon name="camera" className="h-3 w-3" strokeWidth={2.4} />
              {s.cue}
            </p>
            <p className="mt-1.5 font-display text-[1rem] font-bold leading-snug text-white">{s.line}</p>
          </div>
          <div className="mt-2 flex gap-1">
            {SCRIPT.map((_, i) => (
              <span key={i} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i <= k ? "bg-gold-300" : "bg-white/20")} />
            ))}
          </div>
        </div>
        <span className="absolute bottom-5 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full border-4 border-white/80">
          <span className="tp-btn h-9 w-9 rounded-xl bg-[#ff3b30]" />
        </span>
      </div>
      <p className="mt-3 text-center text-[0.75rem] text-fg-3">Lo script con battute e inquadrature lo prepariamo noi</p>
    </div>
  );
}
