import { site } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SceneVideo } from "@/components/ui/SceneVideo";
import { PerspectiveBg } from "@/components/ui/PerspectiveBg";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "Ci occupiamo di tutto": il video vero di una ripresa, grande e scenico, e sotto le quattro fasi
 * (Pensiamo → Registriamo → Editiamo → Pubblichiamo) su un binario che una luce percorre accendendole a turno.
 */
export function SocialPillars() {
  const s = site.social;
  return (
    <Section id="cosa-facciamo" labelledBy="cosa-title" className="spl-band overflow-hidden">
      <PerspectiveBg variant="floor" />
      <SectionHeading id="cosa-title" overline="Cosa facciamo" title="Ci occupiamo [di tutto]" line="Tu ci dai poco tempo. Noi facciamo crescere il profilo." align="center" />
      <Reveal y={0} blur={0} className="scv-reveal mx-auto mt-9 max-w-3xl">
        <SceneVideo src="/video/riprese-1.mp4" poster="/video/riprese-1.jpg" label="Una ripresa sul posto per i contenuti social di un cliente" />
      </Reveal>
      <Reveal y={10} blur={0} className="relative mx-auto mt-8 max-w-4xl">
        <span aria-hidden="true" className="spl-rail absolute left-[12.5%] right-[12.5%] top-[0.6rem] hidden h-[2px] md:block">
          <span className="spl-runner" />
        </span>
        <ol className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {s.pillars.map((p, i) => (
            <li key={p.title} className="spl-item flex flex-col items-center text-center" style={{ "--i": i } as React.CSSProperties}>
              <span className="spl-ico relative z-[1] h-5 w-5 rounded-full border-2 border-gold-300 bg-night shadow-[0_0_0_5px_var(--color-night)]" />
              <span className="spl-card mt-3 w-full rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgb(13_39_61/0.8),rgb(4_33_58/0.6))] px-3 py-3.5">
                <span className="block font-mono text-[0.625rem] font-bold text-gold-300">0{i + 1}</span>
                <span className="mt-0.5 block font-display text-[1.25rem] font-bold text-fg">{p.title}</span>
                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-fg-2">{p.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
      <span aria-hidden="true" className="sec-line absolute inset-x-0 bottom-0 h-px" />
    </Section>
  );
}
