/** Full navbar inventory: dynamic MODELS + ENGINES built from the registry, plus static public HTML pages. */
import modelPages from "@/data/registery/models/pages.json";
import genPages from "@/data/registery/generations/pages.json";
import varPages from "@/data/registery/variants/pages.json";
import engPages from "@/data/registery/engines/pages.json";
import staticNavData from "@/components/shared/staticNavData.json";

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

const modelGroupsConfig = [
  {
    title: "Compact & Small",
    slugs: ["a-class", "b-class", "cla", "citan", "vaneo"],
  },
  {
    title: "Saloons & Executive",
    slugs: ["c-class", "e-class", "s-class", "cls", "clc-class", "clk", "r-class"],
  },
  {
    title: "SUVs & Crossovers",
    slugs: ["g-class", "gla", "glc", "gle", "glk", "gls", "m-class"],
  },
  {
    title: "Sports & Roadsters",
    slugs: ["amg-gt", "sl", "slk-slc", "sls-amg"],
  },
  {
    title: "Vans & Commercial",
    slugs: ["sprinter", "v-class", "viano", "vito", "vario"],
  },
];

const modelGroups = modelGroupsConfig.map((group) => ({
  title: group.title,
  items: group.slugs.map((slug) => {
    const accepted = parentAliases(slug);

    const variants = varPages
      .filter((page) => accepted.has(page.parent))
      .map((page) => ({
        label: titleCase(page.slug),
        href: `/${page.parent}/${page.slug}`,
      }));

    const generations = genPages
      .filter((page) => accepted.has(page.parent))
      .map((page) => ({
        label: titleCase(page.slug),
        href: page.parent === page.slug ? `/${page.slug}` : `/${page.parent}/${page.slug}`,
      }));

    return {
      label: titleCase(slug),
      href: `/${slug}`,
      variants,
      generations,
    };
  }),
}));

const petrolEngines = [];
const dieselEngines = [];

for (const page of engPages) {
  const item = {
    label: titleCase(page.slug),
    href: `/engine/${page.slug}`,
  };

  if (page.slug.startsWith("om")) dieselEngines.push(item);
  else petrolEngines.push(item);
}

const enginesGroups = [
  { title: "Petrol", links: petrolEngines },
  { title: "Diesel", links: dieselEngines },
];

export const navMenus = [
  {
    id: "models",
    label: "MODELS",
    kind: "models",
    groups: modelGroups,
  },
  {
    id: "engines",
    label: "ENGINES",
    kind: "columns",
    groups: enginesGroups,
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
    groups: [
      { title: "Technical Library", links: staticNavData.technical },
    ],
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
