import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const publicDirectory = fileURLToPath(new URL("../public", import.meta.url));

function getHtmlFiles(directory, relativeDirectory = "") {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getHtmlFiles(absolutePath, relativePath);
    }

    return entry.isFile() && entry.name.endsWith(".html") ? [relativePath] : [];
  });
}

function toPublicUrl(filePath) {
  return `/${filePath.split(path.sep).join("/")}`;
}

function toCleanUrl(publicUrl) {
  if (publicUrl === "/index.html") {
    return "/";
  }

  if (publicUrl.endsWith("/index.html")) {
    return publicUrl.slice(0, -"/index.html".length) || "/";
  }

  return publicUrl.slice(0, -".html".length);
}

export function getPublicHtmlRoutes() {
  const routes = getHtmlFiles(publicDirectory)
    .map((filePath) => {
      const destination = toPublicUrl(filePath);

      return {
        source: toCleanUrl(destination),
        destination,
      };
    })
    .sort((a, b) => a.source.localeCompare(b.source));

  return {
    rewrites: routes,
    redirects: routes.map(({ source, destination }) => ({
      source: destination,
      destination: source,
      permanent: true,
    })),
  };
}
