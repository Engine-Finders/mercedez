"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import { sectionBody, sectionDescription, sectionTableText } from "@/components/models/sectionTypography";

const buyerImages = [
  "/model/Hero-bg-image.webp",
  "/model/Section 2-bg.webp",
  "/model/Section 3-bg.webp",
  "/hero-day.webp",
  "/model/Hero-bg-image.webp",
];

const proofItems = [
  { title: "Built for Real Life", text: "Practical. Powerful. Proven.", icon: "users" },
  { title: "Data-Backed Ratings", text: "UK enquiries analysed in 2025.", icon: "shield" },
  { title: "Honest Verdicts", text: "No hype. Just the truth about ownership.", icon: "star" },
  { title: "Buyer-Focused", text: "Find the right model for your needs.", icon: "car" },
];

const PROFILE_ICON_MAP = {
  family: "users",
  commute: "car",
  budget: "pound",
  performance: "fire",
  keeper: "shield",
};

function cleanText(text = "") {
  return text
    .replaceAll("Ã‚Â£", "\u00a3")
    .replaceAll("Ãƒâ€šÃ‚Â£", "\u00a3")
    .replaceAll("Ã¢â‚¬â€œ", "-")
    .replaceAll("Ã¢â‚¬â€", "-")
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“", "-")
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â", "-")
    .replace(/\s+-\s+/g, " - ")
    .replace(/\s+/g, " ")
    .trim();
}

function modelNameFromTitle(title = "") {
  const clean = cleanText(title);
  const match = clean.match(/Buy a\s+(.+?)\?/i);
  return match ? match[1] : "Mercedes";
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const modelName = modelNameFromTitle(clean);
  const index = clean.indexOf(modelName);

  if (index === -1) {
    return { before: clean, accent: "" };
  }

  return {
    before: clean.slice(0, index).trim(),
    accent: clean.slice(index).trim(),
  };
}

function profileIconKey(profile = "") {
  const value = profile.toLowerCase();
  if (value.includes("family")) return "family";
  if (value.includes("commuter") || value.includes("daily")) return "commute";
  if (value.includes("budget")) return "budget";
  if (value.includes("performance")) return "performance";
  return "keeper";
}

function filledStars(rating = "") {
  const text = String(rating);
  const empty = (text.match(/\u2606/g) || []).length;
  const filled = (text.match(/\u2b50/g) || []).length + (text.match(/\u2605/g) || []).length;

  if (filled > 0) return filled;
  if (empty > 0) return Math.max(0, 5 - empty);

  return 0;
}

function Stars({ rating }) {
  const filled = filledStars(rating);
  const star = String.fromCharCode(9733);

  return (
    <div className="flex items-center gap-1 text-[24px] leading-none md:gap-1.5 md:text-[32px]" style={{ color: GOLD }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} style={{ opacity: index < filled ? 1 : 0.35 }}>
          {star}
        </span>
      ))}
    </div>
  );
}

function CircleIcon({ name, isDark }) {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center md:h-16 md:w-16">
      <HomeIcon name={name} isDark={isDark} gold className="h-9 w-9 object-contain md:h-10 md:w-10" />
    </span>
  );
}

