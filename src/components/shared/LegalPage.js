export default function LegalPage({ title, updated, children }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 md:px-8 md:py-12">
      <h1 className="font-lora text-[1.75rem] font-medium leading-tight text-[var(--color-text)] md:text-[2.25rem]">
        {title}
      </h1>
      {updated ? (
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Last updated: {updated}</p>
      ) : null}
      <div className="mt-6 space-y-4 text-[0.95rem] leading-[1.55] text-[var(--color-text-muted)] [&_h2]:mt-8 [&_h2]:font-lora [&_h2]:text-[1.15rem] [&_h2]:font-medium [&_h2]:text-[var(--color-text)] [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </main>
  );
}
