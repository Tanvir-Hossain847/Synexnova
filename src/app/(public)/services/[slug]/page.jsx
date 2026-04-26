"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger, slideLeft, slideRight } from "@/lib/motion";
import { ArrowRight, CheckCircle, ArrowLeft, ShoppingCart, Package, Globe, Users, Handshake, Smartphone, Cpu, Bot } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const API = "https://synexnova-backend.vercel.app/services";

const ICON_MAP = {
  ShoppingCart, Package, Globe, Users, Handshake, Smartphone, Cpu, Bot,
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [svc, setSvc]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => {
        const found = data.find(s => s.slug === slug);
        if (found) setSvc(found);
        else setNotFound(true);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading service..." />
      </div>
      <Footer />
    </>
  );

  if (notFound) return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-2xl odibee text-black">Service not found.</p>
        <a href="/services" className="text-sm text-gray-500 hover:text-black anta transition-colors">← Back to services</a>
      </div>
      <Footer />
    </>
  );

  const Icon = ICON_MAP[svc.icon] || Package;

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
            className="relative max-w-7xl mx-auto px-6"
            variants={stagger(0.08)} initial="hidden" animate="show"
          >
            <motion.a variants={fadeUp} href="/services"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-black transition-colors mb-8 anta">
              <ArrowLeft size={14} /> All Services
            </motion.a>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Icon size={20} className="text-gray-600" />
                  </div>
                  {svc.tag && (
                    <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">
                      {svc.tag}
                    </span>
                  )}
                  {svc.status && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full border"
                      style={{ color: "var(--color-accent)", borderColor: "var(--color-accent)", backgroundColor: "color-mix(in srgb, var(--color-accent) 8%, transparent)" }}>
                      {svc.status}
                    </span>
                  )}
                </motion.div>

                <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl odibee text-black">
                  {svc.title || svc.name}
                </motion.h1>
                <motion.p variants={fadeUp} className="mt-4 text-base text-gray-400 anta font-light leading-relaxed max-w-lg">
                  {svc.shortDescription}
                </motion.p>

                {/* Stats */}
                {svc.stats?.length > 0 && (
                  <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-8">
                    {svc.stats.map((st, i) => (
                      <div key={i}>
                        <p className="text-3xl anta font-bold text-black">{st.value}</p>
                        <p className="text-xs text-gray-400 anta mt-0.5 tracking-widest uppercase">{st.label}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                  <a href="/contact"
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "var(--color-accent)" }}>
                    Get Started <ArrowRight size={14} />
                  </a>
                  <a href="/contact"
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-gray-200 text-gray-700 hover:border-black hover:text-black transition-colors">
                    Book a Demo
                  </a>
                </motion.div>
              </div>

              {/* Hero image */}
              {svc.image?.hero && (
                <motion.div variants={slideRight} className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
                  <Image
                    src={svc.image.hero}
                    alt={svc.image.alt || svc.title}
                    width={700} height={420}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Description + Key Features */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-[1.6fr_1fr] gap-16">
          <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">Overview</span>
            <h2 className="mt-2 text-3xl odibee text-black mb-6">About this service</h2>
            {svc.description?.split("\n\n").map((para, i) => (
              <p key={i} className="text-base text-gray-500 anta font-light leading-relaxed mb-4">{para}</p>
            ))}
          </motion.div>

          <motion.div variants={slideRight} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {svc.keyFeatures?.length > 0 && (
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">Key Features</span>
                <ul className="mt-4 space-y-3">
                  {svc.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }} />
                      <span className="text-sm text-gray-600 anta">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </section>

        {/* Use Cases + Integrations */}
        {(svc.useCases?.length > 0 || svc.integrations?.length > 0) && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
              {svc.useCases?.length > 0 && (
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">Use Cases</span>
                  <h3 className="mt-2 text-2xl odibee text-black mb-5">Who it's built for</h3>
                  <div className="space-y-2">
                    {svc.useCases.map((u, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-100">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--color-accent)" }} />
                        <span className="text-sm text-gray-600 anta">{u}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {svc.integrations?.length > 0 && (
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">Integrations</span>
                  <h3 className="mt-2 text-2xl odibee text-black mb-5">Works with your stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {svc.integrations.map((int, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 anta">
                        {int}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* Pricing */}
        {svc.pricing && (
          <section className="max-w-7xl mx-auto px-6 py-16">
            <motion.div
              variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="rounded-2xl bg-black p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            >
              <div>
                <motion.span variants={fadeUp} className="text-xs odibee font-semibold tracking-widest uppercase text-gray-500">Pricing</motion.span>
                <motion.h3 variants={fadeUp} className="mt-2 text-3xl odibee text-white">
                  {svc.pricing.model === "subscription" ? "Simple subscription pricing." : svc.pricing.model}
                </motion.h3>
                <motion.p variants={fadeUp} className="mt-2 text-2xl anta font-bold" style={{ color: "var(--color-accent)" }}>
                  {svc.pricing.startingAt}
                </motion.p>
                <motion.p variants={fadeUp} className="mt-1 text-sm text-gray-500 anta">No hidden fees. Cancel anytime.</motion.p>
              </div>
              <motion.a variants={fadeUp} href="/contact"
                className="shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-black hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--color-accent)" }}>
                Get a Quote <ArrowRight size={14} />
              </motion.a>
            </motion.div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
