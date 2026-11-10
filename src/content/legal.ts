/**
 * Testi legali (Privacy e Cookie). Scritti SOLO con le informazioni note sul sito e sul titolare.
 * Cosa manca e va aggiunto dal titolare (con un consulente): sede/indirizzo, dati REA, tempi di conservazione precisi,
 * elenco definitivo dei fornitori, termini e condizioni di vendita di corsi e servizi.
 */
import { site } from "./site";

export interface LegalSection {
  title: string;
  paras?: string[];
  bullets?: string[];
}
export interface LegalDoc {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

const holder = `${site.brand.owner} (nome commerciale: ${site.brand.name}), P.IVA ${site.brand.vat}`;

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  intro: "Come trattiamo i dati personali di chi visita questo sito e ci contatta, ai sensi del Regolamento (UE) 2016/679 (GDPR).",
  updated: "Novembre 2026",
  sections: [
    {
      title: "Titolare del trattamento",
      paras: [`Il titolare del trattamento è ${holder}.`, `Per qualsiasi richiesta sui tuoi dati puoi scrivere a ${site.brand.email}.`],
    },
    {
      title: "Quali dati trattiamo",
      bullets: [
        "Dati che ci invii tu: nome, indirizzo email, servizio di interesse e testo del messaggio, quando compili il modulo contatti o scrivi per email, WhatsApp o sui social.",
        "Messaggi che scrivi all'assistente virtuale Triskello: il testo viene usato per generare la risposta.",
        "Dati tecnici di navigazione (ad esempio indirizzo IP, tipo di browser, pagine richieste): come per ogni sito, vengono registrati dal fornitore di hosting per il funzionamento e la sicurezza del servizio.",
      ],
    },
    {
      title: "Perché li trattiamo e su quale base",
      bullets: [
        "Rispondere alle tue richieste e, se lo desideri, preparare una proposta o fissare una call: misure precontrattuali richieste da te (art. 6.1.b GDPR) e, per il modulo, il tuo consenso (art. 6.1.a).",
        "Far funzionare e proteggere il sito: legittimo interesse del titolare (art. 6.1.f).",
        "Adempiere a obblighi di legge (art. 6.1.c).",
        "Eventuali comunicazioni promozionali o newsletter solo con un tuo consenso specifico e separato.",
      ],
    },
    {
      title: "Con chi condividiamo i dati",
      paras: [
        "I dati non vengono venduti. Possono essere trattati da fornitori di servizi tecnici di cui ci avvaliamo per far funzionare il sito e rispondere alle richieste (ad esempio hosting, posta elettronica, strumenti di gestione dei contatti e il fornitore del servizio di assistente virtuale), che agiscono come responsabili del trattamento.",
        "Alcuni fornitori possono avere sede fuori dallo Spazio economico europeo: in questo caso il trasferimento avviene con le garanzie previste dal GDPR.",
      ],
    },
    {
      title: "Assistente virtuale Triskello",
      paras: ["Le risposte di Triskello sono generate da un sistema di intelligenza artificiale: puoi sbagliare a scrivere, ma non inserire dati sensibili o riservati (salute, documenti, dati di pagamento). Per decisioni importanti, prezzi e condizioni rivolgiti sempre al team."],
    },
    {
      title: "Per quanto tempo conserviamo i dati",
      paras: ["Per il tempo necessario a gestire la tua richiesta e, successivamente, per il tempo richiesto da obblighi di legge o per tutelare i nostri diritti. Puoi chiedere la cancellazione in qualsiasi momento, salvo obblighi di conservazione."],
    },
    {
      title: "I tuoi diritti",
      paras: [
        "Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità, opporti al trattamento e revocare il consenso quando il trattamento si basa su di esso (artt. 15-22 GDPR).",
        `Scrivi a ${site.brand.email}. Hai anche il diritto di proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).`,
      ],
    },
    {
      title: "Link e servizi di terzi",
      paras: ["Il sito rimanda a servizi esterni (YouTube, Instagram, WhatsApp, Triskell Academy e i siti dei progetti mostrati). Quando li usi valgono le loro informative privacy: noi non controlliamo i dati che raccolgono."],
    },
  ],
};

export const cookie: LegalDoc = {
  title: "Cookie Policy",
  intro: "Quali strumenti di memorizzazione usa questo sito e come mantenerne il controllo.",
  updated: "Novembre 2026",
  sections: [
    {
      title: "In breve",
      paras: ["Questo sito non usa cookie di profilazione né strumenti di analisi o tracciamento pubblicitario (come Meta Pixel o Google Analytics). Per questo non mostra un banner di consenso."],
    },
    {
      title: "Cosa usiamo",
      bullets: [
        "Memoria temporanea del browser (sessionStorage) usata solo per ricordare, durante la visita, che hai già visto il messaggio di benvenuto di Triskello. Resta sul tuo dispositivo e si cancella chiudendo la scheda.",
        "Font e immagini sono serviti dal sito stesso.",
      ],
    },
    {
      title: "Contenuti di terzi",
      paras: [
        "I video YouTube nella pagina Academy si caricano solo dopo il tuo click, tramite il dominio youtube-nocookie.com. Quando avvii un video, YouTube può impostare propri cookie o strumenti simili: valgono le sue informative.",
        "Se in futuro verranno aggiunti strumenti di analisi o marketing, questa pagina verrà aggiornata e comparirà un banner con i pulsanti per accettare, rifiutare e personalizzare.",
      ],
    },
    {
      title: "Come gestire i cookie",
      paras: [`Puoi cancellare o bloccare cookie e dati del sito dalle impostazioni del tuo browser. Per domande scrivi a ${site.brand.email}.`],
    },
  ],
};
