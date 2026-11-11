import { SceneVideo } from "@/components/ui/SceneVideo";
import { Icon } from "@/components/ui/Icon";

/** Apertura di Risultati: il video della stretta di mano (un cliente chiuso) e, sotto, due etichette che non coprono il video. */
export function ClientVideo() {
  return (
    <div>
      <SceneVideo src="/video/clienti.mp4" poster="/video/clienti.jpg" label="Una stretta di mano: un nuovo cliente acquisito" tag="Nuovo cliente · Triskell" />
      <div className="mt-4 flex flex-wrap justify-center gap-2.5">
        <span className="sw-badge inline-flex items-center gap-2 rounded-full border border-lime-300/40 bg-night/80 py-1.5 pl-1.5 pr-3.5 text-[0.75rem] font-semibold text-fg backdrop-blur">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-lime-300 text-night"><Icon name="handshake" className="h-3.5 w-3.5" strokeWidth={2.4} /></span>
          Contratto firmato
        </span>
        <span className="sw-badge inline-flex items-center gap-2 rounded-full border border-gold-300/50 bg-night/80 py-1.5 pl-1.5 pr-3.5 text-[0.75rem] font-semibold text-fg backdrop-blur [animation-delay:-2.5s]">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night"><Icon name="users" className="h-3.5 w-3.5" strokeWidth={2.4} /></span>
          +1 cliente acquisito
        </span>
      </div>
    </div>
  );
}
