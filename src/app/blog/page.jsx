"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fromLeft, fromRight } from "@/lib/motion";
import { ArrowRight, Clock, Eye, Heart, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const API = "http://localhost:4000/blogs";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogPage() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("All");

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(posts.map(p => p.category?.name).filter(Boolean))];
  const filtered = filter === "All" ? posts : posts.filter(p => p.category?.name === filter);
  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || filtered.indexOf(p) > 0);

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">

        {/* Hero */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }} />
          <motion.div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center"
            variants={fadeUp} initial="hidden" animate="show">
            <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">Insights & Stories</span>
            <h1 className="mt-3 text-4xl md:text-7xl odibee text-black">
              The SynexNova<br />
              <span className="text-accent odibee">Blog.</span>
            </h1>
            <p className="mt-4 text-base text-gray-400 anta font-light max-w-xl mx-auto">
              Product updates, founder stories, and deep dives into the technology powering modern businesses.
            </p>
          </motion.div>
        </section>

        {/* Category filter */}
        {!loading && categories.length > 1 && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8 flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${filter === cat ? "text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200"}`}
                style={filter === cat ? { backgroundColor: "var(--color-accent)" } : {}}>
                {cat}
              </button>
            ))}
          </div>
        )}

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-28">
          {loading ? <Loader text="Loading posts..." /> : filtered.length === 0 ? (
            <p className="text-center text-gray-400 anta py-20">No posts found.</p>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <motion.a href={`/blog/${featured.slug}`}
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="group block rounded-2xl border border-gray-100 overflow-hidden mb-8
                    shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-1
                    hover:shadow-[0_16px_48px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]
                    hover:border-accent/30 transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {featured.coverImage?.url && (
                      <div className="relative h-56 md:h-auto overflow-hidden">
                        <Image src={featured.coverImage.url} alt={featured.coverImage.alt || featured.title}
                          fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full text-white"
                          style={{ backgroundColor: "var(--color-accent)" }}>Featured</span>
                        {featured.category?.name && (
                          <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">
                            {featured.category.name}
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl md:text-3xl odibee text-black mb-3">{featured.title}</h2>
                      <p className="text-sm text-gray-400 anta font-light leading-relaxed mb-5">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400 anta">
                        {featured.author?.avatar && (
                          <Image src={featured.author.avatar} alt={featured.author.name} width={28} height={28} className="rounded-full" />
                        )}
                        <span>{featured.author?.name}</span>
                        <span>·</span>
                        <span>{formatDate(featured.publishedAt || featured.createdAt)}</span>
                        {featured.stats?.readingTimeMinutes && (
                          <><span>·</span><span className="flex items-center gap-1"><Clock size={11} />{featured.stats.readingTimeMinutes} min</span></>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.a>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((post, i) => (
                  <motion.a key={post._id || post.slug} href={`/blog/${post.slug}`}
                    variants={i % 2 === 0 ? fromLeft : fromRight}
                    initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
                    className="group relative rounded-2xl border border-gray-100 overflow-hidden flex flex-col
                      shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-1
                      hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]
                      hover:border-accent/30 transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent" />

                    {post.coverImage?.url && (
                      <div className="relative h-44 overflow-hidden">
                        <Image src={post.coverImage.url} alt={post.coverImage.alt || post.title}
                          fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {post.category?.name && (
                          <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full bg-gray-50 text-gray-400 border border-gray-200">
                            {post.category.name}
                          </span>
                        )}
                        {post.tags?.slice(0, 2).map(t => (
                          <span key={t.slug} className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 10%, transparent)", color: "var(--color-accent)" }}>
                            {t.name}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-base font-bold text-black odibee mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-gray-400 anta font-light leading-relaxed flex-1 mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          {post.author?.avatar && (
                            <Image src={post.author.avatar} alt={post.author.name} width={22} height={22} className="rounded-full" />
                          )}
                          <span className="text-xs text-gray-400 anta">{post.author?.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400 anta">
                          {post.stats?.readingTimeMinutes && (
                            <span className="flex items-center gap-1"><Clock size={10} />{post.stats.readingTimeMinutes}m</span>
                          )}
                          {post.stats?.views && (
                            <span className="flex items-center gap-1"><Eye size={10} />{(post.stats.views / 1000).toFixed(1)}k</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
