import { SceneVideo } from "@/components/ui/SceneVideo";
import { Icon } from "@/components/ui/Icon";

/** Apertura di Risultati: il video della stretta di mano (un cliente chiuso) con due badge che fluttuano. */
export function ClientVideo() {
  return (
    <div className="relative">
      <SceneVideo src="/video/clienti.mp4" poster="/video/clienti.jpg" label="Una stretta di mano: un nuovo cliente acquisito" tag="Nuovo cliente · Triskell" />
      <span className="sw-badge absolute -left-3 top-[18%] z-10 inline-flex items-center gap-2 rounded-full border border-lime-300/40 bg-night/90 py-1.5 pl-1.5 pr-3.5 text-[0.75rem] font-semibold text-fg shadow-[0_14px_30px_-12px_rgb(0_0_0/0.9)] backdrop-blur sm:-left-6">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-lime-300 text-night"><Icon name="handshake" className="h-3.5 w-3.5" strokeWidth={2.4} /></span>
        Contratto firmato
      </span>
      <span className="sw-badge absolute -left-3 bottom-[14%] z-10 inline-flex items-center gap-2 rounded-full border border-gold-300/50 bg-night/90 py-1.5 pl-1.5 pr-3.5 text-[0.75rem] font-semibold text-fg shadow-[0_14px_30px_-12px_rgb(0_0_0/0.9)] backdrop-blur [animation-delay:-2.5s] sm:-left-6">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night"><Icon name="users" className="h-3.5 w-3.5" strokeWidth={2.4} /></span>
        +1 cliente acquisito
      </span>
    </div>
  );
}
