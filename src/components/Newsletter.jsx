"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";
import Threads from "@/components/Threads";

const API = "https://synexnova-backend.vercel.app/emails";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subscribedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)" }}
              >
                <Mail size={22} style={{ color: "var(--color-accent)" }} />
              </div>
            </motion.div>

            <motion.span variants={fadeUp} className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">
              Stay in the loop
            </motion.span>

            <motion.h2 variants={fadeUp} className="mt-3 text-4xl md:text-5xl odibee text-black">
              Get startup insights<br />
              <span style={{ color: "var(--color-accent)" }}>delivered weekly.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-4 text-base text-gray-500 anta font-light leading-relaxed">
              Product updates, founder stories, and practical guides on scaling
              your business with technology — straight to your inbox. No spam, ever.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              {status === "success" ? (
                <div className="flex items-center justify-center gap-3 py-4">
                  <CheckCircle size={20} style={{ color: "var(--color-accent)" }} />
                  <p className="text-base font-semibold text-black anta">You're in. Check your inbox.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-5 py-3.5 rounded-full bg-white border border-gray-200 text-black text-sm placeholder-gray-400
                      focus:outline-none focus:border-accent transition-colors anta shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white
                      hover:opacity-90 transition-opacity shrink-0 disabled:opacity-60"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  >
                    {status === "loading" ? "Subscribing..." : <>Subscribe <ArrowRight size={14} /></>}
                  </button>
                </form>
              )}
              {status === "error" && (
                <p className="mt-3 text-xs text-red-500 anta">Something went wrong. Please try again.</p>
              )}
            </motion.div>

            <motion.p variants={fadeUp} className="mt-5 text-xs text-gray-400 anta">
              Join 9,800+ founders and operators already subscribed.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
