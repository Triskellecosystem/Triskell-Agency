import Link from "next/link";
import { site, type CtaContent } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Fascia "Prenota ora" di Triskell Agency: un blocco oro pieno (testo scuro) che rompe il ritmo scuro della pagina.
 * A sinistra il titolo in due righe che entrano dai lati, a destra un pulsante rotondo scuro con la scritta che
 * gira attorno (call gratuita · 30 minuti · nessun impegno). Un riflesso attraversa la fascia.
 */
export function CtaBand({ content }: { content: CtaContent }) {
  const { cta } = site;
  const pathId = `cta-${content.lines[0].toLowerCase().replace(/[^a-z]+/g, "-")}`;
  const ring = `${cta.perks.map((p) => p.label).join(" · ")} · `.toUpperCase();
  return (
    <section aria-label={content.title} className="relative isolate py-[clamp(1.5rem,3vw,2.5rem)]">
      <div className="container-x">
        <Reveal y={26} blur={0} from="scale">
          <div className="cta-gold relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
            <span aria-hidden="true" className="cta-gold-shine" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
              <div>
                <h2 className="font-display text-[clamp(1.875rem,1.2rem+2.6vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-night">
                  <Reveal as="span" from="far-left" blur={0} className="block">
                    {content.lines[0]}
                  </Reveal>
                  <Reveal as="span" from="far-right" blur={0} delay={0.15} className="block italic text-night/75">
                    {content.lines[1]}
                  </Reveal>
                </h2>
                <p className="mt-3 max-w-lg text-[1.0625rem] font-medium leading-snug text-night/80">{content.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cta.perks.map((p) => (
                    <li key={p.label} className="inline-flex items-center gap-1.5 rounded-full border border-night/20 bg-night/[0.06] px-3 py-1 text-[0.8125rem] font-semibold text-night">
                      <Icon name={p.icon} className="h-3.5 w-3.5" strokeWidth={2.2} />
                      {p.label}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={cta.href} className="cta-round group/cr relative mx-auto grid h-40 w-40 shrink-0 place-items-center rounded-full bg-night text-gold-200 shadow-[0_20px_50px_-15px_rgb(1_15_28/0.8)] sm:h-44 sm:w-44 lg:mx-0">
                <svg aria-hidden="true" viewBox="0 0 200 200" className="cta-ring absolute inset-0 h-full w-full">
                  <defs>
                    <path id={pathId} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                  </defs>
                  <text className="fill-current text-[13px] font-semibold tracking-[0.18em]">
                    <textPath href={`#${pathId}`}>{ring}</textPath>
                  </text>
                </svg>
                <span className="relative flex flex-col items-center gap-1 font-display text-[1.0625rem] font-bold text-fg">
                  <Icon name="arrow-up-right" className="h-7 w-7 text-gold-300 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/cr:-translate-y-1 group-hover/cr:translate-x-1" strokeWidth={2} />
                  {cta.button}
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
