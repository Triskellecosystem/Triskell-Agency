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
              <span className="spl-card mt-4 w-full rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgb(13_39_61/0.8),rgb(4_33_58/0.6))] px-3 py-4">
                <span aria-hidden="true" className={`spl-viz spl-viz--${i} relative mx-auto mb-3 block h-20 w-full max-w-[12rem] overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(160deg,#0b2236,#061826)]`}>
                  {i === 0 && (
                    <span className="absolute inset-0 flex flex-col justify-center gap-[5px] px-3.5">
                      <span className="mb-0.5 flex items-center gap-1 text-[0.5rem] font-bold uppercase tracking-wider text-gold-300"><b className="spl-bulb" />Script · Reel 07</span>
                      <i style={{ "--w": "86%" } as React.CSSProperties} />
                      <i style={{ "--w": "64%", animationDelay: "0.45s" } as React.CSSProperties} />
                      <i style={{ "--w": "74%", animationDelay: "0.9s" } as React.CSSProperties} />
                      <i style={{ "--w": "40%", animationDelay: "1.35s" } as React.CSSProperties} />
                    </span>
                  )}
                  {i === 1 && (
                    <span className="absolute inset-0">
                      <span className="spl-scene absolute inset-0" />
                      <b className="spl-rec">REC</b>
                      <b className="spl-time">00:12</b>
                      <span className="spl-batt" />
                      <em className="spl-corner spl-corner--a" />
                      <em className="spl-corner spl-corner--b" />
                      <em className="spl-corner spl-corner--c" />
                      <em className="spl-corner spl-corner--d" />
                      <span className="spl-focus" />
                    </span>
                  )}
                  {i === 2 && (
                    <span className="absolute inset-0 flex flex-col justify-center gap-1.5 px-2.5">
                      <span className="flex items-center justify-between font-mono text-[0.5rem] text-fg-3"><span>00:00</span><span>00:15</span><span>00:30</span></span>
                      <span className="spl-clips flex gap-[3px]"><i /><i /><i /><i /><i /></span>
                      <span className="spl-clips spl-clips--b flex gap-[3px]"><i /><i /><i /></span>
                      <span className="spl-wave flex h-2.5 items-end gap-[2px]">{Array.from({ length: 22 }, (_, k) => <i key={k} style={{ animationDelay: `${k * 0.06}s` }} />)}</span>
                      <b className="spl-head" />
                    </span>
                  )}
                  {i === 3 && (
                    <span className="absolute inset-0 flex items-center justify-center gap-3">
                      <span className="spl-post relative block h-14 w-11 overflow-hidden rounded-md bg-[linear-gradient(160deg,#f7c85c,#e1306c)]">
                        <span className="absolute inset-x-1 bottom-1 h-1 rounded bg-white/70" />
                        <span className="absolute inset-x-1 bottom-2.5 h-1 w-1/2 rounded bg-white/50" />
                      </span>
                      <span className="text-left leading-tight">
                        <span className="spl-heart block text-[1rem] text-[#e1306c]">♥</span>
                        <span className="block font-mono text-[0.625rem] font-bold text-fg">+1.240</span>
                        <span className="block text-[0.5rem] text-fg-3">visualizzazioni</span>
                      </span>
                      <span className="spl-notif absolute right-1.5 top-1.5 rounded-full bg-lime-300 px-1.5 text-[0.5rem] font-bold text-night">Pubblicato</span>
                    </span>
                  )}
                </span>
                <span className="block font-mono text-[0.625rem] font-bold text-fg-3">0{i + 1}</span>
                <span className="mt-1 block font-display text-[1.25rem] font-bold text-fg">{p.title}</span>
                <span className="mt-1 block text-[0.8125rem] leading-snug text-fg-2">{p.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
      <span aria-hidden="true" className="sec-line absolute inset-x-0 bottom-0 h-px" />
    </Section>
  );
}
