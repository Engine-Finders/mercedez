import { notFound } from "next/navigation";
import pages from "@/data/registery/engines/pages.json";
import EngineHero from "@/components/engine/EngineHero";
import AtAGlance from "@/components/engine/AtAGlance";
import VerdictRating from "@/components/engine/VerdictRating";
import Compatibility from "@/components/engine/Compatibility";
import CostGuide from "@/components/engine/CostGuide";
import FAQAccordion from "@/components/engine/FAQAccordion";
import TrustCta from "@/components/engine/TrustCta";
import { SITE_URL, sanitizeImageUrl, sanitizeJsonLd } from "@/lib/seoAssets";

async function getPageData(dataFile) {
  try {
    const data = await import(`@/data/engines/${dataFile}.json`);
    return data.default;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = pages.find((page) => page.slug === slug);
  if (!entry) return {};
  const data = await getPageData(entry.dataFile);
  if (!data?.meta) return {};

  const { meta } = data;
  const canonical = `${SITE_URL}/engine/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: meta.openGraph?.type
      ? {
          title: meta.openGraph.title,
          description: meta.openGraph.description,
          type: meta.openGraph.type,
          url: canonical,
          images: [sanitizeImageUrl(meta.openGraph.image)],
          siteName: "Mercedes Engines UK",
        }
      : undefined,
    twitter: meta.twitter?.card
      ? {
          card: meta.twitter.card,
          title: meta.twitter.title,
          description: meta.twitter.description,
          images: [sanitizeImageUrl(meta.twitter.image)],
        }
      : undefined,
  };
}

export default async function EnginePage({ params }) {
  const { slug } = await params;
  const entry = pages.find((page) => page.slug === slug);
  if (!entry) notFound();

  const data = await getPageData(entry.dataFile);
  if (!data) notFound();

  return (
    <main className="flex w-full flex-col bg-[var(--color-page)]">
      {data.meta?.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(sanitizeJsonLd(data.meta.jsonLd)),
          }}
        />
      )}
      <EngineHero data={data.hero} />
      <AtAGlance data={data.atAGlance} />
      <VerdictRating data={data.verdictRating} />
      <Compatibility
        data={data.compatibility}
        engineLabel={data.atAGlance?.rows?.find((r) => r.metric === "Engine Family")?.value}
        yearsProduced={data.atAGlance?.rows?.find((r) => r.metric === "Years Produced")?.value}
        modelsFitted={data.atAGlance?.rows?.find((r) => r.metric?.startsWith("Models Fitted"))?.value}
        crossBrandFitment={data.atAGlance?.rows?.find((r) => r.metric === "Cross-Brand Fitment")?.value}
      />
      <CostGuide data={data.costGuide} engineLabel={data.atAGlance?.rows?.find((r) => r.metric === "Engine Family")?.value} />
      <FAQAccordion data={data.faq} engineLabel={data.atAGlance?.rows?.find((r) => r.metric === "Engine Family")?.value} />
      <TrustCta data={data.trustCta} engineLabel={data.atAGlance?.rows?.find((r) => r.metric === "Engine Family")?.value} />
    </main>
  );
}
