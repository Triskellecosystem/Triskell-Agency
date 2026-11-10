import Link from "next/link";
import { site, type CtaContent } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Fascia "Prenota ora": la domanda con subito accanto il pulsante scuro che lampeggia, e sotto i tre vantaggi.
 * Striscia oro compatta con un riflesso che la attraversa. Su telefono si impila.
 */
export function CtaBand({ content }: { content: CtaContent }) {
  const { cta } = site;
  return (
    <section aria-label={content.title} className="relative isolate py-[clamp(1.25rem,2.5vw,2rem)]">
      <div className="container-x">
        <Reveal y={20} blur={0} from="scale">
          <div className="cta-gold relative mx-auto max-w-5xl overflow-hidden rounded-[1.25rem] px-5 py-5 sm:px-8 sm:py-6">
            <span aria-hidden="true" className="cta-gold-shine" />
            <div className="relative flex flex-wrap items-center gap-x-6 gap-y-3">
              <h2 className="font-display text-[clamp(1.25rem,1rem+1vw,1.875rem)] font-bold leading-[1.1] tracking-[-0.03em] text-night">
                {content.lines[0]} <span className="italic text-night/70">{content.lines[1]}</span>
              </h2>
              <Link href={cta.href} className="cta-btn group/cb relative inline-flex shrink-0 items-center gap-2 rounded-full bg-night py-2.5 pl-5 pr-2.5 font-display text-[0.9375rem] font-bold text-fg shadow-[0_14px_30px_-12px_rgb(1_15_28/0.8)] transition-transform duration-[var(--dur-base)] hover:scale-[1.05]">
                {cta.button}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night">
                  <Icon name="arrow-up-right" className="cta-arrow h-4 w-4" strokeWidth={2.4} />
                </span>
              </Link>
            </div>
            <div className="relative mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-[0.8125rem] font-medium text-night/75">{content.text}</p>
              <ul className="flex flex-wrap gap-1.5">
                {cta.perks.map((p) => (
                  <li key={p.label} className="inline-flex items-center gap-1.5 rounded-full border border-night/15 bg-night/[0.06] px-2.5 py-1 text-[0.6875rem] font-semibold text-night">
                    <Icon name={p.icon} className="h-3 w-3" strokeWidth={2.4} />
                    {p.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
