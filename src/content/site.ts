/**
 * ============================================================================
 *  TRISKELL AGENCY — CONTENUTI DEL SITO
 *  Tutto il testo del sito vive in questo file. Modifica qui i copy senza
 *  toccare i componenti.
 *
 *  Regole: titoli max 6 parole · descrizioni max 12 parole · niente paragrafi.
 *  Ogni valore marcato `// TODO: dato reale` è un SEGNAPOSTO da sostituire.
 *  Elenco completo dei segnaposto:  npm run todos
 * ============================================================================
 */

import type { IconName } from "@/components/ui/Icon";

/* ------------------------------ Tipi ---------------------------------------- */

export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Cifre decimali (es. 2,5) */
  decimals?: number;
  label: string;
  /** true = segnaposto, da sostituire con un dato reale */
  todo?: true;
}

export interface NavLink {
  label: string;
  href: string;
  /** Riga di spiegazione nel menu a tendina. */
  hint?: string;
  /** Voci del menu a tendina. */
  children?: NavLink[];
}

/** Uno step di un percorso (Agency o Academy). */
export interface PathStep {
  icon: IconName;
  title: string;
  text: string;
}

/** Cosa ottieni, in sintesi: pochi punti decisivi, con numeri che crescono. */
export interface Impact {
  /** Punti decisivi; `stat` = numero grande che compare e cresce (`still` = testo fisso). */
  points: Array<{ icon: IconName; title: string; text: string; stat?: Metric & { still?: true } }>;
  /** Barre che si riempiono (nessun dato: solo progressione). */
  meters?: string[];
  /** Etichetta finale: compare, dorata, quando tutte le barre sono complete. */
  finale: { icon: IconName; label: string; text: string };
}

export interface Path {
  name: string;
  tagline: string;
  steps: PathStep[];
  impact: Impact;
  cta: { label: string; href: string };
}

export interface Service {
  icon: IconName;
  title: string;
  text: string;
  /** Cosa facciamo, in 4 punti brevi: compaiono quando si apre la scheda. */
  details: string[];
  /** Risultato tipico, mostrato in grande nel pannello del servizio. */
  kpi?: { value: string; label: string };
  href?: string;
}

export interface CtaContent {
  title: string;
  /** Il titolo spezzato in due: la prima riga entra da sinistra, la seconda da destra. */
  lines: [string, string];
  text: string;
}

/** Caso studio reale (dati del sito originale). */
export interface CaseStudy {
  id: string;
  sector: string;
  place: string;
  client: string;
  tag: string;
  stats: [{ value: string; label: string }, { value: string; label: string }];
  text: string;
  /** Tinta della "copertina" (token cromatico del brand). */
  tone: "gold" | "azure" | "cobalt" | "lime" | "rose";
  icon: IconName;
  /** Foto reale del cliente in /public/cases */
  image: string;
}

export interface SiteItem {
  id: string;
  name: string;
  category: string;
  /** Dominio mostrato nella finestra del browser. */
  domain: string;
  url: string;
  /** Screenshot in /public/sites */
  image: string;
  /** Screenshot lungo (pagina intera) mostrato mentre scorre nel portatile. */
  tall?: string;
  /** Sito dimostrativo inventato (non è un cliente reale). */
  demo?: true;
}

export interface Pillar {
  from: string;
  to: string;
  text: string;
  icon: IconName;
}

/** Una fase della presentazione: finestra di scroll (0-1) e contenuti. */
export interface PersonPhase {
  id: string;
  /** Inizio e fine della fase lungo lo scroll del blocco (0-1). */
  from: number;
  to: number;
  kicker: string;
  title: string;
  text: string;
  tags?: string[];
  stats?: Array<{ value: string; label: string }>;
  /** Blocchi sintetici (es. competenze), mostrati a griglia. */
  blocks?: Array<{ title: string; text: string }>;
  /** Mostra il titolo come citazione. */
  quote?: boolean;
}

/** Un punto della camera lungo lo scroll: punto inquadrato sulla foto (u,v), dolly (tz, px), rotazione orbitale e foto della scena. */
export interface CameraKey {
  at: number;
  u: number;
  v: number;
  tz: number;
  ry: number;
  rx: number;
  /** 0 = figura ritagliata, 1 = foto della scena (scrivania). */
  scene: number;
}

export interface Person {
  id: string;
  name: string;
  short: string;
  role: string;
  tone: "azure" | "red";
  /** Da che lato sta la figura su desktop. */
  layout: "left" | "right";
  /** Foto isolata dallo sfondo (PNG/WebP con alpha), proporzioni 2:3. */
  cutout: string;
  /** Primo piano finale (fotografia al computer), usato come ultima inquadratura. */
  scene: string;
  camera: CameraKey[];
  phases: PersonPhase[];
}

export interface Faq {
  q: string;
  a: string;
}

export interface Social {
  id: "instagram" | "youtube" | "whatsapp" | "tiktok";
  label: string;
  href: string;
}

/* ------------------------------ Contenuti ------------------------------------ */

/** Il sito "madre": Triskell Agency è uno dei rami di Triskell Ecosystem. */
const ECOSYSTEM_URL = "https://www.triskellecosystem.com"; // TODO: dominio definitivo del sito Triskell Ecosystem
const ACADEMY_URL = "https://triskellacademy.com";

