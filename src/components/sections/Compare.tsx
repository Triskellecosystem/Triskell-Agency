import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Row = { them: string; us: string };

/**
 * Confronto a due colonne: a sinistra "gli altri" (spento, con la ×), a destra noi (oro, con la spunta).
 * Le righe entrano una alla volta; passando il mouse la riga si accende.
 */
export function Compare({ them, us, rows }: { them: string; us: string; rows: Row[] }) {
  return (
    <div className="cmp mx-auto max-w-4xl overflow-hidden rounded-[1.25rem] border border-white/[0.08]">
      <div className="grid grid-cols-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em]">
        <p className="bg-white/[0.02] px-4 py-3 text-fg-3 sm:px-6">{them}</p>
        <p className="flex items-center gap-2 bg-[image:var(--gradient-gold-btn)] px-4 py-3 text-night sm:px-6">
          <Icon name="sparkles" className="h-3.5 w-3.5" strokeWidth={2.2} />
          {us}
        </p>
      </div>
      <RevealGroup stagger={0.08}>
        {rows.map((r) => (
          <RevealItem key={r.us} y={10} className="cmp-row grid grid-cols-2 border-t border-white/[0.06] transition-colors duration-300 hover:bg-gold-300/[0.04]">
            <p className="flex items-start gap-2 px-4 py-3 text-[0.8125rem] leading-snug text-fg-3 line-through decoration-ember-400/50 sm:px-6">
              <Icon name="close" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember-300" strokeWidth={2.6} />
              {r.them}
            </p>
            <p className="flex items-start gap-2 border-l border-gold-300/20 bg-gold-300/[0.04] px-4 py-3 text-[0.8125rem] font-semibold leading-snug text-fg sm:px-6">
              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-300" strokeWidth={2.8} />
              {r.us}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
