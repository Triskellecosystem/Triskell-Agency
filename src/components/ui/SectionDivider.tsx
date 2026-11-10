import { cn } from "@/lib/cn";

/**
 * Filo sottile in stile "tech" che separa due sezioni: linea sfumata oro → azzurro con un nodo centrale e due piccoli
 * circuiti, più un impulso di luce che la attraversa piano (solo transform). Decorativo.
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("container-x relative py-3", className)}>
      <div className="relative mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-gold-300/45 to-transparent">
        <span className="divider-pulse absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-azure-300 to-transparent" />
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold-300 bg-night shadow-[0_0_14px_rgb(247_200_92/0.7)]" />
        <span className="absolute left-[calc(50%-5rem)] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-azure-300/80" />
        <span className="absolute left-[calc(50%+5rem)] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-azure-300/80" />
        <span className="absolute left-[calc(50%-5rem)] top-1/2 h-px w-[calc(5rem-0.5rem)] bg-azure-300/50" />
        <span className="absolute left-[calc(50%+0.5rem)] top-1/2 h-px w-[calc(5rem-0.5rem)] bg-azure-300/50" />
      </div>
    </div>
  );
}
