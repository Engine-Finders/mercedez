"use client";

function formatPlate(vrm) {
  const clean = String(vrm || "")
    .replace(/\s+/g, "")
    .toUpperCase();
  if (clean.length === 7) return `${clean.slice(0, 4)} ${clean.slice(4)}`;
  if (clean.length === 6) return `${clean.slice(0, 3)} ${clean.slice(3)}`;
  return clean;
}

/** Yellow GB number-plate input (same look as sticky quote modal). */
export default function UkPlate({ value, editable = true, onChange, inputId, className = "", size = "default" }) {
  const isHero = size === "hero";

  return (
    <div
      className={`flex min-w-0 overflow-hidden rounded-md border border-[#1a1a1a] bg-[#F7CE45] shadow-sm ${
        isHero ? "min-h-[3.25rem] sm:min-h-14" : "min-h-11"
      } ${className}`}
    >
      <div
        className={`flex shrink-0 flex-col items-center justify-center gap-0.5 bg-[#1B3E8A] text-white ${
          isHero ? "w-10 sm:w-11" : "w-8"
        }`}
      >
        <span
          className={`font-bold leading-none tracking-wide ${
            isHero ? "text-[0.68rem] sm:text-[0.72rem]" : "text-[0.55rem]"
          }`}
        >
          GB
        </span>
      </div>
      {editable ? (
        <input
          id={inputId}
          type="text"
          value={value}
          maxLength={8}
          autoComplete="off"
          placeholder="REG HERE"
          onChange={onChange}
          className={`w-full bg-transparent px-3 text-center font-bold tracking-[0.12em] text-[#1a1a1a] outline-none placeholder:text-[#1a1a1a]/55 ${
            isHero ? "text-lg placeholder:text-lg sm:text-xl sm:placeholder:text-xl" : ""
          }`}
        />
      ) : (
        <div
          className={`flex w-full items-center justify-center px-3 text-center font-extrabold tracking-[0.14em] text-[#1a1a1a] ${
            isHero ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
          }`}
        >
          {formatPlate(value) || "-"}
        </div>
      )}
    </div>
  );
}

export { formatPlate };
