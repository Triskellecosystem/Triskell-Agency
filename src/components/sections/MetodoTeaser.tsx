import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { MetodoEquation } from "./MetodoEquation";
import { SectionBg } from "@/components/ui/SectionBg";

/** Il Metodo Triskell in home: titolo grande, l'equazione Social + Campagne (+ Sito) = Più clienti, i tre numeri in grande e i pulsanti. */
export function MetodoTeaser() {
  const m = site.metodo;
  const nums = [
    { value: 6, prefix: "", unit: "mesi", label: "Collaborazione minima" },
    { value: 12, prefix: "", unit: "contenuti", label: "Al mese, 3 a settimana" },
    { value: 5, prefix: "4–", unit: "campagne", label: "Al mese, Meta e Google" },
  ];
  return (
    <section id="metodo-triskell" aria-labelledby="metodo-triskell-title" className="mt-band relative isolate overflow-hidden py-[clamp(3.5rem,2rem+4vw,6rem)]">
      <SectionBg kind="horizon" tone="gold" />
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

        <Reveal y={14} blur={0} className="mx-auto mt-10 max-w-2xl">
          <p className="text-center text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-fg-3">La base che consigliamo</p>
          <RevealGroup className="mt-3 grid grid-cols-3 divide-x divide-gold-300/15 rounded-2xl border border-gold-300/25 bg-[rgb(5_31_54/0.55)] backdrop-blur-sm" stagger={0.15}>
            {nums.map((n) => (
              <RevealItem key={n.unit} y={8} className="px-2 py-4 text-center sm:py-5">
                <p className="font-display text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)] font-semibold leading-none tracking-[-0.04em]">
                  <CountUp value={n.value} prefix={n.prefix} className="text-gold" duration={1.2} />
                  <span className="ml-1.5 text-[0.8125rem] font-semibold tracking-normal text-fg sm:text-[0.9375rem]">{n.unit}</span>
                </p>
                <p className="mt-1.5 text-[0.6875rem] text-fg-3">{n.label}</p>
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
