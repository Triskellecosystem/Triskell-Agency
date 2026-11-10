import { cn } from "@/lib/cn";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";

interface SectionProps {
  id: string;
  /** id dell'heading, per aria-labelledby */
  labelledBy?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

/** Contenitore di sezione: padding verticale fluido, ancora con scroll-margin per l'header. */
export function Section({ id, labelledBy, className, innerClassName, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative isolate py-[clamp(3rem,1.8rem+3.6vw,5.25rem)]", className)}>
      <span aria-hidden="true" className="sec-divider pointer-events-none absolute inset-x-0 top-0 h-px" />
      <div className={cn("container-x", innerClassName)}>{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  overline: string;
  title: string;
  line?: string;
  align?: "left" | "center";
  className?: string;
  /** Il titolo resta su una sola riga da tablet in su. */
  oneLine?: boolean;
}

/** Ordine visivo identico in tutta la home: overline → titolo (max 6 parole) → 1 riga. */
export function SectionHeading({ id, overline, title, line, align = "left", className, oneLine }: SectionHeadingProps) {
  return (
    <header className={cn(oneLine ? "max-w-none" : "max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal blur={0} y={12}>
        {/* Etichetta "Agency": pillola con punto oro che pulsa (diversa dal filetto del sito Ecosystem) */}
        <p className={cn("ag-chip mb-4 inline-flex items-center gap-2.5 rounded-full border border-gold-400/40 bg-gold-300/[0.06] py-1 pl-1.5 pr-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-300", align === "center" && "mx-auto")}>
          <span aria-hidden="true" className="ag-chip-dot relative grid h-4 w-4 place-items-center">
            <span className="absolute inset-0 rounded-full bg-gold-300/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
          </span>
          {overline}
        </p>
      </Reveal>
      <SplitReveal id={id} text={title} as="h2" className={cn("text-h2 text-fg", oneLine && "sm:whitespace-nowrap")} />
      {line && (
        <Reveal delay={0.25} blur={4} y={14}>
          <p className="mt-3.5 max-w-xl text-lead text-fg-2">{line}</p>
        </Reveal>
      )}
    </header>
  );
}
