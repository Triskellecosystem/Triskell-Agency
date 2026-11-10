import { site } from "@/content/site";
import { Stage3D } from "@/components/ui/Stage3D";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Muro dei numeri: sei tessere enormi che entrano alternate dai lati, il numero cresce, una barra si riempie e un
 * riflesso attraversa la tessera. Sotto, una riga di risultati veri di clienti che scorre.
 */
export function NumbersWall() {
  const n = site.numbers;
  return (
    <Section id="numeri" labelledBy="numeri-title">
        <Stage3D view="low" />
      <TechBackdrop tone="gold" cursor rich />
      <SectionHeading id="numeri-title" overline={n.overline} title={n.title} line={n.line} align="center" />

      <RevealGroup className="mt-8 grid gap-2.5 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-6" stagger={0.08}>
        {n.items.map((m, i) => (
          <RevealItem key={m.label} y={30} className="h-full" >
            <Spotlight className="num-tile res-cell group/num relative h-full overflow-hidden rounded-xl border border-white/[0.12] bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night-raised))] p-4 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300/70 hover:shadow-[0_0_30px_-12px_rgb(247_200_92/0.55)]" size={220}>
              <span aria-hidden="true" className="num-shine" style={{ animationDelay: `${i * 0.9}s` }} />
              <span aria-hidden="true" className="res-burst" style={{ "--i": i } as React.CSSProperties} />
              <div className="relative z-[2]" style={{ "--i": i } as React.CSSProperties}>
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-gold-300/10 text-gold-300">
                  <Icon name={m.icon} className="h-3.5 w-3.5" strokeWidth={1.9} />
                </span>
                <p className="res-num mt-3 font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-bold leading-none tracking-[-0.045em]">
                  <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} className="text-gold" duration={2.2} />
                </p>
                <p className="mt-1.5 text-[0.75rem] leading-snug text-fg-3">{m.label}</p>
                <span aria-hidden="true" className="mt-3 block h-[2px] overflow-hidden rounded-full bg-line">
                  <span className="num-bar block h-full w-full origin-left rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-azure-300" style={{ transitionDelay: `${0.3 + i * 0.12}s` }} />
                </span>
              </div>
            </Spotlight>
          </RevealItem>
        ))}
      </RevealGroup>

    </Section>
  );
}
