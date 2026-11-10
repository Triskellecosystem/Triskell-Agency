import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { MetodoEquation } from "./MetodoEquation";

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
      <TechBackdrop tone="gold" cursor rich />
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
          <p className="text-center text-[0.75rem] font-bold uppercase tracking-[0.22em] text-fg-2">La base che consigliamo</p>
          <RevealGroup className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-4" stagger={0.2}>
            {nums.map((n, i) => (
              <RevealItem key={n.unit} y={0} className="bx h-full" >
                <div className="bx-card relative h-full overflow-hidden rounded-[1.25rem] border border-gold-300/40 bg-[linear-gradient(150deg,rgb(247_200_92/0.14),rgb(5_31_54/0.75))] px-2 py-6 text-center shadow-[0_24px_50px_-26px_rgb(0_0_0/0.9)] sm:py-8" style={{ "--i": i } as React.CSSProperties}>
                  <span aria-hidden="true" className="bx-shine" />
                  <p className="font-display text-[clamp(2.5rem,1.7rem+3.4vw,4.5rem)] font-bold leading-none tracking-[-0.06em]">
                    <CountUp value={n.value} prefix={n.prefix} className="text-gold" duration={1.4} />
                  </p>
                  <p className="mt-2 font-display text-[clamp(0.9375rem,0.8rem+0.5vw,1.25rem)] font-bold text-fg">{n.unit}</p>
                  <p className="mt-0.5 text-[0.75rem] text-fg-3">{n.label}</p>
                </div>
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
