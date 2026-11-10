import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

const profiles = [
  { id: "vertis", label: "Palestra" },
  { id: "essentia", label: "Centro benessere" },
  { id: "bianchi", label: "Osteopata" },
  { id: "nocciolo", label: "Ristorante" },
  { id: "lavie", label: "Centro estetico" },
  { id: "lumina", label: "Studio dentistico" },
  { id: "donnamaria", label: "Pizzeria" },
  { id: "dubai", label: "Immobiliare" },
  { id: "eleva", label: "Fitness club" },
];

/**
 * Esempi di profili Instagram (attività inventate, grafiche dimostrative): telefoni piccoli in un nastro che scorre
 * da solo, si ferma al passaggio del mouse e il telefono sotto il cursore si ingrandisce. Nota piccola: sono esempi.
 */
export function ProfileExamples() {
  const phone = (p: (typeof profiles)[number], hidden: boolean) => (
    <li key={`${p.id}-${hidden}`} className="pe-item shrink-0" aria-hidden={hidden || undefined}>
      <div className="pe-phone relative w-[9.5rem] overflow-hidden rounded-[1.4rem] border-[4px] border-[#1d2a3a] bg-black shadow-[0_24px_50px_-24px_rgb(0_0_0/0.9)] sm:w-[11rem]">
        <Image src={`/social-examples/${p.id}.webp`} alt={hidden ? "" : `Esempio di profilo Instagram: ${p.label}`} width={520} height={1126} sizes="11rem" className="block h-auto w-full" />
      </div>
      <p className="mt-2 text-center text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-3">{p.label}</p>
    </li>
  );
  return (
    <Section id="esempi" labelledBy="esempi-title" className="overflow-hidden">
      <SectionHeading id="esempi-title" overline="Esempi" title="Il profilo della tua attività, [così]" line="Feed curato, bio chiara, storie in evidenza: un profilo che fa venire voglia di contattarti." align="center" />
      <Reveal y={20} blur={0} className="mt-9">
        <div className="pe marquee relative">
          <ul className="marquee-track pe-track flex w-max gap-4 py-4">
            {profiles.map((p) => phone(p, false))}
            {profiles.map((p) => phone(p, true))}
          </ul>
        </div>
      </Reveal>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[0.6875rem] text-fg-3">
        <Icon name="sparkles" className="h-3 w-3 text-gold-300" strokeWidth={2} />
        Questi potrebbero essere degli esempi di come potrebbe venire fuori il profilo della tua attività.
      </p>
    </Section>
  );
}
