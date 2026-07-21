import { notFound } from "next/navigation";
import modelPages from "@/data/registery/models/pages.json";
import genPages from "@/data/registery/generations/pages.json";
import varPages from "@/data/registery/variants/pages.json";

import ModelHero from "@/components/models/ModelHero";
import OwnershipVerdict from "@/components/models/OwnershipVerdict";
import AtAGlance from "@/components/models/AtAGlance";
import GenerationsGrid from "@/components/models/GenerationsGrid";
import EngineDatabase from "@/components/models/EngineDatabase";
import CommonProblems from "@/components/models/CommonProblems";
import MarketIntelligence from "@/components/models/MarketIntelligence";
import EditorialPullQuote from "@/components/models/EditorialPullQuote";
import ReplacementCosts from "@/components/models/ReplacementCosts";
import EngineEvolution from "@/components/models/EngineEvolution";
import WhoShouldBuy from "@/components/models/WhoShouldBuy";
import CalculatorCTA from "@/components/models/CalculatorCTA";
import TrustBlock from "@/components/models/TrustBlock";
import FAQAccordion from "@/components/models/FAQAccordion";
import ClosingActionCards from "@/components/models/ClosingActionCards";

import GenModelHero from "@/components/generation/ModelHero";
import GenEngineDatabase from "@/components/generation/EngineDatabase";
import Overview from "@/components/generation/Overview";
import BestWorstEngines from "@/components/generation/BestWorstEngines";
import OwnershipEconomics from "@/components/generation/OwnershipEconomics";
import GenCommonProblems from "@/components/generation/CommonProblems";
import GenReplacementCosts from "@/components/generation/ReplacementCosts";
import CoreVariants from "@/components/generation/CoreVariants";
import GenMarketIntelligence from "@/components/generation/MarketIntelligence";
import GenFAQAccordion from "@/components/generation/FAQAccordion";
import GenTrustCta from "@/components/generation/TrustCta";

import VariantHero from "@/components/variant/VariantHero";
import EraMap from "@/components/variant/EraMap";
import VarReplacementCosts from "@/components/variant/ReplacementCosts";
import VarCommonProblems from "@/components/variant/CommonProblems";
import QuotesCta from "@/components/variant/QuotesCta";
import RepairBuyOrReplace from "@/components/variant/RepairBuyOrReplace";
import BuyingChecklist from "@/components/variant/BuyingChecklist";
import EngineCodes from "@/components/variant/EngineCodes";
import VarMarketIntelligence from "@/components/variant/MarketIntelligence";
import VarFAQAccordion from "@/components/variant/FAQAccordion";
import VarTrustCta from "@/components/variant/TrustCta";

async function getModelData(dataFile) {
  try {
    const data = await import(`@/data/models/${dataFile}.json`);
    return data.default;
  } catch {
    return null;
  }
}

async function getGenData(dataFile) {
  try {
    const data = await import(`@/data/generations/${dataFile}.json`);
    return data.default;
  } catch {
    return null;
  }
}

