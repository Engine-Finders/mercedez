/** Shared SEO asset sanitizer — kills 404 jpg/png schema & OG hits from clone JSON. */

export const SITE_URL = "https://mercedesengines.uk";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/Hero-dark.webp`;
export const DEFAULT_LOGO = `${SITE_URL}/navbar-logo.png`;

const BAD_HOST =
  /mercedesbenzengine\.uk|mercedesengine\.uk|bmwengines\.uk|jaguarengines\.uk|landroverengines\.uk/i;

/** Prefer a live site asset; never ship remote .jpg paths that 404. */
export function sanitizeImageUrl(url) {
  if (!url || typeof url !== "string") return DEFAULT_OG_IMAGE;
  if (BAD_HOST.test(url) || /\.jpe?g(\?|$)/i.test(url)) return DEFAULT_OG_IMAGE;
  if (url.startsWith("/")) return `${SITE_URL}${url}`;
  if (url.startsWith(SITE_URL)) return url;
  return DEFAULT_OG_IMAGE;
}

/** Walk JSON-LD and rewrite logo/image + wrong-host URLs. */
export function sanitizeJsonLd(jsonLd) {
  if (!jsonLd) return jsonLd;
  try {
    let raw = JSON.stringify(jsonLd);
    raw = raw.replace(/https?:\/\/[^"\\]+\/(?:images\/)?logo\.png/gi, DEFAULT_LOGO);
    raw = raw.replace(/https?:\/\/[^"\\]+\.jpe?g/gi, DEFAULT_OG_IMAGE);
    raw = raw.replace(
      /https?:\/\/(?:www\.)?(?:mercedesbenzengine\.uk|mercedesengine\.uk|bmwengines\.uk|jaguarengines\.uk)/gi,
      SITE_URL,
    );
    return JSON.parse(raw);
  } catch {
    return jsonLd;
  }
}
