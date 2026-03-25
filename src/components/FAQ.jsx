"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is SynexNova suitable for early-stage startups?",
    a: "Absolutely. We designed our platform specifically with startups in mind — lean pricing, fast onboarding, and modular services so you only pay for what you need. Many of our clients launched with just one product and expanded as they grew.",
  },
  {
    q: "How quickly can we get up and running?",
    a: "Most clients are live within 48 hours of signing. Our onboarding team handles the setup, configuration, and initial training so your team can focus on the business — not the tech.",
  },
  {
    q: "Do your solutions work internationally?",
    a: "Yes. We support multi-currency, multi-language, and multi-timezone operations across 30+ countries. Our platform is built to handle regional compliance, tax rules, and payment gateways out of the box.",
  },
  {
    q: "Can I use just one service, or do I need the full suite?",
    a: "You can start with any single product — POS, CRM, HRM, or anything else — and add more as your needs grow. All our services are modular and integrate seamlessly with each other when you're ready.",
  },
  {
    q: "What kind of support do you offer?",
    a: "Every account gets a dedicated success manager, 24/7 technical support, and access to our onboarding specialists. We don't do ticket queues — you get real people who know your account.",
  },
  {
    q: "How does pricing work for startups?",
    a: "We offer startup-friendly pricing with monthly and annual plans. There are no hidden fees, no per-seat surprises, and we offer a free consultation to scope exactly what you need before you commit.",
  },
  {
    q: "Can SynexNova build a custom mobile app for my business?",
    a: "Yes. Our mobile team builds native iOS and Android apps tailored to your workflows. We handle design, development, QA, and App Store submission — typically delivering in 4–8 weeks depending on scope.",
  },
  {
    q: "What makes your AI Agents different from other automation tools?",
    a: "Our AI Agents are trained on your business data and integrated directly into your SynexNova stack. They don't just automate generic tasks — they understand your customers, your inventory, and your workflows to surface insights and take action in context.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-semibold text-black group-hover:text-gray-700 transition-colors pr-8">
          {q}
        </span>
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
            <p className="pb-5 text-sm text-gray-400 font-light leading-relaxed max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16">
          {/* Left */}
          <motion.div
            variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              FAQ
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-black leading-tight">
              Questions,
              <br />answered.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-base text-gray-400 font-light leading-relaxed">
              Everything you need to know before getting started with SynexNova.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="#contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-black hover:gap-3 transition-all duration-200"
            >
              Still have questions? Talk to us →
            </motion.a>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          >
            {faqs.map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FAQItem
                  q={item.q}
                  a={item.a}
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
