"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

const PTS = [6, 9, 14, 13, 21, 27, 34, 41, 47, 58, 66, 78]; // andamento illustrativo (in salita, con un piccolo calo)
const W = 520;
const H = 250;
const max = 84;
const xy = PTS.map((v, i) => [20 + (i * (W - 40)) / (PTS.length - 1), H - 26 - (v / max) * (H - 50)] as const);
const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const area = `${line} L${xy.at(-1)![0]} ${H - 26} L${xy[0]![0]} ${H - 26} Z`;

/**
 * Grafico che sale: una curva d'oro si disegna da sinistra a destra con l'area sfumata sotto, i punti si accendono
 * uno alla volta e in cima un contatore cresce; ogni tanto compare la notifica di un nuovo contatto. È un esempio di
 * andamento (non una promessa): sotto ci sono i numeri veri dei clienti.
 */
export function GrowthChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setOn(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!on) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setN(1240));
      return () => cancelAnimationFrame(id);
    }
    let v = 0;
    const t = setInterval(() => {
      if (v < 1100) v += 37;
      else if (Math.random() < 0.05) v += 1;
      else return;
      setN(v);
    }, 40);
    return () => clearInterval(t);
  }, [on]);
  return (
    <div ref={ref} className={`gc relative ${on ? "is-on" : ""}`}>
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,rgb(13_39_61/0.85),rgb(2_18_33/0.9))] p-5 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.95)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-fg-3">Contatti generati</p>
            <p className="mt-1 font-display text-[clamp(2rem,1.5rem+2vw,3rem)] font-bold leading-none tracking-[-0.04em] tabular-nums">
              <span className="text-gold">+{String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-lime-300/40 bg-lime-300/10 px-2.5 py-1 text-[0.6875rem] font-bold text-lime-300">
            <Icon name="trending" className="h-3.5 w-3.5" strokeWidth={2.4} /> In crescita
          </span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="gc-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7c85c" stopOpacity="0.35" />
              <stop offset="1" stopColor="#f7c85c" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gc-l" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3aa4d4" />
              <stop offset="1" stopColor="#fde08a" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((k) => (
            <line key={k} x1="20" x2={W - 20} y1={24 + k * ((H - 50) / 3)} y2={24 + k * ((H - 50) / 3)} stroke="rgb(255 255 255 / 0.06)" />
          ))}
          <path className="gc-area" d={area} fill="url(#gc-a)" />
          <path className="gc-line" d={line} fill="none" stroke="url(#gc-l)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength={100} />
          {xy.map(([x, y], i) => (
            <circle key={i} className="gc-dot" cx={x} cy={y} r={i === xy.length - 1 ? 6 : 3.5} fill={i === xy.length - 1 ? "#fde08a" : "#06192b"} stroke="#fde08a" strokeWidth="2" style={{ "--i": i } as React.CSSProperties} />
          ))}
          <circle className="gc-ping" cx={xy.at(-1)![0]} cy={xy.at(-1)![1]} r="6" fill="none" stroke="#fde08a" strokeWidth="2" />
          {["Avvio", "Test", "Ottimizzazione", "Crescita"].map((l, k) => (
            <text key={l} x={20 + (k + 0.5) * ((W - 40) / 4)} y={H - 6} textAnchor="middle" fontSize="11" fill="rgb(255 255 255 / 0.45)">{l}</text>
          ))}
        </svg>
        <p className="mt-1 text-[0.625rem] text-fg-3">Esempio di andamento nei primi mesi · i numeri reali dei clienti sono qui sotto</p>
      </div>
      {["Nuova richiesta da Instagram", "Prenotazione da Google", "Nuovo contatto WhatsApp"].map((m, k) => (
        <span key={m} className="gc-toast absolute right-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-night/90 py-1.5 pl-1.5 pr-3 text-[0.6875rem] font-semibold text-fg shadow-[0_14px_30px_-12px_rgb(0_0_0/0.9)] backdrop-blur" style={{ "--i": k, top: `${30 + k * 16}%` } as React.CSSProperties}>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night"><Icon name="bell" className="h-3 w-3" strokeWidth={2.4} /></span>
          {m}
        </span>
      ))}
    </div>
  );
}
