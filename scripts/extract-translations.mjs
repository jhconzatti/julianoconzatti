/**
 * One-time script: reads src/utils/translations.ts and writes
 * public/locales/{lang}/translation.json for each supported language.
 *
 * Usage: node scripts/extract-translations.mjs
 *
 * After running, the translations object in translations.ts can be kept
 * solely for TypeScript type generation — the runtime data is served from
 * the generated JSON files via i18next-http-backend.
 */

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// ── 1. Read translations.ts source ──────────────────────────────────────────
const src = readFileSync(resolve(root, "src/utils/translations.ts"), "utf8");

// ── 2. Strip TypeScript-specific syntax so we can eval as plain JS ──────────
const stripped = src
  // Remove type exports at the end of the file
  .replace(/^\/\/ ─── Type Utilities[\s\S]*$/m, "")
  // Remove TypeScript export type declarations
  .replace(/^export type .+$/gm, "")
  // Remove TypeScript type annotations on the const (": Language" etc.)
  .replace(/^export const translations = /m, "const translations = ")
  // Remove trailing commas in objects that some JS engines reject (ES5 compat)
  // (modern Node is fine, this is a no-op safeguard)
  .trim();

// ── 3. Evaluate and extract ──────────────────────────────────────────────────
// We use the Function constructor so we can capture the `translations` object
// without writing a temp file or depending on ts-node.
const extractFn = new Function(`
  ${stripped}
  return translations;
`);
const translations = extractFn();

// ── 4. Write one JSON file per language ─────────────────────────────────────
const langs = Object.keys(translations);
for (const lang of langs) {
  const dir = resolve(root, "public", "locales", lang);
  mkdirSync(dir, { recursive: true });
  const outPath = resolve(dir, "translation.json");
  writeFileSync(outPath, JSON.stringify(translations[lang], null, 2), "utf8");
  console.log(`✔  Wrote ${outPath.replace(root, "").replace(/\\/g, "/")}`);
}

console.log(`\nDone — ${langs.length} locales extracted.`);
