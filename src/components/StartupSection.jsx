"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger, slideLeft, slideRight, fromLeft, fromRight } from "@/lib/motion";
import { ArrowRight, Rocket, Globe, Puzzle, TrendingUp, Shield, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ACCENT = "var(--color-accent)";
const ACCENT_ALPHA = (a) => `color-mix(in srgb, var(--color-accent) ${Math.round(a * 100)}%, transparent)`;

const pillars = [
  { icon: Rocket, title: "Launch-Ready Stack", desc: "Everything a startup needs from day one — POS, e-commerce, CRM, and mobile — pre-integrated and ready to deploy." },
  { icon: Puzzle, title: "Tailored to You", desc: "No rigid templates. We scope, design, and build around your business model, industry, and growth stage." },
  { icon: Globe, title: "Global Reach", desc: "Multi-currency, multi-language, and multi-timezone support so your product works wherever your customers are." },
  { icon: TrendingUp, title: "Scales With You", desc: "Start lean, grow fast. Our infrastructure handles everything from 10 users to 10 million without a rebuild." },
  { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption, role-based access, and compliance-ready architecture — from your first day of business." },
  { icon: HeadphonesIcon, title: "Dedicated Support", desc: "A real team behind you. Onboarding specialists, technical support, and a success manager assigned to your account." },
];

const statCards = [
  { val: "48h", label: "Average onboarding time", sub: "From contract to live" },
  { val: "30+", label: "Countries supported", sub: "And growing" },
  { val: "3×", label: "Faster time to market", sub: "vs. building in-house" },
  { val: "24/7", label: "Support coverage", sub: "Real humans, always on" },
];

const regions = ["North America", "Europe", "Middle East", "South Asia", "Southeast Asia", "Latin America"];

export default function StartupSection() {
  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Two-column intro */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Built for Startups</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
              From idea to<br /><span style={{ color: ACCENT }}>global scale.</span>
            </h2>
            <p className="mt-5 text-base text-gray-400 font-light leading-relaxed max-w-md">
              SynexNova was built with startups in mind. We know the pressure of moving fast, staying lean, and needing technology that grows with you — not against you.
            </p>
            <p className="mt-4 text-base text-gray-400 font-light leading-relaxed max-w-md">
              Whether you're pre-launch or scaling across borders, we give you the same enterprise-grade tools that Fortune 500 companies use — at a price and pace that works for founders.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6 font-medium transition-colors">
                Start Building <ArrowRight size={14} className="ml-2" />
              </Button>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center gap-1">
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
                <p className="text-3xl font-black text-black">{s.val}</p>
                <p className="text-sm font-semibold text-black mt-1">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5 font-light">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pillars */}
        <motion.div
          className="mb-20"
          variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h3 variants={fadeUp} className="text-2xl font-black text-black mb-8">
            Why startups choose SynexNova
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
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
                  <h4 className="text-base font-bold text-black mb-1.5">{p.title}</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Global reach strip */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ backgroundColor: "#f0fdf8", border: "1px solid #a7f3d0" }}
        >
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ACCENT }}>Global Presence</span>
            <h3 className="mt-2 text-2xl md:text-3xl font-black text-black">Serving startups across 6 regions.</h3>
            <p className="mt-2 text-sm text-gray-400 font-light max-w-md">
              Our solutions are localized, compliant, and optimized for the markets you're entering — not just the one you're in.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {regions.map((r) => (
                <span key={r} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border text-gray-600" style={{ borderColor: "#6ee7b7" }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
          <Button className="shrink-0 rounded-full px-7 font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: ACCENT }}>
            Explore Global Plans <ArrowRight size={14} className="ml-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
