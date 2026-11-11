import { PillarList } from "./PillarList";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SceneVideo } from "@/components/ui/SceneVideo";
import { Reveal } from "@/components/motion/Reveal";
import { SectionBg } from "@/components/ui/SectionBg";

/**
 * "Ci occupiamo di tutto": a sinistra il video delle riprese, a destra le quattro fasi allineate (si aprono col
 * mouse o col dito, niente si muove da solo). Sotto, in evidenza, la collaborazione minima di 6 mesi.
 */
export function SocialPillars() {
  return (
    <Section id="cosa-facciamo" labelledBy="cosa-title" className="overflow-hidden">
      <SectionBg kind="grid" />
      <SectionHeading id="cosa-title" overline="Cosa facciamo" title="Ci occupiamo [di tutto]" line="Tu ci dai poco tempo. Noi facciamo crescere il profilo." align="center" />
      <div className="mt-9 grid items-center gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <Reveal y={0} blur={0} className="scv-reveal">
          <SceneVideo src="/video/riprese-2.mp4" poster="/video/riprese-2.jpg" label="Dietro le quinte delle riprese per i contenuti social" />
        </Reveal>
        <Reveal y={12} blur={0}>
          <PillarList />
        </Reveal>
      </div>

      <Reveal y={16} blur={0} className="mt-10">
        <div className="six relative mx-auto flex max-w-3xl flex-col items-center gap-5 overflow-hidden rounded-[1.5rem] border border-gold-300/40 bg-[linear-gradient(120deg,rgb(247_200_92/0.1),rgb(5_31_54/0.8)_55%)] px-6 py-6 text-center sm:flex-row sm:text-left">
          <span aria-hidden="true" className="six-ring relative grid h-24 w-24 shrink-0 place-items-center rounded-full">
            <span className="font-display text-[2.75rem] font-bold leading-none tracking-[-0.05em] text-gold">6</span>
          </span>
          <span>
            <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-gold-300">Collaborazione minima</span>
            <span className="mt-1 block font-display text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] font-bold leading-tight tracking-[-0.02em] text-fg">Lavoriamo insieme per almeno 6 mesi</span>
            <span className="mt-1 block text-[0.875rem] text-fg-2">È il tempo che serve per costruire il profilo, trovare i contenuti che funzionano e vedere risultati veri.</span>
          </span>
        </div>
      </Reveal>
      <span aria-hidden="true" className="sec-line absolute inset-x-0 bottom-0 h-px" />
    </Section>
  );
}
