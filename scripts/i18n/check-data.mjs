/** Check all localised exports against their French source, without changing it. */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const files = ['carnets', 'voyages'].flatMap(folder => fs.readdirSync(path.join(root, 'src/data', folder))
  .filter(file => file.endsWith('.ts') && file !== 'types.ts')
  .map(file => `${folder}/${file}`));
const imports = [];
const entries = [];
for (const [i, file] of files.entries()) {
  for (const lang of ['fr', 'en', 'it']) {
    const target = lang === 'fr' ? file : file.replace('/', `/${lang}/`);
    imports.push(`import * as m${i}${lang} from ${JSON.stringify(path.join(root, 'src/data', target))};`);
    entries.push(`${JSON.stringify(`${lang}/${file}`)}: m${i}${lang}`);
  }
}
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'lgrs-i18n-check-'));
const keep = new Set(['slug', 'src', 'gpx', 'ogImage', 'href', 'buttonHref', 'ctaHref', 'position', 'cropRatio', 'zones', 'id', 'defaultVariant', 'letter', 'type', 'variant', 'direction', 'name', 'via']);
const namedTitles = new Set(['ARGENTERA', 'BERNINA', 'DAMMASTOCK', 'DAMMASTOCK · TITLIS', 'TOUR DES AGNEAUX', 'ÉCRINS', 'ÖTZTAL', 'KOSOVO', 'VERWALL', 'SKI MED', 'ALPINE LINE']);
let numbers = 0, identifiers = 0, text = 0;
function check(source, target, keys = []) {
  const location = keys.join('.');
  const key = keys.findLast(k => typeof k === 'string');
  if (typeof source === 'number' || typeof source === 'boolean' || source === null) {
    if (source !== target) throw new Error(`Changed number or flag: ${location}`);
    numbers++; return;
  }
  if (typeof source === 'string') {
    if (typeof target !== 'string') throw new Error(`Changed type: ${location}`);
    if (namedTitles.has(source) && source !== target) throw new Error(`Translated proper name: ${location}`);
    if (/Ile Alatau/.test(source) && /Alatau Island|Island Alatau|Isola (?:di )?Alatau/i.test(target)) throw new Error(`Translated mountain name: ${location}`);
    if (keep.has(key) || /^(?:https?:|\/|mailto:)/.test(source)) {
      if (source !== target) throw new Error(`Changed file or identifier: ${location}`);
      identifiers++;
    } else {
      const tags = value => value.match(/<[^>]+>/g) ?? [];
      if (JSON.stringify(tags(source)) !== JSON.stringify(tags(target))) throw new Error(`Changed HTML tags/links: ${location}`);
      if (/ZXQ\d+QXZ|⟦\d{4}⟧/.test(target)) throw new Error(`Unresolved placeholder: ${location}`);
      text++;
    }
    return;
  }
  if (Array.isArray(source)) {
    if (!Array.isArray(target) || source.length !== target.length) throw new Error(`Changed array: ${location}`);
    source.forEach((value, i) => check(value, target[i], [...keys, i])); return;
  }
  if (source && Object.getPrototypeOf(source) === Object.prototype) {
    if (!target || JSON.stringify(Object.keys(source)) !== JSON.stringify(Object.keys(target))) throw new Error(`Changed keys: ${location}`);
    Object.keys(source).forEach(field => check(source[field], target[field], [...keys, field]));
  } else if (source instanceof Set) {
    if (!(target instanceof Set) || JSON.stringify([...source]) !== JSON.stringify([...target])) throw new Error(`Changed identifiers: ${location}`);
  }
}
try {
  const result = await build({ stdin: { contents: imports.join('\n') + `\nexport const all = {${entries.join(',')}};`, resolveDir: root }, bundle: true, platform: 'node', format: 'esm', write: false });
  const file = path.join(temporary, 'data.mjs'); fs.writeFileSync(file, result.outputFiles[0].text);
  const { all } = await import(file);
  for (const sourceFile of files) {
    for (const lang of ['en', 'it']) {
      for (const [name, source] of Object.entries(all[`fr/${sourceFile}`])) {
        if (typeof source !== 'function') check(source, all[`${lang}/${sourceFile}`][name], [sourceFile, name]);
      }
    }
  }
  const departures = value => value.info?.fields?.find(field => field.label === 'Dates')?.value;
  const digits = value => value?.match(/\d+/g)?.join('|');
  for (const file of files.filter(f => f.startsWith('voyages/') && !f.endsWith('/index.ts') && !f.endsWith('/skiMedPlans.ts'))) {
    const name = Object.keys(all[`fr/${file}`])[0];
    const original = all[`fr/${file}`][name];
    for (const lang of ['en', 'it']) {
      const translated = all[`${lang}/${file}`][name];
      const index = original.info.fields.findIndex(field => field.label === 'Dates');
      if (digits(departures(original)) !== digits(translated.info.fields[index].value)) throw new Error(`Changed departure dates: ${lang}/${file}`);
    }
  }
  console.log(`${files.length * 2} data modules: ${numbers} numbers/flags and ${identifiers} files/identifiers unchanged; ${text} text leaves checked; departure dates and HTML intact.`);
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
