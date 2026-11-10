import { site } from "@/content/site";
import { Stage3D } from "@/components/ui/Stage3D";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const TONES = ["#3aa4d4", "#f7c85c", "#7fe0a0", "#e1306c", "#a78bfa", "#22d3ee", "#fb923c", "#f472b6"];

/**
 * Cosa è incluso in un sito: otto tessere ben visibili, ognuna col suo colore. Entrano a cascata alternate dai
 * lati, l'icona galleggia e al passaggio del mouse la tessera si solleva e si accende del suo colore.
 */
export function SiteIncludes() {
  const inc = site.sitiProcess.includes;
  return (
    <Section id="incluso-sito" labelledBy="incluso-sito-title" className="si-band">
        <Stage3D view="left" />
      <SectionHeading id="incluso-sito-title" overline={inc.overline} title={inc.title} line={inc.line} align="center" />
      <RevealGroup className="mt-10 grid gap-3 max-md:grid-cols-2 md:grid-cols-4" stagger={0.08} alternate>
        {inc.items.map((it, i) => (
          <RevealItem key={it.title} y={20} className="h-full">
            <Spotlight className="si-card group/si h-full rounded-[1.125rem] border bg-[linear-gradient(165deg,var(--color-surface-2),var(--color-night-raised))] p-5 transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1.5" size={260}>
              <div className="relative z-[2]" style={{ "--c": TONES[i % TONES.length] } as React.CSSProperties}>
                <span className="si-ico grid h-12 w-12 place-items-center rounded-2xl" style={{ animationDelay: `${i * 0.35}s` }}>
                  <Icon name={it.icon} className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-display text-[1.0625rem] font-bold leading-tight text-fg">{it.title}</h3>
                <p className="mt-1 text-[0.8125rem] leading-snug text-fg-2">{it.text}</p>
                <span aria-hidden="true" className="si-line mt-4 block h-[2px] w-8 rounded-full" />
              </div>
            </Spotlight>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
