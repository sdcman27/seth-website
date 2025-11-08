import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostMetadata, getPostSlugs } from "@/lib/posts";
import { profile } from "@/data/resume";

const siteUrl = "https://www.sethchritzman.com";
const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const metadata = await getPostMetadata(slug);
  if (!metadata) {
    return {
      title: `Blog – ${profile.name}`,
    };
  }

  const url = `${siteUrl}/blog/${metadata.slug}`;
  const imageUrl = metadata.image ? `${siteUrl}${metadata.image}` : undefined;

  return {
    title: `${metadata.title} – ${profile.name}`,
    description: metadata.summary,
    alternates: {
      canonical: `/blog/${metadata.slug}`,
    },
    openGraph: {
      type: "article",
      title: metadata.title,
      description: metadata.summary,
      url,
      publishedTime: metadata.date,
      authors: [profile.name],
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: metadata.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.summary,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="py-10">
      <div className="mx-auto max-w-3xl px-4 lg:px-0">
        <Link href="/blog" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">
          ← Back to blog
        </Link>
        <header className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[var(--muted)]">
            <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
            {post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 px-2 py-1 text-xs uppercase tracking-wide"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)]">{post.title}</h1>
          <p className="text-base text-[var(--muted)]">{post.summary}</p>
        </header>

        {post.image && (
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={630}
              priority
              className="h-auto w-full"
            />
          </div>
        )}

        <div className="blog-content mt-10">{post.content}</div>
      </div>
    </article>
  );
}
