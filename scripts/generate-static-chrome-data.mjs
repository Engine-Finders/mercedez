/**
 * Builds public/assets/shared/chrome-data.json from the same sources as React nav/footer.
 * Run: node scripts/generate-static-chrome-data.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function readJson(rel) {
  return JSON.parse(readFileSync(join(root, rel), "utf8"));
}

function titleCase(slug = "") {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => {
      const lower = part.toLowerCase();
      if (/^(m|om)\d/.test(lower)) return lower.toUpperCase();
      if (/^\d/.test(lower)) return lower.toUpperCase();
      if (lower === "amg") return "AMG";
      if (lower === "cdi") return "CDI";
      if (lower === "d") return "d";
      if (lower === "gt") return "GT";
      if (lower === "slk" || lower === "slc" || lower === "sl") return lower.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(" ");
}

function parentAliases(slug) {
  if (slug === "clc-class") return new Set(["clc-class", "clc"]);
  if (slug === "slk-slc") return new Set(["slk-slc", "slk", "slc"]);
  return new Set([slug]);
}

const modelPages = readJson("src/data/registery/models/pages.json");
const genPages = readJson("src/data/registery/generations/pages.json");
const varPages = readJson("src/data/registery/variants/pages.json");
const engPages = readJson("src/data/registery/engines/pages.json");
const staticNavData = readJson("src/components/shared/staticNavData.json");

const modelGroupsConfig = [
  { title: "Compact & Small", slugs: ["a-class", "b-class", "cla", "citan", "vaneo"] },
  { title: "Saloons & Executive", slugs: ["c-class", "e-class", "s-class", "cls", "clc-class", "clk", "r-class"] },
  { title: "SUVs & Crossovers", slugs: ["g-class", "gla", "glc", "gle", "glk", "gls", "m-class"] },
  { title: "Sports & Roadsters", slugs: ["amg-gt", "sl", "slk-slc", "sls-amg"] },
  { title: "Vans & Commercial", slugs: ["sprinter", "v-class", "viano", "vito", "vario"] },
];

const modelGroups = modelGroupsConfig.map((group) => ({
  title: group.title,
  items: group.slugs.map((slug) => {
    const accepted = parentAliases(slug);
    const variants = varPages
      .filter((page) => accepted.has(page.parent))
      .map((page) => ({ label: titleCase(page.slug), href: `/${page.parent}/${page.slug}` }));
    const generations = genPages
      .filter((page) => accepted.has(page.parent))
      .map((page) => ({
        label: titleCase(page.slug),
        href: page.parent === page.slug ? `/${page.slug}` : `/${page.parent}/${page.slug}`,
      }));
    return { label: titleCase(slug), href: `/${slug}`, variants, generations };
  }),
}));

const petrolEngines = [];
const dieselEngines = [];
for (const page of engPages) {
  const item = { label: titleCase(page.slug), href: `/engine/${page.slug}` };
  if (page.slug.startsWith("om")) dieselEngines.push(item);
  else petrolEngines.push(item);
}

const navMenus = [
  { id: "models", label: "MODELS", kind: "models", groups: modelGroups },
  {
    id: "engines",
    label: "ENGINES",
    kind: "columns",
    groups: [
      { title: "Petrol", links: petrolEngines },
      { title: "Diesel", links: dieselEngines },
    ],
  },
  {
    id: "problems",
    label: "PROBLEMS & SYMPTOMS",
    kind: "columns",
    groups: [
      { title: "Common Failures", links: staticNavData.failures },
      { title: "Symptoms", links: staticNavData.symptoms },
      { title: "Warning Lights", links: staticNavData.warningLights },
      { title: "Fault Codes", links: staticNavData.faultCodes },
    ],
  },
  {
    id: "guides",
    label: "GUIDES",
    kind: "columns",
    groups: [{ title: "Technical Library", links: staticNavData.technical }],
  },
  {
    id: "research",
    label: "RESEARCH & COMPARE",
    kind: "columns",
    groups: [
      { title: "Compare", links: staticNavData.compare },
      { title: "Fitment Guide", links: staticNavData.fitment },
      { title: "Case Studies", links: staticNavData.caseStudies },
      { title: "Recalls", links: staticNavData.recalls },
      { title: "Ownership Economics", links: staticNavData.economics },
    ],
  },
  {
    id: "data-tools",
    label: "DATA & TOOLS",
    kind: "columns",
    groups: [
      { title: "Data & Reports", links: staticNavData.data },
      { title: "Tools", links: staticNavData.tools },
      { title: "About", links: staticNavData.about },
      { title: "Contact", links: staticNavData.contact },
    ],
  },
];

const footer = {
  columns: [
    {
      title: "Ownership & Data",
      links: [
        { label: "Research Centre", href: "/data" },
        { label: "Engine Failure Index 2026", href: "/data/engine-failure-index-2026" },
        { label: "Failure Rate by Engine", href: "/data/failure-rate-by-engine" },
        { label: "Average Replacement Cost", href: "/data/average-replacement-cost" },
        { label: "Most Enquired Models", href: "/data/most-enquired-models" },
        { label: "Methodology", href: "/data/methodology" },
        { label: "Ownership Economics", href: "/economics" },
        { label: "Repair, Replace or Scrap", href: "/economics/repair-replace-scrap-framework" },
      ],
    },
    {
      title: "Tools & Diagnostics",
      links: [
        { label: "All Tools", href: "/tools" },
        { label: "Repair vs Replace Calculator", href: "/tools/repair-vs-replace-calculator" },
        { label: "Ownership Cost Calculator", href: "/tools/ownership-cost-calculator" },
        { label: "Registration Lookup", href: "/tools/registration-lookup" },
        { label: "VIN Decoder", href: "/tools/vin-decoder" },
        { label: "Oil Finder", href: "/tools/oil-finder" },
        { label: "Engine Compatibility Checker", href: "/tools/engine-compatibility-checker" },
        { label: "Diagnostic Wizard", href: "/tools/diagnostic-wizard" },
        { label: "Engine Value Checker", href: "/tools/engine-value-checker" },
      ],
    },
    {
      title: "Research & Compare",
      links: [
        { label: "All Engines", href: "/engine" },
        { label: "Compare", href: "/compare" },
        { label: "Fitment Guide", href: "/fitment" },
        { label: "Technical Library", href: "/technical" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Recalls", href: "/recalls" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "About & Trust",
      links: [
        { label: "How It Works", href: "/about/how-it-works" },
        { label: "Expert Panel", href: "/about/expert-panel" },
        { label: "Data Verification", href: "/about/data-verification" },
        { label: "Editorial Standards", href: "/about/editorial-standards" },
        { label: "Specialist Vetting", href: "/about/specialist-vetting" },
        { label: "Warranty Standards", href: "/about/warranty-standards" },
        { label: "Verified Outcomes", href: "/about/verified-outcomes" },
        { label: "Corrections", href: "/about/corrections" },
      ],
    },
  ],
  legal: {
    copyright: "© 2026 Mercedes Engines UK, part of the Engine Finders network.",
    disclaimer: "Independent editorial content; not affiliated with Mercedes-Benz.",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookies Policy", href: "/cookies-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
};

const outDir = join(root, "public/assets/shared");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "chrome-data.json");
writeFileSync(outPath, JSON.stringify({ navMenus, footer, modelCount: modelPages.length }, null, 0));
console.log(`Wrote ${outPath} (${navMenus.length} menus, ${modelPages.length} models)`);
