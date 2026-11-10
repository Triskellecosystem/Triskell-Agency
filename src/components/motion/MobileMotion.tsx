"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Solo telefono: le file di card (`.m-carousel.m-auto`) scorrono da sole, piano, quando sono in vista, per far capire
 * che si possono sfogliare. Appena l'utente le tocca si fermano per sempre. Con "riduci movimento" non fa nulla.
 */
export function MobileMotion() {
  const path = usePathname();
  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers = new Map<Element, number>();
    const stopped = new WeakSet<Element>();
    const stop = (el: Element) => {
      stopped.add(el);
      const t = timers.get(el);
      if (t) window.clearInterval(t);
      timers.delete(el);
    };
    const step = (el: HTMLElement) => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const w = first.getBoundingClientRect().width + 12;
      const end = el.scrollWidth - el.clientWidth - 4;
      el.scrollTo({ left: el.scrollLeft >= end ? 0 : el.scrollLeft + w, behavior: "smooth" });
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          const el = en.target as HTMLElement;
          if (stopped.has(el)) continue;
          if (en.isIntersecting && !timers.has(el)) timers.set(el, window.setInterval(() => step(el), 3200));
          else if (!en.isIntersecting && timers.has(el)) {
            window.clearInterval(timers.get(el));
            timers.delete(el);
          }
        }
      },
      { threshold: 0.6 },
    );
    const t = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".m-carousel.m-auto").forEach((el) => {
        io.observe(el);
        for (const ev of ["touchstart", "pointerdown", "wheel"]) el.addEventListener(ev, () => stop(el), { once: true, passive: true });
      });
    }, 600);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
      timers.forEach((id) => window.clearInterval(id));
    };
  }, [path]);
  return null;
}
