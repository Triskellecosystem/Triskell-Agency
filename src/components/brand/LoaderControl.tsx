"use client";

import { useEffect } from "react";

const MIN_MS = 1300;

/** Chiude la schermata di caricamento a pagina caricata (almeno MIN_MS dopo l'apertura) e la ricorda per la sessione. */
export function LoaderControl() {
  useEffect(() => {
    const el = document.getElementById("tk-loader");
    const root = document.documentElement;
    if (!el) return;
    const done = () => {
      el.setAttribute("data-done", "");
      root.removeAttribute("data-loading");
      try {
        sessionStorage.setItem("tk-loaded", "1");
      } catch {}
      // niente el.remove(): il nodo è gestito da React, toglierlo a mano rompe la navigazione tra le pagine. Lo nascondiamo e basta.
      window.setTimeout(() => (el.style.display = "none"), 900);
    };
    const wait = () => window.setTimeout(done, Math.max(0, MIN_MS - performance.now()));
    let t = 0;
    if (document.readyState === "complete") t = wait();
    else {
      const on = () => (t = wait());
      window.addEventListener("load", on, { once: true });
      return () => {
        window.removeEventListener("load", on);
        window.clearTimeout(t);
      };
    }
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
