/**
 * Inject shared navbar/footer chrome into every public HTML page.
 * Removes legacy site-nav / site-header / site footer markup.
 * Run: node scripts/inject-static-chrome.mjs
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

const CSS_HREF = "/assets/shared/site-chrome.css";
const JS_SRC = "/assets/shared/site-chrome.js";
const CSS_TAG = `<link rel="stylesheet" href="${CSS_HREF}">`;
const JS_TAG = `<script src="${JS_SRC}" defer></script>`;
const NAV_MOUNT = `<div id="me-site-navbar"></div>`;
const FOOTER_MOUNT = `<div id="me-site-footer"></div>`;

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name === "assets" || name === "images" || name === "_next") continue;
      walkHtml(full, out);
    } else if (name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

function stripBlock(html, pattern) {
  let prev;
  let next = html;
  do {
    prev = next;
    next = prev.replace(pattern, "");
  } while (next !== prev);
  return next;
}

function processHtml(html) {
  let changed = false;
  let out = html;

  // CSS in <head>
  if (!out.includes(CSS_HREF)) {
    if (/<\/head>/i.test(out)) {
      out = out.replace(/<\/head>/i, `  ${CSS_TAG}\n</head>`);
      changed = true;
    }
  }

  // Remove legacy chrome wrappers / navs
  const beforeStrip = out;
  out = stripBlock(
    out,
    /<!--\s*=+\s*NAV\s*=+\s*-->\s*/gi,
  );
  out = stripBlock(
    out,
    /<header\b[^>]*class=["'][^"']*site-header[^"']*["'][^>]*>[\s\S]*?<\/header>/gi,
  );
  out = stripBlock(
    out,
    /<nav\b[^>]*class=["'][^"']*site-nav[^"']*["'][^>]*>[\s\S]*?<\/nav>/gi,
  );
  // Some pages use site-footer class; replace all top-level footers with mount
  out = stripBlock(out, /<footer\b[^>]*>[\s\S]*?<\/footer>/gi);
  if (out !== beforeStrip) changed = true;

  // Navbar mount after <body...>
  if (!out.includes('id="me-site-navbar"')) {
    if (/<body\b[^>]*>/i.test(out)) {
      out = out.replace(/<body\b[^>]*>/i, (m) => `${m}\n${NAV_MOUNT}\n`);
      changed = true;
    }
  }

  // Footer mount + script before </body>
  const hasFooterMount = out.includes('id="me-site-footer"');
  const hasScript = out.includes(JS_SRC);

  if (!hasFooterMount || !hasScript) {
    if (/<\/body>/i.test(out)) {
      const bits = [];
      if (!hasFooterMount) bits.push(FOOTER_MOUNT);
      if (!hasScript) bits.push(JS_TAG);
      out = out.replace(/<\/body>/i, `${bits.join("\n")}\n</body>`);
      changed = true;
    }
  }

  // Cleanup leftover blank comment-only nav sections / excess blank lines near top
  out = out.replace(/\n{3,}/g, "\n\n");

  return { out, changed };
}

const files = walkHtml(publicDir);
let updated = 0;
let skipped = 0;
const failures = [];

for (const file of files) {
  try {
    const html = readFileSync(file, "utf8");
    const { out, changed } = processHtml(html);
    if (!changed && out === html) {
      skipped += 1;
      continue;
    }
    if (out !== html) {
      writeFileSync(file, out, "utf8");
      updated += 1;
    } else {
      skipped += 1;
    }
  } catch (err) {
    failures.push({ file: relative(publicDir, file), error: String(err) });
  }
}

console.log(
  JSON.stringify(
    {
      total: files.length,
      updated,
      skipped,
      failures: failures.length,
      failureSamples: failures.slice(0, 10),
    },
    null,
    2,
  ),
);
