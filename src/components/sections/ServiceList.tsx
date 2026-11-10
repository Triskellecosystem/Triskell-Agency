"use client";

import { useState } from "react";
import type { Service } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";
import { ScrollSlide } from "@/components/motion/ScrollSlide";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };

/**
 * I servizi come schede vive: entrano da sinistra e da destra con lo scroll, una alla volta si accende a rotazione
 * (come un "evidenziatore"), l'icona respira. Un clic su una scheda la apre e spiega in 4 punti cosa facciamo;
 * se ne apre una alla volta. Accessibile: pulsante con aria-expanded, Invio/Spazio e Esc.
 */
export function ServiceList({ items }: { items: Service[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className="svc-list grid items-start gap-4 max-md:grid-cols-2 max-md:gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => {
        const isOpen = open === i;
        return (
          <li key={s.title} style={{ "--i": i } as CSSVars} className={cn("min-w-0", isOpen && "max-md:col-span-2")}>
            <ScrollSlide from={i % 2 === 0 ? "left" : "right"}>
              <Spotlight
                className={cn(
                  "svc-card group/svc rounded-card border bg-[linear-gradient(170deg,var(--color-surface-2),var(--color-night-raised))] p-5 max-md:p-3.5 transition-[border-color,transform] duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1 hover:border-gold-300/70",
                  isOpen ? "border-gold-300/80 shadow-[0_0_40px_-12px_rgb(247_200_92/0.6)]" : "border-line",
                )}
                size={320}
              >
                <div className="relative z-[2]">
                  <span className="svc-icon grid h-14 w-14 max-md:h-10 max-md:w-10 place-items-center rounded-2xl border border-gold-400/45 bg-gold-300/10 text-gold-300" style={{ "--i": i } as CSSVars}>
                    <Icon name={s.icon} className="h-7 w-7 max-md:h-5 max-md:w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 max-md:mt-2.5 font-display text-[1.125rem] max-md:text-[0.9375rem] font-semibold leading-tight tracking-tight text-fg">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`svc-d-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      onKeyDown={(e) => e.key === "Escape" && setOpen(null)}
                      className="flex w-full items-start justify-between gap-3 text-left after:absolute after:-inset-5 after:content-[''] focus-visible:outline-none"
                    >
                      <span>{s.title}</span>
                      <span aria-hidden="true" className={cn("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-gold-300 transition-[transform,background-color,border-color] duration-300", isOpen ? "rotate-45 border-gold-300 bg-gold-300/15" : "border-gold-400/40")}>
                        <Icon name="plus" className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </span>
                    </button>
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-snug text-fg-2 max-md:hidden">{s.text}</p>

                  <div id={`svc-d-${i}`} inert={!isOpen} className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden">
                      <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                        {s.details.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-fg">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-gold-400/50 bg-gold-300/10 text-gold-300">
                              <Icon name="check" className="h-3 w-3" strokeWidth={2.5} />
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <span aria-hidden="true" className="svc-bar pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-gold-500 via-gold-300 to-azure-300" />
              </Spotlight>
            </ScrollSlide>
          </li>
        );
      })}
    </ul>
  );
}
