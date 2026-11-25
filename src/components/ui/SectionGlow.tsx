import { cn } from "@/lib/cn";

/**
 * Sfondo delle sezioni della Home (come nei riferimenti): blu acceso, linea di luce in basso e, se richiesto,
 * il pavimento a griglia luminoso. Fermo, dietro al contenuto.
 * (`alt` sceglieva la variante dell'onda di particelle, tolta: tra le sezioni ora c'è solo la linea divisoria.)
 */
export function SectionGlow({ floor, className }: { floor?: boolean; alt?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("sglow pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <span className="sglow-bg absolute inset-0" />
      {floor && <span className="sglow-floor absolute inset-0"><i /></span>}
      <span className="sglow-line" />
    </div>
  );
}
