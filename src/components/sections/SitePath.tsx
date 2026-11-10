import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** Il percorso del sito, tranquillo: sette passi numerati in una griglia pulita, con cosa ricevi a ogni passo. */
export function SitePath() {
  const steps = site.sitiProcess.steps;
  return (
    <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
      {steps.map((s, i) => (
        <RevealItem key={s.title} y={12} className={i === steps.length - 1 ? "lg:col-span-1" : undefined}>
          <div className="group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[rgb(10_30_48/0.55)] p-4 transition-colors duration-300 hover:border-gold-300/40">
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-300/10 text-gold-300 transition-colors duration-300 group-hover:bg-gold-300 group-hover:text-night">
                <Icon name={s.icon} className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span className="font-display text-[1.5rem] font-semibold leading-none text-white/15">0{i + 1}</span>
            </div>
            <p className="mt-3 font-display text-[1rem] font-semibold text-fg">{s.title}</p>
            <p className="mt-1 flex-1 text-[0.8125rem] leading-snug text-fg-3">{s.text}</p>
            <p className="mt-3 flex items-center gap-1.5 border-t border-white/[0.06] pt-2.5 text-[0.75rem] text-fg-2">
              <Icon name="check" className="h-3.5 w-3.5 text-gold-300" strokeWidth={2.6} />
              {s.get}
            </p>
          </div>
        </RevealItem>
      ))}
      <RevealItem y={12}>
        <a href="/contatti" className="flex h-full flex-col justify-between rounded-2xl border border-gold-300/40 bg-[linear-gradient(150deg,rgb(247_200_92/0.14),rgb(5_31_54/0.7))] p-4 transition-colors hover:border-gold-300/80">
          <span className="font-display text-[1rem] font-semibold text-fg">Iniziamo dal primo passo?</span>
          <span className="mt-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-gold-200">
            Prenota la call gratuita <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.2} />
          </span>
        </a>
      </RevealItem>
    </RevealGroup>
  );
}
