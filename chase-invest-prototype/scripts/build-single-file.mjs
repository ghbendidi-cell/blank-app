// Inlines the Vite build (dist/) into one self-contained HTML file, for hosting as a
// claude.ai artifact or sending as a single file. Usage: npm run build:single
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const html = readFileSync(join(dist, 'index.html'), 'utf8');

const cssHref = html.match(/<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"/)?.[1];
const jsSrc = html.match(/<script type="module"[^>]*src="\.\/(assets\/[^"]+\.js)"/)?.[1];
if (!cssHref || !jsSrc) throw new Error('Could not find the built CSS/JS in dist/index.html');

const css = readFileSync(join(dist, cssHref), 'utf8');
// A literal "</script" inside the bundle would end the inline <script> early.
const js = readFileSync(join(dist, jsSrc), 'utf8').replace(/<\/script/gi, '<\\/script');

// The artifact host adds <!doctype>, <html>, <head> and <body>, so emit the content only.
const out = `<title>Safety Buffer + Invest</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`;
writeFileSync(join(dist, 'safety-buffer-invest.html'), out);
console.log(`Wrote dist/safety-buffer-invest.html (${(out.length / 1024).toFixed(0)} KB)`);
