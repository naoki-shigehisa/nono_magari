import type { MetadataRoute } from "next";
import { site } from "@/content";

/** 1 ページ構成なのでトップだけ。/sitemap.xml として配信される */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
