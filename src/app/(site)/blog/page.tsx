import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { profile } from "@/data/resume";

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export const metadata: Metadata = {
  title: `Blog – ${profile.name}`,
   description: "Writing about data science, AI, and the projects I'm building.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl px-4 lg:px-6">
        <header className="mb-10 space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Research blog</h1>
          <p className="max-w-2xl text-[var(--muted)]">
            Essays and research highlights on analytics, machine learning, and the work shaping my
            practice.
          </p>
        </header>

        <ul className="space-y-6">
          {posts.map(post => (
            <li
              key={post.slug}
              className="rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/10"
            >
              <Link href={`/blog/${post.slug}`} className="block p-6">
                <div className="flex flex-col gap-3">
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
                  <h2 className="text-xl font-semibold tracking-tight">{post.title}</h2>
                  <p className="text-sm text-[var(--muted)]">{post.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {posts.length === 0 && (
          <p className="text-sm text-[var(--muted)]">No posts yet—check back soon.</p>
        )}
      </div>
    </section>
  );
}
