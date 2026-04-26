"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, slideLeft, fromLeft, fromRight } from "@/lib/motion";
import { ArrowRight, Rocket, Globe, Puzzle, TrendingUp, Shield, HeadphonesIcon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const ACCENT = "var(--color-accent)";
const ACCENT_ALPHA = (a) => `color-mix(in srgb, var(--color-accent) ${Math.round(a * 100)}%, transparent)`;

const ICON_MAP = { Rocket, Globe, Puzzle, TrendingUp, Shield, HeadphonesIcon, Zap };

const statCards = [
  { val: "48h", label: "Average onboarding time", sub: "From contract to live" },
  { val: "30+", label: "Countries supported", sub: "And growing" },
  { val: "3×", label: "Faster time to market", sub: "vs. building in-house" },
  { val: "24/7", label: "Support coverage", sub: "Real humans, always on" },
];

export default function StartupSection() {
  const [pillars, setPillars] = useState([]);

  useEffect(() => {
    fetch("https://synexnova-backend.vercel.app/features")
      .then(r => r.json())
      .then(setPillars)
      .catch(() => {});
  }, []);

  return (
    <section className="bg-white py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Two-column intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-14 md:mb-24">
          <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">Built for Startups</span>
            <h2 className="mt-3 text-4xl odibee md:text-6xl text-black">
              From idea to<br /><span className="text-accent odibee">global scale.</span>
            </h2>
            <p className="mt-5 anta text-base text-gray-400 font-light leading-relaxed max-w-md">
              SynexNova was built with startups in mind. We know the pressure of moving fast, staying lean, and needing technology that grows with you — not against you.
            </p>
            <p className="mt-4 anta text-base text-gray-400 font-light leading-relaxed max-w-md">
              Whether you're pre-launch or scaling across borders, we give you the same enterprise-grade tools that Fortune 500 companies use — at a price and pace that works for founders.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button className="bg-accent anta text-white hover:bg-gray-800 rounded-full px-6 font-medium transition-colors">
                Start Building <ArrowRight size={14} className="ml-2" />
              </Button>
              <a href="#" className="text-sm anta font-medium text-gray-500 hover:text-black transition-colors flex items-center gap-1">
                See case studies <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          >
            {statCards.map((s, i) => (
              <motion.div
                key={s.label}
                variants={i % 2 === 0 ? fromLeft : fromRight}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 overflow-hidden relative
                  shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                  hover:border-accent/30 hover:shadow-[0_8px_32px_color-mix(in_srgb,var(--color-accent)_15%,transparent)] transition-all duration-300"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${ACCENT_ALPHA(0.07)} 0%, transparent 70%)` }} />
                <p className="anta text-3xl font-black text-black">{s.val}</p>
                <p className="anta text-sm font-semibold text-black mt-1">{s.label}</p>
                <p className="anta text-xs text-gray-400 mt-0.5 font-light">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pillars — dynamic from API */}
        {pillars.length > 0 && (
          <motion.div
            className="mb-20"
            variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          >
            <motion.h3 variants={fadeUp} className="text-2xl anta text-black mb-8">
              Why startups choose SynexNova
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pillars.map((p, i) => {
                const Icon = ICON_MAP[p.icon] || Zap;
                return (
                  <motion.div
                    key={p._id || p.title}
                    variants={i % 2 === 0 ? fromLeft : fromRight}
                    className="group rounded-2xl border border-gray-100 bg-white p-6 overflow-hidden relative
                      shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                      hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]
                      transition-all duration-300 cursor-pointer"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at top left, ${ACCENT_ALPHA(0.07)} 0%, transparent 70%)` }} />
                    <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: ACCENT }} />
                    <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-accent/10 flex items-center justify-center mb-4 transition-colors">
                      <Icon size={18} className="text-gray-600 group-hover:text-accent transition-colors" />
                    </div>
                    <h4 className="text-base anta font-bold text-black mb-1.5">{p.title}</h4>
                    <p className="text-sm anta text-gray-400 font-light leading-relaxed">{p.description || p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
