import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DigitalCursor } from "@/components/motion/DigitalCursor";
import { HeroBoard } from "./HeroBoard";

/**
 * Hero di Triskell Agency: tutto centrato. Etichetta, domanda (bianco + oro), una riga, due pulsanti e tre garanzie;
 * sotto, la dashboard con i numeri veri che crescono e le notifiche dal vivo. Sfondo proprio: aurora oro/azzurra
 * che si muove piano, griglia di puntini e un orizzonte curvo luminoso (niente pavimento in prospettiva).
 */
export function AgencyHero() {
  const { hero } = site;
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-[clamp(2.5rem,5vw,4.5rem)] pt-[calc(var(--header-h)+clamp(2rem,6vh,4.5rem))]">
      <div aria-hidden="true" className="ah-bg absolute inset-0 -z-10">
        <span className="ah-aurora ah-aurora--a" />
        <span className="ah-aurora ah-aurora--b" />
        <span className="ah-dots" />
        <span className="ah-horizon" />
      </div>
      <DigitalCursor className="-z-10" />

      <div className="container-x text-center">
        <p className="mx-auto inline-flex animate-[fade-in_0.8s_var(--ease-soft)_both] items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-fg-2 backdrop-blur">
          <span className="rounded-full bg-[image:var(--gradient-gold-btn)] px-2 py-0.5 text-[0.625rem] font-bold text-night">NEW</span>
          {hero.overline}
        </p>

        <h1 id="hero-title" className="mx-auto mt-6 max-w-3xl animate-[line-up_1s_var(--ease-out-expo)_backwards] font-display text-hero text-fg">
          {hero.title} <span className="text-gold">{hero.titleAccent}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg animate-[fade-in_0.8s_0.35s_var(--ease-soft)_both] text-lead text-fg-2 [text-wrap:balance]">{hero.subtitle}</p>

        <div className="mt-7 flex animate-[fade-in_0.8s_0.5s_var(--ease-soft)_both] flex-wrap items-center justify-center gap-3">
          <Button href={hero.primaryCta.href} size="md" icon="calendar" iconPosition="start" pulse>
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary" size="md" icon="arrow-right">
            {hero.secondaryCta.label}
          </Button>
        </div>
        <ul className="mt-4 flex animate-[fade-in_0.8s_0.6s_var(--ease-soft)_both] flex-wrap justify-center gap-x-5 gap-y-1 text-[0.75rem] text-fg-3">
          {hero.trust.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-3.5 w-3.5 text-gold-300" strokeWidth={2.4} />
              {t}
            </li>
          ))}
        </ul>

        <div className="ah-board relative mx-auto mt-12 max-w-5xl animate-[fade-in_1s_0.7s_var(--ease-soft)_both]">
          <span aria-hidden="true" className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_30%,rgb(247_200_92/0.18),transparent_70%)] blur-2xl" />
          <HeroBoard />
        </div>
      </div>
    </section>
  );
}
