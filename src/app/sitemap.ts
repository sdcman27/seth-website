import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const siteUrl = "https://www.sethchritzman.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified },
    { url: `${siteUrl}/experience`, lastModified },
    { url: `${siteUrl}/projects`, lastModified },
    { url: `${siteUrl}/contact`, lastModified },
    { url: `${siteUrl}/blog`, lastModified },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...blogRoutes];
}
