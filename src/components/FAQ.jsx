"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { Plus, Minus } from "lucide-react";

const API = "https://synexnova-backend.vercel.app/faq";

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-base font-semibold text-black group-hover:text-gray-700 transition-colors pr-8">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-accent transition-colors">
          {isOpen ? <Minus size={13} className="text-gray-600" /> : <Plus size={13} className="text-gray-600" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.25 } }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-400 font-light leading-relaxed max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(setFaqs)
      .catch(() => {});
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          {/* Left */}
          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.span variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-gray-400">FAQ</motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-black anta">
              Questions,<br />answered.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-base text-gray-400 anta leading-relaxed">
              Everything you need to know before getting started with SynexNova.
            </motion.p>
            <motion.a variants={fadeUp} href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 anta text-sm font-medium text-black hover:gap-3 transition-all duration-200">
              Still have questions? Talk to us →
            </motion.a>
          </motion.div>

          {/* Right — accordion */}
          <motion.div variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
            {faqs.map((item, i) => (
              <motion.div key={item._id || i} variants={fadeUp}>
                <FAQItem
                  q={item.question || item.q}
                  a={item.answer || item.a}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
