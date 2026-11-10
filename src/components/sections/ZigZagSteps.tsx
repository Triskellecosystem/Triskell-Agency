import type { Path } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { ScrollFill, ScrollSlide } from "@/components/motion/ScrollSlide";

/**
 * Percorso a zig-zag: gli step arrivano a turno da fuori schermo, da sinistra e da destra (entrano mentre scorri),
 * e si agganciano a una linea centrale, componendo il tutto. Nel percorso azzurro (Academy) i nodi sono oro,
 * per un tocco di calore. Su mobile: una colonna, linea a sinistra.
 */
export function ZigZagSteps({ path, tone }: { path: Path; tone: "gold" | "azure" }) {
  const gold = tone === "gold";
  const accent = gold ? "text-gold-300 border-gold-400/70" : "text-azure-300 border-azure-400/70";
  // nodi: oro anche nel percorso azzurro
  const node = "text-gold-300 border-gold-300";
  const conn = "bg-gold-300/80";

  return (
    <ol className="zz relative mx-auto max-w-5xl">
      <span aria-hidden="true" className="absolute bottom-3 left-[1.375rem] top-3 w-[3px] rounded-full bg-line md:left-1/2 md:-translate-x-1/2" />
      <div aria-hidden="true" className="absolute bottom-3 left-[1.375rem] top-3 w-[3px] md:left-1/2 md:-translate-x-1/2">
        <ScrollFill className={cn("block h-full w-full rounded-full bg-gradient-to-b from-gold-200 via-gold-300 to-gold-400 shadow-[0_0_16px_2px_rgb(247_200_92/0.5)]")} />
      </div>
      {path.steps.map((step, i) => {
        const left = i % 2 === 0;
        return (
          <li key={step.title} className="relative grid items-center py-3 max-md:py-2 md:grid-cols-2 md:gap-x-16 md:py-5">
            {/* nodo sulla linea */}
            <div className="absolute left-[1.375rem] top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 md:left-1/2"><ScrollSlide from="pop">
              <span className={cn("relative grid h-12 w-12 place-items-center rounded-full border-2 bg-night font-display text-small font-bold shadow-glow-gold", node)}>
                <span aria-hidden="true" className={cn("btn-ping absolute inset-0 rounded-full border", node)} style={{ animationDelay: `${i * 0.35}s` }} />
                {String(i + 1).padStart(2, "0")}
              </span>
            </ScrollSlide></div>

            {/* card che arriva dal lato, legata allo scroll: da fuori schermo fino al numero centrale */}
            <ScrollSlide from={left ? "left" : "right"} className={cn("pl-14 md:pl-0", left ? "md:col-start-1" : "md:col-start-2")}>
              <div
                className={cn(
                  "group/zz relative rounded-card border bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-6 max-md:p-4 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo sm:p-7",
                  gold ? "border-gold-400/30 hover:border-gold-300/70 hover:shadow-[0_0_40px_-12px_rgb(247_200_92/0.5)]" : "border-azure-400/30 hover:border-azure-300/70 hover:shadow-[0_0_40px_-12px_rgb(42_144_195/0.55)]",
                  left && "md:text-right",
                )}
              >
                {!gold && <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/70 to-transparent" />}
                {/* collegamento alla linea */}
                <span aria-hidden="true" className={cn("absolute top-1/2 h-[3px] w-10 -translate-y-1/2 -left-10", conn, left ? "md:-right-8 md:left-auto md:w-8" : "md:-left-8 md:w-8")} />
                <div className={cn("flex items-start gap-4", left && "md:flex-row-reverse")}>
                  <span className={cn("grid h-14 w-14 max-md:h-11 max-md:w-11 shrink-0 place-items-center rounded-2xl border bg-night/60 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/zz:scale-110", accent)}>
                    <Icon name={step.icon} className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-bold tracking-tight text-fg max-md:text-[1.0625rem]">{step.title}</h3>
                    <p className="mt-1.5 text-[1.0625rem] leading-snug text-fg-2 max-md:mt-0.5 max-md:text-[0.9375rem]">{step.text}</p>
                  </div>
                </div>
              </div>
            </ScrollSlide>
          </li>
        );
      })}
    </ol>
  );
}
