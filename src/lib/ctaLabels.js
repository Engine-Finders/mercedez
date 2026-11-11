/** Display label helpers for doc CTA templates. */

export function formatModelLabel(slug = "") {
  const raw = String(slug || "").trim().toLowerCase();
  if (!raw) return "Mercedes-Benz";
  if (raw === "amg-gt") return "AMG GT";
  if (raw === "slk-slc") return "SLK / SLC";
  if (raw === "clc-class" || raw === "clc") return "CLC-Class";
  return raw
    .split("-")
    .map((part) => {
      if (part === "amg") return "AMG";
      if (part === "glc" || part === "gle" || part === "gla" || part === "gls" || part === "glk") return part.toUpperCase();
      if (part === "cla" || part === "clk" || part === "cls" || part === "sl") return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("-")
    .replace(/-Class$/i, "-Class")
    .replace(/^([A-Z])-class$/i, (_, l) => `${l}-Class`);
}

export function formatChassisLabel(slug = "") {
  return String(slug || "").trim().toUpperCase();
}

export function modelCtaCopy(modelSlug = "") {
  const model = formatModelLabel(modelSlug);
  return {
    hero: `Explore ${model} Engine Replacement Options`,
    problems: {
      label: `Diagnose Mercedes-Benz ${model} Engine Problems`,
      support: "Experiencing similar symptoms? Explore possible faults and understand your repair or replacement options.",
    },
    costs: {
      label: `Get a Mercedes-Benz ${model} Engine Quote`,
      support: `Compare used, reconditioned and rebuilt Mercedes-Benz ${model} engine options with a quote tailored to your vehicle.`,
    },
    path1: `Start Mercedes-Benz ${model} Diagnosis`,
    path2: `Identify ${model} Engine Code`,
  };
}

export function generationCtaCopy(parentSlug = "", chassisSlug = "") {
  const model = formatModelLabel(parentSlug);
  const gen = formatChassisLabel(chassisSlug);
  const full = gen ? `${model} ${gen}` : model;
  return {
    hero: `Explore ${gen || model} Engine Replacement Options`,
    problems: {
      label: `Diagnose Mercedes-Benz ${full} Engine Problems`,
      support: "Experiencing similar symptoms? Explore possible faults and understand your repair or replacement options.",
    },
    costs: {
      label: `Get a Mercedes-Benz ${full} Engine Quote`,
      support: `Compare used, reconditioned and rebuilt Mercedes-Benz ${full} engine options with a quote tailored to your vehicle.`,
    },
    trust: {
      label: `Get a Mercedes-Benz ${full} Engine Quote`,
      support: `Request a specialist quote based on your ${gen || model} engine, vehicle details and replacement requirements.`,
    },
    ownership: {
      label: `Get a Mercedes-Benz ${full} Engine Quote`,
      support: `Compare replacement costs against your ${full}'s value before deciding on your next step.`,
    },
  };
}
