import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { MetodoVenn } from "./MetodoVenn";

const factIcons: IconName[] = ["hourglass", "film", "click"];

/**
 * Il Metodo Triskell in home: titolo grande al centro, il diagramma a due cerchi (Social + Campagne = Più clienti),
 * la base consigliata in tre tessere collegate e i pulsanti.
 */
export function MetodoTeaser() {
  const m = site.metodo;
  return (
    <section id="metodo-triskell" aria-labelledby="metodo-triskell-title" className="relative isolate overflow-hidden py-[clamp(3rem,1.8rem+3.6vw,5.25rem)]">
      <TechBackdrop tone="gold" cursor />
      <div className="container-x">
        <Reveal blur={6} y={18} className="text-center">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-fg-3">{m.overline}</p>
          <h2 id="metodo-triskell-title" className="mt-2 font-display text-[clamp(2.25rem,1.5rem+3vw,4rem)] font-bold leading-[0.95] tracking-[-0.045em] text-fg">
            Metodo <span className="text-gold">Triskell</span>
          </h2>
          <p className="mt-2 font-display text-[clamp(1.125rem,0.95rem+0.8vw,1.5rem)] font-semibold tracking-[-0.02em] text-fg-2">
            Social <span className="text-gold-300">+</span> Campagne
          </p>
        </Reveal>

        <Reveal y={10} blur={0} className="mt-10">
          <MetodoVenn />
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl">
          <p className="text-center text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-fg-3">La base che consigliamo</p>
          <RevealGroup className="mt-4 grid grid-cols-3 gap-2 sm:gap-3" stagger={0.12}>
            {m.facts.map((f, i) => (
              <RevealItem key={f.label} y={14} className="h-full">
                <div className="flex h-full flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.02] px-2 py-4 text-center sm:px-4">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-300/10 text-gold-300">
                    <Icon name={factIcons[i] ?? "check"} className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                  <p className="mt-2.5 font-display text-[1.5rem] font-bold leading-none tracking-[-0.04em] text-gold sm:text-[1.875rem]">{f.value}</p>
                  <p className="mt-1 text-[0.75rem] font-semibold text-fg">{f.unit}</p>
                  <p className="text-[0.6875rem] text-fg-3">{f.label}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal y={12} blur={0} className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={m.homeCta.href} size="md" icon="arrow-right">
            {m.homeCta.label}
          </Button>
          <Button href="/contatti" size="md" variant="secondary" icon="calendar" iconPosition="start">
            Prenota una call gratuita
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
