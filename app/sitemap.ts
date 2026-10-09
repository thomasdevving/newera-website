import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const routes = ["", "/hoe-het-werkt", "/voor-wie", "/klantportal", "/aanvraag", "/over-ons", "/contact", "/privacy", "/voorwaarden"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route === "/aanvraag" ? 0.9 : 0.7,
  }));
}
