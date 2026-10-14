import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = [
    "",
    "/broadcasters",
    "/distributors",
    "/adglean",
    "/company",
    "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${siteUrl}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
