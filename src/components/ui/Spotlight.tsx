"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  /** Colore del bagliore: oro (Agency) o azure (Academy). */
  tone?: "gold" | "azure";
}

/**
 * Spotlight che segue il cursore. Il bagliore è un layer pre-renderizzato spostato
 * con transform (nessun repaint del gradiente) e mostrato con opacity. Nessuna dipendenza esterna.
 */
export function Spotlight({ children, className, size = 460, tone = "gold" }: SpotlightProps) {
  const glow = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  return (
    <div
      className={cn("group/spot relative overflow-hidden", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - r.left - size / 2;
        const y = e.clientY - r.top - size / 2;
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => {
          if (glow.current) glow.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      }}
    >
      <div
        ref={glow}
        aria-hidden="true"
        style={{ width: size, height: size, transform: `translate3d(${-size}px, ${-size}px, 0)` }}
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-[1] rounded-full opacity-0 transition-opacity duration-[var(--dur-base)] will-change-transform group-hover/spot:opacity-100",
          tone === "gold"
            ? "bg-[radial-gradient(circle,rgb(247_200_92/0.2),transparent_62%)]"
            : "bg-[radial-gradient(circle,rgb(42_144_195/0.22),transparent_62%)]",
        )}
      />
      {children}
    </div>
  );
}
