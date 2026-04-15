"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { ArrowLeft, Clock, Eye, Heart, MessageCircle, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const API = "http://localhost:4000/blogs";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

// Very simple markdown-to-JSX renderer for headings and paragraphs
function renderContent(content) {
  if (!content) return null;
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) return <h2 key={i} className="text-2xl odibee text-black mt-10 mb-4">{block.slice(3)}</h2>;
    if (block.startsWith("# "))  return <h1 key={i} className="text-3xl odibee text-black mt-10 mb-4">{block.slice(2)}</h1>;
    if (block.startsWith("### ")) return <h3 key={i} className="text-xl odibee text-black mt-8 mb-3">{block.slice(4)}</h3>;
    return <p key={i} className="text-base text-gray-600 anta font-light leading-relaxed mb-4">{block}</p>;
  });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => {
        const found = Array.isArray(data) ? data.find(p => p.slug === slug) : null;
        if (found) setPost(found); else setNotFound(true);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) return <><Navbar /><div className="min-h-screen flex items-center justify-center"><Loader /></div><Footer /></>;
  if (notFound) return (
    <><Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-2xl odibee text-black">Post not found.</p>
      <a href="/blog" className="text-sm text-gray-500 hover:text-black anta transition-colors">← Back to blog</a>
    </div><Footer /></>
  );

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">

        {/* Cover image */}
        {post.coverImage?.url && (
          <div className="relative w-full h-64 md:h-[480px] overflow-hidden">
            <Image src={post.coverImage.url} alt={post.coverImage.alt || post.title}
              fill className="object-cover" priority />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/40" />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
          {/* Back */}
          <motion.a href="/blog" variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-black transition-colors mb-8 anta">
            <ArrowLeft size={14} /> All Posts
          </motion.a>

          {/* Meta */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.category?.name && (
                <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">
                  {post.category.name}
                </span>
              )}
              {post.tags?.map(t => (
                <span key={t.slug} className="text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 10%, transparent)", color: "var(--color-accent)" }}>
                  <Tag size={9} />{t.name}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl odibee text-black mb-4">{post.title}</h1>
            <p className="text-base text-gray-400 anta font-light leading-relaxed mb-6">{post.excerpt}</p>

            {/* Author + stats */}
            <div className="flex items-center justify-between flex-wrap gap-4 py-5 border-y border-gray-100">
              <div className="flex items-center gap-3">
                {post.author?.avatar && (
                  <Image src={post.author.avatar} alt={post.author.name} width={40} height={40} className="rounded-full" />
                )}
                <div>
                  <p className="text-sm font-bold text-black">{post.author?.name}</p>
                  <p className="text-xs text-gray-400 anta">{post.author?.bio?.slice(0, 60)}...</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400 anta">
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                {post.stats?.readingTimeMinutes && (
                  <span className="flex items-center gap-1"><Clock size={11} />{post.stats.readingTimeMinutes} min read</span>
                )}
                {post.stats?.views && (
                  <span className="flex items-center gap-1"><Eye size={11} />{post.stats.views.toLocaleString()}</span>
                )}
                {post.stats?.likes && (
                  <span className="flex items-center gap-1"><Heart size={11} />{post.stats.likes.toLocaleString()}</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.article variants={fadeUp} initial="hidden" animate="show" className="mt-8">
            {renderContent(post.content)}
          </motion.article>

          {/* Comments */}
          {post.comments?.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-100">
              <h3 className="text-xl odibee text-black mb-6">
                {post.comments.length} Comment{post.comments.length !== 1 ? "s" : ""}
              </h3>
              <div className="space-y-6">
                {post.comments.map((c, i) => (
                  <div key={i} className="flex gap-3">
                    {c.author?.avatar && (
                      <Image src={c.author.avatar} alt={c.author.name} width={60} height={10} className="rounded-full mt-0.5 object-cover h-20" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-black">{c.author?.name}</span>
                        <span className="text-xs text-gray-400 anta">{formatDate(c.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-500 anta font-light leading-relaxed">{c.body}</p>
                      {c.replies?.map((r, j) => (
                        <div key={j} className="flex gap-3 mt-4 ml-4 pl-4 border-l border-gray-100">
                          {r.author?.avatar && (
                            <Image src={r.author.avatar} alt={r.author.name} width={35} height={28} className="rounded-full h-10 mt-0.5" />
                          )}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-black">{r.author?.name}</span>
                              <span className="text-xs text-gray-400 anta">{formatDate(r.createdAt)}</span>
                            </div>
                            <p className="text-sm text-gray-500 anta font-light">{r.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
