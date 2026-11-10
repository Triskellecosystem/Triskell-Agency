import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";

/** "Prenota una call gratuita": cosa succede nella call, in 3 passi che arrivano da lati diversi, e il pulsante grande. */
export function CallBlock() {
  const { call } = site.agencyPage;
  const { cta } = site;
  const from = ["left", "up", "right"] as const;
  return (
    <Section id="call" labelledBy="call-title">
      {/* sfondo: aurora oro/azzurro che ruota piano, griglia e punti luce (discreto) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="call-aurora absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 [mask-image:radial-gradient(circle,#000_25%,transparent_68%)]" />
      </div>
      <TechBackdrop tone="gold" rich />
      <SectionHeading id="call-title" overline={call.overline} title={call.title} line={call.line} align="center" />
      <div className="relative mt-12 grid gap-5 max-md:mt-8 max-md:gap-3 md:grid-cols-3 md:gap-8">
        <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-[3.25rem] hidden h-[3px] bg-gradient-to-r from-gold-300/0 via-gold-300/70 to-gold-300/0 md:block" />
        {call.points.map((p, i) => (
          <Reveal key={p.title} from={from[i] ?? "up"} blur={0}>
            <div className="relative h-full rounded-card border border-gold-400/30 bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-7 text-center max-md:flex max-md:items-center max-md:gap-4 max-md:p-4 max-md:text-left">
              <span className="relative mx-auto grid h-[4.5rem] w-[4.5rem] max-md:mx-0 max-md:h-14 max-md:w-14 max-md:shrink-0 place-items-center rounded-full border-2 border-gold-300 bg-night text-gold-300 shadow-glow-gold">
                <Icon name={p.icon} className="h-8 w-8" strokeWidth={1.6} />
                <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-gold-300 font-display text-small font-bold text-night">{i + 1}</span>
              </span>
              <div className="max-md:min-w-0">
              <h3 className="mt-5 font-display text-[1.375rem] font-bold tracking-tight text-fg max-md:mt-0 max-md:text-[1.0625rem]">{p.title}</h3>
              <p className="mt-2 text-body text-fg-2 max-md:mt-0.5 max-md:text-[0.9375rem]">{p.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex justify-center max-md:mt-8" from="scale" blur={0}>
        <Button href={cta.href} size="xl" icon="calendar" iconPosition="start" pulse>
          {cta.button}
        </Button>
      </Reveal>
    </Section>
  );
}
