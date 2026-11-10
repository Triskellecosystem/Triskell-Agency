import { cn } from "@/lib/cn";
import { DigitalCursor } from "@/components/motion/DigitalCursor";

interface TechBackdropProps {
  /** Tono dominante dell'alone. */
  tone?: "azure" | "gold" | "mixed";
  /** Aggiunge l'effetto digitale al passaggio del mouse. */
  cursor?: boolean;
  /** Sfondo più ricco: griglia di quadrati uniformi e punti luce che brillano piano. */
  rich?: boolean;
  className?: string;
}

/**
 * Sfondo "tech" discreto per le sezioni: griglia sfumata, aloni, tracce di circuito che scorrono piano e,
 * se richiesto, l'effetto digitale al mouse. Tutto aria-hidden, solo opacity/transform.
 */
/** Punti luce a posizioni pseudo-casuali ma deterministiche (stesso HTML su server e client). */
const DOTS = Array.from({ length: 34 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const q = (v: number) => Math.round(v * 100) / 100;
  return { x: q(r(1) * 100), y: q(r(2) * 100), d: q(r(3) * 6), s: 2 + Math.floor(r(4) * 3), gold: r(5) > 0.62 };
});
const CELL = 64;
export function TechBackdrop({ tone = "mixed", cursor = false, rich = false, className }: TechBackdropProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(75%_70%_at_50%_45%,#000,transparent)]" />
      <div
        className={cn(
          "absolute -left-[10%] top-[8%] h-[34rem] w-[34rem] rounded-full",
          tone === "gold" ? "bg-[radial-gradient(circle,rgb(247_200_92/0.13),transparent_65%)]" : "bg-[radial-gradient(circle,rgb(11_129_177/0.2),transparent_65%)]",
        )}
      />
      <div
        className={cn(
          "absolute -right-[12%] bottom-[2%] h-[36rem] w-[36rem] rounded-full",
          tone === "azure" ? "bg-[radial-gradient(circle,rgb(11_129_177/0.2),transparent_65%)]" : "bg-[radial-gradient(circle,rgb(247_200_92/0.12),transparent_65%)]",
        )}
      />
      {/* tracce di circuito che scorrono */}
      <svg className="absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1000 600" fill="none">
        <g strokeWidth="1" vectorEffect="non-scaling-stroke">
          <path d="M0 120 H210 L250 160 H520" stroke="var(--color-azure-400)" strokeOpacity="0.22" vectorEffect="non-scaling-stroke" />
          <path d="M1000 460 H760 L720 420 H540" stroke="var(--color-azure-400)" strokeOpacity="0.22" vectorEffect="non-scaling-stroke" />
          <path d="M0 470 H140 L180 510 H330" stroke="var(--color-gold-300)" strokeOpacity="0.16" vectorEffect="non-scaling-stroke" />
          <path d="M1000 90 H850 L810 130 H680" stroke="var(--color-gold-300)" strokeOpacity="0.16" vectorEffect="non-scaling-stroke" />
        </g>
        <g fill="var(--color-gold-300)" fillOpacity="0.7">
          <circle cx="520" cy="160" r="3" />
          <circle cx="540" cy="420" r="3" />
          <circle cx="330" cy="510" r="2.5" />
          <circle cx="680" cy="130" r="2.5" />
        </g>
      </svg>
      {rich && (
        <>
          <div
            className="absolute inset-0 opacity-70 [mask-image:radial-gradient(85%_80%_at_50%_50%,#000_30%,transparent)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(58 164 212 / 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgb(58 164 212 / 0.14) 1px, transparent 1px)",
              backgroundSize: `${CELL}px ${CELL}px`,
            }}
          />
          {DOTS.map((d, i) => (
            <span
              key={i}
              className={cn("tech-dot absolute rounded-full", d.gold ? "bg-gold-200 text-gold-300" : "bg-azure-300 text-azure-300")}
              style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, animationDelay: `${d.d}s` }}
            />
          ))}
        </>
      )}
      {cursor && <DigitalCursor />}
    </div>
  );
}
