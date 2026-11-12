import Image from "next/image";
import { LoaderControl } from "@/components/brand/LoaderControl";
import { LOADER_WAVE } from "./loaderWave";

/**
 * Schermata di caricamento: blu notte, simbolo dorato e TRISKELL AGENCY dentro un arco di luce azzurra che gira,
 * barra azzurra, "Caricamento in corso…", fasci di luce e puntini che si muovono, onda di particelle in basso.
 * HTML/CSS puro: compare al primo paint e <LoaderControl /> la fa sparire a pagina caricata. Una volta per sessione.
 */
export function Loader() {
  return (
    <div id="tk-loader" className="loader ld2" role="status" aria-live="polite" aria-label="Caricamento in corso">
      <span aria-hidden="true" className="ld2-arc ld2-arc--corner" />
      {[0, 1, 2, 3].map((i) => <span key={i} aria-hidden="true" className="ld2-beam" style={{ top: `${18 + i * 17}%`, animationDelay: `${-i * 1.1}s`, animationDuration: `${4 + i * 0.7}s` }} />)}
      {Array.from({ length: 22 }, (_, i) => <span key={i} aria-hidden="true" className="ld2-dot" style={{ left: `${(i * 47) % 100}%`, top: `${(i * 61) % 80}%`, animationDelay: `${-(i * 0.37) % 5}s`, animationDuration: `${4 + (i % 5)}s` }} />)}
      <svg aria-hidden="true" className="ld2-wave" viewBox="0 0 1600 140" preserveAspectRatio="none" fill="#6ec0ff" dangerouslySetInnerHTML={{ __html: LOADER_WAVE }} />
      <span aria-hidden="true" className="ld2-wave-line" />
      <div className="ld2-center">
        <span aria-hidden="true" className="ld2-arc" />
        <Image src="/brand/triskell-layer-coils.png" alt="" width={360} height={360} sizes="7rem" priority className="ld2-mark" />
        <p className="ld2-name">
          <span>TRISKELL</span>
          <span>AGENCY</span>
        </p>
      </div>
      <div className="ld2-foot">
        <span aria-hidden="true" className="ld2-bar"><i /></span>
        <p className="ld2-text">Caricamento in corso…</p>
      </div>
      <LoaderControl />
    </div>
  );
}
