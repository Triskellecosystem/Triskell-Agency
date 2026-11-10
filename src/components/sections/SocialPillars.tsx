import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "Ci occupiamo di tutto": una linea separa la sezione, poi quattro tappe (Pensiamo → Registriamo → Editiamo →
 * Pubblichiamo) che compaiono una dopo l'altra lungo un binario; una luce lo percorre in loop e accende a turno la tappa.
 */
export function SocialPillars() {
  const s = site.social;
  return (
    <Section id="cosa-facciamo" labelledBy="cosa-title" className="spl-band overflow-hidden">
      <span aria-hidden="true" className="spl-sep absolute inset-x-0 top-0 h-px" />
      <SectionHeading id="cosa-title" overline="Cosa facciamo" title="Ci occupiamo [di tutto]" line="Tu ci dai poco tempo. Noi facciamo crescere il profilo." align="center" />
      <Reveal y={10} blur={0} className="relative mx-auto mt-10 max-w-5xl">
        <span aria-hidden="true" className="spl-rail absolute left-[12.5%] right-[12.5%] top-[1.75rem] hidden h-[2px] md:block">
          <span className="spl-runner" />
        </span>
        <ol className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {s.pillars.map((p, i) => (
            <li key={p.title} className="spl-item flex flex-col items-center text-center" style={{ "--i": i } as React.CSSProperties}>
              <span className="spl-ico relative z-[1] grid h-14 w-14 place-items-center rounded-full border border-gold-300/60 bg-night text-gold-300 shadow-[0_0_0_6px_var(--color-night)]">
                <Icon name={p.icon} className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <span className="spl-card mt-4 w-full rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgb(13_39_61/0.8),rgb(1_15_28/0.6))] px-3 py-4">
                <span className="block font-mono text-[0.625rem] font-bold text-fg-3">0{i + 1}</span>
                <span className="mt-1 block font-display text-[1.25rem] font-bold text-fg">{p.title}</span>
                <span className="mt-1 block text-[0.8125rem] leading-snug text-fg-2">{p.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
