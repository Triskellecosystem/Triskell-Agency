"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Il logo reagisce al mouse: si inclina in 3D verso il cursore (anche quando è vicino, non solo sopra),
 * un riflesso luminoso lo segue e, in idle, "respira" piano. Solo transform/opacity.
 * Solo puntatore preciso e senza reduced motion; altrove resta il respiro lento.
 */
export function LogoTilt({ children, className, max = 18 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest("section");
    if (!el || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let nx = 0;
    let ny = 0;
    let over = 0;
    let visible = true;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--lx", (nx * max).toFixed(2));
      el.style.setProperty("--ly", (-ny * max).toFixed(2));
      el.style.setProperty("--gx", `${(50 + nx * 38).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(50 + ny * 38).toFixed(1)}%`);
      el.style.setProperty("--lo", over ? "1" : "0.55");
    };
    const onMove = (e: Event) => {
      if (!visible) return;
      const ev = e as PointerEvent;
      if (ev.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const reach = Math.max(r.width, 320) * 1.6;
      nx = Math.max(-1, Math.min(1, (ev.clientX - cx) / reach));
      ny = Math.max(-1, Math.min(1, (ev.clientY - cy) / reach));
      over = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom ? 1 : 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      nx = 0;
      ny = 0;
      over = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const io = new IntersectionObserver(([en]) => {
      visible = !!en?.isIntersecting;
    });
    io.observe(el);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [max]);

  return (
    <div ref={ref} className={cn("logo-breathe relative", className)} style={{ "--lx": 0, "--ly": 0, "--gx": "50%", "--gy": "50%", "--lo": 0.55 } as React.CSSProperties}>
      <div className="logo-tilt relative">
        {children}
        <span aria-hidden="true" className="logo-glint pointer-events-none absolute inset-[6%] rounded-full" />
      </div>
    </div>
  );
}
