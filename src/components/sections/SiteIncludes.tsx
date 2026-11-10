import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** Cosa è incluso in un sito: otto voci a griglia, con l'icona che si capovolge al passaggio del mouse. */
export function SiteIncludes() {
  const inc = site.sitiProcess.includes;
  return (
    <Section id="incluso-sito" labelledBy="incluso-sito-title">
      <TechBackdrop tone="azure" rich />
      <SectionHeading id="incluso-sito-title" overline={inc.overline} title={inc.title} line={inc.line} align="center" />
      <RevealGroup className="mt-12 grid gap-3 max-md:grid-cols-2 md:grid-cols-4 md:gap-4" stagger={0.06}>
        {inc.items.map((it) => (
          <RevealItem key={it.title} y={22} className="h-full">
            <div className="group/si flex h-full flex-col rounded-2xl border border-line bg-[linear-gradient(165deg,var(--color-surface-2),var(--color-night-raised))] p-5 transition-[border-color,transform] duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1 hover:border-azure-300/60 max-md:p-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-azure-300/45 bg-azure-300/10 text-azure-300 transition-transform duration-700 ease-out-expo group-hover/si:[transform:rotateY(180deg)] max-md:h-10 max-md:w-10">
                <Icon name={it.icon} className="h-6 w-6 max-md:h-5 max-md:w-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-4 font-display text-[1.0625rem] font-bold leading-tight text-fg max-md:text-[0.9375rem]">{it.title}</h3>
              <p className="mt-1 text-[0.875rem] leading-snug text-fg-2 max-md:text-[0.8125rem]">{it.text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
