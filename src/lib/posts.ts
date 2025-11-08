import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";

function findProjectRoot(startDir: string) {
  let currentDir = startDir;

  while (!existsSync(path.join(currentDir, "package.json"))) {
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }
    currentDir = parentDir;
  }

  return currentDir;
}

const projectRoot = findProjectRoot(process.cwd());

const postsDirectories = [
  path.join(projectRoot, "content", "posts"),
  path.join(projectRoot, "blogs"),
];

function isNotFoundError(error: unknown): error is NodeJS.ErrnoException {
  return (
    Boolean(error && typeof error === "object" && "code" in error) &&
    (error as NodeJS.ErrnoException).code === "ENOENT"
  );
}

async function readPostFile(slug: string): Promise<string | null> {
  for (const directory of postsDirectories) {
    const fullPath = path.join(directory, `${slug}.mdx`);
    try {
      const fileContents = await fs.readFile(fullPath, "utf8");
      return fileContents;
    } catch (error) {
      if (isNotFoundError(error)) {
        continue;
      }
      console.error(`Failed to read post ${slug} from ${fullPath}:`, error);
      return null;
    }
  }

  console.error(
    `Post ${slug} was not found in any configured directory: ${postsDirectories.join(", ")}.`,
  );
  return null;
}

async function readDirectoryEntries(directory: string): Promise<string[]> {
  try {
    return await fs.readdir(directory);
  } catch (error) {
    if (!isNotFoundError(error)) {
      console.error(`Failed to read posts directory ${directory}:`, error);
    }
    return [];
  }
}

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
  const slugs = new Set<string>();

  for (const directory of postsDirectories) {
    const entries = await readDirectoryEntries(directory);
    entries
      .filter(entry => entry.endsWith(".mdx"))
      .forEach(entry => slugs.add(entry.replace(/\.mdx$/, "")));
  }

  return Array.from(slugs);
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map(async slug => getPostMetadata(slug)));
  return posts
    .filter((post): post is PostMetadata => Boolean(post))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostMetadata(slug: string): Promise<PostMetadata | null> {
  const fileContents = await readPostFile(slug);
  if (!fileContents) {
    return null;
  }

  const { data } = matter(fileContents) as { data: RawFrontmatter };
  const metadata = normalizeFrontmatter(data, slug);
  return { slug, ...metadata };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const source = await readPostFile(slug);
  if (!source) {
    return null;
  }

  try {
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
    console.error(`Failed to compile post ${slug}:`, error);
    return null;
  }
}
