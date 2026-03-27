"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Co-Founder & CEO",
    company: "Vendra Commerce",
    location: "Austin, TX",
    avatar: "SM",
    quote: "SynexNova gave us a full POS and e-commerce stack in under 48 hours. We launched without hiring a single developer. It scaled with us from 1 store to 12.",
    metric: "12 stores launched",
  },
  {
    name: "James Okafor",
    role: "Founder",
    company: "Stackly HQ",
    location: "Lagos, Nigeria",
    avatar: "JO",
    quote: "We needed CRM and HRM across three countries with different currencies. SynexNova handled all of it out of the box. Their support team is genuinely exceptional.",
    metric: "3 countries, 1 platform",
  },
  {
    name: "Priya Nair",
    role: "CTO",
    company: "Lumio Health",
    location: "Singapore",
    avatar: "PN",
    quote: "The mobile app went from wireframe to App Store in 6 weeks. Quality on par with a top-tier agency at a fraction of the cost. We've since expanded to AI Agents.",
    metric: "6 weeks to App Store",
  },
  {
    name: "Carlos Mendez",
    role: "Operations Director",
    company: "FreshRoute Logistics",
    location: "Miami, FL",
    avatar: "CM",
    quote: "Inventory across 8 warehouses used to be a nightmare. SynexNova's IUT solution connected our scanners, ERP, and e-commerce into one real-time dashboard.",
    metric: "8 warehouses unified",
  },
  {
    name: "Aisha Khalid",
    role: "CEO",
    company: "NovaBridge Consulting",
    location: "Dubai, UAE",
    avatar: "AK",
    quote: "I've recommended SynexNova to over 20 portfolio companies. The consistency of delivery and breadth of platform is unmatched at this price point.",
    metric: "20+ portfolio companies",
  },
  {
    name: "Liam Torres",
    role: "Founder",
    company: "ShelfSync",
    location: "New York, NY",
    avatar: "LT",
    quote: "We went from spreadsheets to a fully automated inventory system in two days. The onboarding was seamless and the platform just works.",
    metric: "2-day onboarding",
  },
  {
    name: "Mei Zhang",
    role: "Head of Product",
    company: "Orbis Retail",
    location: "Singapore",
    avatar: "MZ",
    quote: "SynexNova's CRM transformed how we handle customer relationships. Pipeline visibility went from zero to real-time across our entire sales team.",
    metric: "3× pipeline visibility",
  },
  {
    name: "David Osei",
    role: "CTO",
    company: "PayBridge Africa",
    location: "Accra, Ghana",
    avatar: "DO",
    quote: "Building fintech in Africa means dealing with complex compliance. SynexNova's team understood our market and delivered a compliant, scalable solution.",
    metric: "5 markets, 1 stack",
  },
];

const VISIBLE = 4;

export default function Testimonials() {
  const [start, setStart] = useState(0);
  const [dir, setDir] = useState(1);

  const next = () => {
    setDir(1);
    setStart((p) => (p + VISIBLE) % testimonials.length);
  };

  const prev = () => {
    setDir(-1);
    setStart((p) => (p - VISIBLE + testimonials.length) % testimonials.length);
  };

  const visible = Array.from({ length: VISIBLE }, (_, i) =>
    testimonials[(start + i) % testimonials.length]
  );

  return (
    <section className="bg-gray-50 py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          <div>
            <motion.span variants={fadeUp} className="text-xs odibee font-semibold  uppercase text-gray-400">
              Client Stories
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-2 text-4xl md:text-6xl odibee text-black">
              Startups that shipped<br />with SynexNova.
            </motion.h2>
          </div>

          {/* Nav buttons */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 shrink-0">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500
                hover:border-black hover:text-black transition-all duration-200"
              aria-label="Previous"
            >
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white
                hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--color-accent)" }}
              aria-label="Next"
            >
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            {visible.map((t, i) => (
              <motion.div
                key={`${start}-${i}`}
                custom={dir}
                initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.25 } }}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 flex flex-col
                  shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                  hover:-translate-y-1 hover:border-accent/30
                  hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--color-accent)_15%,transparent)]
                  transition-all duration-300 overflow-hidden"
              >
                {/* accent top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent" />

                {/* glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: "radial-gradient(ellipse at top left, color-mix(in srgb, var(--color-accent) 7%, transparent) 0%, transparent 65%)" }}
                />

                {/* Quote icon */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 12%, transparent)" }}
                >
                  <Quote size={14} style={{ color: "var(--color-accent)" }} />
                </div>

                {/* Quote text */}
                <p className="text-sm text-gray-600 anta font-light leading-relaxed flex-1 mb-5">
                  "{t.quote}"
                </p>

                {/* Metric pill */}
                <span
                  className="self-start text-[10px] font-semibold px-2.5 py-1 rounded-full mb-4"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                    color: "var(--color-accent)",
                    border: "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
                  }}
                >
                  {t.metric}
                </span>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black leading-tight">{t.name}</p>
                    <p className="text-xs text-gray-400 anta">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / VISIBLE) }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i * VISIBLE > start ? 1 : -1); setStart(i * VISIBLE); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: start / VISIBLE === i ? 24 : 8,
                height: 8,
                backgroundColor: start / VISIBLE === i ? "var(--color-accent)" : "#e5e7eb",
              }}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
