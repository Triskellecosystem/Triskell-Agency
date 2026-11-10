import Image from "next/image";
import { LoaderControl } from "@/components/brand/LoaderControl";

/**
 * Schermata di caricamento: nero, simbolo dorato e scritta TRISKELL AGENCY, con linee tecniche attorno.
 * È HTML/CSS puro (nessun JS per mostrarla): compare al primo paint e <LoaderControl /> la fa sparire a pagina caricata.
 * Senza JS sparisce da sola dopo pochi secondi; con "riduci movimento" resta statica. Una volta per sessione.
 */
export function Loader() {
  return (
    <div id="tk-loader" className="loader" role="status" aria-live="polite" aria-label="Caricamento in corso">
      <div aria-hidden="true" className="loader-grid" />
      {/* linee tecniche */}
      <span aria-hidden="true" className="loader-hline loader-hline--a" />
      <span aria-hidden="true" className="loader-hline loader-hline--b" />
      <span aria-hidden="true" className="loader-vline loader-vline--a" />
      <span aria-hidden="true" className="loader-vline loader-vline--b" />
      <span aria-hidden="true" className="loader-corner loader-corner--tl" />
      <span aria-hidden="true" className="loader-corner loader-corner--tr" />
      <span aria-hidden="true" className="loader-corner loader-corner--bl" />
      <span aria-hidden="true" className="loader-corner loader-corner--br" />
      <p aria-hidden="true" className="loader-tag loader-tag--l">TRISKELL // SYS.BOOT</p>
      <p aria-hidden="true" className="loader-tag loader-tag--r">
        <span className="loader-pct" />
      </p>

      <div className="loader-center">
        <div className="loader-emblem" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="loader-ring">
            <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 7" />
            {Array.from({ length: 36 }, (_, i) => (
              <line key={i} x1="100" y1="2" x2="100" y2={i % 3 === 0 ? 11 : 7} stroke="currentColor" strokeWidth={i % 3 === 0 ? 1.4 : 0.8} transform={`rotate(${i * 10} 100 100)`} />
            ))}
          </svg>
          <svg viewBox="0 0 200 200" className="loader-ring loader-ring--rev">
            <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="30 14 4 14" opacity="0.7" />
            <circle cx="100" cy="22" r="2.6" fill="currentColor" />
          </svg>
          <Image src="/brand/triskell-layer-coils.png" alt="" width={360} height={360} sizes="11rem" priority className="loader-mark" />
        </div>
        <p className="loader-name">
          <span className="loader-name-a">TRISKELL</span>
          <span className="loader-name-b">AGENCY</span>
        </p>
        <span aria-hidden="true" className="loader-bar">
          <i />
        </span>
      </div>
      <LoaderControl />
    </div>
  );
}
