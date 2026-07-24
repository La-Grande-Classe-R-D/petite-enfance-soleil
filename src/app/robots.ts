import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://lgc-jeunesse.lagrandeclasse.fr/sitemap.xml",
  };
}
