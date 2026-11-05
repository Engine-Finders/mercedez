import { sectionBody, sectionEyebrow, sectionH4, sectionTableText } from "@/components/models/sectionTypography";

export default function EditorialPullQuote({ data }) {
  if (!data) return null;

  return (
    <section style={{ paddingBottom: 8 }}>
      <p className={sectionEyebrow}>Editorial Pull-Quote</p>
      <h2 className={`font-lora font-medium text-[var(--color-text)] ${sectionH4}`} dangerouslySetInnerHTML={{ __html: data.title }} />
      <blockquote className={`mt-2 text-[var(--color-text)] ${sectionTableText}`}>
        <p className={sectionBody} dangerouslySetInnerHTML={{ __html: data.quote }} />
      </blockquote>
      <hr />
    </section>
  );
}
