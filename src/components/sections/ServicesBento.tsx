import Link from "next/link";
import type { Service } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const COLORS = ["#f7c85c", "#e1306c", "#3aa4d4", "#a78bfa", "#7fe0a0", "#22d3ee", "#fb923c", "#f472b6"];

/**
 * Servizi come carte che si girano: davanti numero, icona grande e titolo, con il bordo del proprio colore; passando
 * il mouse (o toccando) la carta ruota in 3D e dietro mostra cosa facciamo, il risultato tipico e il link.
 * Tutte della stessa misura, in ordine.
 */
export function ServicesBento({ items }: { items: Service[] }) {
  return (
    <RevealGroup className="grid gap-3 max-md:grid-cols-2 md:grid-cols-4" stagger={0.07}>
      {items.map((s, i) => {
        const c = COLORS[i % COLORS.length];
        return (
          <RevealItem key={s.title} y={22} className="h-full">
            <Link href={s.href ?? "/contatti"} className="fc group/fc block aspect-[4/3.4] [perspective:1200px]" style={{ "--c": c } as React.CSSProperties}>
              <span className="fc-inner relative block h-full w-full [transform-style:preserve-3d]">
                {/* fronte */}
                <span className="fc-face fc-front absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.125rem] p-4 sm:p-5">
                  <span className="flex items-start justify-between">
                    <span className="font-mono text-[0.75rem] font-bold" style={{ color: c }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon name="arrow-up-right" className="h-4 w-4 text-white/40" />
                  </span>
                  <span className="fc-ico mx-auto grid h-16 w-16 place-items-center rounded-2xl sm:h-20 sm:w-20" style={{ background: `color-mix(in srgb, ${c} 16%, transparent)`, color: c, boxShadow: `0 0 40px -10px ${c}` }}>
                    <Icon name={s.icon} className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block font-display text-[0.9375rem] font-bold leading-tight text-fg sm:text-[1.0625rem]">{s.title}</span>
                    <span className="mt-2 block h-[2px] w-8 rounded-full" style={{ background: c }} />
                  </span>
                </span>
                {/* retro */}
                <span className="fc-face fc-back absolute inset-0 flex flex-col overflow-hidden rounded-[1.125rem] p-4 sm:p-5">
                  <span className="block font-display text-[0.9375rem] font-bold text-night">{s.title}</span>
                  <span className="mt-2 block space-y-1">
                    {s.details.slice(0, 3).map((d) => (
                      <span key={d} className="flex items-start gap-1.5 text-[0.75rem] font-medium leading-snug text-night/85">
                        <Icon name="check" className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={3} />
                        {d}
                      </span>
                    ))}
                  </span>
                  {s.kpi && (
                    <span className="mt-auto block">
                      <span className="block font-display text-[1.5rem] font-bold leading-none tracking-[-0.04em] text-night">{s.kpi.value}</span>
                      <span className="block text-[0.625rem] font-semibold uppercase tracking-wider text-night/70">{s.kpi.label}</span>
                    </span>
                  )}
                </span>
              </span>
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
