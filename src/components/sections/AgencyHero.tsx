import { site } from "@/content/site";
import { LogoMark } from "@/components/brand/LogoMark";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CountUp } from "@/components/motion/CountUp";
import { HeroBackdrop } from "./HeroBackdrop";
import { SocialMock } from "./SocialMock";

/**
 * Hero dell'agenzia: a sinistra la domanda che aggancia ("Vuoi più clienti per la tua attività?"), la promessa in oro,
 * due pulsanti e tre numeri che crescono; a destra il telefono con profilo e campagne che lavorano dal vivo, con
 * badge che fluttuano attorno. Sfondo scenico della home Ecosystem (pavimento digitale, lastre, effetto al mouse).
 */
export function AgencyHero() {
  const { hero } = site;
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-[clamp(2rem,4vw,3.5rem)] pt-[calc(var(--header-h)+clamp(1.5rem,5vh,4rem))]"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[image:var(--gradient-bg-hero)]" />
      <HeroBackdrop />

      <div className="container-x grid items-center gap-x-8 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mb-6 inline-flex animate-[fade-in_0.8s_var(--ease-soft)_both] items-center gap-3 text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-fg-2">
            <span aria-hidden="true" className="h-px w-8 bg-gold-400/70 max-md:hidden" />
            <LogoMark aria-hidden="true" size={44} sizes="44px" className="hero-emblem relative h-11 w-11 shrink-0 drop-shadow-[0_6px_14px_rgb(0_0_0/0.55)] md:hidden" />
            <span>{hero.overline}</span>
          </p>

          {/* Un unico blocco di testo: resta il candidato LCP. Al passaggio del mouse le parole si accendono d'oro. */}
          <h1 id="hero-title" className="text-hero animate-[line-up_1s_var(--ease-out-expo)_backwards] text-fg">
            {hero.titleLines.map((line) => (
              <span key={line}>
                {line.split(" ").map((word, i, all) => (
                  <span key={`${line}-${i}`} className="hero-word">
                    {word}
                    {i < all.length - 1 ? " " : ""}
                  </span>
                ))}
                <br />
              </span>
            ))}
            <span className="mt-4 block max-w-[30ch] text-[0.5em] leading-[1.14] tracking-[-0.025em] [text-wrap:balance]">
              {hero.titleAccent.split(" ").map((word, i, all) => (
                <span key={`accent-${i}`} className="hero-word hero-word--gold text-gold">
                  {word}
                  {i < all.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-7 max-w-xl animate-[fade-in_0.8s_0.45s_var(--ease-soft)_both] text-lead text-fg-2">
            {hero.subtitleLines.map((l) => (
              <span key={l} className="block [text-wrap:balance]">
                {l}
              </span>
            ))}
          </p>

          <div className="mt-9 flex animate-[fade-in_0.8s_0.55s_var(--ease-soft)_both] flex-wrap items-center gap-4">
            <Button href={hero.primaryCta.href} size="lg" icon="calendar" iconPosition="start" pulse>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg" icon="arrow-right">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <dl className="mt-12 grid max-w-xl animate-[fade-in_0.8s_0.65s_var(--ease-soft)_both] grid-cols-3 border-t border-line pt-6">
            {hero.keyNumbers.map((n, i) => (
              <div key={n.label} className={`flex flex-col ${i > 0 ? "border-l border-line pl-4 sm:pl-6" : "pr-2"}`}>
                <dt className="order-2 mt-1.5 text-[0.8125rem] leading-snug text-fg-2 sm:text-small">{n.label}</dt>
                <dd className="order-1 font-display text-[clamp(1.625rem,1.1rem+2vw,2.75rem)] font-bold leading-none tracking-[-0.04em]">
                  <CountUp {...n} className="text-gold" />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative max-md:hidden lg:col-span-5">
          <div className="relative mx-auto max-w-[26rem]">
            <SocialMock />
            {hero.floating.map((b, i) => (
              <div key={b.label} aria-hidden="true" className={`hero-chip hero-chip--${i}`}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-gold-400/50 bg-gold-300/10 text-gold-300">
                  <Icon name={b.icon} className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.8} />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="font-display text-[1.125rem] font-bold text-fg">{b.value}</span>
                  <span className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-2">{b.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
