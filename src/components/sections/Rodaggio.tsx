import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Il rodaggio di 6 mesi: una barra divisa in mesi che si riempie mese dopo mese quando entra nello schermo,
 * con le tre fasi sotto (struttura → messa in moto → risultati) e il bollino "Minimo 6 mesi".
 */
export function Rodaggio({ compact = false }: { compact?: boolean }) {
  const r = site.metodo.rodaggio;
  const months = Array.from({ length: r.months }, (_, i) => i + 1);
  return (
    <Reveal y={24} blur={0}>
      <div className="rd relative overflow-hidden rounded-[1.75rem] border border-gold-400/35 bg-[linear-gradient(150deg,var(--color-surface-2),var(--color-night-raised))] p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 font-display text-[1.0625rem] font-bold text-fg">
            <Icon name="hourglass" className="h-5 w-5 text-gold-300" strokeWidth={1.8} />
            {compact ? r.overline : "Il percorso dei primi 6 mesi"}
          </p>
          <span className="rd-badge rounded-full bg-[image:var(--gradient-gold-btn)] px-3.5 py-1 text-[0.75rem] font-bold uppercase tracking-wider text-night">{r.badge}</span>
        </div>

        {/* mesi */}
        <ol className="mt-6 grid grid-cols-6 gap-1.5 sm:gap-2">
          {months.map((m) => (
            <li key={m} className="text-center">
              <span className="block h-3 overflow-hidden rounded-full bg-line">
                <span className="rd-fill block h-full w-full origin-left rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-azure-300" style={{ transitionDelay: `${0.2 + m * 0.22}s` }} />
              </span>
              <span className="mt-2 block font-mono text-[0.6875rem] font-semibold text-fg-3 sm:text-[0.75rem]">Mese {m}</span>
            </li>
          ))}
        </ol>

        {/* fasi */}
        <ol className="mt-5 grid gap-3 sm:grid-cols-6">
          {r.phases.map((p, i) => (
            <li key={p.title} className="rd-phase rounded-2xl border border-line bg-night/40 p-4 sm:[grid-column:var(--gc)]" style={{ "--gc": `${p.from} / ${p.to + 1}`, transitionDelay: `${0.5 + i * 0.35}s` } as React.CSSProperties}>
              <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-azure-300">
                {p.from === p.to ? `Mese ${p.from}` : `Mesi ${p.from}–${p.to}`}
              </p>
              <p className="mt-1 font-display text-[1rem] font-bold text-fg">{p.title}</p>
              {!compact && <p className="mt-1 text-[0.875rem] leading-snug text-fg-2">{p.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
