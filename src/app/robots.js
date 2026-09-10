export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://mercedesengines.uk/sitemap.xml",
    host: "https://mercedesengines.uk",
  };
}
