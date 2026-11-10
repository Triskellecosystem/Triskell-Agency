import { cn } from "@/lib/cn";

/**
 * Avviso di disponibilità limitata (urgenza): puntino rosso che pulsa e testo breve. Messo vicino ai pulsanti
 * "Prenota": seguiamo poche attività per volta, quindi accettiamo un numero limitato di richieste al mese.
 */
export function Scarcity({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <p className={cn("scarcity inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.75rem] font-semibold leading-tight", dark ? "border-[#b42318]/40 bg-[#b42318]/10 text-[#7a1209]" : "border-[#ff5a4a]/45 bg-[#ff5a4a]/10 text-[#ffb4a8]", className)}>
      <span className="relative grid h-2.5 w-2.5 shrink-0 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#ff5a4a]/70" />
        <span className="h-2 w-2 rounded-full bg-[#ff3b30]" />
      </span>
      Posti limitati: seguiamo poche attività per volta, accettiamo solo alcune richieste al mese
    </p>
  );
}
