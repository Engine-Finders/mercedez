"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { buildQuoteLeadPayload } from "@/app/api/lib/buildLeadPayload";

const emptyVehicle = {
  vrm: "",
  brand: "",
  series: "",
  year: "",
  fuelType: "",
  engineCapacity: "",
  colour: "",
  wheelplan: "",
};

function formatPlate(vrm) {
  const clean = String(vrm || "")
    .replace(/\s+/g, "")
    .toUpperCase();
  if (clean.length === 7) return `${clean.slice(0, 4)} ${clean.slice(4)}`;
  if (clean.length === 6) return `${clean.slice(0, 3)} ${clean.slice(3)}`;
  return clean;
}

function engineLitres(raw) {
  if (!raw) return "—";
  const cleaned = String(raw).replace(/[^\d.]/g, "");
  const num = Number(cleaned);
  if (!Number.isFinite(num) || num <= 0) return String(raw);
  const litres = num >= 100 ? num / 1000 : num;
  return `${litres.toFixed(1)}L`;
}

function colourSwatch(name) {
  const key = String(name || "").toLowerCase();
  const map = {
    white: "#f5f5f5",
    black: "#1a1a1a",
    silver: "#c0c0c0",
    grey: "#8a8a8a",
    gray: "#8a8a8a",
    blue: "#2b5aa8",
    red: "#b91c1c",
    green: "#166534",
    yellow: "#eab308",
    orange: "#ea580c",
    brown: "#7c4a2d",
    beige: "#d6c4a8",
    gold: "#ab8450",
    purple: "#6b21a8",
  };
  for (const [token, hex] of Object.entries(map)) {
    if (key.includes(token)) return hex;
  }
  return "#d4d4d4";
}

