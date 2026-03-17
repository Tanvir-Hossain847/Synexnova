"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger, fromLeft, fromRight } from "@/lib/motion";
import {
  ShoppingCart, Package, Globe, Users, Handshake,
  Smartphone, Cpu, Bot, ArrowRight,
} from "lucide-react";

const EMERALD = "#10b981";

const features = [
  { icon: ShoppingCart, title: "Point of Sale", desc: "Lightning-fast checkout, multi-register support, offline mode, and real-time sales reporting.", tag: "Retail", size: "md:col-span-2" },
  { icon: Package, title: "Inventory Management", desc: "Track stock levels, automate reorders, and sync across warehouses in real time.", tag: "Operations", size: "" },
  { icon: Globe, title: "E-Commerce", desc: "Launch and scale your online store with integrated payments and seamless POS sync.", tag: "Growth", size: "" },
  { icon: Users, title: "HRM", desc: "End-to-end human resource management — onboarding, payroll, attendance, and reviews.", tag: "People", size: "" },
  { icon: Handshake, title: "CRM", desc: "Manage leads, automate follow-ups, track deals, and build lasting customer relationships.", tag: "Sales", size: "md:col-span-2" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Custom-built iOS and Android apps that extend your operations to any device.", tag: "Mobile", size: "" },
  { icon: Cpu, title: "IUT Solutions", desc: "Integrated utility technology connecting your physical and digital infrastructure.", tag: "Enterprise", size: "" },
  { icon: Bot, title: "AI Agents", desc: "Intelligent agents that automate workflows, answer queries, and surface insights 24/7.", tag: "AI", size: "md:col-span-2", highlight: true },
];

export default function Features() {
  return (
    <section id="services" className="bg-gray-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="max-w-2xl mb-16"
          variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-gray-400">What We Build</motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
            Every tool your<br />business needs.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base text-gray-400 font-light leading-relaxed">
            Eight integrated solutions designed to work together — or independently — so you can move fast without switching platforms.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={i % 2 === 0 ? fromLeft : fromRight}
                className={`${f.size} group relative rounded-2xl border p-7 cursor-pointer overflow-hidden
                  shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                  transition-all duration-300 hover:-translate-y-1
                  ${f.highlight
                    ? "bg-black border-black hover:shadow-[0_16px_48px_rgba(16,185,129,0.25)]"
                    : "bg-white border-gray-100 hover:border-emerald-200 hover:shadow-[0_16px_48px_rgba(16,185,129,0.18)]"
                  }`}
              >
                {/* Glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{
                    background: f.highlight
                      ? "radial-gradient(ellipse at top left, rgba(16,185,129,0.12) 0%, transparent 65%)"
                      : "radial-gradient(ellipse at top left, rgba(16,185,129,0.07) 0%, transparent 65%)",
                  }}
                />

                {!f.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: EMERALD }} />
                )}

                <div className="flex items-start justify-between mb-6">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl transition-colors
                    ${f.highlight ? "bg-white/10 group-hover:bg-emerald-500/20" : "bg-gray-50 group-hover:bg-emerald-50"}`}>
                    <Icon size={18} className={f.highlight ? "text-white group-hover:text-emerald-400 transition-colors" : "text-gray-600 group-hover:text-emerald-600 transition-colors"} />
                  </div>
                  <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full
                    ${f.highlight ? "bg-white/10 text-white/60" : "bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600"}`}>
                    {f.tag}
                  </span>
                </div>

                <h3 className={`text-lg font-bold mb-2 ${f.highlight ? "text-white" : "text-black"}`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed font-light ${f.highlight ? "text-white/50" : "text-gray-400"}`}>{f.desc}</p>

                <div className={`mt-6 flex items-center gap-1.5 text-xs font-medium transition-all duration-200 group-hover:gap-3
                  ${f.highlight ? "text-white/30 group-hover:text-emerald-400" : "text-gray-300 group-hover:text-emerald-600"}`}>
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
