import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { fetchArticleMarkdown, parseBlogMeta } from "@/lib/github-blogs";
import { initialBlogs } from "@/data/blogs";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ArticleShareBar } from "@/components/ArticleShareBar";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const local = initialBlogs.find((b) => b.id === slug || b.githubSlug === slug);
  if (local) {
    return {
      title: `${local.title} — Lokesh Repaka`,
      description: local.desc,
    };
  }
  return {
    title: "Article Deep Dive — Lokesh Repaka",
    description: "AI Governance & Architecture Deep Dive",
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const { markdown, title: fallbackTitle } = await fetchArticleMarkdown(slug);

  const local = initialBlogs.find((b) => b.id === slug || b.githubSlug === slug);
  const meta = parseBlogMeta(markdown, slug);

  const displayTitle = local?.title || meta.title || fallbackTitle || slug;
  const displayCategory = local?.category || "AI GOVERNANCE";
  const displayBadge = local?.badge || meta.badge || "ARTICLE";
  const displayDate = local?.date || "Nov 2025";

  return (
    <article className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-mono text-gold-bright hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header Box */}
        <header className="border-b border-gold-border/25 pb-8 mb-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-bright text-xs font-mono uppercase tracking-wider font-semibold">
                {displayCategory}
              </span>
              <span className="text-xs font-mono text-dim">
                {displayBadge}
              </span>
            </div>

            <ArticleShareBar title={displayTitle} />
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
            {displayTitle}
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-muted pt-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Published: {displayDate}</span>
            </span>
            <span>·</span>
            <span>By Lokesh Repaka</span>
          </div>
        </header>

        {/* Article Body */}
        <div className="bg-card/70 border border-white/5 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          <MarkdownRenderer content={markdown} />
        </div>

        {/* Bottom Navigation */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-xs font-mono text-gold-bright hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse More Deep Dives</span>
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2.5 rounded-xl bg-gold-gradient text-bg text-xs font-mono font-bold shadow-gold hover:opacity-95 transition-all"
          >
            Discuss This Architecture →
          </Link>
        </div>

      </div>
    </article>
  );
}
