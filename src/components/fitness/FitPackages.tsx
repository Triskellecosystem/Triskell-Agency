"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { fit } from "./data";

/** Pacchetti Social + Campagne in base ai contenuti; interruttore mensile / 6 mesi (scontistica maggiore). */
export function FitPackages() {
  const [six, setSix] = useState(true);
  const [pick, setPick] = useState(1);
  return (
    <div>
      <div className="flex justify-center">
        <div role="radiogroup" aria-label="Durata" className="fit-switch relative inline-grid grid-cols-2 rounded-full p-1">
          <span aria-hidden="true" className={cn("fit-switch-knob absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full", six ? "left-[calc(50%)]" : "left-1")} />
          <button type="button" role="radio" aria-checked={!six} onClick={() => setSix(false)} className={cn("relative z-[1] rounded-full px-5 py-2 text-[0.875rem] font-bold transition-colors sm:px-7", !six ? "text-black" : "text-white/70")}>Mese per mese</button>
          <button type="button" role="radio" aria-checked={six} onClick={() => setSix(true)} className={cn("relative z-[1] rounded-full px-5 py-2 text-[0.875rem] font-bold transition-colors sm:px-7", six ? "text-black" : "text-white/70")}>
            6 mesi <span className={cn("ml-1 rounded px-1.5 py-0.5 text-[0.625rem] uppercase", six ? "bg-black text-fit-300" : "bg-fit-300 text-black")}>Sconto</span>
          </button>
        </div>
      </div>
      <p className="mt-3 text-center text-[0.875rem] text-white/60">
        {six ? "Pacchetto da 6 mesi: scontistica maggiore e il tempo giusto per far crescere i numeri." : "Massima flessibilità, mese per mese. Il percorso consigliato resta di almeno 6 mesi."}
      </p>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {fit.packages.map((p, i) => (
          <li key={p.name} className="fit-pop" style={{ "--i": i } as React.CSSProperties}>
            <button type="button" onClick={() => setPick(i)} onMouseEnter={() => setPick(i)} aria-pressed={pick === i} className={cn("fit-pack relative flex h-full w-full flex-col rounded-2xl p-6 text-left", pick === i && "fit-pack--on")}>
              {p.tag && <span className="fit-h absolute -top-3 left-6 rounded-md bg-fit-300 px-2.5 py-1 text-[0.6875rem] text-black">{p.tag}</span>}
              <span className="fit-h text-[1.5rem] text-white">{p.name}</span>
              <span className="mt-4 flex items-end gap-2">
                <span className="fit-num text-[3.5rem] leading-none">{p.contents}</span>
                <span className="pb-1.5 text-[0.9375rem] font-semibold leading-tight text-white">contenuti<br /><span className="text-white/60">al mese · {p.perWeek}</span></span>
              </span>
              <span className="mt-3 flex items-center gap-2 text-[0.9375rem] font-semibold text-fit-200">
                <Icon name="target" className="h-4 w-4" strokeWidth={2.2} /> {p.campaigns}
              </span>
              <span className="my-5 h-px bg-white/10" />
              <span className="space-y-2">
                {p.points.map((x) => (
                  <span key={x} className="flex items-start gap-2 text-[0.875rem] text-white/75">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-fit-300" strokeWidth={3} /> {x}
                  </span>
                ))}
              </span>
              <span className="mt-auto pt-6">
                <span className="flex items-center justify-between rounded-xl border border-fit-300/30 bg-fit-300/[0.06] px-4 py-3">
                  <span className="text-[0.8125rem] text-white/70">{six ? "6 mesi · sconto maggiore" : "Mese per mese"}</span>
                  <span className="fit-h text-[0.875rem] text-fit-300">Su misura</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-center gap-2">
        <Link href="#contatti" className="fit-btn">
          Voglio il pacchetto {fit.packages[pick]!.name} {six ? "· 6 mesi" : ""} <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.6} />
        </Link>
        <span className="text-[0.8125rem] text-white/50">Il prezzo lo definiamo in call, in base alla tua palestra e alla tua zona.</span>
      </div>
    </div>
  );
}
