import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

function Tile({ icon, name, text, kind, tag, delay }: { icon: IconName; name: string; text: string; kind: "part" | "optional" | "result"; tag?: string; delay: number }) {
  return (
    <Reveal from="scale" blur={0} delay={delay} className="h-full">
      <div
        className={cn(
          "mf-tile relative flex h-full items-center gap-4 rounded-[1.5rem] border p-4 text-left lg:flex-col lg:gap-0 lg:p-6 lg:text-center",
          kind === "part" && "border-azure-300/40 bg-[linear-gradient(160deg,var(--color-cobalt-700),var(--color-surface))]",
          kind === "optional" && "border-dashed border-line-strong bg-night/40",
          kind === "result" && "mf-result border-gold-300 bg-[linear-gradient(160deg,#3a2c08,var(--color-night-raised)_70%)] shadow-[0_0_50px_-12px_rgb(247_200_92/0.6)]",
        )}
      >
        {tag && <span className="absolute -top-3 right-4 rounded-full lg:right-auto border border-line-strong bg-night px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-fg-2">{tag}</span>}
        <span
          className={cn(
            "grid h-12 w-12 shrink-0 place-items-center rounded-2xl border lg:h-14 lg:w-14",
            kind === "part" && "border-azure-300/60 bg-azure-300/10 text-azure-300",
            kind === "optional" && "border-line-strong text-fg-2",
            kind === "result" && "border-transparent bg-[image:var(--gradient-gold-btn)] text-night shadow-glow-gold",
          )}
        >
          <Icon name={icon} className="h-7 w-7" strokeWidth={1.7} />
        </span>
        <div className="min-w-0"><p className={cn("font-display lg:mt-4 text-[1.1875rem] font-bold leading-tight", kind === "result" ? "text-gold" : "text-fg")}>{name}</p>
        <p className="mt-1 text-[0.875rem] leading-snug text-fg-2 lg:mt-1.5">{text}</p></div>
      </div>
    </Reveal>
  );
}

function Op({ sign, delay }: { sign: "+" | "="; delay: number }) {
  return (
    <Reveal from="scale" blur={0} delay={delay} className="grid place-items-center">
      <span aria-hidden="true" className={cn("mf-op grid h-9 w-9 place-items-center lg:h-11 lg:w-11 rounded-full border-2 font-display text-[1.25rem] font-bold leading-none lg:text-[1.5rem]", sign === "=" ? "border-gold-300 bg-gold-300 text-night" : "border-gold-300/70 text-gold-300")}>
        {sign}
      </span>
    </Reveal>
  );
}

/**
 * La formula del Metodo Triskell: Gestione social + Campagne (+ Sito, se serve) = Più clienti.
 * Le tessere entrano una dopo l'altra, i segni pulsano e una luce scorre lungo la formula.
 */
export function MetodoFormula({ className }: { className?: string }) {
  const f = site.metodo.formula;
  const [a, b] = f.parts;
  return (
    <div className={cn("mf relative", className)} role="group" aria-label={`${a!.name} più ${b!.name}, più ${f.optional.name} se serve, uguale ${f.result.name}`}>
      <span aria-hidden="true" className="mf-beam absolute left-0 right-0 top-1/2 hidden h-[2px] -translate-y-1/2 lg:block" />
      <div className="relative grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_0.85fr_auto_1fr] lg:gap-4">
        <Tile {...a!} kind="part" delay={0} />
        <Op sign="+" delay={0.15} />
        <Tile {...b!} kind="part" delay={0.25} />
        <Op sign="+" delay={0.4} />
        <Tile {...f.optional} kind="optional" delay={0.5} />
        <Op sign="=" delay={0.65} />
        <Tile {...f.result} kind="result" delay={0.75} />
      </div>
    </div>
  );
}
