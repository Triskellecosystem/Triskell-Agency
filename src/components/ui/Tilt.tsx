"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Inclinazione 3D al passaggio del mouse (solo desktop con puntatore preciso, no reduced motion).
 * Solo transform: l'elemento resta sul suo asse, ruota leggermente verso il cursore.
 */
export function Tilt({ children, className, max = 5 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const ok = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={ref}
      className={cn("[transform-style:preserve-3d] transition-transform duration-[var(--dur-slow)] ease-out-expo", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ok()) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => {
          el.style.transform = `perspective(1100px) rotateX(${(-ny * max).toFixed(2)}deg) rotateY(${(nx * max).toFixed(2)}deg)`;
        });
      }}
      onPointerLeave={() => {
        cancelAnimationFrame(raf.current);
        if (ref.current) ref.current.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
      }}
    >
      {children}
    </div>
  );
}
