import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PhoneVideo } from "./Teleprompter";

const ADDS: Array<{ icon: IconName; label: string }> = [
  { icon: "pen", label: "Titoli e scritte animate" },
  { icon: "sparkles", label: "Icone che si disegnano" },
  { icon: "music", label: "Musica e suoni morbidi" },
  { icon: "scissors", label: "Tagli e movimenti di camera" },
];

/**
 * L'editing, prima e dopo: lo stesso video grezzo e lo stesso video montato da noi, affiancati in due telefoni con
 * le etichette "Prima" e "Dopo" e una freccia in mezzo. Sotto, cosa aggiunge il montaggio.
 */
export function EditingBeforeAfter() {
  return (
    <Section id="editing" labelledBy="editing-title" className="overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[60rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(247_200_92/0.14),transparent)] blur-2xl" />
      <SectionHeading id="editing-title" overline="L'editing" title="Prima e dopo il nostro [montaggio]" line="Stesso video, stessa persona. Cambia tutto quando ci mettiamo le mani noi." align="center" />
      <Reveal y={20} blur={0} className="mx-auto mt-10 max-w-2xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:gap-8">
          <figure className="min-w-0">
            <figcaption className="mb-3 text-center">
              <span className="rounded-full border border-white/15 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-fg-3">Prima</span>
            </figcaption>
            <PhoneVideo kind="raw" src="/video/prima-estetista.mp4" poster="/video/prima-estetista.jpg" label="Il video grezzo, prima del montaggio" />
          </figure>
          <div aria-hidden="true" className="flex flex-col items-center gap-2 pt-8">
            <span className="ba-arrow grid h-11 w-11 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night shadow-[0_0_30px_-6px_rgb(247_200_92/0.7)] sm:h-14 sm:w-14">
              <Icon name="wand" className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
            </span>
            <span className="hidden text-center text-[0.625rem] font-bold uppercase tracking-[0.14em] text-gold-200 sm:block">Editing<br />Triskell</span>
          </div>
          <figure className="min-w-0">
            <figcaption className="mb-3 text-center">
              <span className="rounded-full bg-[image:var(--gradient-gold-btn)] px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-night">Dopo</span>
            </figcaption>
            <PhoneVideo kind="edited" src="/video/dopo-estetista.mp4" poster="/video/dopo-estetista.jpg" label="Lo stesso video montato da Triskell, con titoli, icone e musica" />
          </figure>
        </div>
      </Reveal>
      <Reveal y={12} blur={0} delay={0.15} className="mt-8">
        <ul className="flex flex-wrap justify-center gap-2">
          {ADDS.map((a) => (
            <li key={a.label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[0.8125rem] text-fg-2">
              <Icon name={a.icon} className="h-4 w-4 text-gold-300" strokeWidth={1.9} />
              {a.label}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
