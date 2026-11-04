"use client";

import Image from "next/image";

// Semantic icon keys -> filename (same basename in Black / Silver / Mercedes gold).
const FILES = {
  "real-inquiries": "Real Inquiries Icon-01.webp",
  "vetted-specialist": "Vetted Specialist Icon-01.webp",
  "vetted-specialist-2": "Vetted specialist Icon 2-01.webp",
  "expert-verified": "Expert Verified Icon-01.webp",
  "generation-honest-rated": "Generation Honest Rated Icon-01.webp",
  "engine-finders": "Part of Engine finders Icon-01.webp",
  "genuine-failure-data": "Genuine Failure Data Icon-01.webp",
  "repair-vs-replace": "Hones repair vs replace icon-01.webp",
  independent: "100% independent icon-01.webp",
  "oem-references": "Oem references Icon-01.webp",
  symptoms: "Symptoms Icon-01.webp",
  vehicle: "Vehicle Icon-01.webp",
  diagnosis: "Meter Icon-01.webp",
  "real-data": "Real data icon-01.webp",
  "specific-knowledge": "Specific knowledge icon-01.webp",
  "honest-verdict": "Scale Icon-01.webp",
  "ipace-note": "Ipace note icon-01.webp",
  note: "Note Icon-01.webp",
  // Verdict icons (HomeSec2)
  "safe-buy": "Safe buy icon-01.webp",
  "check-watch": "Check Watch-01.webp",
  "flagship-choice": "Flagship choice icon-01.webp",
  "best-family": "Best Family Icon-01.webp",
  "high-demand": "High demand icon-01.webp",
  "top-choice": "Top choice-01.webp",
  "niche-style": "Niche style icon-01.webp",
  ev: "Ev Icon-01.webp",
  fire: "Expensive failure icon-01.webp",
  // HomeSec3 semantic aliases
  chart: "Real Inquiries Icon-01.webp",
  wrench: "Vetted Specialist Icon-01.webp",
  commercial: "Vetted Specialist Icon-01.webp",
  book: "Oem references Icon-01.webp",
  shield: "Genuine Failure Data Icon-01.webp",
  clipboard: "Specific knowledge icon-01.webp",
  users: "Vetted Specialist Icon-01.webp",
  scales: "Scale Icon-01.webp",
  // HomeSec4 ranking + verdict
  engine: "Engine icon-01.webp",
  car: "Vehicle Icon-01.webp",
  tag: "Value icon-01.webp",
  flame: "Expensive failure icon-01.webp",
  warning: "Check Watch-01.webp",
  "best-family-icon": "Best Family Icon-01.webp",
  "long-term": "Best Long term Icon-01.webp",
  clock: "Best Long term Icon-01.webp",
  check: "Check-01.webp",
  x: "Check Watch-01.webp",
  // HomeSec5 comparison + data note
  fuel: "Petrol Icon-01.webp",
  crown: "Flagship choice icon-01.webp",
  info: "Note Icon-01.webp",
  // HomeSec6 economics
  "market-value": "Value icon-01.webp",
  "verified-enquiries": "Real Inquiries Icon-01.webp",
  "honest-advice": "Genuine Failure Data Icon-01.webp",
  link: "Knowledge centre icon-01.webp",
  calculator: "Calculator icon-01.webp",
  repair: "Hones repair vs replace icon-01.webp",
  scrap: "Expensive failure icon-01.webp",
  "scope-decision": "Scope decision Icon-01.webp",
  trend: "Trend icon-01.webp",
  value: "Value icon-01.webp",
  database: "Database Icon-01.webp",
  // HomeSec7 engine families
  droplet: "Petrol Icon-01.webp",
  pump: "Petrol Icon-01.webp",
  bulb: "Not sure icon-01.webp",
  star: "Top choice-01.webp",
  // HomeSec9 failure database
  gear: "Engine icon-01.webp",
  suspension: "Air suspension knowledge Icon-01.webp",
  drivetrain: "Drivetrain failures icon-01.webp",
  electrical: "Electric failures icon-01.webp",
  gearbox: "Gearbox problem  Icon-01.webp",
  ingenium: "Ingenium Icon-01.webp",
  trophy: "Top choice-01.webp",
  amg: "Amg icon-01.webp",
  knowledge: "Knowledge centre icon-01.webp",
  // HomeSec10 market intelligence
  refresh: "Live Feed icon-01.webp",
  globe: "Trend icon-01.webp",
  pound: "Value icon-01.webp",
  pulse: "Market Insight Icon-01.webp",
  live: "Live Feed icon-01.webp",
  "most-enquired": "Most Enquired Icon-01.webp",
  chain: "Timing Chain-01.webp",
  pin: "Uk focused Icon-01.webp",
  "premium-style": "Niche style icon-01.webp",
  "safest-buy": "Top choice-01.webp",
  "best-used": "Best Used buy icon-01.webp",
  residuals: "Value icon-01.webp",
  // HomeSec11
  timeline: "Generation Honest Rated Icon-01.webp",
  insight: "Market Insight Icon-01.webp",
  // Model / ownership pages
  cart: "Best Used buy icon-01.webp",
  alert: "Check Watch-01.webp",
  scale: "Scale Icon-01.webp",
  ranking: "Flagship choice icon-01.webp",
  quote: "Quote Icon-01.webp",
  "most-enquired-stat": "Most Enquired Icon-01.webp",
  generations: "Generation Honest Rated Icon-01.webp",
  "engine-codes": "Database Icon-01.webp",
  "uk-wide-delivery": "Uk wide delivery Icon-01.webp",
  "users-team": "Users Icon-01.webp",
};

// Silver folder uses a few different filenames
const SILVER_FILES = {
  "Top choice-01.webp": "Top choice.webp",
};

const FOLDERS = {
  black: "Jaguar Black",
  silver: "Jaguar Silver",
  gold: "Mercedes gold",
};

/**
 * @param {string} name
 * @param {boolean} [isDark]
 * @param {string} [className]
 * @param {"black"|"silver"|"gold"} [tone] - explicit set; default black (light) / silver (dark)
 * @param {boolean} [gold] - legacy alias for tone="gold" (no CSS filter)
 */
export default function HomeIcon({ name, isDark, className = "h-5 w-5", tone, gold = false }) {
  const file = FILES[name];
  if (!file) return null;

  const resolvedTone = tone || (gold ? "gold" : isDark ? "silver" : "black");
  const folder = FOLDERS[resolvedTone] || FOLDERS.black;
  const resolved =
    resolvedTone === "silver" ? SILVER_FILES[file] || file : file;
  const src = `/${encodeURIComponent(folder)}/${encodeURIComponent(resolved)}`;

  return (
    <Image
      src={src}
      alt=""
      width={48}
      height={48}
      className={className}
      unoptimized
    />
  );
}
