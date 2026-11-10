import Link from "next/link";
import { site, type CtaContent } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Scarcity } from "@/components/ui/Scarcity";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Fascia "Prenota ora": tutto centrato — la domanda, il pulsante scuro che lampeggia subito sotto, i vantaggi e
 * l'avviso dei posti limitati. Striscia oro compatta con un riflesso che la attraversa.
 */
export function CtaBand({ content }: { content: CtaContent }) {
  const { cta } = site;
  return (
    <section aria-label={content.title} className="relative isolate py-[clamp(1.25rem,2.5vw,2rem)]">
      <div className="container-x">
        <Reveal y={20} blur={0} from="scale">
          <div className="cta-gold relative mx-auto max-w-3xl overflow-hidden rounded-[1.25rem] px-5 py-6 text-center sm:px-10 sm:py-7">
            <span aria-hidden="true" className="cta-gold-shine" />
            <div className="relative flex flex-col items-center">
              <h2 className="font-display text-[clamp(1.375rem,1.05rem+1.2vw,2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-night">
                {content.lines[0]} <span className="italic text-night/70">{content.lines[1]}</span>
              </h2>
              <p className="mt-1.5 text-[0.875rem] font-medium text-night/75">{content.text}</p>
              <Link href={cta.href} className="cta-btn group/cb relative mt-5 inline-flex items-center gap-3 rounded-full bg-night py-3 pl-7 pr-3 font-display text-[1.0625rem] font-bold text-fg shadow-[0_14px_30px_-12px_rgb(1_15_28/0.8)] transition-transform duration-[var(--dur-base)] hover:scale-[1.05]">
                {cta.button}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night">
                  <Icon name="arrow-up-right" className="cta-arrow h-5 w-5" strokeWidth={2.4} />
                </span>
              </Link>
              <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
                {cta.perks.map((p) => (
                  <li key={p.label} className="inline-flex items-center gap-1.5 rounded-full border border-night/15 bg-night/[0.06] px-2.5 py-1 text-[0.6875rem] font-semibold text-night">
                    <Icon name={p.icon} className="h-3 w-3" strokeWidth={2.4} />
                    {p.label}
                  </li>
                ))}
              </ul>
              <Scarcity dark className="mt-3" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
