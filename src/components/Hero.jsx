"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, stagger, fromLeft, fromRight } from "@/lib/motion";
import {
  ShoppingCart, Package, Globe, Users, Handshake,
  Smartphone, Cpu, Bot, ArrowRight,
} from "lucide-react";

const EMERALD = "#10b981";

const services = [
  { icon: ShoppingCart, title: "Point of Sale", desc: "Fast, reliable POS systems built for modern retail environments.", span: "col-span-1" },
  { icon: Package, title: "Inventory", desc: "Real-time stock tracking across all your locations.", span: "col-span-1" },
  { icon: Globe, title: "E-Commerce", desc: "Scalable online storefronts engineered to convert.", span: "col-span-1" },
  { icon: Users, title: "HRM", desc: "Streamline hiring, payroll, and team management.", span: "col-span-1" },
  { icon: Handshake, title: "CRM", desc: "Build stronger customer relationships with intelligent tools.", span: "col-span-1 md:col-span-2" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native iOS & Android apps tailored to your business.", span: "col-span-1" },
  { icon: Cpu, title: "IUT Solutions", desc: "Integrated utility tech for enterprise-grade operations.", span: "col-span-1" },
  { icon: Bot, title: "AI Agents", desc: "Intelligent automation agents that work around the clock for you.", span: "col-span-1" },
];

const stats = [
  { val: "500+", label: "Clients Served" },
  { val: "8", label: "Core Services" },
  { val: "99.9%", label: "Uptime SLA" },
  { val: "USA", label: "Headquartered" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden pt-16">
      {/* Grid background only — no image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* Badge */}
        <motion.div className="flex justify-center mb-8" variants={fadeIn} initial="hidden" animate="show">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 bg-gray-50">
            USA-Based Technology Partner
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-center text-5xl md:text-[4.5rem] font-black leading-[1.1] tracking-tight text-black max-w-4xl mx-auto"
          variants={fadeUp} initial="hidden" animate="show"
        >
          One Platform.
          <br />
          <span style={{ color: EMERALD }}>Every Solution.</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-center text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed font-light"
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
        >
          SynexNova delivers end-to-end business technology — POS, inventory,
          e-commerce, HRM, CRM, mobile apps, and more — all under one roof.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.18 }}
        >
          <Button size="lg" className="px-8 bg-black text-white hover:bg-gray-800 transition-colors font-medium rounded-full">
            Explore Solutions <ArrowRight size={15} className="ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="px-8 font-medium border-gray-300 text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all rounded-full">
            Book a Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-12 text-center border-y border-gray-100 py-10"
          variants={stagger(0.1)} initial="hidden" animate="show"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <p className="text-3xl font-bold text-black">{s.val}</p>
              <p className="text-xs tracking-widest uppercase text-gray-400 mt-1 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento Grid — alternating left/right entry */}
        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
          variants={stagger(0.07)} initial="hidden" animate="show"
        >
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                variants={i % 2 === 0 ? fromLeft : fromRight}
                className={`${svc.span} group relative rounded-xl border border-gray-100 bg-white p-6 cursor-pointer
                  shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                  transition-all duration-300 overflow-hidden
                  hover:-translate-y-1 hover:border-emerald-200
                  hover:shadow-[0_12px_36px_rgba(16,185,129,0.18)]`}
              >
                {/* Emerald gradient glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                  style={{ background: "radial-gradient(ellipse at top left, rgba(16,185,129,0.08) 0%, transparent 70%)" }}
                />
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: EMERALD }} />

                <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 group-hover:bg-emerald-50 transition-colors mb-5">
                  <Icon size={17} className="text-gray-600 group-hover:text-emerald-600 transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-black mb-1.5">{svc.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">{svc.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-xs font-medium text-gray-300 group-hover:text-emerald-600 group-hover:gap-2 transition-all duration-200">
                  Learn more <ArrowRight size={11} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
