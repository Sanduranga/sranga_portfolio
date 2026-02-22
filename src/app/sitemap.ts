import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://kasunperera.dev", lastModified: new Date(), priority: 1 },
  ];
}
