"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const shots = [
  { id: "naturae", alt: "Esempio di profilo Instagram: cosmetica naturale" },
  { id: "vertis", alt: "Esempio di profilo Instagram: palestra" },
  { id: "borgo", alt: "Esempio di profilo Instagram: osteria" },
  { id: "essentia", alt: "Esempio di profilo Instagram: centro benessere" },
  { id: "viaggiare", alt: "Esempio di profilo Instagram: agenzia viaggi" },
  { id: "lumina", alt: "Esempio di profilo Instagram: studio dentistico" },
  { id: "clubdonne", alt: "Esempio di profilo Instagram: palestra femminile" },
  { id: "nocciolo", alt: "Esempio di profilo Instagram: ristorante" },
  { id: "lunaria", alt: "Esempio di profilo Instagram: benessere olistico" },
  { id: "lavie", alt: "Esempio di profilo Instagram: centro estetico" },
  { id: "elevare", alt: "Esempio di profilo Instagram: immobiliare" },
  { id: "bianchi", alt: "Esempio di profilo Instagram: osteopata" },
  { id: "terraviva", alt: "Esempio di profilo Instagram: agriturismo e retreat" },
  { id: "donnamaria", alt: "Esempio di profilo Instagram: pizzeria" },
];
const N = shots.length;

/**
 * Ventaglio di profili di esempio: uno davanti, due ai lati, gli altri nascosti dietro. Basta portare il mouse
 * (o cliccare / toccare) un telefono dietro per farlo venire davanti; da solo ruota quando il mouse non è sopra.
 * Il ventaglio segue anche leggermente il mouse in 3D. Su telefono si tocca.
 */
export function PhoneFan() {
  const [front, setFront] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const hover = useRef(false);
  const intent = useRef(0);
  // passando il mouse su un telefono dietro, dopo un istante viene davanti (senza cliccare)
  // per evitare il "giro continuo" quando i telefoni scivolano sotto il cursore fermo: serve un vero movimento del mouse
  const cursor = useRef({ x: 0, y: 0 });
  const lastBring = useRef({ x: -999, y: -999 });
  const bring = (i: number) => {
    const c = cursor.current;
    if (Math.hypot(c.x - lastBring.current.x, c.y - lastBring.current.y) < 60) return;
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => {
      lastBring.current = { ...cursor.current };
      setFront(i);
    }, 160);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (!hover.current) setFront((f) => (f + 1) % N);
    }, 3500);
    return () => window.clearInterval(t);
  }, []);


  const onMove = (e: React.PointerEvent) => {
    const el = box.current;
    if (!el || e.pointerType !== "mouse") return;
    hover.current = true;
    cursor.current = { x: e.clientX, y: e.clientY };
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    el.style.setProperty("--ry", `${((x - 0.5) * 10).toFixed(2)}deg`);
  };

  return (
    <div
      ref={box}
      onPointerMove={onMove}
      onPointerLeave={() => {
        box.current?.style.setProperty("--ry", "0deg");
        hover.current = false;
      }}
      className="pf relative mx-auto h-[33rem] w-full max-w-[34rem] [perspective:1400px]"
    >
      <span aria-hidden="true" className="phone-glow" />
      <div className="pf-stage absolute inset-0">
        {shots.map((s, i) => {
          const d = (i - front + N) % N; // 0 davanti, 1 destra, N-1 sinistra, altri nascosti
          const pos = d === 0 ? 0 : d === 1 ? 1 : d === N - 1 ? 2 : d <= N / 2 ? 3 : 4;
          return (
            <button
              key={s.id}
              type="button"
              tabIndex={pos < 3 ? 0 : -1}
              aria-label={`Mostra in primo piano: ${s.alt}`}
              onClick={() => setFront(i)}
              onMouseEnter={() => pos !== 0 && bring(i)}
              onMouseLeave={() => window.clearTimeout(intent.current)}
              className={cn("pf-phone absolute left-1/2 top-0 -ml-[7.25rem] w-[14.5rem] overflow-hidden rounded-[1.8rem] border-[5px] border-[#1d2a3a] bg-black", `pf-pos-${pos}`)}
            >
              <Image src={`/social-examples/${s.id}.webp`} alt={s.alt} width={520} height={1126} sizes="14.5rem" priority={i < 2 || i === N - 1} className="block h-auto w-full" />
            </button>
          );
        })}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center gap-1.5">
        {shots.map((s, i) => (
          <button key={s.id} type="button" aria-label={s.alt} onClick={() => setFront(i)} className={cn("h-1.5 rounded-full transition-all duration-500", i === front ? "w-6 bg-gold-300" : "w-1.5 bg-white/25")} />
        ))}
      </div>
    </div>
  );
}
