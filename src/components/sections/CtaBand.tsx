import Link from "next/link";
import { site, type CtaContent } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Scarcity } from "@/components/ui/Scarcity";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Fascia "Prenota ora", leggera: riquadro di vetro scuro con un filo d'oro sottile, la domanda, il pulsante oro che
 * lampeggia al centro, i vantaggi in piccolo e l'avviso dei posti limitati. Compatta, non ingombra.
 */
export function CtaBand({ content }: { content: CtaContent }) {
  const { cta } = site;
  return (
    <section aria-label={content.title} className="relative isolate py-[clamp(1rem,2vw,1.75rem)]">
      <div className="container-x">
        <Reveal y={16} blur={0}>
          <div className="cta-soft relative mx-auto max-w-2xl overflow-hidden rounded-[1.25rem] border border-gold-300/25 bg-[linear-gradient(160deg,rgb(13_39_61/0.75),rgb(2_18_33/0.85))] px-5 py-6 text-center backdrop-blur-md sm:px-8">
            <span aria-hidden="true" className="cta-soft-line" />
            <div className="relative flex flex-col items-center">
              <h2 className="font-display text-[clamp(1.1875rem,1rem+0.8vw,1.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-fg">
                {content.lines[0]} <span className="text-gold">{content.lines[1]}</span>
              </h2>
              <p className="mt-1 text-[0.8125rem] text-fg-3">{content.text}</p>
              <Link href={cta.href} className="cta-btn group/cb relative mt-4 inline-flex items-center gap-2.5 rounded-full bg-[image:var(--gradient-gold-btn)] py-2.5 pl-6 pr-2.5 font-display text-[0.9375rem] font-bold text-night shadow-[0_12px_30px_-12px_rgb(247_200_92/0.7)] transition-transform duration-[var(--dur-base)] hover:scale-[1.05]">
                {cta.button}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-night text-gold-200">
                  <Icon name="arrow-up-right" className="cta-arrow h-4 w-4" strokeWidth={2.4} />
                </span>
              </Link>
              <ul className="mt-3.5 flex flex-wrap justify-center gap-x-4 gap-y-1">
                {cta.perks.map((p) => (
                  <li key={p.label} className="inline-flex items-center gap-1.5 text-[0.6875rem] font-medium text-fg-2">
                    <Icon name={p.icon} className="h-3 w-3 text-gold-300" strokeWidth={2.4} />
                    {p.label}
                  </li>
                ))}
              </ul>
              <Scarcity className="mt-3.5" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