async function getVarData(dataFile) {
  try {
    const data = await import(`@/data/variants/${dataFile}.json`);
    return data.default;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const params = [];

  for (const page of modelPages) {
    params.push({ slug: [page.slug] });
  }

  for (const page of genPages) {
    if (page.parent === page.slug) {
      params.push({ slug: [page.slug] });
    } else {
      params.push({ slug: [page.parent, page.slug] });
    }
  }

  for (const page of varPages) {
    params.push({ slug: [page.parent, page.slug] });
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (slug.length === 1) {
    let entry = modelPages.find((p) => p.slug === slug[0]);
    if (entry) {
      const data = await getModelData(entry.dataFile);
      if (data?.meta) {
        const { meta } = data;
        return {
          title: meta.title || undefined,
          description: meta.description || undefined,
          openGraph: meta.openGraph
            ? {
                title: meta.openGraph.title || undefined,
                description: meta.openGraph.description || undefined,
                type: meta.openGraph.type || "website",
                url: meta.openGraph.url || undefined,
                images: meta.openGraph.image ? [meta.openGraph.image] : undefined,
                siteName: meta.openGraph.siteName || undefined,
              }
            : undefined,
          twitter: meta.twitter?.title || meta.twitter?.description
            ? {
                card: meta.twitter.card || undefined,
                title: meta.twitter.title || undefined,
                description: meta.twitter.description || undefined,
              }
            : undefined,
        };
      }
    }

    entry = genPages.find((p) => p.parent === p.slug && p.slug === slug[0]);
    if (entry) {
      const data = await getGenData(entry.dataFile);
      if (data?.meta) {
        const { meta } = data;
        return {
          title: meta.title,
          description: meta.description,
          openGraph: meta.openGraph
            ? {
                title: meta.openGraph.title,
                description: meta.openGraph.description,
                type: meta.openGraph.type,
                url: meta.openGraph.url,
                images: meta.openGraph.image ? [meta.openGraph.image] : undefined,
                siteName: meta.openGraph.siteName,
              }
            : undefined,
          twitter: meta.twitter
            ? {
                card: meta.twitter.card,
                title: meta.twitter.title,
                description: meta.twitter.description,
              }
            : undefined,
        };
      }
    }
  }

  if (slug.length === 2) {
    let entry = genPages.find((p) => p.parent === slug[0] && p.slug === slug[1] && p.parent !== p.slug);
    if (entry) {
      const data = await getGenData(entry.dataFile);
      if (data?.meta) {
        const { meta } = data;
        return {
          title: meta.title,
          description: meta.description,
          openGraph: meta.openGraph
            ? {
                title: meta.openGraph.title,
                description: meta.openGraph.description,
                type: meta.openGraph.type,
                url: meta.openGraph.url,
                images: meta.openGraph.image ? [meta.openGraph.image] : undefined,
                siteName: meta.openGraph.siteName,
              }
            : undefined,
          twitter: meta.twitter
            ? {
                card: meta.twitter.card,
                title: meta.twitter.title,
                description: meta.twitter.description,
              }
            : undefined,
        };
      }
    }

    entry = varPages.find((p) => p.parent === slug[0] && p.slug === slug[1]);
    if (entry) {
      const data = await getVarData(entry.dataFile);
      if (data?.meta) {
        const { meta } = data;
        return {
          title: meta.title,
          description: meta.description,
          alternates: meta.canonical ? { canonical: meta.canonical } : undefined,
          openGraph: meta.openGraph?.type
            ? {
                title: meta.openGraph.title,
                description: meta.openGraph.description,
                type: meta.openGraph.type,
                url: meta.openGraph.url,
                images: meta.openGraph.image ? [meta.openGraph.image] : undefined,
                siteName: meta.openGraph.siteName,
              }
            : undefined,
          twitter: meta.twitter?.card
            ? {
                card: meta.twitter.card,
                title: meta.twitter.title,
                description: meta.twitter.description,
                images: meta.twitter.image ? [meta.twitter.image] : undefined,
              }
            : undefined,
        };
      }
    }
  }

  return {};
}

export default async function CatchAllPage({ params }) {
  const { slug } = await params;

  // Single segment — model page, or standalone generation
  if (slug.length === 1) {
    let entry = modelPages.find((p) => p.slug === slug[0]);
    if (entry) {
      const data = await getModelData(entry.dataFile);
      if (!data) notFound();

      return (
        <main
          style={{
            padding: "24px 16px 64px",
            maxWidth: 900,
            margin: "0 auto",
            lineHeight: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          {data.meta?.jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(data.meta.jsonLd),
              }}
            />
          )}
          <ModelHero data={data.hero} />
          <OwnershipVerdict data={data.ownershipVerdict} />
          <AtAGlance data={data.atAGlance} />
          <GenerationsGrid data={data.generations} />
          <EngineDatabase data={data.engineDatabase} />
          <CommonProblems data={data.commonProblems} />
          <MarketIntelligence data={data.marketIntelligence} />
          <EditorialPullQuote data={data.editorialPullQuote} />
          <ReplacementCosts data={data.replacementCosts} />
          <EngineEvolution data={data.engineEvolution} />
          <WhoShouldBuy data={data.whoShouldBuy} />
          <CalculatorCTA data={data.calculatorCta} />
          <TrustBlock data={data.trustBlock} />
          <FAQAccordion data={data.faq} />
          <ClosingActionCards data={data.closingActionCards} />
        </main>
      );
    }

    entry = genPages.find((p) => p.parent === p.slug && p.slug === slug[0]);
    if (entry) {
      const data = await getGenData(entry.dataFile);
      if (!data) notFound();

      return (
        <main
          style={{
            padding: "24px 16px 64px",
            maxWidth: 1100,
            margin: "0 auto",
            lineHeight: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          {data.meta?.jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(data.meta.jsonLd),
              }}
            />
          )}
          <GenModelHero data={data.hero} />
          <GenEngineDatabase data={data.engineDatabase} />
          <Overview data={data.overview} />
          <BestWorstEngines data={data.bestWorstEngines} />
          <OwnershipEconomics data={data.ownershipEconomics} />
          <GenCommonProblems data={data.commonProblems} />
          <GenReplacementCosts data={data.replacementCosts} />
          <CoreVariants data={data.coreVariants} />
          <GenMarketIntelligence data={data.marketIntelligence} />
          <GenFAQAccordion data={data.faq} />
          <GenTrustCta data={data.trustCta} />
        </main>
      );
    }
  }

  // Two segments — generation or variant
  if (slug.length === 2) {
    let entry = genPages.find((p) => p.parent === slug[0] && p.slug === slug[1] && p.parent !== p.slug);
    if (entry) {
      const data = await getGenData(entry.dataFile);
      if (!data) notFound();

      return (
        <main
          style={{
            padding: "24px 16px 64px",
            maxWidth: 1100,
            margin: "0 auto",
            lineHeight: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          {data.meta?.jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(data.meta.jsonLd),
              }}
            />
          )}
          <GenModelHero data={data.hero} />
          <GenEngineDatabase data={data.engineDatabase} />
          <Overview data={data.overview} />
          <BestWorstEngines data={data.bestWorstEngines} />
          <OwnershipEconomics data={data.ownershipEconomics} />
          <GenCommonProblems data={data.commonProblems} />
          <GenReplacementCosts data={data.replacementCosts} />
          <CoreVariants data={data.coreVariants} />
          <GenMarketIntelligence data={data.marketIntelligence} />
          <GenFAQAccordion data={data.faq} />
          <GenTrustCta data={data.trustCta} />
        </main>
      );
    }

    entry = varPages.find((p) => p.parent === slug[0] && p.slug === slug[1]);
    if (entry) {
      const data = await getVarData(entry.dataFile);
      if (!data) notFound();

      return (
        <main
          style={{
            padding: "24px 16px 64px",
            maxWidth: 1100,
            margin: "0 auto",
            lineHeight: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          {data.meta?.jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(data.meta.jsonLd),
              }}
            />
          )}
          <VariantHero data={data.hero} />
          <EraMap data={data.eraMap} />
          <VarReplacementCosts data={data.replacementCosts} />
          <VarCommonProblems data={data.commonProblems} />
          <QuotesCta data={data.quotesCta} />
          <RepairBuyOrReplace data={data.repairBuyOrReplace} />
          <BuyingChecklist data={data.buyingChecklist} />
          <EngineCodes data={data.engineCodes} />
          <VarMarketIntelligence data={data.marketIntelligence} />
          <VarFAQAccordion data={data.faq} />
          <VarTrustCta data={data.trustCta} />
        </main>
      );
    }
  }

  notFound();
}
