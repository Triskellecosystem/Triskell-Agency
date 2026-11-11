import { cn } from "@/lib/cn";
import { Stage3D } from "./Stage3D";

/**
 * Sfondi delle sezioni, uno diverso per ogni sezione della stessa pagina (stessa palette blu notte e oro):
 * stanze 3D (room, rings, horizon, rays) e sfondi leggeri solo CSS (aurora, dots, grid, waves, beams, orbit,
 * glow, diagonal). Animazioni solo transform/opacity, ferme con reduced motion.
 */
export type BgKind = "room" | "rings" | "horizon" | "rays" | "aurora" | "dots" | "grid" | "waves" | "beams" | "orbit" | "glow" | "diagonal";

export function SectionBg({ kind, tone = "mixed", view, className }: { kind: BgKind; tone?: "mixed" | "gold" | "azure"; view?: "center" | "left" | "right" | "low"; className?: string }) {
  if (kind === "room") return <Stage3D tone={tone} view={view} className={cn("st3-noring", className)} />;
  if (kind === "rings") return <Stage3D kind="rings" tone={tone} view={view} className={className} />;
  if (kind === "horizon") return <Stage3D kind="horizon" tone={tone} view={view} className={className} />;
  if (kind === "rays") return <Stage3D kind="lines" tone={tone} view={view} className={className} />;
  return (
    <div aria-hidden="true" className={cn("sbg pointer-events-none absolute inset-0 -z-10 overflow-hidden", `sbg--${kind}`, `sbg--t-${tone}`, className)}>
      {kind === "aurora" && (
        <>
          <span className="sbg-blob sbg-blob--a" />
          <span className="sbg-blob sbg-blob--b" />
          <span className="sbg-blob sbg-blob--c" />
        </>
      )}
      {kind === "waves" && (
        <svg className="sbg-waves" viewBox="0 0 1200 600" preserveAspectRatio="none">
          {Array.from({ length: 14 }, (_, i) => (
            <path key={i} d={`M0 ${120 + i * 26} C 300 ${60 + i * 26}, 500 ${200 + i * 26}, 800 ${130 + i * 26} S 1100 ${80 + i * 26}, 1200 ${140 + i * 26}`} />
          ))}
        </svg>
      )}
      {kind === "beams" && (
        <>
          <span className="sbg-beam" style={{ left: "12%" }} />
          <span className="sbg-beam sbg-beam--g" style={{ left: "38%", animationDelay: "-4s" }} />
          <span className="sbg-beam" style={{ left: "64%", animationDelay: "-8s" }} />
          <span className="sbg-beam sbg-beam--g" style={{ left: "86%", animationDelay: "-2s" }} />
        </>
      )}
      {kind === "orbit" && (
        <span className="sbg-orbit">
          <i />
          <i />
          <i />
          <b />
        </span>
      )}
      {kind === "glow" && <span className="sbg-glow" />}
    </div>
  );
}
