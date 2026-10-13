import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Preview branches stay out of search results; production is fully indexable.
  return isProduction
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
