"use client";

import { useRef } from "react";

/**
 * Espone l'inclinazione verso il mouse come variabili CSS (--tx, --ty in gradi) ai figli,
 * che le sommano alla loro rotazione di base. Solo mouse, niente con reduced motion.
 */
export function TiltVars({ children, className, max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const set = (x: number, y: number) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--tx", `${x.toFixed(2)}deg`);
      ref.current?.style.setProperty("--ty", `${y.toFixed(2)}deg`);
    });
  };
  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
        set(-ny * max, nx * max);
      }}
      onPointerLeave={() => set(0, 0)}
    >
      {children}
    </div>
  );
}
