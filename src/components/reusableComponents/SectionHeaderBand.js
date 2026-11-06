import Image from "next/image";
import { typeH2, typeDesc } from "@/components/shared/typography";
import { GOLD } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";

/** Desktop diagonal shifted a bit right vs original 52/38 */
const IMAGE_CLIP = "polygon(58% 0%, 100% 0%, 100% 100%, 44% 100%)";
const LEFT_CLIP = "polygon(0 0, 58.15% 0, 44.15% 100%, 0 100%)";

/**
 * Section header with image:
 * - Mobile: heading over image (left fade); description below image
 * - Desktop: Rankings-style diagonal gold border between text panel and image
 */
export default function SectionHeaderBand({
  title,
  subHeadline,
  image,
  isDark = false,
  panelBg = "#F8F7F3",
  panelRgb = "248,247,243",
  titleClassName = "max-w-[480px] lg:max-w-[520px]",
}) {
  const src = image?.src || "/sec2-bg.webp";
  const alt = image?.alt || "";

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden md:min-h-[300px] lg:min-h-[340px]">
      {/* Desktop: solid left panel */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{ backgroundColor: panelBg, clipPath: LEFT_CLIP }}
        aria-hidden="true"
      />

      {/* Desktop: right image */}
      <div className="absolute inset-0 z-0 hidden md:block" style={{ clipPath: IMAGE_CLIP }} aria-hidden="true">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover object-[72%_center]"
          sizes="100vw"
          unoptimized
        />
      </div>

      {/* Desktop: gold diagonal border */}
      <svg
        className="pointer-events-none absolute inset-0 z-[2] hidden h-full w-full md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="58.1"
          y1="0"
          x2="44.1"
          y2="100"
          stroke={GOLD}
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Mobile: image sized to heading height + left fade */}
      <div className="relative w-full md:hidden">
        <div className="relative z-10 w-[70%] max-w-[340px] px-3 py-4">
          <h2 className={`font-lora ${typeH2} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            {title}
          </h2>
          <SectionLabel isDark={isDark} />
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            unoptimized
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(90deg, rgba(${panelRgb},0.94) 0%, rgba(${panelRgb},0.78) 42%, rgba(${panelRgb},0.28) 68%, transparent 88%)`,
            }}
          />
        </div>
      </div>

      {/* Mobile: description below image */}
      {subHeadline ? (
        <div className="relative mx-auto w-full max-w-8xl px-3 pt-4 md:hidden">
          <p className={`${typeDesc} ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
            {subHeadline}
          </p>
        </div>
      ) : null}

      {/* Desktop title */}
      <div className="relative z-10 mx-auto hidden w-full max-w-8xl px-3 py-10 md:block md:px-4 md:py-12 lg:px-6 lg:py-14">
        <div className={titleClassName}>
          <h2 className={`font-lora ${typeH2} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            {title}
          </h2>
          <SectionLabel isDark={isDark} />
          {subHeadline ? (
            <p className={`mt-3 max-w-[640px] ${typeDesc} ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
              {subHeadline}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
