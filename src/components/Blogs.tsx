"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Blog } from "@/types";
import { blogCategories } from "@/data/blogs";
import { BookOpen, ArrowRight, Clock, Calendar } from "lucide-react";

interface BlogsProps {
  initialBlogsList: Blog[];
}

export const Blogs: React.FC<BlogsProps> = ({ initialBlogsList }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredBlogs =
    activeCategory === "all"
      ? initialBlogsList
      : initialBlogsList.filter((b) => b.category === activeCategory);

  return (
    <section id="blogs" className="py-20 border-t border-gold-border/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-widest font-semibold mb-2">
              <span>// 04</span>
              <span>TECHNICAL WRITING & RESEARCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              AI Governance & Identity Deep Dives
            </h2>
          </div>
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-sm font-mono text-gold-bright hover:underline self-start md:self-auto"
          >
            <span>View All Articles ({initialBlogsList.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all uppercase ${
              activeCategory === "all"
                ? "bg-gold-gradient text-bg font-bold shadow-gold"
                : "bg-card border border-white/10 text-muted hover:text-white hover:border-gold-border/40"
            }`}
          >
            All Articles ({initialBlogsList.length})
          </button>
          {blogCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all uppercase ${
                activeCategory === cat.id
                  ? "bg-gold-gradient text-bg font-bold shadow-gold"
                  : "bg-card border border-white/10 text-muted hover:text-white hover:border-gold-border/40"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => {
            const slug = blog.githubSlug || blog.id;
            return (
              <article
                key={blog.id}
                className="rounded-2xl bg-card border border-gold-border/25 hover:border-gold-border/70 hover:shadow-gold transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Optional Cover Image */}
                  {blog.img && (
                    <div className="w-full h-48 overflow-hidden bg-surface relative">
                      <img
                        src={blog.img}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Meta Row */}
                    <div className="flex items-center justify-between text-xs font-mono text-muted mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-gold-bright text-[11px] font-semibold">
                        {blog.badge}
                      </span>
                      <span className="flex items-center gap-1 text-dim">
                        <Calendar className="w-3.5 h-3.5" />
                        {blog.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-xl text-white group-hover:text-gold-bright transition-colors mb-3 leading-snug">
                      <Link href={`/blogs/${slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-3 font-sans">
                      {blog.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-surface border border-white/5 text-[10px] font-mono text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/blogs/${slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-gold-bright group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Full Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
