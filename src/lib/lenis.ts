import type Lenis from "lenis";

/** Registro minimale dell'istanza Lenis, condiviso tra SmoothScroll, menu mobile e GSAP. */
let instance: Lenis | null = null;
const listeners = new Set<(lenis: Lenis | null) => void>();

export function getLenis(): Lenis | null {
  return instance;
}

export function setLenis(next: Lenis | null): void {
  instance = next;
  listeners.forEach((cb) => cb(next));
}

/** Si registra e viene chiamato subito se Lenis esiste già. Ritorna l'unsubscribe. */
export function onLenis(cb: (lenis: Lenis | null) => void): () => void {
  listeners.add(cb);
  if (instance) cb(instance);
  return () => {
    listeners.delete(cb);
  };
}
