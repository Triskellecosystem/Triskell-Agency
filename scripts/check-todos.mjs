#!/usr/bin/env node
// Elenca tutti i segnaposto da sostituire prima della pubblicazione.
// Uso: npm run todos            → elenco
//      npm run todos -- --strict → esce con codice 1 se ne restano (utile in CI prima del go-live)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(ts|tsx)$/.test(name)) files.push(full);
  }
})(join(root, "src"));

const hits = [];
for (const file of files) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      const m = line.match(/\/\/\s*TODO:?\s*(.*)$/);
      if (m) hits.push({ file: relative(root, file), line: i + 1, text: m[1].trim(), code: line.split("//")[0].trim().slice(0, 70) });
    });
}

const groups = new Map();
for (const h of hits) groups.set(h.file, [...(groups.get(h.file) ?? []), h]);
for (const [file, list] of groups) {
  console.log(`\n${file}  (${list.length})`);
  for (const h of list) console.log(`  ${String(h.line).padStart(4)}  ${h.text || "(vedi codice)"}  ·  ${h.code}`);
}
console.log(`\nTotale segnaposto: ${hits.length}`);
if (process.argv.includes("--strict") && hits.length) process.exit(1);
