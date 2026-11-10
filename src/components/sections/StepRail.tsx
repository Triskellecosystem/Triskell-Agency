import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

type Step = { icon: IconName; title: string; get?: string };

/**
 * Percorso a binario: una linea che si riempie d'oro da sinistra a destra quando entra nello schermo, con i passi
 * come nodi (icona + titolo + cosa ricevi). Poco testo, tutto a colpo d'occhio. Su telefono diventa verticale.
 */
export function StepRail({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("sr relative grid gap-y-5 md:gap-x-3", className)} style={{ gridTemplateColumns: undefined, "--n": steps.length } as React.CSSProperties}>
      <span aria-hidden="true" className="sr-track absolute bg-white/10" />
      <span aria-hidden="true" className="sr-fill absolute bg-gradient-to-r from-gold-500 via-gold-300 to-azure-300 max-md:bg-gradient-to-b" />
      {steps.map((s, i) => (
        <li key={s.title} className="sr-step relative flex gap-3 md:flex-col md:items-center md:text-center" style={{ "--i": i } as React.CSSProperties}>
          <span className="sr-node relative z-[1] grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-300/60 bg-night text-gold-300 shadow-[0_0_0_5px_var(--color-night)]">
            <Icon name={s.icon} className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.9} />
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-gold-300 font-mono text-[0.5625rem] font-bold text-night">{i + 1}</span>
          </span>
          <span className="min-w-0 md:mt-3">
            <span className="block font-display text-[0.9375rem] font-semibold leading-tight text-fg">{s.title}</span>
            {s.get && <span className="mt-1 block text-[0.75rem] leading-snug text-fg-3">{s.get}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}
