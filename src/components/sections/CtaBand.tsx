import Link from "next/link";
import { site, type CtaContent } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Scarcity } from "@/components/ui/Scarcity";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Fascia "Prenota ora" orizzontale e proporzionata: a sinistra la domanda (grande) e una riga, a destra il pulsante
 * oro che lampeggia; sotto, sulla stessa riga, i vantaggi e l'avviso dei posti limitati. Senza `content` diventa la
 * versione semplice: solo il pulsante "Prenota la call gratuita", i vantaggi e l'avviso.
 */
export function CtaBand({ content }: { content?: CtaContent }) {
  const { cta } = site;
  const perks = (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
      {cta.perks.map((p) => (
        <li key={p.label} className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-fg-2">
          <Icon name={p.icon} className="h-3.5 w-3.5 text-gold-300" strokeWidth={2.4} />
          {p.label}
        </li>
      ))}
    </ul>
  );
  const button = (label: string) => (
    <Link href={cta.href} className="cta-btn group/cb relative inline-flex shrink-0 items-center gap-3 rounded-full bg-[image:var(--gradient-gold-btn)] py-3 pl-7 pr-3 font-display text-[1.0625rem] font-bold text-night shadow-[0_12px_30px_-12px_rgb(247_200_92/0.7)] transition-transform duration-[var(--dur-base)] hover:scale-[1.04]">
      {label}
      <span className="grid h-9 w-9 place-items-center rounded-full bg-night text-gold-200">
        <Icon name="arrow-up-right" className="cta-arrow h-4 w-4" strokeWidth={2.4} />
      </span>
    </Link>
  );
  return (
    <section aria-label={content?.title ?? "Prenota la call gratuita"} className="relative isolate py-[clamp(1rem,2vw,1.75rem)]">
      <div className="container-x">
        <Reveal y={16} blur={0}>
          <div className={cn("cta-soft relative mx-auto overflow-hidden rounded-[1.25rem] border border-gold-300/25 bg-[linear-gradient(160deg,rgb(13_39_61/0.75),rgb(2_18_33/0.85))] px-5 py-5 sm:px-8", content ? "max-w-5xl" : "max-w-3xl text-center")}>
            <span aria-hidden="true" className="cta-soft-line" />
            {content ? (
              <div className="relative">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <h2 className="font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-fg">
                      {content.lines[0]} <span className="text-gold">{content.lines[1]}</span>
                    </h2>
                    <p className="mt-1 text-[0.875rem] text-fg-2">{content.text}</p>
                  </div>
                  {button(cta.button)}
                </div>
                <div className="mt-4 flex flex-col gap-2.5 border-t border-white/[0.07] pt-3.5 lg:flex-row lg:items-center lg:justify-between">
                  {perks}
                  <Scarcity />
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col items-center gap-3.5">
                {button("Prenota la call gratuita")}
                <Scarcity />
                {perks}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
