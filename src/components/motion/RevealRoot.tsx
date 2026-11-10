"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = "[data-reveal],[data-reveal-group],[data-reveal-split],[data-count],[data-inview-watch]";
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function format(value: number, decimals: number, prefix: string, suffix: string) {
  const n = new Intl.NumberFormat("it-IT", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
  return `${prefix}${n}${suffix}`;
}

/**
 * UN SOLO osservatore per tutta la pagina: gestisce reveal, stagger, titoli a maschera,
 * count-up e attivazione dei micro-visual. I componenti restano server component
 * (zero idratazione per istanza) e le animazioni sono CSS (opacity/transform).
 */
export function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setupCount = (el: HTMLElement) => {
      const target = Number(el.dataset.value ?? 0);
      const decimals = Number(el.dataset.decimals ?? 0);
      const prefix = el.dataset.prefix ?? "";
      const suffix = el.dataset.suffix ?? "";
      const duration = Number(el.dataset.duration ?? 1.8) * 1000;
      const node = el.firstChild;
      const write = (v: number) => {
        if (node) node.nodeValue = format(v, decimals, prefix, suffix);
      };
      if (!reduced) write(0);
      el.setAttribute("data-ready", "");
      return () => {
        if (reduced) return;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          write(target * easeOutExpo(t));
          if (t < 1) requestAnimationFrame(tick);
          else write(target);
        };
        requestAnimationFrame(tick);
      };
    };

    const runners = new WeakMap<Element, () => void>();
    // Gli elementi che partono da fuori schermo (data-far) non intersecano mai il viewport: si osserva il loro contenitore.
    const proxied = new Map<Element, HTMLElement[]>();
    const reveal = (el: HTMLElement) => {
      el.setAttribute("data-revealed", "");
      el.setAttribute("data-inview", "");
      runners.get(el)?.();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const list = proxied.get(el);
          if (list) {
            list.forEach(reveal);
            proxied.delete(el);
            if (el.matches(SELECTOR) && !el.hasAttribute("data-revealed")) reveal(el);
          } else {
            reveal(el);
          }
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
      // Nessun flag persistente sul DOM: con React Strict Mode (dev) l'effect gira due volte
      // e il cleanup disconnette l'observer, quindi ogni esecuzione deve poter ri-osservare.
      if (el.hasAttribute("data-revealed")) return;
      if (el.hasAttribute("data-count")) runners.set(el, setupCount(el));
      if (reduced) {
        el.setAttribute("data-revealed", "");
        el.setAttribute("data-inview", "");
        if (el.hasAttribute("data-count")) el.setAttribute("data-ready", "");
        return;
      }
      const host = el.hasAttribute("data-far") ? el.parentElement : null;
      if (host) {
        const list = proxied.get(host) ?? [];
        list.push(el);
        proxied.set(host, list);
        io.observe(host);
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
