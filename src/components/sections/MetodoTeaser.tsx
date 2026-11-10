import { site } from "@/content/site";
import { demoProfiles } from "@/content/demo-profiles";
import { Button } from "@/components/ui/Button";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { MetodoFormula } from "./MetodoFormula";
import { PhoneProfile } from "./PhoneProfile";

/**
 * Il Metodo Triskell in home: "Metodo Triskell" in grande, "Social + Campagne" sotto, la formula a schema,
 * tre numeri chiave e i pulsanti; a destra il telefono con un profilo inventato che cresce mentre la campagna gira.
 */
export function MetodoTeaser() {
  const m = site.metodo;
  return (
    <section id="metodo-triskell" aria-labelledby="metodo-triskell-title" className="mt-section relative isolate overflow-hidden py-[clamp(3rem,1.8rem+3.6vw,5.25rem)]">
      <TechBackdrop tone="gold" cursor />
      <div className="container-x grid items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <Reveal blur={0} y={12}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-fg-3">{m.overline}</p>
          </Reveal>
          <Reveal blur={6} y={20}>
            <h2 id="metodo-triskell-title" className="mt-3 font-display text-[clamp(2.5rem,1.6rem+3.4vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-fg">
              Metodo <span className="text-gold">Triskell</span>
            </h2>
            <p className="mt-3 font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold tracking-[-0.02em] text-fg-2">
              Social <span className="text-gold-300">+</span> Campagne
            </p>
          </Reveal>
          <Reveal delay={0.15} y={14} blur={0}>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-fg-2">{m.line}</p>
            <MetodoFormula className="mt-6" />
          </Reveal>
          <Reveal delay={0.25} y={14} blur={0}>
            <dl className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-4">
              {m.facts.map((f) => (
                <div key={f.label} className="px-3 first:pl-0">
                  <dd className="whitespace-nowrap font-display text-[1.375rem] font-bold leading-none tracking-[-0.04em] text-gold sm:text-[1.75rem]">
                    {f.value}
                    <span className="mt-1 block text-[0.75rem] font-semibold tracking-normal text-fg sm:ml-1 sm:mt-0 sm:inline sm:text-[0.8125rem]">{f.unit}</span>
                  </dd>
                  <dt className="mt-1 text-[0.6875rem] text-fg-3">{f.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={m.homeCta.href} size="md" icon="arrow-right">
                {m.homeCta.label}
              </Button>
              <Button href="/contatti" size="md" variant="secondary" icon="calendar" iconPosition="start">
                Prenota una call gratuita
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal from="right" blur={0} className="relative">
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(225_48_108/0.16),rgb(247_200_92/0.1)_40%,transparent_70%)] blur-2xl" />
          <PhoneProfile profile={demoProfiles[0]!} campaign />
        </Reveal>
      </div>
    </section>
  );
}
