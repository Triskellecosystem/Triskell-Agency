import { PillarList } from "./PillarList";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SceneVideo } from "@/components/ui/SceneVideo";
import { Reveal } from "@/components/motion/Reveal";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * "Ci occupiamo di tutto": a sinistra il video delle riprese, a destra le quattro fasi allineate (si aprono col
 * mouse o col dito, niente si muove da solo). Sotto, in evidenza, la collaborazione minima di 6 mesi.
 */
export function SocialPillars() {
  return (
    <Section id="cosa-facciamo" labelledBy="cosa-title" className="overflow-hidden">
      <SectionGlow />
      <SectionHeading id="cosa-title" overline="Cosa facciamo" title="Ci occupiamo [di tutto]" line="Tu ci dai poco tempo. Noi facciamo crescere il profilo." align="center" />
      <div className="mt-9 grid items-center gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Reveal y={0} blur={0} className="scv-reveal cv-glow">
          <SceneVideo src="/video/riprese-2.mp4" poster="/video/riprese-2.jpg" label="Dietro le quinte delle riprese per i contenuti social" />
        </Reveal>
        <Reveal y={12} blur={0}>
          <PillarList />
        </Reveal>
      </div>

      <Reveal y={16} blur={0} className="mt-10">
        <div className="gl-strip mx-auto grid max-w-5xl items-center gap-4 rounded-[1.5rem] px-6 py-5 sm:grid-cols-4 sm:divide-x sm:divide-white/12">
          <div className="flex items-center gap-4">
            <span className="six-ring relative grid h-14 w-14 shrink-0 place-items-center rounded-full">
              <span className="font-display text-[1.625rem] font-bold leading-none text-gold">6</span>
            </span>
            <span>
              <span className="block text-[0.625rem] font-bold uppercase tracking-[0.2em] text-gold-300">Collaborazione minima</span>
              <span className="block font-display text-[1.375rem] font-bold leading-tight text-fg">6 mesi</span>
            </span>
          </div>
          {([["trending", "Più visibilità"], ["target", "Più contatti"], ["chart", "Più risultati"]] as Array<[IconName, string]>).map(([ic, l], k) => (
            <p key={l} className="spx-gain flex items-center justify-center gap-3 font-display text-[1.125rem] font-semibold text-fg" style={{ "--i": k } as React.CSSProperties}>
              <Icon name={ic} className="h-7 w-7 text-gold-300" strokeWidth={1.8} />
              {l}
            </p>
          ))}
        </div>
      </Reveal>
      <span aria-hidden="true" className="sec-line absolute inset-x-0 bottom-0 h-px" />
    </Section>
  );
}
