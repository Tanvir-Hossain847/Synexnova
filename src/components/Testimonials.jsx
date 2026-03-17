"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const EMERALD = "#10b981";

const testimonials = [
  {
    name: "Sarah Mitchell", role: "Co-Founder & CEO", company: "Vendra Commerce", location: "Austin, TX",
    avatar: "SM", color: EMERALD,
    quote: "SynexNova gave us a full POS and e-commerce stack in under 48 hours. We launched our retail brand without hiring a single developer. The platform just works — and it scaled with us from 1 store to 12.",
    metric: "12 stores launched",
  },
  {
    name: "James Okafor", role: "Founder", company: "Stackly HQ", location: "Lagos, Nigeria",
    avatar: "JO", color: "#6366f1",
    quote: "We needed a CRM and HRM solution that worked across three countries with different currencies and compliance requirements. SynexNova handled all of it out of the box. Their support team is genuinely exceptional.",
    metric: "3 countries, 1 platform",
  },
  {
    name: "Priya Nair", role: "CTO", company: "Lumio Health", location: "Singapore",
    avatar: "PN", color: "#8b5cf6",
    quote: "The mobile app they built for us went from wireframe to App Store in 6 weeks. The quality was on par with what we'd expect from a top-tier agency — at a fraction of the cost. We've since expanded to their AI Agents product.",
    metric: "6 weeks to App Store",
  },
  {
    name: "Carlos Mendez", role: "Operations Director", company: "FreshRoute Logistics", location: "Miami, FL",
    avatar: "CM", color: "#f59e0b",
    quote: "Inventory management across 8 warehouses used to be a nightmare. SynexNova's IUT solution connected everything — our physical scanners, our ERP, and our e-commerce store — into one real-time dashboard.",
    metric: "8 warehouses unified",
  },
  {
    name: "Aisha Khalid", role: "CEO", company: "NovaBridge Consulting", location: "Dubai, UAE",
    avatar: "AK", color: "#ec4899",
    quote: "As a startup advisor, I've recommended SynexNova to over 20 of my portfolio companies. The consistency of delivery, the quality of support, and the breadth of their platform is unmatched at this price point.",
    metric: "20+ portfolio companies",
  },
];

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, transition: { duration: 0.3 } }),
};

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d) => {
    setDir(d);
    setIndex((prev) => (prev + d + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section className="bg-gray-50 py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.span variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-gray-400">Client Stories</motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
            Startups that shipped<br />with SynexNova.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base text-gray-400 font-light max-w-xl mx-auto">
            Real founders, real results. Here's what they built with us.
          </motion.p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit"
              className="group relative bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ background: "radial-gradient(ellipse at top left, rgba(16,185,129,0.06) 0%, transparent 60%)" }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-8" style={{ backgroundColor: `${t.color}22` }}>
                <Quote size={18} style={{ color: t.color }} />
              </div>
              <p className="text-xl md:text-2xl font-light text-black leading-relaxed mb-8">"{t.quote}"</p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.company}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-4 py-2 rounded-full border" style={{ borderColor: t.color, color: t.color, backgroundColor: `${t.color}11` }}>
                  {t.metric}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === index ? 24 : 8, height: 8, backgroundColor: i === index ? EMERALD : "#e5e7eb" }}
                  aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => go(-1)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-emerald-400 hover:text-emerald-600 transition-all duration-200" aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => go(1)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-emerald-400 hover:text-emerald-600 transition-all duration-200" aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
