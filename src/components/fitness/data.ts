import type { IconName } from "@/components/ui/Icon";

/** Contenuti della landing palestre (pagina non collegata dal sito: si raggiunge solo dal link diretto). */
export const fit = {
  /** Oggi → Con Triskell Fitness: ogni problema accanto al vantaggio che lo risolve. */
  compare: [
    { icon: "calendar", now: "Pieno a settembre, vuoto a luglio", next: "Contatti nuovi ogni mese, anche d'estate, con campagne sempre attive" },
    { icon: "smartphone", now: "Social fatti quando c'è tempo", next: "Contenuti pianificati ogni settimana, con script pronti e riprese" },
    { icon: "megaphone", now: "Promo e volantini che non portano nessuno", next: "Campagne Meta e Google mirate sulla tua zona, misurate al centesimo" },
    { icon: "phone", now: "Contatti che nessuno richiama", next: "Irelia AI scrive a ogni contatto in pochi secondi, anche la sera" },
    { icon: "chart", now: "Non sai quanto ti costa un iscritto", next: "Report mensile: costo per contatto, prove prenotate e iscrizioni" },
    { icon: "users", now: "Concorrenza a ogni angolo", next: "Un profilo che ti fa scegliere, non solo trovare" },
  ] satisfies Array<{ icon: IconName; now: string; next: string }>,

  numbers: [
    { value: 60, prefix: "30–", suffix: "", label: "lead al mese", note: "Forme Fitness · Urban Fitness" },
    { value: 500, prefix: "", suffix: "+", label: "contatti in un anno", note: "Vip Fit Monza" },
    { value: 3, prefix: "~1 su ", suffix: "", label: "prenota la prova", note: "Urban Fitness Lecco" },
    { value: 25, prefix: "5–", suffix: "K€", label: "fatturato al mese", note: "Forme Fitness" },
  ],

  funnel: [
    { icon: "video", title: "Contenuto", text: "Reel e post che mostrano palestra, coach e risultati veri." },
    { icon: "target", title: "Campagna", text: "Meta e Google Ads mirate sulle persone della tua zona." },
    { icon: "user", title: "Contatto", text: "La persona lascia nome e numero per la prova gratuita." },
    { icon: "bot", title: "Irelia AI", text: "Gli scrive subito su WhatsApp e fissa quando richiamarlo." },
    { icon: "dumbbell", title: "Prova", text: "Tu lo chiami all'ora giusta e viene in palestra." },
    { icon: "trophy", title: "Iscritto", text: "Un nuovo abbonamento, e il ciclo riparte ogni mese." },
  ] satisfies Array<{ icon: IconName; title: string; text: string }>,

  packages: [
    { name: "Start", contents: 8, perWeek: "2 a settimana", campaigns: "2–3 campagne al mese", points: ["Strategia e piano editoriale", "Script pronti per i video", "Editing e pubblicazione", "Report mensile"], tag: "" },
    { name: "Crescita", contents: 12, perWeek: "3 a settimana", campaigns: "4–5 campagne Meta e Google", points: ["Tutto di Start", "Campagne sempre attive sulla prova gratuita", "Test continui su offerte e creatività", "Call mensile sui numeri"], tag: "Il più scelto" },
    { name: "Dominio", contents: 16, perWeek: "4 a settimana", campaigns: "Campagne continue + Irelia AI", points: ["Tutto di Crescita", "Irelia AI che scrive a ogni contatto", "CRM per seguire prove e iscrizioni", "Priorità su riprese e novità"], tag: "" },
  ],

  faq: [
    { q: "Funziona anche per una palestra piccola?", a: "Sì: la maggior parte dei nostri clienti fitness sono palestre e studi locali. Le campagne lavorano sulla tua zona, quindi conta essere i più convincenti lì, non essere grandi." },
    { q: "Quanto devo investire in pubblicità?", a: "Dipende dalla zona e dagli obiettivi. Nei nostri casi fitness il budget va da circa 200–250€ a circa 700€ al mese, a parte il nostro lavoro. Lo definiamo insieme in call." },
    { q: "Devo registrare io i video?", a: "Scegli tu: veniamo noi in palestra a girare, oppure registri tu con script pronti e indicazioni passo passo. L'editing lo facciamo sempre noi." },
    { q: "In quanto tempo arrivano i primi contatti?", a: "Le campagne iniziano a portare contatti già dalle prime settimane. Per avere un sistema stabile e numeri affidabili servono alcuni mesi di rodaggio: per questo consigliamo almeno 6 mesi." },
    { q: "Perché il pacchetto da 6 mesi conviene?", a: "Perché ti diamo una scontistica maggiore e perché in 6 mesi c'è il tempo di costruire il profilo, ottimizzare le campagne e vedere i risultati crescere davvero." },
    { q: "Chi risponde ai contatti che arrivano?", a: "Con Irelia AI ogni contatto riceve subito un messaggio su WhatsApp, anche di sera e nel weekend. Tu trovi nome, richiesta e orario in cui richiamarlo." },
  ],
};
