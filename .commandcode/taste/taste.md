# Taste File

- **URL and canonical must be identical for all pages.** The canonical tag must match the page's actual URL exactly — no mismatches tolerated. Confidence: 0.9
- **Pragmatic over dogmatic — dynamic or hardcoded, whichever is faster to ship.** When given a choice between a dynamic solution and hardcoding, pick the one that gets the job done quickest. Confidence: 0.8
- **Registry files are the source of truth for slugs and routes.** All URL generation (sitemaps, canonicals, navigation) must derive from registry JSON files (`src/data/registery/*/pages.json`), never from raw filesystem file names. Confidence: 0.8
- **Verifies builds after code changes.** After any changes to page-generation logic (sitemap, metadata, routing), runs a full build to confirm no breakage. Confidence: 0.7
