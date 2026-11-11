import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { MetodoEquation } from "./MetodoEquation";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LightRays } from "@/components/ui/LightRays";

/** Il Metodo Triskell in home: titolo grande, l'equazione Social + Campagne (+ Sito) = Più clienti, i tre numeri in grande e i pulsanti. */
export function MetodoTeaser() {
  const m = site.metodo;
  const nums = [
    { value: 6, prefix: "", unit: "mesi", label: "Collaborazione minima", icon: "calendar" as IconName },
    { value: 12, prefix: "", unit: "contenuti", label: "Al mese, 3 a settimana", icon: "layers" as IconName },
    { value: 5, prefix: "4–", unit: "campagne", label: "Al mese, Meta e Google", icon: "target" as IconName },
  ];
  return (
    <section id="metodo-triskell" aria-labelledby="metodo-triskell-title" className="mt-band relative isolate overflow-hidden py-[clamp(3.5rem,2rem+4vw,6rem)]">
      <SectionGlow />
      <LightRays x={78} y={42} size={40} />
      <div className="container-x">
        <Reveal blur={6} y={18} className="text-center">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold-300">{m.overline}</p>
          <h2 id="metodo-triskell-title" className="mt-2 font-display text-[clamp(2.75rem,1.8rem+4vw,5.25rem)] font-bold leading-[0.92] tracking-[-0.05em] text-fg">
            Metodo <span className="text-gold">Triskell</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] text-fg-2">{m.line}</p>
        </Reveal>

        <Reveal y={10} blur={0} className="mt-10">
          <MetodoEquation />
        </Reveal>

        <Reveal y={14} blur={0} className="mx-auto mt-12 max-w-4xl">
          <p className="flex items-center gap-4 text-[0.75rem] font-bold uppercase tracking-[0.26em] text-fg">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-azure-300/60" />
            La base che consigliamo
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-azure-300/60" />
          </p>
          <RevealGroup className="gl-card mt-4 grid divide-azure-300/20 rounded-[1.5rem] sm:grid-cols-3 sm:divide-x" stagger={0.15}>
            {nums.map((n) => (
              <RevealItem key={n.unit} y={8} className="flex items-center justify-center gap-4 px-4 py-5">
                <Icon name={n.icon} className="h-9 w-9 shrink-0 text-gold-300" strokeWidth={1.6} />
                <span>
                  <span className="block font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-bold leading-none tracking-[-0.04em]">
                    <CountUp value={n.value} prefix={n.prefix} className="text-gold" duration={1.2} />
                    <span className="ml-1.5 text-[1.0625rem] font-semibold tracking-normal text-fg">{n.unit}</span>
                  </span>
                  <span className="mt-1 block text-[0.8125rem] text-fg-2">{n.label}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        <Reveal y={12} blur={0} className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/contatti" size="lg" icon="calendar" iconPosition="start" pulse>
            Prenota una call gratuita
          </Button>
          <Button href={m.homeCta.href} size="lg" variant="secondary" icon="arrow-right">
            {m.homeCta.label}
          </Button>
        </Reveal>
      </div>
      <span aria-hidden="true" className="sec-line absolute inset-x-0 bottom-0 h-px" />
    </section>
  );
}
