"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, fromLeft, fromRight } from "@/lib/motion";
import { ArrowRight, ShoppingCart, Package, Globe, Users, Handshake, Smartphone, Cpu, Bot } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const API = "http://localhost:4000/services";

const ICON_MAP = {
  ShoppingCart, Package, Globe, Users, Handshake, Smartphone, Cpu, Bot,
};

const statusStyle = {
  Active:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  Beta:       "bg-amber-50 text-amber-700 border-amber-200",
  Inactive:   "bg-gray-50 text-gray-500 border-gray-200",
  Deprecated: "bg-red-50 text-red-600 border-red-200",
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("All");

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => { setServices(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(services.map(s => s.category).filter(Boolean))];
  const filtered = filter === "All" ? services : services.filter(s => s.category === filter);

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }} />
          <motion.div
            className="relative max-w-7xl mx-auto px-6 text-center"
            variants={stagger(0.1)} initial="hidden" animate="show"
          >
            <motion.span variants={fadeUp} className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">
              What We Offer
            </motion.span>
            <motion.h1 variants={fadeUp} className="mt-3 text-5xl md:text-7xl odibee text-black">
              Every solution your<br />
              <span style={{ color: "var(--color-accent)" }}>business needs.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 text-base md:text-lg text-gray-400 anta font-light max-w-2xl mx-auto leading-relaxed">
              Eight integrated products designed to work together — or independently.
              Launch with one, scale with all.
            </motion.p>
          </motion.div>
        </section>

        {/* Filter tabs */}
        {categories.length > 1 && (
          <div className="max-w-7xl mx-auto px-6 pb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${filter === cat
                      ? "text-white"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200"
                    }`}
                  style={filter === cat ? { backgroundColor: "var(--color-accent)" } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Services grid */}
        <section className="max-w-7xl mx-auto px-6 pb-28">
          {loading ? (
            <Loader text="Loading services..." />
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 anta py-20">No services found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((svc, i) => {
                const Icon = ICON_MAP[svc.icon] || Package;
                const isHighlight = svc.highlight;
                return (
                  <motion.a
                    key={svc.id || svc.slug}
                    href={`/services/${svc.slug}`}
                    variants={i % 2 === 0 ? fromLeft : fromRight}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className={`group relative rounded-2xl border p-7 cursor-pointer overflow-hidden
                      shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                      transition-all duration-300 hover:-translate-y-1
                      ${isHighlight
                        ? "bg-black border-black hover:shadow-[0_16px_48px_color-mix(in_srgb,var(--color-accent)_25%,transparent)]"
                        : "bg-white border-gray-100 hover:border-accent/30 hover:shadow-[0_16px_48px_color-mix(in_srgb,var(--color-accent)_15%,transparent)]"
                      }`}
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ background: "radial-gradient(ellipse at top left, color-mix(in srgb, var(--color-accent) 8%, transparent) 0%, transparent 65%)" }} />
                    {!isHighlight && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent" />
                    )}

                    {/* Header row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                        ${isHighlight ? "bg-white/10 group-hover:bg-accent/20" : "bg-gray-50 group-hover:bg-accent/10"}`}>
                        <Icon size={18} className={isHighlight ? "text-white" : "text-gray-600 group-hover:text-accent transition-colors"} />
                      </div>
                      <div className="flex items-center gap-2">
                        {svc.tag && (
                          <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full
                            ${isHighlight ? "bg-white/10 text-white/60" : "bg-gray-50 text-gray-400 group-hover:bg-accent/10 group-hover:text-accent"}`}>
                            {svc.tag}
                          </span>
                        )}
                        {svc.status && (
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusStyle[svc.status] || statusStyle.Active}`}>
                            {svc.status}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className={`text-xl odibee mb-2 ${isHighlight ? "text-white" : "text-black"}`}>
                      {svc.title || svc.name}
                    </h3>
                    <p className={`text-sm anta font-light leading-relaxed mb-6 ${isHighlight ? "text-white/50" : "text-gray-400"}`}>
                      {svc.shortDescription || svc.desc}
                    </p>

                    {/* Stats row */}
                    {svc.stats?.length > 0 && (
                      <div className="flex gap-4 mb-5 border-t pt-4" style={{ borderColor: isHighlight ? "rgba(255,255,255,0.1)" : "#f3f4f6" }}>
                        {svc.stats.slice(0, 2).map((st, j) => (
                          <div key={j}>
                            <p className={`text-base font-bold anta ${isHighlight ? "text-white" : "text-black"}`}>{st.value}</p>
                            <p className={`text-[10px] anta ${isHighlight ? "text-white/40" : "text-gray-400"}`}>{st.label}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-200 group-hover:gap-3
                      ${isHighlight ? "text-white/30 group-hover:text-accent" : "text-gray-300 group-hover:text-accent"}`}>
                      Learn more <ArrowRight size={11} />
                    </div>
                  </motion.a>
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
