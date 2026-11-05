/**
 * Site typography scale (mobile → desktop).
 * Use these class strings for consistent hierarchy on home + model pages.
 * Tables stay modest so cells do not leak/merge.
 */

/** H1 — 32px / 60px */
export const typeH1 =
  "text-[32px] font-medium leading-[1.08] tracking-normal md:text-[60px] md:leading-[1.05]";

/** H2 — 28px / 54px */
export const typeH2 =
  "text-[28px] font-medium leading-[1.08] tracking-normal md:text-[54px] md:leading-[1.05]";

/** H3 — 25px / 44px */
export const typeH3 =
  "text-[25px] font-medium leading-[1.1] tracking-normal md:text-[44px] md:leading-[1.08]";

/** H4 — 22px / 34px */
export const typeH4 =
  "text-[22px] font-medium leading-[1.12] tracking-normal md:text-[34px] md:leading-[1.1]";

/** H5 — 20px / 24px */
export const typeH5 = "text-[20px] font-medium leading-[1.15] md:text-[24px] md:leading-[1.15]";

/** H6 — 18px / 20px */
export const typeH6 = "text-[18px] font-medium leading-[1.2] md:text-[20px] md:leading-[1.2]";

/** Paragraph / description — 15px / 18px max */
export const typeDesc = "text-[15px] leading-[1.5] md:text-[18px] md:leading-[1.5]";

/** Body copy (same as desc, slightly tighter line-height OK) */
export const typeBody = "text-[15px] leading-[1.45] md:text-[18px] md:leading-[1.5]";

/** Highlighted text / numbers — 17–18px / 19–20px */
export const typeHighlight = "text-[17px] leading-[1.3] md:text-[20px] md:leading-[1.3]";

/** Badges / icon labels — 13–14px / 15–16px */
export const typeBadge = "text-[13px] leading-[1.3] md:text-[15px] md:leading-[1.3]";

/** Small supporting text — 13–14px / 15–16px */
export const typeSmall = "text-[13px] leading-[1.35] md:text-[16px] md:leading-[1.4]";

/** Buttons / CTA — 15px both */
export const typeButton = "text-[15px]";

/** Table / dense UI — keep compact (13 / 15) */
export const typeTable = "text-[13px] leading-[1.4] md:text-[15px] md:leading-[1.45]";

/** Eyebrow / micro labels */
export const typeEyebrow =
  "text-[13px] font-semibold uppercase tracking-[0.16em] md:text-[14px] md:tracking-[0.14em]";
