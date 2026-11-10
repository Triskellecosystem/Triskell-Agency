# Triskell Agency — sito

Sito dell'agenzia, ramo di **Triskell Ecosystem**. Stesso stile del sito Ecosystem (scuro, oro/blu, tanto movimento), contenuti solo agency: risultati, servizi, agenti AI.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis. È un progetto separato: si installa e si pubblica da questa cartella.

```bash
cd triskell-agency
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
npm run todos      # segnaposto da sostituire prima della pubblicazione
```

Su Vercel: nuovo progetto con **Root Directory = `triskell-agency`**.

## Pagine

| Pagina | Percorso | Contenuto |
|---|---|---|
| Home | `/` | Hero "Vuoi più clienti per la tua attività?" · nastri dei servizi · numeri · per chi è · **Metodo Triskell** (formula, benefici, 6 mesi, base consigliata) · servizi · agenti AI · come funziona · prima/dopo · casi studio · siti web · chi siamo · ecosistema · FAQ · form |
| Metodo Triskell | `/metodo-triskell` | Social + campagne (+ sito se serve), perché funziona, rodaggio di 6 mesi, niente pacchetti fissi e base consigliata (12 contenuti + 4–5 campagne al mese), extra urgenti, assistenza |
| Social media | `/social` | Come lavoriamo (call, script, primo mese di registrazione, editing, pubblicazione, report), riprese sul posto o in autonomia, base consigliata, tutto ciò che è incluso, "tu registri, al resto pensiamo noi" |
| Siti web | `/siti-web` | Il percorso dalla prima call al sito finito (stile, revisioni, pubblicazione, assistenza) e cosa è incluso |
| Portfolio siti | `/siti-web/portfolio` | I siti realizzati |
| Risultati | `/risultati` | Tutti i casi studio con scheda completa + muro dei numeri |
| Chi siamo | `/chi-siamo` | Tomaso e William, presentazione cinematografica + metodo |
| Contatti | `/contatti` | Form "Prenota la call gratuita" + FAQ |
| Legali | `/privacy`, `/cookie` | |

I vecchi percorsi `/agency/*` del sito Ecosystem rimandano alle pagine nuove (`next.config.ts`).

## Dove si modifica cosa

| Cosa | Dove |
|---|---|
| Tutti i testi e i numeri | `src/content/site.ts` (le parti tra `[parentesi]` nei titoli diventano oro) |
| Link al sito Triskell Ecosystem e all'Academy | `ECOSYSTEM_URL`, `ACADEMY_URL` in cima a `site.ts` |
| Casi studio (schede complete) | `src/content/cases.ts` |
| Colori, font | `src/styles/tokens.css` |
| Sezioni nuove | `AgencyHero`, `ServiceMarquee`, `NumbersWall`, `ForWho`, `AiAgents` + `AgentConsole`, `Benefits`, `TeamTeaser`, `EcosystemLink`, `WebsitesTeaser` in `src/components/sections/` (stili in fondo a `globals.css`) |
| Form contatti | `ContactForm.tsx` + `src/app/api/contact/route.ts` (vedi `.env.example`) |

Ogni animazione ha una versione ferma con `prefers-reduced-motion`.
