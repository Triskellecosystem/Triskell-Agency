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
      <RevealGroup className="mt-8 grid gap-2.5 max-md:grid-cols-2 md:grid-cols-4" stagger={0.05}>
        {inc.items.map((it) => (
          <RevealItem key={it.title} y={22} className="h-full">
            <div className="group/si flex h-full items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 transition-[border-color,transform] duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1 hover:border-azure-300/60 max-md:p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-azure-300/10 text-azure-300 transition-transform duration-700 ease-out-expo group-hover/si:[transform:rotateY(180deg)]">
                <Icon name={it.icon} className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span className="min-w-0">
                <h3 className="font-display text-[0.875rem] font-semibold leading-tight text-fg">{it.title}</h3>
                <p className="mt-0.5 text-[0.75rem] leading-snug text-fg-3">{it.text}</p>
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
