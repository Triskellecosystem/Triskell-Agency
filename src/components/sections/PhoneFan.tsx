"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

const shots = [
  { id: "vertis", alt: "Esempio di profilo Instagram di una palestra" },
  { id: "essentia", alt: "Esempio di profilo Instagram di un centro benessere" },
  { id: "lumina", alt: "Esempio di profilo Instagram di uno studio dentistico" },
];

/* posizione di ogni telefono rispetto a quello davanti: 0 = centro, 1 = destra, 2 = sinistra */
const POS = [
  "z-20 translate-x-0 rotate-0 scale-100",
  "z-10 translate-x-[58%] rotate-[9deg] scale-[0.82] opacity-90",
  "z-10 -translate-x-[58%] -rotate-[9deg] scale-[0.82] opacity-90",
];

/**
 * Tre profili Instagram di esempio a ventaglio. Passando il mouse (o toccando) un telefono dietro, ruota e viene
 * davanti ingrandito; gli altri si spostano ai lati. Transizioni solo su transform/opacity.
 */
export function PhoneFan() {
  const [front, setFront] = useState(0);
  return (
    <div className="pf relative mx-auto h-[33rem] w-full max-w-[34rem]">
      {shots.map((s, i) => {
        const pos = (i - front + 3) % 3;
        return (
          <button
            key={s.id}
            type="button"
            aria-label={`Mostra in primo piano: ${s.alt}`}
            onMouseEnter={() => setFront(i)}
            onFocus={() => setFront(i)}
            onClick={() => setFront(i)}
            className={cn("pf-phone absolute left-1/2 top-0 -ml-[7.25rem] w-[14.5rem] overflow-hidden rounded-[1.8rem] border-[5px] border-[#1d2a3a] bg-black shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] transition-[transform,opacity,box-shadow] duration-700 ease-out-expo", POS[pos], pos === 0 && "shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95),0_0_50px_-14px_rgb(247_200_92/0.55)]")}
          >
            <Image src={`/social-examples/${s.id}.webp`} alt={s.alt} width={520} height={1126} sizes="14.5rem" priority={i === 0} className="block h-auto w-full" />
          </button>
        );
      })}
    </div>
  );
}
