"use client";

import { useEffect } from "react";

/** Accende (data-on) gli elementi con [data-lit] quando arrivano a circa 2/3 dello schermo mentre scorri. */
export function FitScrollLit() {
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const line = innerHeight * 0.66;
      document.querySelectorAll<HTMLElement>("[data-lit]").forEach((el) => {
        if (el.getBoundingClientRect().top < line) el.setAttribute("data-on", "");
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", on, { passive: true });
    check();
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
