import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { profile } from "@/data/resume";

const siteUrl = "https://www.sethchritzman.com";
const profileTitle = `${profile.name} – Research blog`;
const profileDescription =
  "Research notes on assistive robotics, affective prosthetics, and human-centered AI.";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map(post => {
      const url = `${siteUrl}/blog/${post.slug}`;
      return `\n    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${url}</link>\n      <guid>${url}</guid>\n      <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n      <description><![CDATA[${post.summary}]]></description>\n    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${escapeXml(profileTitle)}</title>\n    <link>${siteUrl}/blog</link>\n    <description>${escapeXml(profileDescription)}</description>${items}\n  </channel>\n</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

