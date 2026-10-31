// src/lib/blog.config.js
/**
 * Site-specific configuration for Headless CMS Blog & Lead Quote integration.
 * Tailored for Mercedes Engines.
 */

export const blogConfig = {
  // 1. Site Identity
  siteName: "Mercedes Engines",
  siteSlug: process.env.CMS_SITE_SLUG || "mercedesengines",
  siteDomain: "mercedesengines.co.uk",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://mercedesengines.co.uk").replace(/\/$/, ""),
  defaultAuthor: "Mercedes Technical Specialist",

  // 2. Headings & UI Copy
  copy: {
    metaTitle: "Mercedes Engines | Guides & Diagnostic Advice",
    metaDescription: "Expert failure diagnosis, engine replacement costs, OM642/OM651 guidance, and technical specifications for all Mercedes-Benz models.",
    blogTitlePrefix: "Mercedes Engines",
    blogTitleAccent: "Knowledge & Guides",
    blogSubtitle: "Expert failure diagnosis, engine replacement costs, OM642/OM651 guidance, and technical specifications for all Mercedes-Benz models.",
    emptyTitle: "No guides published yet",
    emptySubtitle: "Mercedes Engines technical articles and diagnostic guides published from the CMS will appear here.",
    readMoreText: "Read Guide",
    widgetTitle: "Instant Mercedes Engine Quote",
    widgetSubtitle: "Enter your registration or request a callback from our Mercedes engine specialists.",
    widgetSubmitText: "Request Free Quote",
    widgetSuccessTitle: "Quote Request Received!",
    widgetSuccessSubtitle: "Our Mercedes Engines specialists will check stock and contact you shortly with the best pricing.",
    recentGuidesTitle: "Recent Guides",
    relatedGuidesTitle: "Related Guides",
    bottomCta: {
      enabled: true,
      badge: "Mercedes Engine Network",
      title: "Need a Replacement Mercedes Engine?",
      subtitle: "Get an instant quote for reconditioned or tested low-mileage Mercedes engines with full warranty coverage.",
      buttonText: "Get Free Mercedes Engine Quote »",
      buttonHref: "#sidebar-reg-input",
    },
  },

  // 3. Theme Colors
  theme: {
    fontFamily: "Arial, Helvetica, sans-serif",
    primaryColor: "#b07526",
    primaryHover: "#8c5d1e",
    accentColor: "#b07526",
    accentHover: "#8c5d1e",
    widgetBg: "#22180a",
    widgetBorder: "#382711",
    widgetButtonBg: "#b07526",
    widgetButtonHover: "#8c5d1e",
    ukBadgeBg: "#003399",
    fallbackThumbnail: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
  },
};
