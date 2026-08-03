import modelPages from "@/data/registery/models/pages.json";
import genPages from "@/data/registery/generations/pages.json";
import varPages from "@/data/registery/variants/pages.json";
import engPages from "@/data/registery/engines/pages.json";

const BASE_URL = "https://mercedesengines.uk";
const now = new Date();

export default function sitemap() {
    const urls = [{ url: BASE_URL, lastModified: now, priority: 1.0 }];

    for (const p of modelPages) {
        urls.push({ url: `${BASE_URL}/${p.slug}`, lastModified: now, priority: 0.9 });
    }

    for (const p of genPages) {
        const path = p.parent === p.slug ? `/${p.slug}` : `/${p.parent}/${p.slug}`;
        urls.push({ url: `${BASE_URL}${path}`, lastModified: now, priority: 0.8 });
    }

    for (const p of varPages) {
        urls.push({ url: `${BASE_URL}/${p.parent}/${p.slug}`, lastModified: now, priority: 0.7 });
    }

    for (const p of engPages) {
        urls.push({ url: `${BASE_URL}/engine/${p.slug}`, lastModified: now, priority: 0.8 });
    }

    return urls;
}