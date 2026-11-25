"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { fit } from "./data";

export function FitFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="mx-auto max-w-2xl space-y-2">
      {fit.faq.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q} className={cn("fit-faq rounded-xl", on && "fit-faq--on")}>
            <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)} className="flex w-full items-center gap-3.5 px-4 py-3 text-left">
              <span className="font-mono text-[0.75rem] font-bold text-fit-300">0{i + 1}</span>
              <span className="flex-1 text-[0.9375rem] font-bold text-white">{f.q}</span>
              <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-md border transition-[transform,background-color] duration-300", on ? "rotate-45 border-fit-300 bg-fit-300 text-black" : "border-white/20 text-white/70")}>
                <Icon name="plus" className="h-4 w-4" strokeWidth={2.6} />
              </span>
            </button>
            <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out-expo", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <p className="overflow-hidden px-4 pl-[2.9rem] text-[0.875rem] leading-relaxed text-white/70"><span className="block pb-4">{f.a}</span></p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
