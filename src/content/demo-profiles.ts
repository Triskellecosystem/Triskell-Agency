/**
 * Profili Instagram DIMOSTRATIVI (attività inventate) mostrati nei telefoni del sito.
 * I post sono grafiche fatte in CSS: sfondo (gradiente), titolo e una riga. Nessuna foto, nessun cliente reale.
 */
export interface DemoPost {
  bg: string;
  title: string;
  sub?: string;
  kind?: "reel" | "carousel";
  dark?: boolean;
}

export interface DemoProfile {
  handle: string;
  name: string;
  category: string;
  bio: string[];
  avatar: { bg: string; letter: string };
  posts: number;
  followers: number;
  following: number;
  highlights: Array<{ label: string; bg: string }>;
  grid: DemoPost[];
  campaign: { name: string; gain: string; today: number; unit: string };
}

export const demoProfiles: DemoProfile[] = [
  {
    handle: "aurabeautylab",
    name: "Aura Beauty Lab",
    category: "Centro estetico · Milano",
    bio: ["Trattamenti viso e corpo su misura ✨", "Prenota la tua prima consulenza gratuita"],
    avatar: { bg: "linear-gradient(135deg,#f9d7c5,#c98a6b)", letter: "A" },
    posts: 214,
    followers: 18420,
    following: 312,
    highlights: [
      { label: "Viso", bg: "linear-gradient(135deg,#f6d1c1,#e7a98f)" },
      { label: "Corpo", bg: "linear-gradient(135deg,#efe1d6,#c9a58c)" },
      { label: "Prima/Dopo", bg: "linear-gradient(135deg,#2b1d1a,#7a4b3c)" },
      { label: "Promo", bg: "linear-gradient(135deg,#f7c85c,#e9a33a)" },
      { label: "Team", bg: "linear-gradient(135deg,#d9c3b5,#8e6a58)" },
    ],
    grid: [
      { bg: "linear-gradient(160deg,#f6d1c1,#e2a189)", title: "Glow Week", sub: "-20% su tutti i trattamenti viso", kind: "carousel" },
      { bg: "linear-gradient(160deg,#2b1d1a,#5e3a2f)", title: "Prima / Dopo", sub: "3 sedute", kind: "reel", dark: true },
      { bg: "linear-gradient(160deg,#efe6dd,#d2b8a4)", title: "Nuovo", sub: "Radiofrequenza corpo" },
      { bg: "linear-gradient(160deg,#c98a6b,#8e5a44)", title: "3 errori", sub: "nella skincare serale", kind: "reel", dark: true },
      { bg: "linear-gradient(160deg,#f7c85c,#e2972d)", title: "Prenota", sub: "La consulenza è gratuita" },
      { bg: "linear-gradient(160deg,#f3e2d8,#e6c4b0)", title: "«Pelle nuova»", sub: "— Giulia, cliente", kind: "carousel" },
      { bg: "linear-gradient(160deg,#3a2724,#1f1513)", title: "Dietro le quinte", kind: "reel", dark: true },
      { bg: "linear-gradient(160deg,#e9cfc0,#b98066)", title: "Routine", sub: "in 4 passi" },
      { bg: "linear-gradient(160deg,#fbeee6,#efd0bf)", title: "Gift card", sub: "Regala un momento per sé" },
    ],
    campaign: { name: "Consulenza gratuita · Meta Ads", gain: "+214 follower questa settimana", today: 23, unit: "richieste oggi" },
  },
  {
    handle: "osteriadelporto",
    name: "Osteria del Porto",
    category: "Ristorante · Genova",
    bio: ["Pesce fresco ogni giorno, dal 1987 🐟", "Prenota il tuo tavolo · Aperti a cena"],
    avatar: { bg: "linear-gradient(135deg,#0d3e66,#3aa4d4)", letter: "O" },
    posts: 386,
    followers: 9730,
    following: 205,
    highlights: [
      { label: "Menu", bg: "linear-gradient(135deg,#0d3e66,#2a90c3)" },
      { label: "Pesce", bg: "linear-gradient(135deg,#e8dcc4,#c4a77a)" },
      { label: "Eventi", bg: "linear-gradient(135deg,#7a1d12,#e63a1f)" },
      { label: "Vini", bg: "linear-gradient(135deg,#3b0d1a,#8a2a3e)" },
    ],
    grid: [
      { bg: "linear-gradient(160deg,#0d3e66,#06223a)", title: "Crudo del giorno", kind: "reel", dark: true },
      { bg: "linear-gradient(160deg,#f2e8d5,#d9c49c)", title: "Menu", sub: "di stagione", kind: "carousel" },
      { bg: "linear-gradient(160deg,#e63a1f,#7a1d12)", title: "Venerdì", sub: "Serata live", dark: true },
      { bg: "linear-gradient(160deg,#f7c85c,#d18a1f)", title: "Prenota", sub: "Tavoli per stasera" },
      { bg: "linear-gradient(160deg,#123049,#0a1c2c)", title: "Dal mare", sub: "alla tavola", kind: "reel", dark: true },
      { bg: "linear-gradient(160deg,#efe4d0,#cdb48a)", title: "4,8 ★", sub: "su Google" },
    ],
    campaign: { name: "Prenota il tavolo · Meta Ads", gain: "+96 follower questa settimana", today: 14, unit: "prenotazioni oggi" },
  },
  {
    handle: "corefitstudio",
    name: "Core Fit Studio",
    category: "Personal training · Torino",
    bio: ["Allenamento 1:1 e piccoli gruppi 💪", "Prima lezione gratuita"],
    avatar: { bg: "linear-gradient(135deg,#0b1f2e,#7fe0a0)", letter: "C" },
    posts: 152,
    followers: 12960,
    following: 188,
    highlights: [
      { label: "Corsi", bg: "linear-gradient(135deg,#0b1f2e,#1f6b52)" },
      { label: "Risultati", bg: "linear-gradient(135deg,#7fe0a0,#2f9d6a)" },
      { label: "Coach", bg: "linear-gradient(135deg,#1a2940,#3a5a7a)" },
      { label: "Prova", bg: "linear-gradient(135deg,#f7c85c,#e9a33a)" },
    ],
    grid: [
      { bg: "linear-gradient(160deg,#0b1f2e,#163a2f)", title: "-6 kg", sub: "in 12 settimane", kind: "reel", dark: true },
      { bg: "linear-gradient(160deg,#7fe0a0,#2f9d6a)", title: "Prova", sub: "gratuita", dark: true },
      { bg: "linear-gradient(160deg,#e9f3ee,#bcd9c9)", title: "5 esercizi", sub: "per la schiena", kind: "carousel" },
      { bg: "linear-gradient(160deg,#1a2940,#0b1420)", title: "Coach Luca", kind: "reel", dark: true },
      { bg: "linear-gradient(160deg,#f7c85c,#e2972d)", title: "Nuovo corso", sub: "Mobility" },
      { bg: "linear-gradient(160deg,#10261d,#0a1612)", title: "Prima / Dopo", kind: "reel", dark: true },
    ],
    campaign: { name: "Lezione di prova · Meta Ads", gain: "+132 follower questa settimana", today: 17, unit: "prove prenotate" },
  },
];