export const site = {
  brand: {
    name: "Triskell Agency",
    short: "Triskell",
    tagline: "Più clienti per la tua attività. Al resto pensiamo noi.",
    slogan: "Deleghi tutto. Tu pensi a crescere.",
    description:
      "Triskell Agency porta più clienti alla tua attività: Meta Ads e Google Ads, social, siti web, CRM, automazioni e agenti AI. Deleghi tutto a noi.",
    url: "https://triskellagency.com", // TODO: dominio definitivo
    email: "triskel.ecosystem@gmail.com",
    vat: "IT02759140995",
    owner: "Tomaso Forno",
    phone: "+39 348 430 1500",
    whatsapp: "https://wa.me/393484301500",
    locale: "it_IT",
    /** Sito generale dell'ecosistema, mostrato come "infrastruttura" dietro l'agenzia. */
    ecosystemUrl: ECOSYSTEM_URL,
    academyUrl: ACADEMY_URL,
  },

  nav: {
    items: [
      { label: "Home", href: "/" },
      { label: "Metodo Triskell", href: "/metodo-triskell" },
      { label: "Social media", href: "/social" },
      {
        label: "Siti web",
        href: "/siti-web",
        children: [
          { label: "Come lo creiamo", href: "/siti-web", hint: "Dalla prima call al sito finito" },
          { label: "Portfolio siti", href: "/siti-web/portfolio", hint: "I siti che abbiamo realizzato" },
        ],
      },
      { label: "Risultati", href: "/risultati" },
      { label: "Chi siamo", href: "/chi-siamo" },
    ] satisfies NavLink[],
    cta: { label: "Prenota ora", href: "/contatti" },
    menuOpen: "Apri il menu",
    menuClose: "Chiudi il menu",
    skip: "Vai al contenuto",
  },

  hero: {
    overline: "Triskell Agency · Social, ADV e AI",
    title: "Vuoi più clienti",
    titleAccent: "per la tua attività?",
    subtitle: "Social, campagne, siti e agenti AI. Un solo team, risultati misurabili.",
    primaryCta: { label: "Prenota una call gratuita", href: "/contatti" },
    secondaryCta: { label: "Il Metodo Triskell", href: "/metodo-triskell" },
    trust: ["Call gratuita", "30 minuti", "Nessun impegno"],
    keyNumbers: [
      { value: 100, prefix: "+", suffix: "K", label: "Lead generati" },
      { value: 5, prefix: "+", suffix: "M€", label: "Budget ADV gestito" },
      { value: 70, suffix: "+", label: "Progetti" },
      { value: 10, suffix: "+", label: "Anni di esperienza" },
    ] satisfies Metric[],
    board: {
      title: "Crescita clienti",
      live: "Live",
      chartLabel: "Contatti al mese",
      /** Notifiche dimostrative che scorrono nella dashboard. */
      feed: [
        { icon: "users", text: "Nuovo lead", meta: "Meta Ads · 2 s fa" },
        { icon: "calendar", text: "Prova prenotata", meta: "Agente AI · 5 s fa" },
        { icon: "trending", text: "+38 follower", meta: "Instagram · oggi" },
        { icon: "click", text: "Campagna ottimizzata", meta: "Google Ads · 1 min fa" },
        { icon: "messages", text: "Risposta inviata", meta: "WhatsApp · 12 s fa" },
        { icon: "send", text: "Reel pubblicato", meta: "Instagram · 18:30" },
      ] satisfies Array<{ icon: IconName; text: string; meta: string }>,
    },
    symbolAlt: "Simbolo Triskell: tre spirali oro in un medaglione blu notte",
  },

  /** Nastro che scorre sotto la hero. */
  marquee: ["Meta Ads", "Google Ads", "Gestione social", "Siti web", "CRM su misura", "Agenti AI", "Automazioni", "Applicazioni", "Video con l'AI", "Strategia"],

  /** Muro dei numeri. */
  numbers: {
    overline: "I numeri",
    title: "Parlano i [risultati]",
    line: "Dieci anni sul campo, tradotti in contatti, clienti e fatturato.",
    items: [
      { value: 100, prefix: "+", suffix: "K", label: "Lead generati per i clienti", icon: "users" },
      { value: 5, prefix: "+", suffix: "M€", label: "Budget pubblicitario gestito", icon: "target" },
      { value: 70, suffix: "+", label: "Progetti realizzati", icon: "rocket" },
      { value: 50, suffix: "+", label: "Attività seguite", icon: "briefcase" },
      { value: 10, suffix: "+", label: "Anni di esperienza", icon: "award" },
      { value: 15, suffix: "K+", label: "Persone ci seguono sui social", icon: "share" },
    ] satisfies Array<Metric & { icon: IconName }>,
    /** Riga di casi veri sotto il muro. */
    proof: [
      { value: "30–60", label: "lead al mese", who: "Forme Fitness · Varese" },
      { value: "500+", label: "contatti in un anno", who: "Vip Fit · Monza" },
      { value: "~1 su 3", label: "prenota la prova", who: "Urban Fitness · Lecco" },
      { value: "5–25K€", label: "fatturato mensile", who: "Forme Fitness · Varese" },
    ],
  },

  /** A chi è adatto. */
  forWho: {
    overline: "Per chi è",
    title: "È per te se [ti riconosci]",
    answer: "Sì",
    closing: "Se hai risposto sì almeno una volta, parliamone.",
    line: "Attività locali, professionisti e aziende che vogliono crescere senza perdere tempo.",
    items: [
      { icon: "users", title: "Vuoi più clienti ogni mese?", text: "" },
      { icon: "target", title: "Le pubblicità non ti hanno mai reso?", text: "" },
      { icon: "monitor", title: "Il sito non ti porta contatti?", text: "" },
      { icon: "clock", title: "Non hai tempo per i social?", text: "" },
      { icon: "messages", title: "Rincorri messaggi tutto il giorno?", text: "" },
      { icon: "cpu", title: "Vuoi usare l'AI ma non sai da dove iniziare?", text: "" },
    ] satisfies Array<{ icon: IconName; title: string; text: string }>,
    sectors: ["Palestre e fitness", "Studi medici e sanitari", "Ristoranti", "Centri estetici", "Hotel e affittacamere", "Scuole e formazione", "E-commerce", "Professionisti"],
    sectorsLabel: "Settori che seguiamo",
  },

  /** Servizi completi. */
  services: {
    overline: "Servizi",
    title: "I nostri [servizi]",
    line: "",
    items: [
      { icon: "click", title: "Meta Ads e Google Ads", text: "Campagne che portano contatti e clienti veri.", kpi: { value: "30–60", label: "lead al mese per cliente" }, details: ["Strategia e obiettivi di campagna", "Creatività e testi, anche con l'AI", "Test A/B: teniamo ciò che funziona", "Ottimizzazione e report costanti"] },
      { icon: "smartphone", title: "Gestione social media", text: "Più visibilità al profilo, il minimo impegno per te.", kpi: { value: "12", label: "contenuti al mese: la base consigliata" }, details: ["Script pronti e indicazioni per le riprese", "Editing professionale dei video", "Pubblicazione e gestione del profilo", "Report mensile con i numeri"], href: "/social" },
      { icon: "monitor", href: "/siti-web", title: "Siti web e landing", text: "Siti veloci e chiari, pensati per farti contattare.", kpi: { value: "10–30", label: "richieste al mese da una landing" }, details: ["Design su misura, anche in WordPress", "Veloce e perfetto sul telefono", "Costruito per trasformare i visitatori in contatti", "Form, WhatsApp e tracciamento collegati"] },
      { icon: "database", title: "CRM su misura", text: "Contatti e vendite in un posto solo.", kpi: { value: "~1 su 3", label: "contatti che prenotano la prova" }, details: ["Tutti i contatti in un posto solo", "Pipeline delle vendite chiara", "Follow-up e promemoria automatici", "Collegato a campagne e sito"] },
      { icon: "bot", title: "Agenti AI", text: "Assistenti che rispondono, qualificano e prenotano.", kpi: { value: "24/7", label: "risposte ai clienti, senza pause" }, details: ["Risposte immediate, anche di notte", "Qualifica dei contatti in automatico", "Appuntamenti fissati in agenda", "Su WhatsApp, sito e social"] },
      { icon: "workflow", title: "Automazioni", text: "Il lavoro ripetitivo si fa da solo.", kpi: { value: "0", label: "contatti dimenticati" }, details: ["Messaggi e promemoria automatici", "Report che arrivano da soli", "Preventivi e documenti generati", "I tuoi strumenti collegati tra loro"] },
      { icon: "code", title: "Applicazioni su misura", text: "Strumenti digitali sul tuo modo di lavorare.", kpi: { value: "Da 0", label: "a piattaforma con area membri" }, details: ["Partiamo dalla tua esigenza", "Prototipo veloce con l'AI", "Su misura sui tuoi processi", "Online e seguita nel tempo"] },
      { icon: "film", title: "Video e contenuti AI", text: "Video professionali creati con l'AI.", kpi: { value: "x10", label: "contenuti, nello stesso tempo" /* TODO: conferma */ }, details: ["Idea e sceneggiatura", "Video e immagini creati con l'AI", "Formati per social e ADV", "Pronti da pubblicare"] },
    ] satisfies Service[],
  },

  /** Agenti AI e automazioni: la sezione "delega all'AI". */
  ai: {
    overline: "In collaborazione con Irelia AI",
    title: "L'assistente AI che [ti scalda i contatti]",
    line: "Arriva un contatto dalla campagna: Irelia gli scrive subito, raccoglie quando vuole essere richiamato e tu chiami un cliente già pronto.",
    badges: ["H24 sempre attivo", "Risposte immediate", "Scrive in modo naturale"],
    steps: [
      { icon: "click", title: "Campagna attiva", text: "Meta Ads porta un contatto" },
      { icon: "bot", title: "Irelia scrive", text: "In pochi secondi, H24" },
      { icon: "clock", title: "Fascia oraria", text: "Il cliente sceglie quando" },
      { icon: "phone", title: "Tu richiami", text: "Cliente già caldo" },
      { icon: "calendar", title: "Prova fissata", text: "E concordata al telefono" },
      { icon: "bell", title: "Promemoria", text: "Irelia gliela ricorda" },
    ] satisfies Array<{ icon: IconName; title: string; text: string }>,
    chat: {
      name: "Aura Beauty Lab",
      status: "Irelia · assistente AI · online",
      lead: "Nuovo contatto da Meta Ads · Martina",
      messages: [
        { from: "ai", text: "Ciao Martina! Sono Giulia, l'assistente di Aura Beauty Lab 😊 Ho visto che ti interessa la consulenza gratuita.", time: "21:14" },
        { from: "ai", text: "In che fascia oraria preferisci essere richiamata?", time: "21:14" },
        { from: "user", text: "Domani dopo le 18, grazie!", time: "21:16" },
        { from: "ai", text: "Perfetto! Ti chiamiamo domani tra le 18 e le 19. A presto ✨", time: "21:16" },
      ],
      booked: "Lead caldo · da richiamare domani 18–19",
      reminder: "Promemoria inviato: prova giovedì 18:30",
    },
    advantagesLabel: "Scopri i vantaggi del nostro assistente digitale",
    advantages: [
      { icon: "zap", title: "Risponde in pochi secondi", text: "Anche di notte e nei weekend: nessun contatto aspetta." },
      { icon: "messages", title: "Scrive come una persona", text: "Tono naturale e cordiale, su misura della tua attività." },
      { icon: "target", title: "Nessun lead perso", text: "Ogni contatto delle campagne viene seguito, sempre." },
      { icon: "clock", title: "Raccoglie la fascia oraria", text: "Richiami quando il cliente è disponibile e interessato." },
      { icon: "bell", title: "Ricorda gli appuntamenti", text: "Promemoria automatici: meno disdette e assenze." },
      { icon: "database", title: "Collegato al tuo CRM", text: "Contatti, note e stato del cliente in un posto solo." },
      { icon: "timer", title: "Ti fa risparmiare ore", text: "Il lavoro ripetitivo lo fa Irelia, tu chiudi le vendite." },
      { icon: "shield", title: "Seguito da noi", text: "Lo configuriamo, lo alleniamo e lo miglioriamo nel tempo." },
    ] satisfies Array<{ icon: IconName; title: string; text: string }>,
    console: {
      title: "Il tuo agente AI",
      status: "Al lavoro",
      tasks: [
        { icon: "messages", text: "Risposto a Giulia su WhatsApp", time: "2 s" },
        { icon: "calendar", text: "Prova prenotata · giovedì 18:30", time: "8 s" },
        { icon: "database", text: "Nuovo contatto nel CRM", time: "1 s" },
        { icon: "bell", text: "Promemoria a 12 clienti", time: "3 s" },
        { icon: "send", text: "Preventivo inviato a Marco", time: "5 s" },
        { icon: "trending", text: "Report settimanale pronto", time: "4 s" },
        { icon: "users", text: "Lead qualificato", time: "2 s" },
      ] satisfies Array<{ icon: IconName; text: string; time: string }>,
      stats: [
        { value: 24, suffix: "/7", label: "Sempre attivo" },
        { value: 30, prefix: "<", suffix: " s", label: "Risposta" },
        { value: 20, suffix: "h", label: "Risparmiate / sett.", todo: true }, // TODO: dato reale
      ] satisfies Metric[],
      hours: "Ore restituite a te",
    },
    cta: { label: "Voglio il mio assistente AI", href: "/contatti" },
  },

  /** Prima / dopo. */
  benefits: {
    overline: "I vantaggi",
    title: "Cosa cambia [con noi]",
    line: "Dalla confusione a un sistema che lavora ogni giorno per te.",
    before: {
      label: "Senza Triskell",
      items: ["Clienti che arrivano a caso", "Pubblicità che brucia budget", "Messaggi persi e risposte in ritardo", "Sito vecchio che nessuno contatta", "Ore perse in lavoro ripetitivo"],
    },
    after: {
      label: "Con Triskell",
      items: ["Contatti nuovi, ogni mese", "Campagne misurate e ottimizzate", "Risposte immediate, con l'AI", "Un sito che trasforma visite in clienti", "Tempo libero per far crescere l'attività"],
    },
    impact: [
      { icon: "users", title: "Più contatti", text: "Campagne e social portano richieste ogni mese.", stat: { value: 60, prefix: "30–", label: "lead al mese per cliente" } },
      { icon: "messages", title: "Più clienti", text: "CRM, AI e follow-up li trasformano in vendite.", stat: { value: 3, prefix: "~1 su ", label: "prenota la prova", still: true } },
      { icon: "trending", title: "Più fatturato", text: "Un sistema continuo, che cresce nel tempo.", stat: { value: 25, prefix: "5–", suffix: "K€", label: "al mese generati" } },
    ] satisfies Impact["points"],
  },

  paths: {
    agency: {
      name: "Agency",
      tagline: "Ti accompagniamo lungo tutto il funnel",
      steps: [
        { icon: "calendar", title: "Call gratuita", text: "Capiamo la tua attività, gli obiettivi e il budget." },
        { icon: "search", title: "Analisi del funnel", text: "Vediamo dove perdi clienti e come recuperarli." },
        { icon: "target", title: "Strategia e posizionamento", text: "Un piano chiaro per farti scegliere dal mercato." },
        { icon: "share", title: "Campagne e social", text: "Lanciamo Meta Ads, Google Ads e contenuti." },
        { icon: "globe", title: "Sito e landing", text: "Pagine veloci, costruite per farti contattare." },
        { icon: "bot", title: "CRM, automazioni e AI", text: "Ogni contatto viene seguito, anche quando dormi." },
        { icon: "rocket", title: "Report e crescita", text: "Misuriamo, ottimizziamo e scaliamo ciò che funziona." },
      ],
      impact: { points: [], finale: { icon: "rocket", label: "Crescita", text: "Il tuo business cresce, mese dopo mese." } },
      cta: { label: "Prenota la call", href: "/contatti" },
    } satisfies Path,
  },

  method: {
    overline: "Come funziona",
    title: "Dalla call ai risultati, [step by step]",
    line: "Un percorso chiaro: sai sempre cosa stiamo facendo e perché.",
    getLabel: "Ricevi",
    /** Cosa ricevi a ogni passo (stesso ordine di paths.agency.steps). */
    gets: ["Un'analisi gratuita", "La mappa del tuo funnel", "Un piano d'azione", "Campagne attive", "Sito o landing online", "CRM e agente AI attivi", "Report mensile chiaro"],
  },

  /* ------------------------------------------------------------------------
     METODO TRISKELL: gestione social + campagne (+ sito, se serve)
     ------------------------------------------------------------------------ */
  metodo: {
    overline: "Il nostro metodo",
    name: "Metodo Triskell",
    tagline: "Social + Campagne",
    title: "Metodo [Triskell]",
    line: "Un profilo attivo dà fiducia. Le campagne portano contatti. Insieme fanno crescere.",
    venn: {
      social: { title: "Social", points: ["Profilo curato e attivo", "Contenuti ogni settimana", "Fiducia e credibilità"] },
      ads: { title: "Campagne", points: ["Meta Ads e Google Ads", "Contatti nuovi ogni giorno", "Più follower al profilo"] },
      center: "Più clienti",
      site: "Sito web, se serve",
    },
    facts: [
      { value: "6", unit: "mesi", label: "collaborazione minima" },
      { value: "12", unit: "contenuti", label: "al mese, consigliati" },
      { value: "4–5", unit: "campagne", label: "al mese, consigliate" },
    ],
    formula: {
      parts: [
        { icon: "smartphone", name: "Social", text: "Il profilo è curato, aggiornato e vivo." },
        { icon: "click", name: "Campagne", text: "Meta Ads e Google Ads portano contatti nuovi." },
      ],
      optional: { icon: "monitor", name: "Sito web", text: "Se serve, lo rifacciamo per convertire di più.", tag: "Se serve" },
      result: { icon: "trending", name: "Più clienti", text: "Un sistema che cresce mese dopo mese." },
    } satisfies {
      parts: Array<{ icon: IconName; name: string; text: string }>;
      optional: { icon: IconName; name: string; text: string; tag: string };
      result: { icon: IconName; name: string; text: string };
    },
    whyTitle: "Perché insieme [funzionano meglio]",
    why: [
      { icon: "eye", title: "Chi vede la pubblicità, visita il profilo", text: "Se trova un profilo attivo e curato si fida, e ti contatta. Se lo trova fermo, se ne va." },
      { icon: "shield", title: "Un profilo seguito dà credibilità", text: "Contenuti costanti mostrano che l'attività è viva, seguita e professionale: le campagne convertono di più." },
      { icon: "users", title: "Le campagne fanno crescere il profilo", text: "Più persone ti scoprono, più follower, più interazioni: il profilo diventa una vetrina sempre più forte." },
      { icon: "chart", title: "I dati guidano i contenuti", text: "Le campagne ci dicono cosa piace al tuo pubblico: lo usiamo per creare contenuti che rendono di più." },
    ] satisfies Array<{ icon: IconName; title: string; text: string }>,
    /** Collaborazione minima e rodaggio. */
    rodaggio: {
      overline: "Il tempo di rodaggio",
      title: "Collaborazione da [minimo 6 mesi]",
      line: "Per creare la struttura, metterla in moto e vedere i risultati servono almeno 6 mesi. Con meno tempo non è possibile coordinare tutto: l'abbiamo visto in tanti casi, i risultati restano troppo relativi.",
      months: 6,
      phases: [
        { from: 1, to: 1, title: "Creiamo la struttura", text: "Call, strategia, registrazione ed editing dei primi contenuti, campagne pronte." },
        { from: 2, to: 3, title: "La mettiamo in moto", text: "Contenuti costanti, campagne attive, test e primi contatti." },
        { from: 4, to: 6, title: "Vediamo i risultati", text: "Ottimizziamo ciò che funziona e spingiamo dove rende di più." },
      ],
      badge: "Minimo 6 mesi",
      burst: ["+60 lead al mese", "+1.200 follower", "Prove prenotate", "+25K€ fatturato", "Clienti fidelizzati", "Campagne ottimizzate"],
    },
    /** Niente pacchetti fissi: base consigliata. */
    base: {
      overline: "La base che consigliamo",
      title: "Niente pacchetti fissi: [tutto su misura]",
      line: "Ogni attività è un caso a sé: dopo la prima call costruiamo la collaborazione sulla tua situazione. Ma c'è una base che consigliamo sempre ai nostri clienti.",
      label: "Base consigliata",
      items: [
        { value: 12, label: "contenuti al mese", unit: "contenuti al mese", note: "3 contenuti a settimana", icon: "film" },
        { value: 5, prefix: "4–", label: "campagne al mese", unit: "campagne al mese", note: "Meta Ads e Google Ads", icon: "click" },
      ] satisfies Array<Metric & { unit: string; note: string; icon: IconName }>,
      weeks: ["Sett. 1", "Sett. 2", "Sett. 3", "Sett. 4"],
      days: ["L", "M", "M", "G", "V", "S", "D"],
      /** Giorni di pubblicazione in ogni settimana (indice 0 = lunedì). */
      postDays: [0, 2, 4],
      extrasTitle: "Extra, quando serve davvero",
      extrasLine: "Hai una locandina da far uscire subito o qualcosa da sponsorizzare in fretta? Interveniamo in tempi rapidi.",
      extras: [
        { icon: "image", text: "Grafica al volo" },
        { icon: "zap", text: "Sponsorizzata veloce" },
        { icon: "megaphone", text: "Locandina o evento urgente" },
      ] satisfies Array<{ icon: IconName; text: string }>,
      note: "Ci occupiamo di tutto: la base è il punto di partenza consigliato, non un limite.",
      fits: ["Dopo la prima call la adattiamo alla tua attività", "Più contenuti o più campagne, se servono", "Contenuti e campagne lavorano insieme", "Collaborazione da minimo 6 mesi"],
    },
    support: {
      icon: "headphones" as IconName,
      title: "Assistenza sempre, [per qualunque emergenza]",
      text: "Puoi chiamarci quando serve: siamo sempre disponibili. Nei giorni di riposo rispondiamo solo per questioni urgenti.",
      points: ["Un referente diretto", "WhatsApp e telefono", "Call incluse, in base alla collaborazione"],
    },
    included: {
      overline: "Cosa è incluso",
      title: "Cosa [ti proponiamo]",
      line: "Un unico pacchetto su misura, con tutto quello che serve per crescere.",
      blocks: [
        { icon: "smartphone", title: "Gestione social", value: "12", unit: "contenuti al mese", points: ["Script pronti", "Riprese o guida alle riprese", "Editing e pubblicazione"] },
        { icon: "click", title: "Campagne", value: "4–5", unit: "campagne al mese", points: ["Meta Ads e Google Ads", "Creatività dai contenuti", "Ottimizzazione continua"] },
        { icon: "chart", title: "Strategia e report", value: "1", unit: "report al mese", points: ["Call iniziali", "Piano su misura", "Contatti e clienti misurati"] },
        { icon: "headphones", title: "Assistenza", value: "24/7", unit: "per le emergenze", points: ["Referente diretto", "WhatsApp e telefono", "Extra urgenti rapidi"] },
      ] satisfies Array<{ icon: IconName; title: string; value: string; unit: string; points: string[] }>,
      site: "E se serve, rifacciamo anche il sito.",
    },
    best: {
      overline: "La base più scelta",
      title: "Il pacchetto [più scelto]",
      line: "Niente pacchetti fissi: questa è la base da cui partono quasi tutti. Dopo la call la adattiamo alla tua attività.",
      badge: "Personalizzabile",
      numbers: [
        { value: "12", unit: "contenuti al mese", note: "3 a settimana" },
        { value: "4–5", unit: "campagne al mese", note: "Meta Ads e Google Ads" },
        { value: "6", unit: "mesi minimo", note: "il tempo per far crescere tutto" },
      ],
      toggle: "Scopri cosa include",
      groups: [
        { icon: "smartphone", title: "Gestione social", items: ["Script pronti da leggere", "Riprese sul posto o guida per registrare", "Editing professionale", "Pubblicazione e gestione del profilo"] },
        { icon: "click", title: "Campagne", items: ["Meta Ads e Google Ads", "Creatività fatte dai tuoi contenuti", "Test e ottimizzazione continua", "Contatti che arrivano ogni giorno"] },
        { icon: "compass", title: "Strategia", items: ["Call iniziali incluse", "Piano su misura per la tua attività", "Posizionamento e messaggi chiari", "Analisi dei risultati insieme"] },
        { icon: "headphones", title: "Assistenza", items: ["Un referente diretto", "WhatsApp e telefono", "Sempre disponibili per le emergenze", "Extra urgenti in tempi rapidi"] },
      ] satisfies Array<{ icon: IconName; title: string; items: string[] }>,
      extra: "Se serve, rifacciamo anche il sito.",
    },
    compare: {
      overline: "La differenza",
      title: "Perché [sceglierci]",
      line: "Cosa cambia rispetto a un'agenzia qualsiasi.",
      them: "Altre agenzie",
      us: "Metodo Triskell",
      rows: [
        { them: "Social e campagne separati", us: "Un solo team per social e campagne" },
        { them: "Pacchetti uguali per tutti", us: "Tutto su misura dopo la call" },
        { them: "Contenuti generici", us: "Contenuti pensati per le campagne" },
        { them: "Risultati promessi in un mese", us: "6 mesi di rodaggio, numeri misurabili" },
        { them: "Report di sole visualizzazioni", us: "Report su contatti e clienti" },
        { them: "Ti rispondono quando possono", us: "Assistenza sempre disponibile" },
      ],
    },
    homeCta: { label: "Scopri il Metodo Triskell", href: "/metodo-triskell" },
    socialCta: { label: "Come gestiamo i social", href: "/social" },
  },

  /* ------------------------------------------------------------------------
     GESTIONE SOCIAL (pagina dedicata)
     ------------------------------------------------------------------------ */
  social: {
    overline: "Gestione social media",
    title: "Più visibilità al tuo profilo. [Il minimo impegno per te.]",
    line: "Strategia, script, riprese, editing e pubblicazione: ci occupiamo noi di quasi tutto.",
    heroPoints: ["Script pronti", "Editing professionale", "Pubblicazione e report"],
    processTitle: "Come [lavoriamo]",
    processLine: "Sei passi, dalla prima call al profilo che cresce.",
    getLabel: "Ricevi",
    steps: [
      { icon: "phone", title: "Call iniziali", text: "Conosciamo la tua attività, gli obiettivi e il tuo pubblico. Il numero di call dipende dalla collaborazione.", get: "Un piano su misura" },
      { icon: "pen", title: "Strategia e script", text: "Decidiamo cosa raccontare e scriviamo tutti gli script: tu non devi inventarti niente.", get: "Script e piano editoriale" },
      { icon: "camera", title: "Primo mese: registrazione", text: "Il primo mese è dedicato a registrare e montare i contenuti, così partiamo con una scorta pronta.", get: "Una scorta di contenuti" },
      { icon: "scissors", title: "Editing ogni mese", text: "Ogni mese montiamo i nuovi contenuti in anticipo: niente ritardi, niente corse all'ultimo.", get: "Contenuti sempre pronti" },
      { icon: "send", title: "Pubblicazione", text: "Pubblichiamo noi, con testi, copertine e orari giusti, e teniamo vivo il profilo.", get: "Un profilo sempre attivo" },
      { icon: "chart", title: "Report e miglioramento", text: "Guardiamo i numeri insieme e miglioriamo i contenuti mese dopo mese.", get: "Report mensile chiaro" },
    ] satisfies Array<{ icon: IconName; title: string; text: string; get: string }>,
    recording: {
      overline: "Le riprese",
      title: "Veniamo noi, [o registri tu]",
      line: "Cambia il prezzo, non la qualità.",
      options: [
        {
          id: "posto",
          icon: "car",
          title: "Veniamo noi sul posto",
          tag: "Investimento maggiore",
          text: "Ogni mese o a blocchi, registriamo noi da te.",
          points: ["Riprese professionali", "Frequenza scelta da te", "Montaggio e pubblicazione inclusi"],
        },
        {
          id: "autonomia",
          icon: "video",
          title: "Registri in autonomia",
          tag: "Costa meno",
          text: "Registri tu, guidato passo per passo.",
          points: ["Call per imparare a registrare", "Script e inquadrature pronti", "Montaggio e pubblicazione nostri"],
        },
      ] satisfies Array<{ id: string; icon: IconName; title: string; tag: string; text: string; points: string[] }>,
    },
    includes: {
      overline: "Cosa è incluso",
      title: "Di cosa [ci occupiamo]",
      line: "Il lavoro dietro un profilo che cresce. Lo facciamo noi.",
      groups: [
        { icon: "pen", title: "Strategia", items: ["Analisi del profilo e dei concorrenti", "Piano editoriale mensile", "Idee e format su misura", "Script per ogni contenuto"] },
        { icon: "camera", title: "Riprese", items: ["Indicazioni su luci e inquadrature", "Cambi di inquadratura nello script", "Call di formazione alle riprese", "Riprese sul posto (se scelte)"] },
        { icon: "scissors", title: "Editing", items: ["Ordine e archivio di tutti i video", "Montaggio professionale", "Sottotitoli, grafiche e musica", "Copertine coordinate"] },
        { icon: "send", title: "Pubblicazione", items: ["Testi, hashtag e call to action", "Programmazione negli orari migliori", "Storie e caroselli", "Bio e highlights curati"] },
        { icon: "users", title: "Crescita", items: ["Gestione commenti e messaggi", "Contenuti collegati alle campagne", "Trend e novità del momento", "Consigli per far crescere il profilo"] },
        { icon: "chart", title: "Controllo", items: ["Report mensile con i numeri", "Cosa ha funzionato e cosa no", "Miglioramenti continui", "Assistenza sempre disponibile"] },
      ] satisfies Array<{ icon: IconName; title: string; items: string[] }>,
    },
    pillars: [
      { icon: "pen", title: "Pensiamo", text: "Strategia, idee e script pronti" },
      { icon: "camera", title: "Registriamo", text: "Da noi, o ti guidiamo noi" },
      { icon: "scissors", title: "Editiamo", text: "Montaggio professionale" },
      { icon: "send", title: "Pubblichiamo", text: "Al momento giusto, ogni settimana" },
    ] satisfies Array<{ icon: IconName; title: string; text: string }>,
    compare: {
      overline: "Il vantaggio",
      title: "Noi vs [il fai da te]",
      line: "Perché delegare i social a noi conviene.",
      them: "Da solo o con altri",
      us: "Con Triskell",
      rows: [
        { them: "Pubblichi quando hai tempo", us: "3 contenuti a settimana, sempre" },
        { them: "Non sai cosa dire", us: "Script pronti da leggere" },
        { them: "Video fatti col telefono e basta", us: "Editing professionale" },
        { them: "Profilo scollegato dalle campagne", us: "Contenuti che spingono le campagne" },
        { them: "Nessun dato", us: "Report mensile con i numeri" },
      ],
    },
    finale: {
      title: "Il minimo impegno per te. [Il massimo per il tuo profilo.]",
      text: "Tu ci dai poco tempo. Noi ci occupiamo di tutto il resto.",
      words: ["Ordiniamo", "Editiamo", "Scriviamo", "Pubblichiamo", "Misuriamo", "Miglioriamo"],
    },
  },

  /* ------------------------------------------------------------------------
     SITI WEB: come lo creiamo
     ------------------------------------------------------------------------ */
  sitiProcess: {
    overline: "Siti web",
    title: "Dalla prima call al [sito finito]",
    line: "Stile scelto insieme, revisioni incluse, sito pronto a portarti clienti.",
    processTitle: "Il [percorso]",
    processLine: "Sette passi, dall'idea al sito online.",
    getLabel: "Ricevi",
    steps: [
      { icon: "phone", title: "Call iniziale", text: "Capiamo la tua attività, i tuoi clienti e cosa deve fare il sito per te.", get: "Obiettivi chiari" },
      { icon: "palette", title: "Scegliamo lo stile insieme", text: "Colori, caratteri, atmosfera e siti di riferimento: decidiamo insieme che faccia avrà.", get: "Lo stile del sito" },
      { icon: "layout", title: "Struttura e testi", text: "Pagine, sezioni e testi pensati per far contattare chi visita.", get: "La mappa del sito" },
      { icon: "monitor", title: "Prima versione", text: "Ti mostriamo il sito vero, navigabile, su computer e telefono.", get: "Un'anteprima online" },
      { icon: "refresh", title: "Revisioni", text: "Diverse revisioni: sistemiamo ogni dettaglio finché non è come lo vuoi.", get: "Il sito come lo vuoi" },
      { icon: "rocket", title: "Online e collegato", text: "Dominio, form, WhatsApp e tracciamento collegati: il sito è pubblico.", get: "Il sito online" },
      { icon: "headphones", title: "Assistenza dopo", text: "Non ti lasciamo solo: restiamo per modifiche, aggiornamenti e dubbi.", get: "Un referente sempre" },
    ] satisfies Array<{ icon: IconName; title: string; text: string; get: string }>,
    includes: {
      overline: "Incluso",
      title: "Cosa è [incluso]",
      line: "Non solo bello: veloce e costruito per portarti clienti.",
      items: [
        { icon: "palette", title: "Design su misura", text: "Niente modelli uguali per tutti." },
        { icon: "smartphone", title: "Perfetto sul telefono", text: "La maggior parte delle visite arriva da lì." },
        { icon: "zap", title: "Veloce", text: "Si apre subito, anche con connessioni lente." },
        { icon: "pen", title: "Testi che convincono", text: "Scritti per far agire chi legge." },
        { icon: "chat", title: "Form e WhatsApp", text: "I contatti arrivano direttamente a te." },
        { icon: "search", title: "SEO di base", text: "Pronto per essere trovato su Google." },
        { icon: "chart", title: "Tracciamento", text: "Sai quanti contatti porta e da dove." },
        { icon: "refresh", title: "Revisioni incluse", text: "Lo sistemiamo finché non ti convince." },
      ] satisfies Array<{ icon: IconName; title: string; text: string }>,
    },
    portfolioCta: { label: "Guarda i siti che abbiamo creato", href: "/siti-web/portfolio" },
  },

  /** Teaser "Chi siamo" sulla home. */
  team: {
    overline: "Chi siamo",
    title: "Persone vere, [dietro ai risultati]",
    line: "Tomaso guida strategia, advertising e AI. William costruisce siti ed esperienze digitali. Un team piccolo, che segue ogni cliente da vicino.",
    stats: [
      { value: 10, suffix: "+", label: "anni di marketing" },
      { value: 50, suffix: "+", label: "clienti seguiti" },
      { value: 100, suffix: "K+", label: "lead generati" },
    ] satisfies Metric[],
    people: [
      { name: "Tomaso Forno", role: "Founder · Marketing e AI", tone: "azure" },
      { name: "William Argintieri", role: "Web Designer & Creative Developer", tone: "red" },
    ],
    cta: { label: "Conosci il team", href: "/chi-siamo" },
  },

  /** Collegamento a Triskell Ecosystem: l'infrastruttura dietro l'agenzia. */
  ecosystem: {
    overline: "Dietro l'agenzia",
    title: "Un ecosistema [molto più ampio]",
    line: "Triskell Agency è solo una parte: dietro c'è Triskell Ecosystem, con marketing, AI, automazioni e formazione.",
    nodeLabel: "Triskell Ecosystem",
    branches: [
      { icon: "rocket", name: "Agency", text: "Deleghi a noi marketing, ADV, siti, CRM e AI.", here: true, href: "/" },
      { icon: "graduation", name: "Academy", text: "Corsi pratici su AI e marketing, per te e il tuo team.", href: ACADEMY_URL },
      { icon: "film", name: "Contenuti e community", text: "Tutorial e novità sull'AI per oltre 15.000 persone.", href: "https://youtube.com/@triskellecosystem" },
    ] satisfies Array<{ icon: IconName; name: string; text: string; href: string; here?: true }>,
    here: "Sei qui",
    cta: { label: "Scopri tutto Triskell Ecosystem", href: ECOSYSTEM_URL },
  },

  /** Fasce "Prenota ora", riusate in più punti del sito. */
  cta: {
    button: "Prenota ora",
    href: "/contatti",
    perks: [
      { icon: "calendar", label: "Consulenza gratuita" },
      { icon: "clock", label: "30 minuti" },
      { icon: "check", label: "Nessun impegno" },
    ] satisfies Array<{ icon: IconName; label: string }>,
    home: { title: "Vuoi più clienti già dal prossimo mese?", lines: ["Vuoi più clienti", "già dal prossimo mese?"], text: "Prenota la tua call gratuita: ti diciamo come far crescere la tua attività." } satisfies CtaContent,
    results: { title: "Vuoi risultati come questi?", lines: ["Vuoi risultati", "come questi?"], text: "Prenota ora la tua call gratuita." } satisfies CtaContent,
    ai: { title: "Vuoi delegare il lavoro all'AI?", lines: ["Vuoi delegare", "il lavoro all'AI?"], text: "In una call gratuita ti mostriamo cosa può fare un agente AI per te." } satisfies CtaContent,
    agency: { title: "Vuoi delegarci il marketing?", lines: ["Vuoi delegarci", "il marketing?"], text: "Una call gratuita: capiamo la tua situazione e ti diciamo cosa possiamo fare." } satisfies CtaContent,
    sites: { title: "Vuoi delegarci il tuo sito?", lines: ["Vuoi delegarci", "il tuo sito?"], text: "Una call gratuita: ti diciamo come lo faremmo, e quanto tempo serve." } satisfies CtaContent,
    generic: { title: "Pronto a far crescere il tuo business?", lines: ["Pronto a far crescere", "il tuo business?"], text: "Prenota ora una call gratuita con il team." } satisfies CtaContent,
  },

  agencyPage: {
    call: {
      overline: "Si parte da qui",
      title: "Prenota una call [gratuita]",
      line: "Nessun impegno: capiamo insieme da dove partire.",
      points: [
        { icon: "messages", title: "Ci racconti la tua situazione", text: "Dove sei oggi e dove vuoi arrivare." },
        { icon: "search", title: "Guardiamo il tuo funnel", text: "Vediamo cosa funziona e cosa si può migliorare." },
        { icon: "rocket", title: "Ti diciamo cosa fare", text: "Un piano chiaro e un pacchetto su misura." },
      ] satisfies Array<{ icon: IconName; title: string; text: string }>,
    },
    showcase: {
      overline: "I nostri lavori",
      title: "Guarda cosa [costruiamo]",
      line: "Siti web e progetti reali, scegli cosa vedere.",
      tabs: { sites: "Siti web", portfolio: "Risultati" },
      sitesCta: { label: "Tutti i siti web", href: "/siti-web" },
      portfolioCta: { label: "Tutti i risultati", href: "/risultati" },
    },
    /** Esempio dimostrativo (profilo social di una palestra): dati INVENTATI, da sostituire con un caso reale. */
    demo: {
      note: "Esempio dimostrativo",
      handle: "elevafitnessclub",
      name: "Eleva Fitness Club",
      category: "Palestra · Benessere · Performance",
      bio: ["Allenati con noi, ogni giorno.", "Corsi · Personal training · Prova gratuita"],
      posts: 128,
      followersStart: 52800,
      following: 310,
      todayGain: 200,
      gainLabel: "oggi",
      weekGain: "+312 follower questa settimana",
      follow: "Segui",
      message: "Messaggio",
      requestsLabel: "Nuove richieste",
      followersLabel: "follower",
      tabs: { profile: "Instagram", campaign: "Campagne" },
      chat: [
        { who: "Marco", text: "Ciao! Vorrei info sugli abbonamenti" },
        { who: "Giulia", text: "Posso prenotare una prova gratuita?" },
        { who: "Luca", text: "Avete corsi la sera?" },
        { who: "Sara", text: "Quanto costa il pacchetto 3 mesi?" },
        { who: "Andrea", text: "Fate anche personal training?" },
      ],
      ads: {
        title: "Campagna Meta Ads",
        name: "Prova gratuita · Eleva Fitness Club",
        status: "Attiva",
        today: "Oggi sono arrivati",
        todayValue: 18,
        todayUnit: "contatti",
        kpis: [
          { label: "Costo a contatto", value: "2,40 €" },
          { label: "Persone raggiunte", value: "9,8 K" },
          { label: "Prove prenotate", value: "6", live: true },
        ],
        bars: [32, 44, 38, 56, 62, 58, 74, 88],
      },
    }, // TODO: dato reale (sostituire con un profilo vero e i risultati reali)
  },

  sitiWeb: {
    overline: "Portfolio siti",
    title: "Ecco i siti web che [creiamo]",
    line: "Siti veloci e curati, costruiti apposta per trasformare\ni visitatori in clienti. Clicca su un sito per visitarlo.",
    visit: "Apri il sito",
    visitDemo: "Vuoi un sito così?",
    featured: ["sfizi", "mani", "chiodo"],
    items: [
      { id: "lyamflow", name: "LyamFlow", category: "Software · sito incluso", domain: "lyamflow.com", url: "https://lyamflow.com", image: "/sites/lyamflow.jpg" },
      { id: "doubletwenty", name: "The Double Twenty", category: "Brand · Made in Italy", domain: "thedoubletwenty.it", url: "https://thedoubletwenty.it", image: "/sites/doubletwenty.jpg" },
      { id: "nutrex", name: "Nutrex Lab", category: "Sito online", domain: "nutrexlab.it", url: "https://nutrexlab.it", image: "/sites/nutrex.jpg" },
      { id: "uniqueos", name: "Unique OS", category: "Sito online", domain: "unique-os-three.vercel.app", url: "https://unique-os-three.vercel.app", image: "/sites/uniqueos.jpg" },
      { id: "sfizi", name: "Sfizi Partenopei", category: "Ristorazione · Lugano", domain: "sfizipartenopeilugano.ch", url: "https://sfizipartenopeilugano.ch", image: "/sites/sfizi.jpg", tall: "/sites/sfizi-full.jpg" },
      { id: "alleria", name: "Alleria Trattoria Pizzeria", category: "Ristorazione · Lugano", domain: "alleriatrattoriapizzeria.ch", url: "https://alleriatrattoriapizzeria.ch", image: "/sites/alleria.jpg" },
      { id: "chiodo", name: "Ristorante Il Chiodo", category: "Ristorazione", domain: "ristorante-il-chiodo.vercel.app", url: "https://ristorante-il-chiodo.vercel.app", image: "/sites/chiodo.jpg" },
      { id: "aurea", name: "Aurea Wellness", category: "Esempio · Benessere", domain: "aurea-wellness.it", url: "/contatti", image: "/sites/demo.jpg", tall: "/sites/demo-full.jpg", demo: true }, // TODO: sostituire con un sito reale
      { id: "mani", name: "Affittacamere Manì", category: "Ospitalità · Sicilia", domain: "affittacamere-mani.vercel.app", url: "https://affittacamere-mani.vercel.app", image: "/sites/mani.jpg" },
    ] satisfies SiteItem[],
  },

  portfolio: {
    overline: "Risultati",
    title: "Clienti reali, [numeri reali]",
    line: "Ogni progetto è una storia di crescita. Clicca per scoprire come ci siamo arrivati.",
    open: "Scopri il case study",
    next: {
      overline: "Il prossimo case study",
      title: "Il prossimo potrebbe essere il tuo.",
      stats: [
        { value: 70, suffix: "+", label: "Progetti clienti" },
        { value: 100, prefix: "+", suffix: "K", label: "Lead generati" },
      ] satisfies Metric[],
      primary: { label: "Prenota una call", href: "/contatti" },
      secondary: { label: "Scopri i nostri agenti AI", href: "/#ai" },
    },
  },

  contatti: {
    overline: "Contatti",
    title: "Prenota la tua call [gratuita]",
    line: "30 minuti per capire insieme come portarti più clienti.",
  },
  results: {
    id: "risultati",
    overline: "Casi studio",
    title: "Clienti reali, [numeri reali]",
    line: "Contatti, prenotazioni e fatturato dei clienti che seguiamo.",
    all: { label: "Tutti i risultati", href: "/risultati" },
    counters: [
      { value: 60, prefix: "30–", label: "lead al mese per cliente" },
      { value: 500, suffix: "+", label: "contatti in un anno" },
      { value: 25, prefix: "5–", suffix: "K€", label: "fatturato al mese" },
      { value: 3, prefix: "~1 su ", label: "prenota la prova" },
    ] satisfies Metric[],
    items: [
      { id: "forme-fitness", sector: "Fitness & Wellness", place: "Varese", client: "Forme Fitness", tag: "Meta Ads",
        stats: [{ value: "30–60", label: "Lead al mese" }, { value: "5–25K€", label: "Fatturato mensile" }],
        text: "Un sistema pubblicitario continuativo che porta contatti qualificati ogni mese, da tre anni e in crescita.", tone: "lime", icon: "dumbbell", image: "/cases/forme-fitness.webp" },
      { id: "urban-fitness", sector: "Fitness ed EMS", place: "Lecco", client: "Urban Fitness Lecco", tag: "Meta Ads · CRM",
        stats: [{ value: "30–60", label: "Lead al mese" }, { value: "~1 su 3", label: "Prova prenotata" }],
        text: "Da zero a un sistema continuativo di acquisizione clienti: Meta Ads, social, CRM, follow-up e formazione commerciale.", tone: "rose", icon: "zap", image: "/cases/urban-fitness.webp" },
      { id: "forme-at-home", sector: "Digital Platform", place: "Coaching online", client: "ForMe Fitness at Home", tag: "Piattaforma · Area membri",
        stats: [{ value: "Da 0", label: "Punto di partenza" }, { value: "~2,5 anni", label: "Collaborazione" }],
        text: "Da zero a piattaforma digitale: il metodo ForMe portato online, con percorsi in vendita e fatturato ricorrente.", tone: "lime", icon: "app", image: "/cases/forme-at-home.webp" },
      { id: "mela-med", sector: "Local Business Growth", place: "Avellino", client: "Mela Med & Fitness", tag: "ADV · Social · AI",
        stats: [{ value: "3 anni", label: "Collaborazione" }, { value: "200–250€", label: "ADV al mese" }],
        text: "Da studio in crisi a un sistema strutturato di acquisizione clienti, con Irelia AI che segue i contatti.", tone: "azure", icon: "bot", image: "/cases/mela-med.webp" },
      { id: "vip-fit", sector: "Local Fitness Growth", place: "Monza", client: "Vip Fit Monza", tag: "Meta Ads locali",
        stats: [{ value: "500+", label: "Contatti in un anno" }, { value: "~700€", label: "Meta Ads al mese" }],
        text: "Oltre 500 contatti qualificati in un anno con campagne locali su tecnologie per l'allenamento.", tone: "rose", icon: "target", image: "/cases/vip-fit.webp" },
      { id: "gabriele-gatti", sector: "Healthcare Lead Generation", place: "Meda", client: "Gabriele Gatti", tag: "Sito · Landing · Meta Ads",
        stats: [{ value: "10–30", label: "Contatti al mese" }, { value: "~250€", label: "Meta Ads al mese" }],
        text: "Sito WordPress, landing page per la prima visita e Meta Ads locali: le ricerche online diventano richieste di appuntamento.", tone: "cobalt", icon: "heart", image: "/cases/gabriele-gatti.webp" },
      { id: "emme-diffusion", sector: "Education Lead Generation", place: "Genova", client: "Emme Diffusion Academy", tag: "Google Ads",
        stats: [{ value: "20–30", label: "Contatti a campagna" }, { value: "100–200€", label: "Al mese" }],
        text: "Google Ads per promuovere corsi professionali di bellezza, con un budget contenuto.", tone: "gold", icon: "search", image: "/cases/emme-diffusion.webp" },
    ] satisfies CaseStudy[],
  },

  about: {
    overline: "Chi siamo",
    title: "Competenza costruita [sul campo]",
    line: "Un team che il settore lo ha già vissuto da dentro.",
    more: "Leggi il percorso",
    less: "Chiudi il percorso",
    method: {
      overline: "Come lavoriamo",
      title: "Il nostro [metodo]",
      line: "Quattro passi, dalla prima call ai risultati.",
      steps: [
        { title: "Analisi", text: "Capiamo obiettivi, risorse e opportunità.", icon: "search", points: ["Obiettivi e budget", "Situazione di partenza", "Concorrenti e mercato"] },
        { title: "Strategia", text: "Progettiamo il piano più adatto al tuo business.", icon: "compass", points: ["Canali e messaggi", "Piano e priorità", "Tempi e obiettivi"] },
        { title: "Produzione", text: "Creiamo contenuti, siti, campagne e automazioni.", icon: "clapperboard", points: ["Contenuti e video AI", "Siti e campagne", "Automazioni attive"] },
        { title: "Risultati", text: "Misuriamo, ottimizziamo e scaliamo.", icon: "trending", points: ["Report chiari", "Test e ottimizzazione", "Crescita costante"] },
      ] satisfies Array<{ title: string; text: string; icon: IconName; points: string[] }>,
    }, // TODO: conferma copy
    intro: {
      overline: "Chi siamo",
      title: "Il nostro team",
      hint: "Scorri: prima Tomaso, poi William",
      labels: [
        { name: "Tomaso Forno", role: "Founder · Marketing e AI", tone: "azure", side: "left" },
        { name: "William Argintieri", role: "Web Designer & Creative Developer", tone: "red", side: "right" },
      ],
    },
    /** Le due persone: ogni scheda compare mentre si "gira attorno" alla figura scorrendo. Foto in /public/team. */
    people: [
      {
        id: "tomaso",
        name: "Tomaso Forno",
        short: "Tomaso",
        role: "Founder · Marketing e AI",
        tone: "azure",
        layout: "left",
        cutout: "/team/tomaso-cut.webp",
        scene: "/team/tomaso-close.webp",
        camera: [
          { at: 0.0, u: 0.5, v: 0.5, tz: 0, ry: -12, rx: 0, scene: 0 },
          { at: 0.17, u: 0.5, v: 0.5, tz: 60, ry: -6, rx: 0, scene: 0 },
          { at: 0.34, u: 0.48, v: 0.3, tz: 420, ry: 9, rx: 1, scene: 0 },
          { at: 0.46, u: 0.47, v: 0.21, tz: 700, ry: 11, rx: 2, scene: 0 },
          { at: 0.6, u: 0.47, v: 0.2, tz: 760, ry: -5, rx: 2, scene: 0 },
          { at: 0.67, u: 0.5, v: 0.5, tz: 120, ry: 0, rx: 0, scene: 0 },
          { at: 0.78, u: 0.5, v: 0.5, tz: 60, ry: 4, rx: 0, scene: 1 },
          { at: 0.88, u: 0.5, v: 0.5, tz: 110, ry: -4, rx: 0, scene: 1 },
          { at: 1.0, u: 0.5, v: 0.5, tz: 0, ry: 0, rx: 0, scene: 1 },
        ],
        phases: [
          { id: "intro", from: 0.0, to: 0.19, kicker: "Founder", title: "Tomaso Forno", text: "Fondatore di Triskell Ecosystem. Aiuta professionisti e aziende a crescere unendo advertising, intelligenza artificiale e strategia di business online.", tags: ["Advertising", "Intelligenza artificiale", "Business online"] },
          { id: "percorso", from: 0.22, to: 0.43, kicker: "Il percorso", title: "Da più di 10 anni nel settore", text: "Partito dentro le agenzie, ha costruito un metodo basato su funnel, dati e automazioni. Oggi guida il suo progetto.", stats: [{ value: "10+", label: "anni di marketing" }] },
          {
            id: "competenze",
            from: 0.46,
            to: 0.65,
            kicker: "Competenze",
            title: "Esperto in advertising e AI",
            text: "Quello che sa fare, in quattro blocchi.",
            blocks: [
              { title: "Advertising", text: "Meta Ads e Google Ads: campagne che portano contatti veri." },
              { title: "Intelligenza artificiale", text: "Strumenti, prompt e automazioni per il business." },
              { title: "Funnel e CRM", text: "Dal contatto al cliente, seguito da sistemi che lavorano da soli." },
              { title: "Formazione", text: "Academy: corsi pratici e video sul canale YouTube." },
            ],
          },
          { id: "triskell", from: 0.69, to: 0.89, kicker: "In Triskell", title: "Strategia, clienti e metodo", text: "Segue la strategia dei clienti e coordina Agency e Academy.", stats: [{ value: "50+", label: "clienti seguiti" }, { value: "100K+", label: "lead generati" }, { value: "+5M€", label: "budget ADV gestito" }] },
          { id: "chiusura", from: 0.92, to: 9, kicker: "Il suo contributo", title: "«L'AI ti permette di donare al mondo ogni idea che prima avresti messo nel cassetto.»", text: "In Triskell Ecosystem porta visione, metodo e crescita.", quote: true },
        ],
      },
      {
        id: "william",
        name: "William Argintieri",
        short: "William",
        role: "Web Designer & Creative Developer",
        tone: "red",
        layout: "right",
        cutout: "/team/william-cut.webp",
        scene: "/team/william-close.webp",
        camera: [
          { at: 0.0, u: 0.5, v: 0.42, tz: 260, ry: 12, rx: 0, scene: 0 },
          { at: 0.17, u: 0.5, v: 0.5, tz: 40, ry: 6, rx: 0, scene: 0 },
          { at: 0.34, u: 0.52, v: 0.3, tz: 420, ry: -9, rx: 1, scene: 0 },
          { at: 0.46, u: 0.52, v: 0.2, tz: 700, ry: -11, rx: 2, scene: 0 },
          { at: 0.6, u: 0.52, v: 0.19, tz: 760, ry: 5, rx: 2, scene: 0 },
          { at: 0.67, u: 0.5, v: 0.5, tz: 120, ry: 0, rx: 0, scene: 0 },
          { at: 0.78, u: 0.5, v: 0.5, tz: 60, ry: -4, rx: 0, scene: 1 },
          { at: 0.88, u: 0.5, v: 0.5, tz: 110, ry: 4, rx: 0, scene: 1 },
          { at: 1.0, u: 0.5, v: 0.5, tz: 0, ry: 0, rx: 0, scene: 1 },
        ],
        phases: [
          { id: "intro", from: 0.0, to: 0.19, kicker: "Web Designer & Creative Developer", title: "William Argintieri", text: "Mi occupo dello sviluppo web di Triskell Ecosystem, trasformando idee e progetti in esperienze digitali su misura. Seguo ogni fase, dal primo confronto con il cliente fino alla pubblicazione online." },
          { id: "metodo", from: 0.22, to: 0.43, kicker: "Il metodo", title: "Dal concept all'esperienza digitale", text: "Il mio metodo unisce design, sviluppo e attenzione ai dettagli. Ogni progetto nasce dall'ascolto, prende forma attraverso la creatività e diventa un'esperienza digitale funzionale, intuitiva e riconoscibile." },
          {
            id: "competenze",
            from: 0.46,
            to: 0.65,
            kicker: "Quello che so fare",
            title: "Le mie competenze",
            text: "",
            blocks: [
              { title: "Web Design", text: "Siti su misura, curati in ogni dettaglio e riconoscibili." },
              { title: "Sviluppo Web", text: "Codice pulito, SEO tecnica e prestazioni ottimizzate." },
              { title: "Animazioni & Interazioni", text: "Movimento ed effetti interattivi che raccontano il brand." },
              { title: "Esperienza Utente", text: "Navigazione intuitiva e percorsi progettati per convertire." },
            ],
          },
          { id: "triskell", from: 0.69, to: 0.89, kicker: "In Triskell Ecosystem", title: "Tutta la parte web, dall'idea alla realtà.", text: "Mi occupo della progettazione e dello sviluppo di siti web, landing page e strumenti digitali che valorizzano l'identità dei brand e trasformano la presenza online in opportunità concrete." },
          { id: "chiusura", from: 0.92, to: 9, kicker: "La mia filosofia", title: "«Non costruiamo solo siti web. Costruiamo esperienze digitali.»", text: "In Triskell Ecosystem trasformo le idee in esperienze digitali.", quote: true },
        ],
      },
    ] satisfies Person[], // TODO: conferma testi e numeri (da foto/bio fornite)
  },
  faq: {
    id: "faq",
    overline: "FAQ",
    title: "Domande [frequenti]",
    line: "Le risposte che ci chiedono più spesso.",
    items: [
      { q: "Cosa fa Triskell Agency?", a: "Ti porta più clienti: campagne, social, siti, CRM, automazioni e agenti AI, gestiti da un unico team." },
      { q: "Posso delegarvi davvero tutto?", a: "Sì. Dalla strategia alle campagne, dal sito al CRM: tu ci dici gli obiettivi, al resto pensiamo noi." },
      { q: "Cosa fa un agente AI per la mia attività?", a: "Risponde ai clienti in pochi secondi, qualifica i contatti, fissa appuntamenti e invia promemoria, 24 ore su 24." },
      { q: "Cos'è il Metodo Triskell?", a: "La combinazione di gestione social e campagne pubblicitarie, più il sito se serve: il profilo attivo dà fiducia, le campagne portano contatti." },
      { q: "Avete pacchetti fissi?", a: "No: ogni collaborazione è su misura. Come base consigliamo 12 contenuti al mese e 4–5 campagne al mese." },
      { q: "Quanto dura la collaborazione?", a: "Minimo 6 mesi: è il tempo di rodaggio per creare la struttura, metterla in moto e vedere i risultati." },
      { q: "Quanto costa lavorare con voi?", a: "Dipende da cosa serve, per esempio se veniamo noi a registrare o registri in autonomia. Dopo la call gratuita ricevi una proposta chiara." },
      { q: "In quanto tempo arrivano i risultati?", a: "Le prime richieste arrivano già nelle prime settimane di campagna. Tempi e obiettivi li definiamo insieme." }, // TODO: conferma copy
      { q: "Lavorate solo con il fitness?", a: "No. Seguiamo attività di ogni settore: salute, ristorazione, ospitalità, formazione, professionisti." },
    ] satisfies Faq[],
  },

  contact: {
    id: "contatti",
    title: "Vuoi più clienti per [la tua attività]?",
    line: "Prenota la tua call gratuita: ti richiamiamo entro 24 ore con un piano su misura.",
    perks: [
      { icon: "calendar", label: "Consulenza gratuita" },
      { icon: "clock", label: "30 minuti" },
      { icon: "zap", label: "Piano su misura" },
    ] satisfies Array<{ icon: IconName; label: string }>,
    form: {
      name: { label: "Nome", placeholder: "Il tuo nome" },
      email: { label: "Email", placeholder: "nome@azienda.it" },
      service: {
        label: "Servizio di interesse",
        placeholder: "Scegli un servizio",
        options: ["Voglio delegare tutto", "Meta Ads e Google Ads", "Gestione social", "Sito web", "CRM", "Agenti AI e automazioni", "Applicazione su misura", "Altro"],
      },
      message: { label: "Messaggio", placeholder: "Raccontaci in due righe cosa vuoi ottenere" },
      consent: "Accetto la privacy policy",
      submit: "Prenota la call gratuita",
      sending: "Invio in corso…",
      success: { title: "Messaggio inviato", text: "Grazie! Ti rispondiamo il prima possibile." },
      error: { title: "Qualcosa non ha funzionato", text: "Riprova tra poco, scrivici su WhatsApp o a" },
      errors: {
        required: "Campo obbligatorio",
        email: "Inserisci un'email valida",
        service: "Scegli un servizio",
        messageShort: "Scrivi almeno 10 caratteri",
        consent: "Serve il tuo consenso",
      },
    },
  },

  footer: {
    tagline: "Più clienti per la tua attività. Un ramo di Triskell Ecosystem.",
    columns: [
      {
        title: "Agency",
        links: [
          { label: "Metodo Triskell", href: "/metodo-triskell" },
          { label: "Gestione social", href: "/social" },
          { label: "Siti web", href: "/siti-web" },
          { label: "Portfolio siti", href: "/siti-web/portfolio" },
          { label: "Risultati", href: "/risultati" },
          { label: "Agenti AI", href: "/#ai" },
        ],
      },
      {
        title: "Ecosistema",
        links: [
          { label: "Chi siamo", href: "/chi-siamo" },
          { label: "Contatti", href: "/contatti" },
          { label: "Triskell Ecosystem", href: ECOSYSTEM_URL },
          { label: "Triskell Academy", href: ACADEMY_URL },
        ],
      },
      {
        title: "Legale",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Cookie Policy", href: "/cookie" },
        ],
      },
    ] satisfies Array<{ title: string; links: NavLink[] }>,
    socialTitle: "Seguici",
    follow: {
      overline: "Seguici",
      title: "Resta con [noi]",
      line: "Video, novità sull'AI e idee per far crescere il tuo business. Scegli dove seguirci.",
      /** Riquadro in evidenza sopra le schede (numeri dai profili reali). */
      proof: {
        lead: "Oltre",
        value: 15000,
        suffix: "+",
        text: "persone già ci seguono",
        chips: [
          { label: "follower su Instagram", value: "15,6 mila" },
          { label: "follower su TikTok", value: "2.460" },
          { label: "visualizzazioni sul video più visto", value: "98.517" },
        ],
      },
      youtube: { title: "Il nostro canale YouTube", text: "Tutorial e novità sull'AI, spiegati semplici.", cta: "Iscriviti al canale", subs: "1K iscritti · 212 video" },
      instagram: { title: "Instagram", handle: "@triskell_ecosystem", text: "Idee, risultati e dietro le quinte.", cta: "Seguici su Instagram", stats: [{ v: "15,6 mila", l: "follower" }, { v: "36", l: "post" }] },
      tiktok: { title: "TikTok", handle: "@triskell.ecosystem", text: "Video brevi sull'AI e sul business.", cta: "Seguici su TikTok", stats: [{ v: "2.460", l: "follower" }, { v: "9.916", l: "mi piace" }], top: "98.517 visualizzazioni sul video più visto" },
      whatsapp: { title: "WhatsApp", text: "Scrivici: ti rispondiamo noi.", cta: "Scrivici ora" },
      email: { title: "Email", cta: "Scrivici una mail" },
    },
    social: [
      { id: "instagram", label: "Instagram", href: "https://www.instagram.com/triskell_ecosystem" },
      { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@triskell.ecosystem" },
      { id: "youtube", label: "YouTube", href: "https://youtube.com/@triskellecosystem" },
      { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/393484301500" },
    ] satisfies Social[],
    legal: "Triskell Agency e Triskell Ecosystem sono nomi commerciali del progetto di Tomaso Forno · P.IVA IT02759140995", // TODO: ragione sociale, sede e dati REA, se applicabili
    rights: "Tutti i diritti riservati.",
  },

  a11y: {
    scrollProgress: "Avanzamento della pagina",
    home: "Triskell Agency — vai alla home",
    toTop: "Torna su",
  },
};

export type Site = typeof site;
