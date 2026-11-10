"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

const shots = [
  { id: "vertis", alt: "Esempio di profilo Instagram di una palestra" },
  { id: "essentia", alt: "Esempio di profilo Instagram di un centro benessere" },
  { id: "lumina", alt: "Esempio di profilo Instagram di uno studio dentistico" },
];

/**
 * Tre profili di esempio a ventaglio. Basta muovere il mouse sopra: la zona del ventaglio sotto il cursore (sinistra,
 * centro, destra) decide quale telefono viene davanti; il cambio è lento e morbido. Su telefono si tocca.
 * Il ventaglio segue anche leggermente il mouse in 3D.
 */
export function PhoneFan() {
  const [front, setFront] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const lastZone = useRef(1);
  const cooldown = useRef(0);
  const posOf = (i: number) => (i - front + 3) % 3; // 0 davanti, 1 destra, 2 sinistra

  const onMove = (e: React.PointerEvent) => {
    const el = box.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    el.style.setProperty("--ry", `${((x - 0.5) * 10).toFixed(2)}deg`);
    const zone = x < 0.3 ? 0 : x > 0.7 ? 2 : 1;
    // si cambia solo quando il mouse ENTRA in una zona (non a ogni movimento) e non durante il movimento precedente
    if (zone === lastZone.current) return;
    lastZone.current = zone;
    if (zone === 1 || performance.now() < cooldown.current) return;
    cooldown.current = performance.now() + 1100;
    // trova quale telefono sta in quella posizione e portalo davanti
    const wantPos = zone === 0 ? 2 : 1;
    const target = shots.findIndex((_, i) => posOf(i) === wantPos);
    if (target >= 0 && target !== front) setFront(target);
  };

  return (
    <div
      ref={box}
      onPointerMove={onMove}
      onPointerLeave={() => {
        box.current?.style.setProperty("--ry", "0deg");
        lastZone.current = 1;
      }}
      className="pf relative mx-auto h-[33rem] w-full max-w-[34rem] [perspective:1400px]"
    >
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(58_164_212/0.45),rgb(58_164_212/0.1)_55%,transparent_72%)] blur-xl" />
      <div className="pf-stage absolute inset-0 [transform-style:preserve-3d]">
        {shots.map((s, i) => {
          const pos = posOf(i);
          return (
            <button
              key={s.id}
              type="button"
              aria-label={`Mostra in primo piano: ${s.alt}`}
              onClick={() => setFront(i)}
              className={cn("pf-phone absolute left-1/2 top-0 -ml-[7.25rem] w-[14.5rem] overflow-hidden rounded-[1.8rem] border-[5px] border-[#1d2a3a] bg-black", `pf-pos-${pos}`)}
            >
              <Image src={`/social-examples/${s.id}.webp`} alt={s.alt} width={520} height={1126} sizes="14.5rem" priority={i === 0} className="block h-auto w-full" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
