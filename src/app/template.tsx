/**
 * Transizione di pagina fluida: solo CSS (nessuna dipendenza da JS, LCP immediato).
 * `backwards` (non `both`): a fine animazione non resta alcun transform sul contenitore,
 * altrimenti romperebbe `position: fixed` (pin GSAP) dei discendenti.
 * Niente opacità: un antenato a opacity 0 escluderebbe l'intera pagina dal calcolo dell'LCP.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-[page-in_0.6s_var(--ease-out-expo)_backwards]">{children}</div>;
}
