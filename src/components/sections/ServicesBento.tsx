import Link from "next/link";
import type { Service } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Spotlight } from "@/components/ui/Spotlight";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Servizi a mosaico: i primi due (campagne e social) sono tessere grandi con il risultato tipico in evidenza,
 * gli altri tessere piccole. Al passaggio del mouse la tessera si solleva e mostra cosa facciamo (4 punti).
 * Ogni tessera porta alla pagina del servizio o alla prenotazione.
 */
export function ServicesBento({ items }: { items: Service[] }) {
  // ordine del mosaico (4 colonne × 3 righe): grande 2×2, quattro piccole, grande 2×1, due piccole
  const order = [0, 2, 3, 4, 5, 1, 6, 7].filter((k) => k < items.length).map((k) => ({ s: items[k]!, big: k < 2, tall: k === 0 }));
  return (
    <RevealGroup className="sb grid auto-rows-[minmax(9.5rem,auto)] gap-3 max-md:grid-cols-2 md:grid-cols-4" stagger={0.06}>
      {order.map(({ s, big, tall }) => {
        return (
          <RevealItem key={s.title} y={18} className={cn("h-full", big && "col-span-2", tall && "md:row-span-2")}>
            <Link href={s.href ?? "/contatti"} className="group/sb block h-full">
              <Spotlight
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[1.125rem] border p-4 transition-[border-color,transform,box-shadow] duration-[var(--dur-base)] ease-out-expo group-hover/sb:-translate-y-1 group-hover/sb:shadow-[0_0_40px_-14px_rgb(247_200_92/0.55)] sm:p-5",
                  big ? "border-gold-400/35 bg-[linear-gradient(150deg,var(--color-cobalt-700),var(--color-surface-2)_50%,var(--color-night-raised))] group-hover/sb:border-gold-300/80" : "border-white/[0.08] bg-[linear-gradient(165deg,var(--color-surface-2),var(--color-night-raised))] group-hover/sb:border-gold-300/50",
                )}
                size={big ? 420 : 260}
              >
                <div className="relative z-[2] flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className={cn("grid place-items-center rounded-xl", big ? "h-11 w-11 bg-[image:var(--gradient-gold-btn)] text-night" : "h-9 w-9 bg-gold-300/10 text-gold-300")}>
                      <Icon name={s.icon} className={big ? "h-5 w-5" : "h-4 w-4"} strokeWidth={1.9} />
                    </span>
                    <Icon name="arrow-up-right" className="h-4 w-4 text-fg-3 transition-[transform,color] duration-[var(--dur-base)] group-hover/sb:-translate-y-0.5 group-hover/sb:translate-x-0.5 group-hover/sb:text-gold-300" />
                  </div>
                  <h3 className={cn("mt-4 font-display font-bold leading-tight tracking-tight text-fg", big ? "text-[clamp(1.25rem,1.05rem+0.8vw,1.625rem)]" : "text-[0.9375rem] sm:text-[1rem]")}>{s.title}</h3>
                  <p className={cn("mt-1 leading-snug text-fg-2", big ? "text-[0.875rem]" : "text-[0.75rem] max-md:hidden")}>{s.text}</p>

                  {tall && (
                    <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                      {s.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-[0.8125rem] leading-snug text-fg">
                          <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-300" strokeWidth={2.6} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}

                  {big && s.kpi && (
                    <div className="mt-auto pt-6">
                      <p className="font-display text-[clamp(2rem,1.6rem+1.6vw,3rem)] font-bold leading-none tracking-[-0.05em] text-gold">{s.kpi.value}</p>
                      <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-3">{s.kpi.label}</p>
                    </div>
                  )}

                  {!big && (
                    <ul className="sb-more mt-auto space-y-1 pt-3 max-md:hidden">
                      {s.details.slice(0, 3).map((d) => (
                        <li key={d} className="flex items-start gap-1.5 text-[0.6875rem] leading-snug text-fg-2">
                          <Icon name="check" className="mt-0.5 h-3 w-3 shrink-0 text-gold-300" strokeWidth={2.6} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Spotlight>
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