function ProofStrip({ isDark }) {
  return (
    <ul className="hidden overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[0_10px_30px_var(--color-shadow)] lg:grid lg:grid-cols-4">
      {proofItems.map((item) => (
        <li key={item.title} className="flex flex-col items-center justify-start border-r border-[var(--color-border)] px-5 py-3.5 text-center last:border-r-0">
          <HomeIcon name={item.icon} isDark={isDark} gold className="h-9 w-9 object-contain" />
          <strong className="mt-1.5 text-[14px] leading-tight text-[var(--color-text)]">{item.title}</strong>
          <span className="mt-0.5 text-[13px] leading-[1.25] text-[var(--color-text-muted)]">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

function BuyerRow({ row, index, isDark }) {
  const iconKey = profileIconKey(row.buyerProfile);

  return (
    <article className="grid overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[0_10px_26px_var(--color-shadow)] md:rounded-none md:border-0 md:border-t md:shadow-none lg:grid-cols-[40%_18%_42%]">
      <div className="grid grid-cols-[31%_69%] md:grid-cols-[300px_1fr] lg:border-r lg:border-[var(--color-border)]">
        <div className="relative min-h-[150px] md:min-h-[124px]">
          <Image
            src={buyerImages[index % buyerImages.length]}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 300px, (min-width: 768px) 300px, 31vw"
          />
        </div>
        <div className="flex min-w-0 items-center gap-3 px-3 py-3.5 md:px-5 md:py-4">
          <CircleIcon name={PROFILE_ICON_MAP[iconKey]} isDark={isDark} />
          <div className="min-w-0">
            <h3
              className="font-lora text-[16px] font-medium leading-[1.12] text-[var(--color-text)] md:text-[18px]"
              dangerouslySetInnerHTML={{ __html: cleanText(row.buyerProfile) }}
            />
            <div className="mt-3 lg:hidden">
              <Stars rating={row.rating} />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden items-center justify-center border-r border-[var(--color-border)] px-3 py-3 lg:flex">
        <Stars rating={row.rating} />
      </div>

      <p
        className={`border-t border-[var(--color-border)] px-3 py-3 text-[var(--color-text)] md:px-4 md:py-3 lg:border-t-0 ${sectionTableText} md:text-[14px]`}
        dangerouslySetInnerHTML={{ __html: cleanText(row.verdict) }}
      />
    </article>
  );
}

export default function WhoShouldBuy({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);
  const modelName = modelNameFromTitle(data.h2);
  const profiles = data.profiles || [];

  return (
    <section className={`py-6 text-[var(--color-text)] md:py-8 ${homeSectionBg(isDark, 10)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1fr)] lg:items-start">
          <div>
            <h2 className={`font-lora max-w-[760px] text-[29px] font-medium leading-[1.08] tracking-normal md:text-[45px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              <span dangerouslySetInnerHTML={{ __html: title.before }} />
              {title.accent ? (
                <>
                  {" "}
                  <span style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: title.accent }} />
                </>
              ) : null}
            </h2>
            <div className="mt-3">
              <SectionFadeStrip isDark={isDark} />
            </div>
            <p className={`mt-3 max-w-[620px] text-[var(--color-text-muted)] ${sectionDescription}`}>
              Different buyers, different priorities. Here is our verdict on who the <span dangerouslySetInnerHTML={{ __html: modelName }} /> is perfect
              for - and who should think twice.
            </p>
          </div>

          <ProofStrip isDark={isDark} />
        </div>

        <div className="mt-6 overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[0_12px_32px_var(--color-shadow)]">
          <div className="hidden grid-cols-[40%_18%_42%] text-[14px] font-bold text-white lg:grid" style={{ backgroundColor: GOLD }}>
            {(data.columns || ["Buyer Profile", "Rating", "Our Verdict"]).map((column, index) => (
              <div key={column} className={`px-3 py-2.5 ${index > 0 ? "border-l border-white/20" : ""}`}>
                {column}
              </div>
            ))}
          </div>

          <div className="grid gap-5 bg-[var(--color-page)] md:gap-0 lg:block">
            {profiles.map((row, index) => (
              <BuyerRow key={`${row.buyerProfile}-${index}`} row={row} index={index} isDark={isDark} />
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-md border border-[var(--color-border)] bg-[var(--color-page-soft)] p-4 shadow-[0_8px_24px_var(--color-shadow)] md:flex-row md:items-center md:justify-between md:p-5">
          <div className="flex gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[20px] font-bold italic leading-none text-white" style={{ backgroundColor: GOLD }}>
              i
            </span>
            <p className={`max-w-[760px] text-[var(--color-text)] ${sectionBody}`}>
              <strong className="font-bold" style={{ color: GOLD }}>
                Real talk.
              </strong>{" "}
              The right <span dangerouslySetInnerHTML={{ __html: modelName }} /> for you depends on your budget, your mileage, and your patience for
              maintenance. Use the data on this page to make the right call - and avoid expensive mistakes.
            </p>
          </div>
          <Link
            href="#engine-database"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-4 rounded-md px-5 py-3 text-[16px] font-bold text-white no-underline shadow-[0_12px_28px_var(--color-shadow)] transition-all duration-200 hover:opacity-90 md:min-w-[260px]"
            style={{ backgroundColor: GOLD }}
          >
            Explore <span dangerouslySetInnerHTML={{ __html: modelName }} /> Engines
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
