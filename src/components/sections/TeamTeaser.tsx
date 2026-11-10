import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tilt } from "@/components/ui/Tilt";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

/** Chi siamo, in breve: la foto vera dei due fondatori (inclinabile al mouse) con le etichette, tre numeri e il link alla pagina. */
export function TeamTeaser() {
  const t = site.team;
  return (
    <Section id="chi-siamo" labelledBy="team-teaser-title">
      <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-12">
        <Reveal from="left" blur={0} className="lg:col-span-6">
          <Tilt max={6}>
            <div className="team-frame relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-gold-400/40 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.85)]">
              <Image src="/team/duo.webp" alt="Tomaso Forno e William Argintieri alla scrivania" fill sizes="(min-width: 1024px) 36rem, 94vw" className="team-kenburns object-cover" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent" />
              <span aria-hidden="true" className="ti-sweep team-sweep" />
              <div className="absolute inset-x-4 bottom-4 flex justify-between gap-3">
                {t.people.map((p) => (
                  <span key={p.name} className={cn("rounded-2xl border bg-night/75 px-3.5 py-2 backdrop-blur-md", p.tone === "azure" ? "border-azure-300/60" : "border-ember-300/60 text-right")}>
                    <span className="block font-display text-[0.9375rem] font-bold leading-tight text-fg sm:text-[1.0625rem]">{p.name}</span>
                    <span className={cn("block text-[0.625rem] font-semibold uppercase tracking-[0.12em] sm:text-[0.6875rem]", p.tone === "azure" ? "text-azure-300" : "text-ember-300")}>{p.role}</span>
                  </span>
                ))}
              </div>
            </div>
          </Tilt>
        </Reveal>

        <div className="lg:col-span-6">
          <SectionHeading id="team-teaser-title" overline={t.overline} title={t.title} line={t.line} />
          <Reveal y={16} blur={0} delay={0.2}>
            <dl className="mt-8 grid grid-cols-3 border-y border-line py-5">
              {t.stats.map((s, i) => (
                <div key={s.label} className={i > 0 ? "border-l border-line pl-4 sm:pl-6" : "pr-2"}>
                  <dd className="font-display text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] font-bold leading-none tracking-[-0.04em]">
                    <CountUp {...s} className="text-gold" />
                  </dd>
                  <dt className="mt-1.5 text-[0.8125rem] text-fg-2">{s.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <Button href={t.cta.href} size="lg" variant="secondary" icon="arrow-right">
                {t.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