function IconUser({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M5 19.5c1.8-3.2 4.2-4.8 7-4.8s5.2 1.6 7 4.8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconMail({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M4.5 7.5 12 13l7.5-5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.5 4.5h2.2l1.1 3.2-1.5 1.2a11 11 0 0 0 4.8 4.8l1.2-1.5 3.2 1.1v2.2a2 2 0 0 1-2.1 2A14.5 14.5 0 0 1 4.5 6.6a2 2 0 0 1 2-2.1Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s6-5.2 6-10.2A6 6 0 0 0 6 10.8C6 15.8 12 21 12 21Z" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="10.5" r="2.2" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function IconChat({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H10l-4 3.5V16H7.5A2.5 2.5 0 0 1 5 13.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 11V8.5a4 4 0 0 1 8 0V11" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function IconEngine({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 14h2l1.5-3H10l1 2h3l1.2-2.5H18v3h2v3h-2v2h-3.5L14 16H11l-1 2H7.5L6 16H4v-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 8V5h6v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconCalendar({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 3.5V7M16 3.5V7M4 10h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconFuel({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="4" width="10" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M14.5 8h2.2a2 2 0 0 1 2 2v7.5a1.5 1.5 0 1 0 3 0V10.2L19 7.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 8h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function Field({ id, label, icon, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[var(--color-text)]">
        <span className="text-[var(--color-text-muted)]">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

const fieldInputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-soft)] focus:border-[var(--color-primary)]";

function UkPlate({ value, editable, onChange, inputId }) {
  return (
    <div className="flex min-h-12 flex-1 overflow-hidden rounded-md border border-[#1a1a1a] bg-[#F7CE45] shadow-sm">
      <div className="flex w-9 shrink-0 flex-col items-center justify-center gap-0.5 bg-[#1B3E8A] text-white">
        <span className="text-[0.55rem] font-bold leading-none tracking-wide">GB</span>
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
          className="w-full bg-transparent px-3 text-center font-bold tracking-[0.12em] text-[#1a1a1a] outline-none placeholder:text-[#1a1a1a]/55"
        />
      ) : (
        <div className="flex w-full items-center justify-center px-3 text-center text-lg font-extrabold tracking-[0.14em] text-[#1a1a1a] sm:text-xl">
          {formatPlate(value) || "—"}
        </div>
      )}
    </div>
  );
}

export default function FloatingQuoteModal({ titleId, closeRef, onClose }) {
  const uid = useId();
  const [regInput, setRegInput] = useState("");
  const [vehicle, setVehicle] = useState(emptyVehicle);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupAlert, setLookupAlert] = useState({ type: "", message: "" });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [remarks, setRemarks] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitAlert, setSubmitAlert] = useState({ type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const vehicleReady = Boolean(vehicle.vrm && (vehicle.brand || vehicle.series || vehicle.year));

  const vehicleTitle = useMemo(() => {
    const parts = [vehicle.brand, vehicle.series].filter(Boolean);
    return parts.join(" ") || "Vehicle found";
  }, [vehicle.brand, vehicle.series]);

  async function lookupVehicle(event) {
    event?.preventDefault?.();
    const reg = regInput.replace(/\s+/g, "").toUpperCase();
    if (!reg) {
      setLookupAlert({ type: "error", message: "Enter a registration number first." });
      return;
    }

    setLookupLoading(true);
    setLookupAlert({ type: "", message: "" });
    setSubmitted(false);

    try {
      const response = await fetch(`/api/vehicle-lookup?vrm=${encodeURIComponent(reg)}`);
      const data = await response.json();

      if (!response.ok) {
        setVehicle(emptyVehicle);
        setLookupAlert({ type: "error", message: data.error || "Could not find that vehicle." });
        return;
      }

      setVehicle(data.vehicle || emptyVehicle);
      setLookupAlert({ type: "", message: "" });
    } catch (error) {
      setVehicle(emptyVehicle);
      setLookupAlert({ type: "error", message: error.message || "Lookup failed. Please try again." });
    } finally {
      setLookupLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitAlert({ type: "", message: "" });

    if (!vehicleReady) {
      setSubmitAlert({ type: "error", message: "Search a registration before submitting." });
      return;
    }

    if (!name.trim() || !phone.trim() || !email.trim() || !postcode.trim()) {
      setSubmitAlert({ type: "error", message: "Full name, phone, email and postcode are required." });
      return;
    }

    if (honeypot) {
      setSubmitted(true);
      return;
    }

    setSubmitLoading(true);

    try {
      const payload = buildQuoteLeadPayload({
        contact: { name, phone, email, postcode, remarks, honeypot },
        vehicle,
      });

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send quote request");
      }

      setSubmitted(true);
      setSubmitAlert({ type: "success", message: "Quote request sent." });
    } catch (error) {
      setSubmitAlert({ type: "error", message: error.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="relative z-[61] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="p-8 text-center sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent-green)] text-white">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M6 14l6 6 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-[var(--color-text)]">Quote Request Sent!</h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            We&apos;ve received your details and will be contacting you soon.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="btn-cta mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-primary)] px-5 text-sm font-bold text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="relative z-[61] flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      {/* Header */}
      <div className="relative shrink-0 overflow-hidden px-5 pb-10 pt-6 sm:px-8 sm:pb-12 sm:pt-7">
        <Image src="/sec2-bg.webp" alt="" fill priority className="object-cover object-center" sizes="672px" />
        <div className="absolute inset-0 bg-black/55" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
          aria-label="Close"
        >
          <span className="text-lg leading-none">✕</span>
        </button>
        <div className="relative z-[1] pr-10 text-center sm:text-left">
          <h2 id={titleId} className="text-2xl font-extrabold leading-tight text-white sm:text-[1.75rem]">
            Get My Vehicle <span className="text-[var(--color-primary)]">Information</span>
          </h2>
          <p className="mt-2 text-sm text-white/85">
            Enter your vehicle registration to find best replacement engine quote.
          </p>
        </div>
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit} className="relative -mt-6 flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-2xl bg-white">
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-6">
          {!vehicleReady ? (
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <UkPlate
                value={regInput}
                editable
                inputId={`${uid}-reg`}
                onChange={(event) => setRegInput(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8))}
              />
              <button
                type="button"
                onClick={lookupVehicle}
                disabled={lookupLoading}
                className="btn-cta inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 text-sm font-bold text-white hover:bg-[var(--color-primary-strong)] disabled:opacity-60"
              >
                {lookupLoading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                <span>{lookupLoading ? "Searching…" : "Get Instant Quote →"}</span>
              </button>
            </div>
          ) : (
            <div className="mb-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:items-center">
              <div className="relative mx-auto aspect-[16/10] w-full max-w-[280px] overflow-hidden rounded-xl bg-[var(--color-page-soft)] sm:mx-0 sm:max-w-none">
                <Image src="/right.webp" alt={vehicleTitle} fill className="object-contain object-center p-2" sizes="280px" />
              </div>
              <div>
                <UkPlate value={vehicle.vrm || regInput} editable={false} />
                <p className="mt-3 text-base font-extrabold text-[var(--color-text)] sm:text-lg">{vehicleTitle}</p>
                <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-text-muted)]">
                  <li className="flex items-center gap-2">
                    <IconCalendar className="h-4 w-4 shrink-0 text-[var(--color-text)]" />
                    <span>
                      <span className="font-semibold text-[var(--color-text)]">Year:</span> {vehicle.year || "—"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconFuel className="h-4 w-4 shrink-0 text-[var(--color-text)]" />
                    <span>
                      <span className="font-semibold text-[var(--color-text)]">Fuel Type:</span> {vehicle.fuelType || "—"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconEngine className="h-4 w-4 shrink-0 text-[var(--color-text)]" />
                    <span>
                      <span className="font-semibold text-[var(--color-text)]">Engine:</span> {engineLitres(vehicle.engineCapacity)}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-[var(--color-border)]"
                      style={{ backgroundColor: colourSwatch(vehicle.colour) }}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="font-semibold text-[var(--color-text)]">Colour:</span> {vehicle.colour || "—"}
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setVehicle(emptyVehicle);
                    setLookupAlert({ type: "", message: "" });
                    setSubmitAlert({ type: "", message: "" });
                  }}
                  className="mt-3 text-xs font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline"
                >
                  Change registration
                </button>
              </div>
            </div>
          )}

          {lookupAlert.message ? (
            <p
              className={`mb-4 rounded-lg border px-3 py-2 text-sm ${
                lookupAlert.type === "error"
                  ? "border-[var(--color-accent-red)]/40 bg-[var(--color-accent-red-soft)] text-[var(--color-accent-red)]"
                  : "border-[var(--color-accent-green)]/40 bg-[var(--color-accent-green-soft)] text-[var(--color-accent-green)]"
              }`}
            >
              {lookupAlert.message}
            </p>
          ) : null}

          <div className="mb-4 flex items-center gap-3">
            <h3 className="shrink-0 text-lg font-extrabold text-[var(--color-text)]">
              Enter Your <span className="text-[var(--color-primary)]">Details</span>
            </h3>
            <span className="h-px flex-1 bg-[var(--color-border)]" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field id={`${uid}-name`} label="Name" icon={<IconUser className="h-4 w-4" />}>
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className={fieldInputClass}
              />
            </Field>
            <Field id={`${uid}-email`} label="Email" icon={<IconMail className="h-4 w-4" />}>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className={fieldInputClass}
              />
            </Field>
            <Field id={`${uid}-phone`} label="Phone Number" icon={<IconPhone className="h-4 w-4" />}>
              <input
                id={`${uid}-phone`}
                name="number"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XXXXXXXXX"
                className={fieldInputClass}
              />
            </Field>
            <Field id={`${uid}-postcode`} label="Post Code" icon={<IconPin className="h-4 w-4" />}>
              <input
                id={`${uid}-postcode`}
                name="postcode"
                type="text"
                required
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="W12 9AB"
                className={fieldInputClass}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                id={`${uid}-remarks`}
                label="Any Remarks (Additional Information – Optional)"
                icon={<IconChat className="h-4 w-4" />}
              >
                <textarea
                  id={`${uid}-remarks`}
                  name="description"
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Please enter any info you would like us to know."
                  className={`${fieldInputClass} resize-y`}
                />
              </Field>
            </div>
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor={`${uid}-hp`}>Keep this field blank</label>
            <input
              id={`${uid}-hp`}
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {submitAlert.message ? (
            <p
              className={`mt-4 rounded-lg border px-3 py-2 text-sm ${
                submitAlert.type === "error"
                  ? "border-[var(--color-accent-red)]/40 bg-[var(--color-accent-red-soft)] text-[var(--color-accent-red)]"
                  : "border-[var(--color-accent-green)]/40 bg-[var(--color-accent-green-soft)] text-[var(--color-accent-green)]"
              }`}
            >
              {submitAlert.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={!vehicleReady || submitLoading}
            className="btn-cta mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 text-sm font-bold text-white hover:bg-[var(--color-primary-strong)] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {submitLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <IconEngine className="h-5 w-5" />
            )}
            <span>{submitLoading ? "Sending…" : "Get Your Free Replacement Engine Quote →"}</span>
          </button>

          {!vehicleReady ? (
            <p className="mt-2 text-center text-xs text-[var(--color-text-soft)]">
              Search a vehicle registration to enable submit.
            </p>
          ) : null}

          <p className="mt-4 flex items-start justify-center gap-1.5 text-center text-[0.72rem] leading-snug text-[var(--color-text-soft)]">
            <IconLock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>Your details are secure, no spam – genuine quote from UK vetted engine specialists only.</span>
          </p>
        </div>
      </form>
    </div>
  );
}
