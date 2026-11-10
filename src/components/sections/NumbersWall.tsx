import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Muro dei numeri: sei tessere enormi che entrano alternate dai lati, il numero cresce, una barra si riempie e un
 * riflesso attraversa la tessera. Sotto, una riga di risultati veri di clienti che scorre.
 */
export function NumbersWall() {
  const n = site.numbers;
  return (
    <Section id="numeri" labelledBy="numeri-title">
      <TechBackdrop tone="gold" cursor rich />
      <SectionHeading id="numeri-title" overline={n.overline} title={n.title} line={n.line} align="center" />

      <RevealGroup className="mt-12 grid gap-4 max-md:grid-cols-2 max-md:gap-3 sm:mt-14 md:grid-cols-3 md:gap-5" stagger={0.1} alternate>
        {n.items.map((m, i) => (
          <RevealItem key={m.label} y={30} className="h-full">
            <Spotlight className="num-tile group/num relative h-full overflow-hidden rounded-card border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night-raised))] p-6 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300/70 hover:shadow-[0_0_44px_-12px_rgb(247_200_92/0.55)] max-md:p-4 sm:p-8" size={360}>
              <span aria-hidden="true" className="num-shine" style={{ animationDelay: `${i * 0.9}s` }} />
              <div className="relative z-[2]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold-400/45 bg-gold-300/10 text-gold-300 max-md:h-9 max-md:w-9">
                  <Icon name={m.icon} className="h-6 w-6 max-md:h-[1.1rem] max-md:w-[1.1rem]" strokeWidth={1.6} />
                </span>
                <p className="mt-5 font-display text-[clamp(2.5rem,1.6rem+4vw,5rem)] font-bold leading-none tracking-[-0.05em] max-md:mt-3">
                  <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} className="text-gold" duration={2.2} />
                </p>
                <p className="mt-3 text-[1.0625rem] font-medium leading-snug text-fg-2 max-md:mt-2 max-md:text-[0.8125rem]">{m.label}</p>
                <span aria-hidden="true" className="mt-5 block h-[3px] overflow-hidden rounded-full bg-line max-md:mt-3">
                  <span className="num-bar block h-full w-full origin-left rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-azure-300" style={{ transitionDelay: `${0.3 + i * 0.12}s` }} />
                </span>
              </div>
            </Spotlight>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal y={18} blur={0} className="mt-6 sm:mt-8">
        <ul className="grid gap-3 rounded-card border border-gold-400/30 bg-[linear-gradient(135deg,#2b2410,#0a1626_55%,#0b2a46)] p-4 max-md:grid-cols-2 sm:p-5 md:grid-cols-4">
          {n.proof.map((p) => (
            <li key={p.who + p.label} className="flex flex-col items-center text-center md:border-r md:border-line md:last:border-r-0">
              <span className="font-display text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] font-bold leading-none tracking-[-0.03em] text-azure-300">{p.value}</span>
              <span className="mt-1 text-small font-semibold text-fg">{p.label}</span>
              <span className="mt-0.5 text-[0.75rem] text-fg-3">{p.who}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
