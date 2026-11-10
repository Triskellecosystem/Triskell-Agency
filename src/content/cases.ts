/**
 * Dettaglio dei case study (testi e numeri dal sito originale triskell-3d.vercel.app / portfolio).
 * Ogni scheda del Portfolio si apre mostrando: punto di partenza, soluzione, processo, risultati, trasformazione.
 */
export interface CaseDetail {
  lead: string;
  numbers: Array<{ value: string; label: string; note: string }>;
  blocks: Array<{ title: string; paras: string[]; bullets: string[] }>;
  sections: Array<{
    title: string;
    paras?: string[];
    bullets?: string[];
    steps?: Array<{ t: string; d: string }>;
    table?: Array<{ what: string; note: string; before: string; after: string }>;
  }>;
  quote?: { text: string; by: string };
  tags: string[];
}

export const caseDetails: Record<string, CaseDetail> = {
  "forme-fitness": {
    "lead": "Da centro locale a riferimento del wellness a Varese.",
    "numbers": [
      {
        "value": "30–60",
        "label": "Lead/mese",
        "note": "su Meta Ads, budget 450-500€/mese"
      },
      {
        "value": "5K–25K€",
        "label": "Fatturato mensile",
        "note": "attribuito alle campagne, in base a stagione e offerta"
      },
      {
        "value": "3 anni",
        "label": "Collaborazione",
        "note": "continuativa, sempre attiva"
      },
      {
        "value": "~5%",
        "label": "Conversione media",
        "note": "da lead a cliente, mediamente nel periodo"
      }
    ],
    "blocks": [
      {
        "title": "La sfida",
        "paras": [
          "Forme Fitness aveva una proposta solida e tecnologie distintive, ma la presenza digitale non rifletteva il valore del centro."
        ],
        "bullets": [
          "Necessità di supporto strategico nella gestione social e comunicazione digitale",
          "Bisogno di campagne pubblicitarie strutturate per aumentare la visibilità locale",
          "Mancanza di un sistema continuativo e prevedibile per generare nuovi lead",
          "Obiettivo di valorizzare servizi ad alto valore come EMS e VacuTherm"
        ]
      },
      {
        "title": "La soluzione",
        "paras": [
          "Abbiamo progettato un'architettura di acquisizione multi-canale, con campagne ottimizzate, creatività generate con il supporto AI e un flusso continuo di test e ottimizzazione."
        ],
        "bullets": [
          "Campagne Meta Ads sempre attive su offerta EMS e VacuTherm",
          "Creatività generate con supporto AI per testare nuovi angoli ogni settimana",
          "Funnel di acquisizione locale ottimizzato su Varese e provincia",
          "Test A/B continui su pubblici, copy e landing per migliorare il costo lead"
        ]
      }
    ],
    "sections": [],
    "quote": {
      "text": "«Se devo consigliare, lo consiglio assolutamente. […] Quando ci sono delle pecche, degli intoppi con Meta Business e quant'altro, […] aiuta sempre, si impegna tantissimo per risolvere il problema. Porta sempre, come minimo nel mio centro, almeno un per sei, per cinque, per sei, rispetto a quello che si investe.»",
      "by": "Davide · ForMe Fitness"
    },
    "tags": [
      "Meta Ads",
      "TikTok Ads",
      "Google Ads",
      "AI Content Tools",
      "Analytics",
      "Automation"
    ]
  },
  "urban-fitness": {
    "lead": "Da zero a un sistema continuativo di acquisizione clienti.",
    "numbers": [
      {
        "value": "+2,5 anni",
        "label": "Collaborazione",
        "note": "continuativa, sempre attiva"
      },
      {
        "value": "30–60",
        "label": "Lead/mese",
        "note": "su Meta Ads, budget 600-700€/mese"
      },
      {
        "value": "~1 su 3",
        "label": "Prova prenotata",
        "note": "sui lead generati"
      },
      {
        "value": "2K → 10K€",
        "label": "Vendite ricorrenti",
        "note": "mensili nell'ultimo anno"
      }
    ],
    "blocks": [
      {
        "title": "La sfida",
        "paras": [
          "Urban Fitness Lecco aveva bisogno di costruire da zero un sistema digitale più efficace per generare nuove richieste e aumentare le vendite mensili in modo prevedibile."
        ],
        "bullets": [
          "Necessità di partire da una gestione più strutturata delle campagne pubblicitarie",
          "Bisogno di aumentare i contatti interessati ai servizi del centro",
          "Mancanza di un sistema continuativo per la gestione dei lead",
          "Necessità di migliorare il processo commerciale post-contatto",
          "Bisogno di supporto nella comunicazione social e nella promozione dei servizi",
          "Necessità di rendere più prevedibile il flusso di prove prenotate e vendite mensili"
        ]
      },
      {
        "title": "La soluzione",
        "paras": [
          "Abbiamo accompagnato Urban Fitness Lecco nella costruzione progressiva di un sistema digitale orientato alla generazione, gestione e conversione dei contatti. Si è partiti da Meta Ads e comunicazione social, per poi integrare CRM, processi di follow-up, formazione e affiancamento commerciale."
        ],
        "bullets": [
          "Sistema Meta Ads continuativo con creatività e copy testati ogni settimana",
          "CRM e flussi di follow-up per non perdere nessun contatto generato",
          "Formazione e affiancamento commerciale per alzare il tasso di prova prenotata",
          "Reportistica mensile su lead, prove e ricavi per decisioni data-driven"
        ]
      }
    ],
    "sections": [
      {
        "title": "Il processo, passo per passo",
        "steps": [
          {
            "t": "Analisi servizi",
            "d": "Studio dei servizi principali del centro e delle leve commerciali più forti"
          },
          {
            "t": "Campagne Meta Ads",
            "d": "Creazione di campagne orientate alla generazione di contatti qualificati"
          },
          {
            "t": "Copy & creatività",
            "d": "Sviluppo di copy, script e creatività per EMS, VacuTherm e percorsi personalizzati"
          },
          {
            "t": "Raccolta lead",
            "d": "Acquisizione contatti via campagne, landing e canali digitali"
          },
          {
            "t": "Integrazione CRM",
            "d": "Implementazione GoHighLevel per tracciare e gestire i contatti"
          },
          {
            "t": "Follow-up & prova",
            "d": "Ottimizzazione del processo dal contatto alla prenotazione della prova"
          },
          {
            "t": "Formazione vendita",
            "d": "Affiancamento commerciale al team interno sulla gestione lead"
          },
          {
            "t": "Ottimizzazione continua",
            "d": "Analisi mensile delle performance e iterazione del sistema"
          }
        ]
      }
    ],
    "quote": {
      "text": "«Con Triskell siamo riusciti a trasformare le campagne pubblicitarie in un sistema più strutturato, capace di generare contatti, prove e vendite in modo più costante.»",
      "by": "Urban Fitness Lecco"
    },
    "tags": [
      "Meta Ads",
      "GoHighLevel CRM",
      "AI Content Tools",
      "Analytics",
      "Funnel & Follow-up",
      "Sales Coaching"
    ]
  },
  "forme-at-home": {
    "lead": "Da zero a piattaforma digitale per il coaching online.",
    "numbers": [
      {
        "value": "Da 0",
        "label": "Punto di partenza",
        "note": "Piattaforma costruita partendo da zero"
      },
      {
        "value": "~2,5 anni",
        "label": "Collaborazione",
        "note": "Evoluzione continuativa del progetto"
      },
      {
        "value": "WordPress",
        "label": "Prima infrastruttura",
        "note": "Base tecnica iniziale della piattaforma"
      },
      {
        "value": "Area Membri",
        "label": "Ambiente digitale",
        "note": "Contenuti, percorsi e accesso clienti"
      },
      {
        "value": "CRM",
        "label": "Gestione clienti",
        "note": "Contatti, opportunità e operatività commerciale"
      },
      {
        "value": "5.000–6.000€/mese",
        "label": "Fatturato mensile indicativo",
        "note": "Nel contesto specifico della collaborazione"
      }
    ],
    "blocks": [
      {
        "title": "La sfida",
        "paras": [
          "ForMe Fitness at Home nasce con l'obiettivo di portare online il metodo, l'esperienza e i servizi del team ForMe Fitness. Quando è iniziata la collaborazione con Triskell Ecosystem, il progetto partiva da zero: non esisteva ancora una piattaforma strutturata, non c'era un'area membri dedicata e l'offerta online doveva essere costruita sia dal punto di vista tecnico che strategico."
        ],
        "bullets": [
          "Il progetto partiva da zero, senza piattaforma online esistente.",
          "Nessuna area membri dedicata per ospitare percorsi e contenuti.",
          "L'offerta online doveva essere strutturata e resa comprensibile.",
          "Servizi di coaching da trasformare in un sistema digitale realmente utilizzabile.",
          "Necessità di integrare strumenti per gestire contatti, clienti e vendite.",
          "Passaggio da un modello principalmente fisico/locale a un modello online più scalabile.",
          "Mancava un asset digitale capace di sostenere la crescita del progetto nel tempo."
        ]
      },
      {
        "title": "La soluzione",
        "paras": [
          "Triskell Ecosystem ha costruito l'infrastruttura digitale di ForMe Fitness at Home partendo da zero, sviluppando una prima piattaforma su WordPress e organizzando l'ambiente online per ospitare percorsi, contenuti, area membri e servizi di coaching digitale. L'obiettivo non era semplicemente creare un sito web, ma costruire un asset digitale capace di supportare la vendita, la gestione dei clienti e la crescita del progetto nel tempo."
        ],
        "bullets": [
          "Creazione della piattaforma su WordPress.",
          "Sviluppo dell'area membri.",
          "Strutturazione dei percorsi online.",
          "Infrastruttura per vendere servizi di coaching.",
          "Organizzazione dell'offerta digitale.",
          "Integrazione CRM per la gestione clienti.",
          "Sistemi per gestione contatti e opportunità.",
          "Supporto alla comunicazione e alla vendita online.",
          "Ottimizzazione progressiva della piattaforma.",
          "Supporto strategico continuativo."
        ]
      }
    ],
    "sections": [
      {
        "title": "Il processo, passo per passo",
        "steps": [
          {
            "t": "Discovery & strategia",
            "d": "Analisi del metodo ForMe Fitness, definizione dell'offerta digitale e roadmap della piattaforma."
          },
          {
            "t": "Costruzione piattaforma WordPress",
            "d": "Sviluppo della prima base tecnica, architettura dei contenuti e logiche di vendita."
          },
          {
            "t": "Area membri & percorsi",
            "d": "Strutturazione dell'ambiente per percorsi gratuiti, abbonamenti e coaching personalizzato."
          },
          {
            "t": "CRM & gestione clienti",
            "d": "Integrazione di un sistema per contatti, opportunità e supporto commerciale."
          },
          {
            "t": "Ottimizzazione continua",
            "d": "Iterazioni progressive su offerta, comunicazione, esperienza utente e operatività."
          }
        ]
      },
      {
        "title": "L'infrastruttura digitale",
        "steps": [
          {
            "t": "WordPress",
            "d": "Prima base tecnica della piattaforma online."
          },
          {
            "t": "Area Membri",
            "d": "Ambiente digitale per contenuti, programmi e percorsi."
          },
          {
            "t": "Percorsi Online",
            "d": "Struttura per coaching, programmi e servizi digitali."
          },
          {
            "t": "CRM",
            "d": "Gestione contatti, clienti e opportunità."
          },
          {
            "t": "Offerta Digitale",
            "d": "Percorsi gratuiti, abbonamenti, coaching e servizi personalizzati."
          },
          {
            "t": "Evoluzione AI",
            "d": "Prossimo step per rendere la piattaforma più intelligente, personalizzata e scalabile."
          }
        ]
      },
      {
        "title": "Prossimo step: evoluzione AI della piattaforma",
        "paras": [
          "[ evoluzione ai ]",
          "Oggi ForMe Fitness at Home non è più soltanto una piattaforma online costruita su WordPress. È un sistema digitale in evoluzione. Stiamo valutando l'integrazione dell'intelligenza artificiale per migliorare l'esperienza utente, supportare il lavoro dei coach, automatizzare alcuni processi e rendere i percorsi sempre più personalizzati.",
          "Questa evoluzione rappresenta il passaggio da piattaforma digitale a ecosistema intelligente per il fitness online."
        ],
        "bullets": [
          "Percorsi personalizzati tramite AI in base agli obiettivi del singolo utente.",
          "Automazioni nella gestione dei clienti e delle pipeline commerciali.",
          "Supporto AI per onboarding, FAQ e assistenza utenti.",
          "Suggerimenti intelligenti sui percorsi più adatti al profilo.",
          "Migliore organizzazione e navigazione dei contenuti della libreria.",
          "Dashboard più evolute per coach e team interno.",
          "Integrazione più avanzata tra CRM, area membri e comunicazione.",
          "Miglioramento continuo dell'esperienza utente lato membership.",
          "Maggiore scalabilità del modello di coaching online."
        ]
      }
    ],
    "quote": {
      "text": "«Tutto il mondo Triskell Ecosystem ci ha aiutato dall'inizio, da quando abbiamo avuto l'idea. […] Noi dal punto di vista informatico davvero ci siamo completamente affidati. […] È venuto fuori un'area membri, una piattaforma bellissima, come la volevamo.»",
      "by": "Fabio · ForMe Fitness at Home"
    },
    "tags": [
      "WordPress",
      "Area Membri",
      "CRM",
      "Email Marketing",
      "Analytics",
      "Stripe / Pagamenti"
    ]
  },
  "mela-med": {
    "lead": "Da studio in difficoltà a sistema strutturato di acquisizione clienti.",
    "numbers": [
      {
        "value": "3 anni",
        "label": "Collaborazione",
        "note": "Evoluzione progressiva del progetto"
      },
      {
        "value": "Studio in crisi",
        "label": "Punto di partenza",
        "note": "Trasformato in sistema strutturato di acquisizione"
      },
      {
        "value": "200–250€",
        "label": "Spesa ADV mensile",
        "note": "Indicativa nella fase più recente"
      },
      {
        "value": "1.000–1.500€",
        "label": "Vendite mensili medie",
        "note": "Da nuovi clienti, nella fase più recente"
      },
      {
        "value": "Irelia",
        "label": "Sistema AI",
        "note": "A supporto della gestione contatti"
      },
      {
        "value": "Ads + Social + AI",
        "label": "Stack integrato",
        "note": "A sostegno del processo commerciale"
      }
    ],
    "blocks": [
      {
        "title": "La sfida",
        "paras": [
          "Quando è iniziata la collaborazione con Triskell Ecosystem, circa 3 anni fa, lo studio si trovava in una fase di forte difficoltà. Mancava un flusso costante di nuovi clienti, le campagne pubblicitarie non erano ancora strutturate come sistema di acquisizione e il processo dal primo contatto alla vendita di pacchetti era frammentato. Serviva costruire un percorso più solido per sostenere la crescita commerciale dello studio."
        ],
        "bullets": [
          "Lo studio era in una fase di forte crisi.",
          "Mancava un flusso costante di nuovi clienti.",
          "Le campagne pubblicitarie non erano ancora strutturate come sistema di acquisizione.",
          "La comunicazione social aveva bisogno di maggiore continuità e chiarezza.",
          "I contatti generati dovevano essere gestiti meglio.",
          "Serviva un processo più chiaro dal primo contatto alla chiusura del pacchetto.",
          "Era necessario supportare il team nella gestione commerciale delle opportunità generate."
        ]
      },
      {
        "title": "La soluzione",
        "paras": [
          "Triskell Ecosystem ha lavorato sulla costruzione progressiva di un sistema di acquisizione clienti, partendo dalle campagne pubblicitarie e affiancando il cliente anche su comunicazione social, gestione dei contatti e integrazione di strumenti AI. L'intervento non si è limitato alla generazione di lead, ma ha avuto l'obiettivo di creare un processo più strutturato: dalla campagna alla conversazione, dalla gestione del contatto alla vendita di pacchetti e abbonamenti, con il supporto del sistema AI Irelia."
        ],
        "bullets": [
          "Gestione e ottimizzazione campagne Meta Ads locali.",
          "Creatività e copy orientati alla conversione.",
          "Supporto alla comunicazione social del centro.",
          "Gestione social media per un periodo della collaborazione.",
          "Creazione di un processo di acquisizione clienti più strutturato.",
          "Supporto alla gestione dei contatti generati dalle campagne.",
          "Integrazione del sistema AI Irelia per follow-up e gestione lead.",
          "Ottimizzazione progressiva del flusso dalla lead alla vendita.",
          "Monitoraggio dei risultati e iterazione continua.",
          "Supporto strategico continuativo al team interno."
        ]
      }
    ],
    "sections": [
      {
        "title": "Prima e dopo",
        "table": [
          {
            "what": "Flusso di nuovi contatti",
            "note": "Generato da campagne Meta Ads strutturate",
            "before": "Discontinuo",
            "after": "Continuativo"
          },
          {
            "what": "Processo di gestione lead",
            "note": "Con supporto del sistema AI Irelia",
            "before": "Frammentato",
            "after": "Strutturato"
          },
          {
            "what": "Spesa pubblicitaria mensile",
            "note": "Indicativa nella fase più recente",
            "before": "Non strutturata",
            "after": "≈ 200–250€/mese"
          },
          {
            "what": "Vendite mensili da nuovi clienti",
            "note": "Pacchetti e abbonamenti, fase recente",
            "before": "Non tracciate",
            "after": "≈ 1.000–1.500€/mese"
          },
          {
            "what": "Continuità della comunicazione",
            "note": "Supporto social e advertising integrati",
            "before": "Saltuaria",
            "after": "Pianificata"
          }
        ]
      },
      {
        "title": "Il processo, passo per passo",
        "steps": [
          {
            "t": "Analisi e setup",
            "d": "Studio della situazione iniziale, definizione obiettivi commerciali e impostazione delle prime campagne Meta Ads locali."
          },
          {
            "t": "Campagne pubblicitarie",
            "d": "Lancio e ottimizzazione progressiva di campagne Meta Ads orientate alla generazione di contatti interessati a EMS, Vacuum e percorsi personalizzati."
          },
          {
            "t": "Comunicazione social",
            "d": "Supporto alla presenza social e, per un periodo, gestione diretta dei canali per dare continuità e chiarezza al messaggio del centro."
          },
          {
            "t": "Processo di gestione contatti",
            "d": "Costruzione di un flusso più ordinato per seguire le lead generate dalle campagne e accompagnarle verso prenotazione o acquisto."
          },
          {
            "t": "Integrazione AI Irelia",
            "d": "Inserimento del sistema AI Irelia a supporto del follow-up e della gestione dei contatti, per ridurre la dispersione dei lead."
          },
          {
            "t": "Vendita e iterazione",
            "d": "Trasformazione dei contatti in pacchetti e abbonamenti, con monitoraggio dei risultati e ottimizzazione continua del sistema."
          }
        ]
      },
      {
        "title": "L'infrastruttura digitale",
        "steps": [
          {
            "t": "Meta Ads",
            "d": "Campagne pubblicitarie locali orientate alla generazione di contatti."
          },
          {
            "t": "Creatività e Messaggi",
            "d": "Copy e contenuti pensati per comunicare i servizi dello studio in modo chiaro e orientato alla conversione."
          },
          {
            "t": "Social Media",
            "d": "Supporto alla comunicazione e alla presenza digitale del centro."
          },
          {
            "t": "Gestione Contatti",
            "d": "Processo per seguire i contatti generati dalle campagne e accompagnarli verso la prenotazione o l'acquisto."
          },
          {
            "t": "Irelia AI",
            "d": "Sistema AI integrato per supportare la gestione dei contatti e rendere più efficiente il dialogo con i potenziali clienti."
          },
          {
            "t": "Vendita Pacchetti",
            "d": "Obiettivo finale: trasformare i contatti in nuovi clienti, pacchetti e abbonamenti all'interno dello studio."
          }
        ]
      },
      {
        "title": "L'integrazione AI nella gestione dei contatti · Irelia",
        "paras": [
          "[ evoluzione ai ]",
          "Per rendere il processo più efficiente, Triskell Ecosystem ha integrato Irelia, un sistema AI a supporto della gestione dei contatti generati dalle campagne. L'obiettivo è migliorare la velocità di risposta, ridurre la dispersione delle opportunità e rendere più ordinato il percorso che porta dal primo interesse alla prenotazione o alla vendita.",
          "Irelia non è una soluzione magica: è un sistema a supporto del processo commerciale, che aiuta lo studio a non perdere opportunità e a dialogare in modo più tempestivo con le persone interessate."
        ],
        "bullets": [
          "Supporto nella gestione dei contatti generati da Meta Ads.",
          "Miglioramento del follow-up con i potenziali clienti.",
          "Maggiore ordine nel processo commerciale interno.",
          "Riduzione della dispersione delle opportunità.",
          "Supporto al team dello studio, senza sostituirlo.",
          "Collegamento più diretto tra campagne pubblicitarie e gestione lead."
        ]
      }
    ],
    "quote": {
      "text": "«In tre anni di collaborazione siamo passati da una fase di forte difficoltà a un sistema più ordinato, dove campagne pubblicitarie, comunicazione e gestione dei contatti lavorano insieme. Con una spesa contenuta riusciamo oggi a portare nuove persone nello studio in modo continuativo.»",
      "by": "Team Mela Med & Fitness · Studio Fitness & Benessere · Avellino"
    },
    "tags": [
      "Meta Ads",
      "Lead Generation",
      "Social Media",
      "AI Contact System",
      "CRM",
      "Strategia Commerciale",
      "Advertising"
    ]
  },
  "vip-fit": {
    "lead": "Oltre 500 contatti qualificati generati in un anno con campagne locali.",
    "numbers": [
      {
        "value": "2023–2026",
        "label": "Collaborazione continuativa",
        "note": "Rapporto attivo dal primo anno fino ad oggi"
      },
      {
        "value": "~2,5 anni",
        "label": "Gestione campagne pubblicitarie",
        "note": "Durata operativa delle campagne Meta Ads"
      },
      {
        "value": "~700€/mese",
        "label": "Investimento medio Meta Ads",
        "note": "Budget pubblicitario medio gestito su Meta"
      },
      {
        "value": "70–90 / mese",
        "label": "Contatti generati mediamente",
        "note": "Valore medio mensile, variabile in base a periodo e offerta"
      },
      {
        "value": "500+",
        "label": "Contatti qualificati in un anno",
        "note": "Lead generati nella zona di Monza in un anno di campagne"
      },
      {
        "value": "2.000–6.000€/mese",
        "label": "Fatturato mensile variabile",
        "note": "Fatturato attribuibile alle campagne, variabile per periodo, offerta e gestione commerciale"
      }
    ],
    "blocks": [
      {
        "title": "La sfida",
        "paras": [
          "Vip Fit Monza è un centro fitness e wellness specializzato nel miglioramento della composizione corporea e del benessere psicofisico, con servizi basati su tecnologie avanzate come EMS Training, Vacutherm, Criocamera e Pressoterapia. La collaborazione con Triskell Ecosystem è iniziata nel 2023 con l'obiettivo di rafforzare la presenza digitale del centro, aumentare la visibilità locale e generare un flusso più stabile di contatti qualificati nella zona di Monza."
        ],
        "bullets": [
          "Necessità di rafforzare la presenza digitale locale del centro",
          "Bisogno di generare nuovi contatti qualificati nella zona di Monza",
          "Comunicare in modo più chiaro servizi tecnologici come EMS, Vacutherm e Criocamera",
          "Mancanza di un sistema pubblicitario continuativo e misurabile",
          "Trasformare la comunicazione social e le campagne in uno strumento commerciale più concreto",
          "Sostenere le vendite mensili attraverso campagne Meta Ads strutturate"
        ]
      },
      {
        "title": "La soluzione",
        "paras": [
          "Triskell Ecosystem ha avviato la collaborazione lavorando inizialmente sia sulla gestione social sia sulle campagne pubblicitarie. Nel tempo, la collaborazione si è consolidata soprattutto sulla parte Meta Ads, con campagne locali orientate alla generazione di contatti qualificati e alla promozione dei servizi principali del centro. L'obiettivo non era semplicemente creare visibilità, ma costruire un sistema pubblicitario capace di portare contatti reali, interessati e geograficamente coerenti con la zona di Monza."
        ],
        "bullets": [
          "Gestione social media nella fase iniziale del progetto",
          "Gestione campagne Meta Ads per circa 2 anni e mezzo",
          "Creazione e ottimizzazione continuativa di copy pubblicitari",
          "Ideazione di creatività dedicate ai servizi fitness e wellness",
          "Campagne locali orientate alla generazione di lead qualificati",
          "Promozione dei servizi principali del centro (EMS, Vacutherm, Criocamera, Pressoterapia)",
          "Ottimizzazione progressiva del costo per lead",
          "Monitoraggio costante dei risultati e dei trend di campagna",
          "Supporto alla crescita commerciale del centro nel medio periodo",
          "Consolidamento del rapporto fino all'affidamento di un altro progetto del gruppo Vip Fit (Caress)"
        ]
      }
    ],
    "sections": [
      {
        "title": "Il processo, passo per passo",
        "steps": [
          {
            "t": "Avvio collaborazione (2023)",
            "d": "Audit della presenza digitale e definizione degli obiettivi commerciali del centro. Setup iniziale di social media + campagne pubblicitarie su Meta."
          },
          {
            "t": "Gestione social media",
            "d": "Costruzione della base di comunicazione: contenuti, presenza online e racconto dei servizi tecnologici (EMS, Vacutherm, Criocamera, Pressoterapia)."
          },
          {
            "t": "Focalizzazione su Meta Ads",
            "d": "La collaborazione si concentra sulla parte advertising: campagne locali orientate alla generazione di contatti qualificati nella zona di Monza."
          },
          {
            "t": "Ottimizzazione continua",
            "d": "Iterazioni costanti su copy, creatività, pubblici e offerte. Monitoraggio del costo per lead e dei trend mensili."
          },
          {
            "t": "Consolidamento del sistema",
            "d": "Flusso mensile stabile di 70–90 contatti qualificati. Risultati commerciali ricorrenti e relazione di lungo periodo con il team del centro."
          },
          {
            "t": "Estensione su nuovi progetti",
            "d": "La fiducia maturata porta all'affidamento di un ulteriore progetto del gruppo Vip Fit (Caress), confermando l'approccio replicabile del metodo."
          }
        ]
      },
      {
        "title": "L'infrastruttura digitale",
        "steps": [
          {
            "t": "Social Media",
            "d": "Prima fase di supporto alla comunicazione e alla presenza digitale del centro."
          },
          {
            "t": "Meta Ads",
            "d": "Campagne pubblicitarie locali orientate alla generazione di contatti qualificati."
          },
          {
            "t": "Creatività e Copy",
            "d": "Messaggi e contenuti pensati per comunicare in modo chiaro i servizi Vip Fit."
          },
          {
            "t": "Lead Generation Locale",
            "d": "Acquisizione di contatti qualificati nella zona di Monza e dintorni."
          },
          {
            "t": "Gestione Opportunità",
            "d": "Contatti interessati ai servizi del centro e potenzialmente convertibili in prove, pacchetti o abbonamenti."
          },
          {
            "t": "Crescita Commerciale",
            "d": "Risultati mensili variabili generati dalle campagne e consolidamento del progetto nel tempo."
          }
        ]
      }
    ],
    "quote": {
      "text": "«Nel contesto specifico della collaborazione con Vip Fit Monza, abbiamo contribuito a costruire un sistema pubblicitario locale continuativo che, mese dopo mese, ha generato un flusso costante di contatti qualificati nella zona di Monza.»",
      "by": "Triskell Ecosystem · Team operativo del progetto · Sintesi della collaborazione 2023–2026"
    },
    "tags": [
      "Meta Ads",
      "Social Media",
      "Lead Generation",
      "Advertising",
      "Creatività & Copy"
    ]
  },
  "gabriele-gatti": {
    "lead": "Sito, landing page e Meta Ads per generare richieste di prima visita.",
    "numbers": [
      {
        "value": "Fine 2023",
        "label": "Inizio collaborazione",
        "note": "Collaborazione continuativa attiva"
      },
      {
        "value": "WordPress",
        "label": "Prima base digitale costruita",
        "note": "Sito iniziale Studio Polifisio"
      },
      {
        "value": "Landing Page",
        "label": "Pagina dedicata alla prima visita",
        "note": "Orientata alla conversione"
      },
      {
        "value": "~250€/mese",
        "label": "Budget Meta Ads medio indicativo",
        "note": "Variabile in base al periodo"
      },
      {
        "value": "10–30/mese",
        "label": "Contatti generati mediamente",
        "note": "Nel contesto specifico della collaborazione"
      },
      {
        "value": "Fino a ~40",
        "label": "Contatti nei periodi migliori",
        "note": "Picchi indicativi, non garantiti"
      },
      {
        "value": "~1 su 4",
        "label": "Conversione indicativa dei contatti",
        "note": "Variabile in base alla gestione"
      },
      {
        "value": "~175€",
        "label": "Ritorno medio indicativo per cliente chiuso",
        "note": "Dato indicativo riferito al contesto"
      }
    ],
    "blocks": [
      {
        "title": "La sfida",
        "paras": [
          "Gabriele Gatti è un osteopata D.O. M.Ost RQ che lavora presso Studio Polifisio a Meda. La sua comunicazione digitale aveva bisogno di valorizzare meglio la propria professionalità, il metodo e il percorso di prima visita, rendendo più chiaro il motivo per cui un potenziale paziente dovrebbe contattarlo. La collaborazione con Triskell Ecosystem è iniziata a fine 2023, con l'obiettivo di costruire una presenza online più solida e trasformarla progressivamente in un sistema capace di generare richieste di prima visita."
        ],
        "bullets": [
          "Necessità di costruire una presenza digitale più professionale",
          "Bisogno di comunicare meglio il profilo di Gabriele come osteopata",
          "Necessità di valorizzare metodo, esperienza, recensioni e differenziazione",
          "Bisogno di una pagina più orientata alla conversione",
          "Necessità di generare contatti locali interessati alla prima visita",
          "Budget pubblicitario contenuto da ottimizzare con attenzione",
          "Esigenza di collegare sito, landing page e campagne in un processo più misurabile"
        ]
      },
      {
        "title": "La soluzione",
        "paras": [
          "Triskell Ecosystem ha accompagnato Gabriele Gatti in più fasi: dalla costruzione iniziale della presenza digitale su WordPress, fino alla creazione di una nuova landing page più moderna e orientata alla conversione. La strategia ha integrato comunicazione, posizionamento professionale e campagne Meta Ads locali, con l'obiettivo di generare richieste di prima visita da persone realmente interessate."
        ],
        "bullets": [
          "Supporto alla costruzione del sito WordPress iniziale",
          "Strutturazione della comunicazione professionale",
          "Creazione di una landing page dedicata alla prima visita",
          "Ottimizzazione del messaggio pubblicitario",
          "Valorizzazione di recensioni, metodo e autorevolezza",
          "Gestione campagne Meta Ads locali",
          "Campagne orientate alla richiesta di prima visita",
          "Monitoraggio dei contatti generati",
          "Ottimizzazione continua del budget",
          "Evoluzione verso un nuovo sito più moderno per Studio Polifisio"
        ]
      }
    ],
    "sections": [
      {
        "title": "Il processo, passo per passo",
        "steps": [
          {
            "t": "Setup e ascolto",
            "d": "Analisi della figura professionale di Gabriele, dello Studio Polifisio e degli obiettivi di crescita locale."
          },
          {
            "t": "Sito WordPress",
            "d": "Costruzione della prima presenza digitale per presentare lo studio, i servizi e il profilo professionale."
          },
          {
            "t": "Posizionamento e comunicazione",
            "d": "Strutturazione del messaggio, valorizzazione di metodo, recensioni e percorso di prima visita."
          },
          {
            "t": "Landing page dedicata",
            "d": "Creazione di una pagina moderna e orientata alla conversione, pensata per supportare le campagne pubblicitarie."
          },
          {
            "t": "Meta Ads locali",
            "d": "Attivazione di campagne con budget contenuto per intercettare contatti interessati nella zona di Meda e dintorni."
          },
          {
            "t": "Evoluzione verso il nuovo sito",
            "d": "Oggi il progetto sta entrando in una nuova fase, con ripensamento del sito di Studio Polifisio e integrazione più stretta tra sito, landing page, campagne e processo di contatto."
          }
        ]
      },
      {
        "title": "L'infrastruttura digitale",
        "steps": [
          {
            "t": "Sito WordPress",
            "d": "Prima base digitale per presentare lo studio, i servizi e la figura professionale"
          },
          {
            "t": "Posizionamento Professionale",
            "d": "Comunicazione del metodo, dell'esperienza, delle recensioni e dell'approccio alla prima visita"
          },
          {
            "t": "Landing Page",
            "d": "Pagina specifica progettata per trasformare il traffico pubblicitario in richieste di contatto"
          },
          {
            "t": "Meta Ads",
            "d": "Campagne locali per intercettare persone interessate a una prima visita osteopatica"
          },
          {
            "t": "WhatsApp · Contatto Diretto",
            "d": "Percorso semplificato per richiedere informazioni o prenotare"
          },
          {
            "t": "Prima Visita",
            "d": "Obiettivo finale: portare contatti qualificati verso appuntamenti e prime visite"
          }
        ]
      }
    ],
    "quote": {
      "text": "«Il valore del progetto non è stato soltanto creare un sito o attivare campagne pubblicitarie, ma costruire un percorso più chiaro tra comunicazione professionale, fiducia e richiesta di contatto.»",
      "by": "Triskell Ecosystem · Note di progetto"
    },
    "tags": [
      "WordPress",
      "Landing Page",
      "Meta Ads",
      "Lead Generation"
    ]
  },
  "emme-diffusion": {
    "lead": "Google Ads per promuovere corsi professionali a Genova.",
    "numbers": [
      {
        "value": "2023–2025",
        "label": "Collaborazione continuativa",
        "note": "Progetto pluriennale"
      },
      {
        "value": "Google Ads",
        "label": "Canale principale di acquisizione",
        "note": "Search a domanda consapevole"
      },
      {
        "value": "100–200€/mese",
        "label": "Investimento pubblicitario medio",
        "note": "Variabile per periodo e campagna"
      },
      {
        "value": "20–30",
        "label": "Contatti interessati medi per campagna",
        "note": "Nel contesto specifico della collaborazione"
      },
      {
        "value": "1–4",
        "label": "Contatti chiusi mediamente per campagna",
        "note": "Variabili per offerta formativa e gestione commerciale"
      },
      {
        "value": "Professionali",
        "label": "Corsi promossi",
        "note": "Parrucchieri, barbieri e acconciatori"
      }
    ],
    "blocks": [
      {
        "title": "La sfida",
        "paras": [
          "Emme Diffusion è una realtà del settore hairstyling a Genova, con una scuola interna dedicata alla formazione professionale per futuri parrucchieri, barbieri e acconciatori. L'obiettivo della collaborazione con Triskell Ecosystem era promuovere i percorsi formativi della scuola, intercettando persone interessate a costruire una carriera nel settore beauty e hairstyling. In un mercato locale e competitivo, era fondamentale utilizzare campagne mirate, capaci di raggiungere utenti già attivamente interessati a corsi professionali e percorsi di abilitazione."
        ],
        "bullets": [
          "Necessità di promuovere i corsi professionali in modo più mirato.",
          "Bisogno di generare richieste da persone realmente interessate.",
          "Budget pubblicitario contenuto da ottimizzare con attenzione.",
          "Necessità di intercettare ricerche specifiche su corsi per parrucchieri, barbieri e acconciatori.",
          "Obiettivo di trasformare le campagne in contatti utili per la scuola.",
          "Necessità di sostenere le iscrizioni ai corsi attraverso un canale misurabile."
        ]
      },
      {
        "title": "La soluzione",
        "paras": [
          "Triskell Ecosystem ha supportato Emme Diffusion Academy attraverso campagne Google Ads mirate alla generazione di contatti interessati ai corsi professionali. La strategia si è concentrata sull'intercettare persone già in fase di ricerca attiva, ottimizzando il budget disponibile e lavorando su keyword, annunci e messaggi legati ai percorsi formativi della scuola. L'obiettivo non era generare traffico generico, ma portare richieste qualificate da persone interessate a frequentare corsi per parrucchieri, barbieri e acconciatori."
        ],
        "bullets": [
          "Gestione campagne Google Ads.",
          "Campagne Search orientate alla domanda consapevole.",
          "Ottimizzazione keyword.",
          "Creazione annunci per corsi professionali.",
          "Promozione corsi per parrucchieri.",
          "Promozione corsi per barbieri.",
          "Promozione corsi per acconciatori.",
          "Monitoraggio dei contatti generati.",
          "Ottimizzazione del budget mensile.",
          "Supporto alla generazione di richieste qualificate."
        ]
      }
    ],
    "sections": [
      {
        "title": "Il processo, passo per passo",
        "steps": [
          {
            "t": "Setup account Google Ads",
            "d": "Configurazione iniziale account, conversioni e tracciamento dei contatti generati dal sito Emme Diffusion."
          },
          {
            "t": "Keyword research locale",
            "d": "Analisi delle ricerche legate a corsi per parrucchieri, barbieri e acconciatori nell'area di Genova e Liguria."
          },
          {
            "t": "Campagne Search mirate",
            "d": "Lancio di campagne Search a domanda consapevole, con annunci dedicati a ogni percorso formativo."
          },
          {
            "t": "Ottimizzazione continua",
            "d": "Affinamento di keyword, annunci e budget mese dopo mese per massimizzare i contatti interessati con un investimento contenuto."
          },
          {
            "t": "Monitoraggio e reportistica",
            "d": "Analisi costante dei contatti generati e del costo per richiesta, con focus su qualità e pertinenza dei lead."
          },
          {
            "t": "Consolidamento 2023–2025",
            "d": "Collaborazione continuativa fino al 2025 a supporto delle iscrizioni ai corsi per parrucchieri, barbieri e acconciatori."
          }
        ]
      },
      {
        "title": "L'infrastruttura digitale",
        "steps": [
          {
            "t": "Google Ads",
            "d": "Campagne mirate su persone che cercano corsi professionali nel settore beauty."
          },
          {
            "t": "Keyword Strategy",
            "d": "Selezione e ottimizzazione delle parole chiave più rilevanti per corsi parrucchieri, barbieri e acconciatori."
          },
          {
            "t": "Annunci Mirati",
            "d": "Messaggi costruiti per intercettare utenti interessati a formarsi e richiedere informazioni."
          },
          {
            "t": "Landing / Sito",
            "d": "Traffico indirizzato verso le pagine informative della scuola Emme Diffusion."
          },
          {
            "t": "Richieste Informazioni",
            "d": "Generazione di contatti interessati ai corsi."
          },
          {
            "t": "Iscrizioni ai Corsi",
            "d": "Obiettivo finale: trasformare i contatti in iscritti ai percorsi formativi."
          }
        ]
      }
    ],
    "quote": {
      "text": "«Il valore del progetto non è stato soltanto generare contatti, ma utilizzare un canale ad alta intenzione come Google Ads per intercettare persone già interessate a un percorso formativo. A differenza di campagne più generiche, la strategia ha permesso di lavorare su utenti con una domanda più consapevole: persone che stavano già cercando corsi, percorsi professionali o possibilità di formazione nel settore hairstyling. Questo ha reso Google Ads un canale particolarmente adatto per una scuola professionale locale, soprattutto con budget mensili contenuti.»",
      "by": "Triskell Ecosystem · Valore strategico del progetto"
    },
    "tags": [
      "Google Ads",
      "Lead Generation",
      "Keyword Strategy",
      "Advertising"
    ]
  }
};
