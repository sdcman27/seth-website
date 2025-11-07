import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostMetadata = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  image?: string;
};

export type Post = PostMetadata & {
  content: ReactNode;
};

type RawFrontmatter = {
  title?: unknown;
  date?: unknown;
  summary?: unknown;
  tags?: unknown;
  image?: unknown;
};

function normalizeFrontmatter(frontmatter: RawFrontmatter, slug: string) {
  const { title, date, summary, tags, image } = frontmatter;
  if (typeof title !== "string" || !title) {
    throw new Error(`Post ${slug} is missing a title in frontmatter.`);
  }
  if (typeof date !== "string" || !date) {
    throw new Error(`Post ${slug} is missing a date in frontmatter.`);
  }
  if (Number.isNaN(new Date(date).getTime())) {
    throw new Error(`Post ${slug} has an invalid date in frontmatter.`);
  }
  if (typeof summary !== "string" || !summary) {
    throw new Error(`Post ${slug} is missing a summary in frontmatter.`);
  }
  let normalizedTags: string[] = [];
  if (Array.isArray(tags)) {
    normalizedTags = tags.filter((tag): tag is string => typeof tag === "string");
  }
  const normalizedImage = typeof image === "string" && image ? image : undefined;
  return {
    title,
    date: new Date(date).toISOString(),
    summary,
    tags: normalizedTags,
    image: normalizedImage,
  } satisfies Omit<PostMetadata, "slug">;
}

export async function getPostSlugs() {
  try {
    const entries = await fs.readdir(postsDirectory);
    return entries
      .filter(entry => entry.endsWith(".mdx"))
      .map(entry => entry.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error("Failed to read posts directory", error);
    return [];
  }
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map(async slug => getPostMetadata(slug)));
  return posts
    .filter((post): post is PostMetadata => Boolean(post))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostMetadata(slug: string): Promise<PostMetadata | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data } = matter(fileContents) as { data: RawFrontmatter };
    const metadata = normalizeFrontmatter(data, slug);
    return { slug, ...metadata };
  } catch (error) {
    console.error(`Failed to load frontmatter for post ${slug}:`, error);
    return null;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const source = await fs.readFile(fullPath, "utf8");
    const { content, frontmatter } = await compileMDX<RawFrontmatter>({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      },
    });
    const metadata = normalizeFrontmatter(frontmatter, slug);
    return {
      slug,
      ...metadata,
      content,
    };
  } catch (error) {
    console.error(`Failed to load post ${slug}:`, error);
    return null;
  }
}
