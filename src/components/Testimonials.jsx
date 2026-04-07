"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { ArrowRight, Quote } from "lucide-react";

const API = "https://synexnova-backend.vercel.app/reviews";
const VISIBLE = 4;

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [start, setStart]     = useState(0);
  const [dir, setDir]         = useState(1);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setReviews)
      .catch(() => {});
  }, []);

  const total = reviews.length;

  const next = () => {
    if (total === 0) return;
    setDir(1);
    setStart((p) => (p + VISIBLE) % total);
  };

  const prev = () => {
    if (total === 0) return;
    setDir(-1);
    setStart((p) => (p - VISIBLE + total) % total);
  };

  const visible = total > 0
    ? Array.from({ length: Math.min(VISIBLE, total) }, (_, i) => reviews[(start + i) % total])
    : [];

  if (total === 0) return null;

  return (
    <section className="bg-gray-50 py-16 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          <div>
            <motion.span variants={fadeUp} className="text-xs odibee font-semibold uppercase text-gray-400">
              Client Stories
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-2 text-4xl md:text-6xl odibee text-black">
              Startups that shipped<br />with SynexNova.
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 shrink-0">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-all duration-200"
              aria-label="Previous"
            >
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
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
                animate={{ opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.25 } }}
                className={`group relative bg-white rounded-2xl border border-gray-100 p-6 flex flex-col
                  shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                  hover:-translate-y-1 hover:border-accent/30
                  hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--color-accent)_15%,transparent)]
                  transition-all duration-300 overflow-hidden
                  ${i > 0 ? "hidden sm:flex" : "flex"}
                  ${i > 1 ? "lg:flex sm:hidden" : ""}
                  ${i > 1 ? "lg:flex" : ""}`}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: "radial-gradient(ellipse at top left, color-mix(in srgb, var(--color-accent) 7%, transparent) 0%, transparent 65%)" }}
                />

                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 12%, transparent)" }}
                >
                  <Quote size={14} style={{ color: "var(--color-accent)" }} />
                </div>

                <p className="text-sm text-gray-600 anta font-light leading-relaxed flex-1 mb-5">
                  "{t.body}"
                </p>

                {t.serviceTag && (
                  <span
                    className="self-start text-[10px] font-semibold px-2.5 py-1 rounded-full mb-4"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                      color: "var(--color-accent)",
                      border: "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
                    }}
                  >
                    {t.serviceTag}
                  </span>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                    {t.user?.avatar ? (
                      <Image src={t.user.avatar} alt={t.user.name || ""} width={36} height={36} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "var(--color-accent)" }}>
                        {t.user?.initials || t.user?.name?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">{t.user?.name}</p>
                    <p className="text-xs text-gray-400 anta">{t.serviceTag}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        {total > VISIBLE && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(total / VISIBLE) }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i * VISIBLE > start ? 1 : -1); setStart(i * VISIBLE); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: Math.floor(start / VISIBLE) === i ? 24 : 8,
                  height: 8,
                  backgroundColor: Math.floor(start / VISIBLE) === i ? "var(--color-accent)" : "#e5e7eb",
                }}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
