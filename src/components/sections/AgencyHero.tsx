import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DigitalCursor } from "@/components/motion/DigitalCursor";
import { Stage3D } from "@/components/ui/Stage3D";
import { Scarcity } from "@/components/ui/Scarcity";
import { HeroNumbers } from "./HeroNumbers";
import { LivePhone } from "./LivePhone";

/**
 * Hero di Triskell Agency: testo a sinistra (etichetta, domanda, una riga, pulsanti, garanzie, numeri che crescono),
 * colonna destra lasciata libera per un elemento visivo da aggiungere. Sfondo: aurora, puntini, orizzonte curvo.
 */
export function AgencyHero() {
  const { hero } = site;
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(2.5rem,8vh,6rem))]">
      <div aria-hidden="true" className="ah-bg absolute inset-0 -z-10">
        <span className="ah-aurora ah-aurora--a" />
        <span className="ah-aurora ah-aurora--b" />
        <span className="ah-dots" />
        <span className="ah-floor"><span className="ah-floor-grid" /></span>
      </div>
      <DigitalCursor className="-z-10" />
      <Stage3D kind="soft" className="opacity-80" />
      <div aria-hidden="true" className="hero-room pointer-events-none absolute inset-0 -z-10"><span /></div>

      <div className="container-x grid items-center gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="inline-flex animate-[fade-in_0.8s_var(--ease-soft)_both] items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-fg-2 backdrop-blur">
            <span className="rounded-full bg-[image:var(--gradient-gold-btn)] px-2 py-0.5 text-[0.625rem] font-bold text-night">NEW</span>
            {hero.overline}
          </p>

          <h1 id="hero-title" className="mt-6 max-w-2xl animate-[line-up_1s_var(--ease-out-expo)_backwards] font-display text-hero text-fg">
            {hero.title} <span className="text-gold">{hero.titleAccent}</span>
          </h1>
          <p className="mt-4 max-w-md animate-[fade-in_0.8s_0.35s_var(--ease-soft)_both] text-lead text-fg-2">{hero.subtitle}</p>

          <div className="mt-7 flex animate-[fade-in_0.8s_0.5s_var(--ease-soft)_both] flex-wrap items-center gap-3">
            <Button href={hero.primaryCta.href} size="md" icon="calendar" iconPosition="start" pulse>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="md" icon="arrow-right">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <Scarcity className="mt-4 animate-[fade-in_0.8s_0.6s_var(--ease-soft)_both]" />
          <ul className="mt-3 flex animate-[fade-in_0.8s_0.6s_var(--ease-soft)_both] flex-wrap gap-x-5 gap-y-1 text-[0.75rem] text-fg-3">
            {hero.trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Icon name="check" className="h-3.5 w-3.5 text-gold-300" strokeWidth={2.4} />
                {t}
              </li>
            ))}
          </ul>

          <HeroNumbers items={hero.keyNumbers} />
          <div className="mt-12 lg:hidden">
            <LivePhone compact />
          </div>
        </div>

        <div className="hidden lg:col-span-6 lg:block">
          <LivePhone />
        </div>
      </div>
    </section>
  );
}
