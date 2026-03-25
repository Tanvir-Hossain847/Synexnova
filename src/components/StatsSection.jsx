"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, fromLeft, fromRight } from "@/lib/motion";

const ACCENT = "var(--color-accent)";
const ACCENT_ALPHA = (a) => `color-mix(in srgb, var(--color-accent) ${Math.round(a * 100)}%, transparent)`;

const stats = [
  { end: 850, suffix: "+", label: "Startups Helped", desc: "Across industries and growth stages" },
  { end: 30, suffix: "+", label: "Countries Served", desc: "With localized, compliant solutions" },
  { end: 8, suffix: "", label: "Years in Business", desc: "Trusted since our founding" },
  { end: 99.9, suffix: "%", label: "Uptime SLA", desc: "Guaranteed reliability at scale", decimal: true },
  { end: 48, suffix: "h", label: "Avg. Onboarding", desc: "From contract signed to live" },
  { end: 24, suffix: "/7", label: "Support Coverage", desc: "Real humans, always available" },
];

function CountUp({ end, suffix, decimal, inView }) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(decimal ? parseFloat((eased * end).toFixed(1)) : Math.floor(eased * end));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, end, decimal]);

  return <>{count}{suffix}</>;
}

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-black py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-gray-500">Our Impact</motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-4xl md:text-5xl font-black text-white tracking-tight">
            Numbers that speak.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
            A decade of building, shipping, and scaling technology for businesses around the world.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-800 rounded-2xl overflow-hidden"
          variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={i % 2 === 0 ? fromLeft : fromRight}
              className="group relative bg-black px-8 py-10 overflow-hidden hover:bg-gray-950 transition-colors duration-200"
            >
              {/* accent glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${ACCENT_ALPHA(0.1)} 0%, transparent 65%)` }} />
              <p className="text-4xl md:text-5xl font-black text-white tabular-nums">
                <CountUp end={s.end} suffix={s.suffix} decimal={s.decimal} inView={inView} />
              </p>
              <p className="mt-2 text-base font-semibold text-white">{s.label}</p>
              <p className="mt-1 text-sm text-gray-500 font-light">{s.desc}</p>
              <div className="mt-4 w-8 h-[2px] rounded-full transition-all duration-300 group-hover:w-14" style={{ backgroundColor: ACCENT }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
