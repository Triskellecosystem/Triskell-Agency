import { site } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SceneVideo } from "@/components/ui/SceneVideo";
import { Stage3D } from "@/components/ui/Stage3D";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "Ci occupiamo di tutto": a sinistra il video delle riprese (entrata da cinema), a destra le quattro fasi in
 * colonna, collegate da una linea che una luce percorre accendendole a turno. Tutto visibile in una schermata.
 */
export function SocialPillars() {
  const s = site.social;
  return (
    <Section id="cosa-facciamo" labelledBy="cosa-title" className="overflow-hidden">
      <Stage3D />
      <SectionHeading id="cosa-title" overline="Cosa facciamo" title="Ci occupiamo [di tutto]" line="Tu ci dai poco tempo. Noi facciamo crescere il profilo." align="center" />
      <div className="mt-9 grid items-center gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        <Reveal y={0} blur={0} className="scv-reveal">
          <SceneVideo src="/video/riprese-1.mp4" poster="/video/riprese-1.jpg" label="Una ripresa sul posto per i contenuti social di un cliente" />
        </Reveal>
        <Reveal y={10} blur={0} className="relative">
          <span aria-hidden="true" className="spl-vrail absolute bottom-6 left-[0.6rem] top-6 w-[2px]">
            <span className="spl-vrunner" />
          </span>
          <ol className="space-y-3">
            {s.pillars.map((p, i) => (
              <li key={p.title} className="spl-item relative flex items-center gap-4" style={{ "--i": i } as React.CSSProperties}>
                <span className="spl-ico relative z-[1] h-5 w-5 shrink-0 rounded-full border-2 border-gold-300 bg-night shadow-[0_0_0_5px_var(--color-night)]" />
                <span className="spl-card flex-1 rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgb(13_39_61/0.85),rgb(4_33_58/0.6))] px-4 py-3 backdrop-blur-sm">
                  <span className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.625rem] font-bold text-gold-300">0{i + 1}</span>
                    <span className="font-display text-[1.125rem] font-bold text-fg">{p.title}</span>
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-fg-2">{p.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
      <span aria-hidden="true" className="sec-line absolute inset-x-0 bottom-0 h-px" />
    </Section>
  );
}
