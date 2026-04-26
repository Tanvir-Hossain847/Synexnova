"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fromLeft, fromRight } from "@/lib/motion";
import { ArrowRight, CheckCircle, ShoppingCart, Package, Globe, Users, Handshake, Smartphone, Cpu, Bot } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const API = "https://synexnova-backend.vercel.app/services";

const ICON_MAP = { ShoppingCart, Package, Globe, Users, Handshake, Smartphone, Cpu, Bot };

const statusStyle = {
  Active:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  Beta:       "bg-amber-50 text-amber-700 border-amber-200",
  Inactive:   "bg-gray-100 text-gray-500 border-gray-200",
  Deprecated: "bg-red-50 text-red-500 border-red-200",
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("All");

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];
  const filtered = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }} />
          <motion.div
            className="relative max-w-7xl mx-auto px-4 md:px-6 text-center"
            variants={fadeUp} initial="hidden" animate="show"
          >
            <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">Our Products</span>
            <h1 className="mt-3 text-4xl md:text-7xl odibee text-black">
              Tools built for<br />
              <span style={{ color: "var(--color-accent)" }}>modern businesses.</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-gray-400 anta font-light max-w-2xl mx-auto leading-relaxed">
              From point of sale to AI agents — every product in the SynexNova suite
              is designed to integrate seamlessly and scale with your business.
            </p>
          </motion.div>
        </section>

        {/* Filter */}
        {!loading && categories.length > 1 && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8 flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${filter === cat ? "text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200"}`}
                style={filter === cat ? { backgroundColor: "var(--color-accent)" } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Products */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-28">
          {loading ? (
            <Loader text="Loading products..." />
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 anta py-20">No products found.</p>
          ) : (
            <div className="space-y-6">
              {filtered.map((p, i) => {
                const Icon = ICON_MAP[p.icon] || Package;
                const isHighlight = p.highlight;
                return (
                  <motion.div
                    key={p.id || p.slug}
                    variants={i % 2 === 0 ? fromLeft : fromRight}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className={`group relative rounded-2xl border overflow-hidden
                      shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                      transition-all duration-300 hover:-translate-y-0.5
                      hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]
                      ${isHighlight ? "bg-black border-black" : "bg-white border-gray-100 hover:border-accent/30"}`}
                  >
                    {/* Accent top line */}
                    {!isHighlight && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent" />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-0">

                      {/* Left — image or icon */}
                      <div className={`relative flex items-center justify-center p-8 ${isHighlight ? "bg-white/5" : "bg-gray-50"}`}>
                        {p.image?.thumbnail ? (
                          <div className="w-full aspect-square max-w-[160px] rounded-xl overflow-hidden">
                            <Image
                              src={p.image.thumbnail}
                              alt={p.image.alt || p.title}
                              width={160} height={160}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center
                            ${isHighlight ? "bg-white/10" : "bg-white border border-gray-200"}`}>
                            <Icon size={28} className={isHighlight ? "text-white" : "text-gray-600"} />
                          </div>
                        )}
                      </div>

                      {/* Middle — content */}
                      <div className="p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-100/50">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          {p.tag && (
                            <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full
                              ${isHighlight ? "bg-white/10 text-white/60" : "bg-gray-50 text-gray-400 border border-gray-200"}`}>
                              {p.tag}
                            </span>
                          )}
                          {p.status && (
                            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${statusStyle[p.status] || statusStyle.Active}`}>
                              {p.status}
                            </span>
                          )}
                        </div>

                        <h2 className={`text-2xl odibee mb-2 ${isHighlight ? "text-white" : "text-black"}`}>
                          {p.title || p.name}
                        </h2>
                        <p className={`text-sm anta font-light leading-relaxed mb-5 ${isHighlight ? "text-white/50" : "text-gray-400"}`}>
                          {p.shortDescription || p.desc}
                        </p>

                        {/* Key features — first 4 */}
                        {p.keyFeatures?.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {p.keyFeatures.slice(0, 4).map((f, j) => (
                              <div key={j} className="flex items-start gap-2">
                                <CheckCircle size={13} className="shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }} />
                                <span className={`text-xs anta ${isHighlight ? "text-white/60" : "text-gray-500"}`}>{f}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Integrations */}
                        {p.integrations?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.integrations.slice(0, 5).map((int, j) => (
                              <span key={j} className={`text-[10px] font-medium px-2 py-0.5 rounded-full
                                ${isHighlight ? "bg-white/10 text-white/50" : "bg-gray-50 text-gray-500 border border-gray-200"}`}>
                                {int}
                              </span>
                            ))}
                            {p.integrations.length > 5 && (
                              <span className="text-[10px] text-gray-400 anta self-center">+{p.integrations.length - 5} more</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right — stats + CTA */}
                      <div className={`p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l
                        ${isHighlight ? "border-white/10" : "border-gray-100"}`}>
                        {/* Stats */}
                        {p.stats?.length > 0 && (
                          <div className="space-y-4 mb-6">
                            {p.stats.map((st, j) => (
                              <div key={j}>
                                <p className={`text-2xl anta font-bold ${isHighlight ? "text-white" : "text-black"}`}>{st.value}</p>
                                <p className={`text-[10px] tracking-widest uppercase anta ${isHighlight ? "text-white/40" : "text-gray-400"}`}>{st.label}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Pricing */}
                        {p.pricing?.startingAt && (
                          <div className="mb-5">
                            <p className={`text-[10px] font-semibold tracking-widest uppercase mb-0.5 ${isHighlight ? "text-white/40" : "text-gray-400"}`}>
                              Starting at
                            </p>
                            <p className="text-base font-bold anta" style={{ color: "var(--color-accent)" }}>
                              {p.pricing.startingAt}
                            </p>
                          </div>
                        )}

                        {/* CTA */}
                        <a
                          href={`/services/${p.slug}`}
                          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                            transition-all duration-200 hover:opacity-90
                            ${isHighlight ? "bg-white text-black" : "text-white"}`}
                          style={!isHighlight ? { backgroundColor: "var(--color-accent)" } : {}}
                        >
                          View Details <ArrowRight size={13} />
                        </a>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

      </main>
      <Footer />
    </>
  );
}
