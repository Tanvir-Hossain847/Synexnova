"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, slideLeft, slideRight } from "@/lib/motion";
import { Mail, Phone, MapPin, ArrowRight, Send, Twitter, Linkedin, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  "Point of Sale", "Inventory Management", "E-Commerce",
  "HRM", "CRM", "Mobile Apps", "IUT Solutions", "AI Agents", "Other",
];

const contactCards = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@synexnova.com",
    sub: "We reply within 24 hours",
    href: "mailto:hello@synexnova.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (800) 555-1234",
    sub: "Mon–Fri, 9am–6pm EST",
    href: "tel:+18005551234",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Austin, TX 78701",
    sub: "123 Innovation Drive, USA",
    href: "#",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", message: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("https://synexnova-backend.vercel.app/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sentAt: new Date().toISOString(), read: false }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch (e) {
      setError("Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <motion.div
            className="relative max-w-7xl mx-auto px-6 text-center"
            variants={stagger(0.1)} initial="hidden" animate="show"
          >
            <motion.span variants={fadeUp} className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">
              Get In Touch
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-3 text-5xl md:text-7xl text-black odibee"
            >
              Let's build something<br />
              <span className="text-accent odibee">great together.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-base md:text-lg text-gray-400 font-light max-w-xl mx-auto leading-relaxed anta"
            >
              Whether you're a founder with an idea or a team ready to scale —
              we're here to help you move fast.
            </motion.p>
          </motion.div>
        </section>

        {/* Contact cards */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          >
            {contactCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  variants={fadeUp}
                  className="group relative rounded-2xl border border-gray-100 bg-white p-6 overflow-hidden
                    shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                    hover:-translate-y-1 hover:border-accent/30
                    hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--color-accent)_15%,transparent)]
                    transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(ellipse at top left, color-mix(in srgb, var(--color-accent) 8%, transparent) 0%, transparent 70%)" }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent" />
                  <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-accent/10 flex items-center justify-center mb-4 transition-colors">
                    <Icon size={18} className="text-gray-500 group-hover:text-accent transition-colors" />
                  </div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">{c.label}</p>
                  <p className="text-base font-bold text-black">{c.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5 font-light">{c.sub}</p>
                </motion.a>
              );
            })}
          </motion.div>
        </section>

        {/* Form + side info */}
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 items-start">

            {/* Left — side info */}
            <motion.div
              variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
              className="space-y-8"
            >
              <div>
                <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">Why reach out?</span>
                <h2 className="mt-3 text-3xl md:text-5xl text-black odibee">
                  We respond fast.<br />
                  <span className="text-accent odibee">We deliver faster.</span>
                </h2>
                <p className="mt-4 text-sm text-gray-400 font-light leading-relaxed anta">
                  Our team is made up of builders, not salespeople. When you reach out,
                  you'll hear from someone who actually understands your problem — and
                  can help you solve it.
                </p>
              </div>

              {/* Promise list */}
              <div className="space-y-3">
                {[
                  "Reply within 24 hours, guaranteed",
                  "Free consultation — no commitment",
                  "Dedicated point of contact from day one",
                  "Transparent pricing, no surprises",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                    <span className="text-sm text-gray-600 anta">{item}</span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3">Follow us</p>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Twitter, label: "Twitter", href: "#" },
                    { icon: Linkedin, label: "LinkedIn", href: "#" },
                    { icon: Instagram, label: "Instagram", href: "#" },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-accent hover:text-accent transition-all duration-200"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              variants={slideRight} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-gray-100 bg-white p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)" }}
                  >
                    <Send size={22} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <h3 className="text-2xl font-black text-black odibee">Message sent.</h3>
                  <p className="mt-2 text-sm text-gray-400 anta font-light">
                    We'll get back to you within 24 hours. Check your inbox.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-medium text-gray-500 hover:text-black transition-colors anta"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        name="name" required value={form.name} onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-black placeholder-gray-300
                          focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors anta"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        name="email" type="email" required value={form.email} onChange={handleChange}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-black placeholder-gray-300
                          focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors anta"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                      Company
                    </label>
                    <input
                      name="company" value={form.company} onChange={handleChange}
                      placeholder="Your company name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-black placeholder-gray-300
                        focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors anta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                      Service of Interest
                    </label>
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-black
                        focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors anta bg-white"
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message" required value={form.message} onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project, timeline, and what you're looking to build..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-black placeholder-gray-300
                        focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-none anta"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm text-white
                      hover:opacity-90 transition-opacity disabled:opacity-60"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  >
                    {submitting ? "Sending..." : <>Send Message <ArrowRight size={15} /></>}
                  </button>

                  {error && <p className="text-xs text-red-500 text-center anta">{error}</p>}

                  <p className="text-xs text-gray-400 text-center font-light anta">
                    By submitting, you agree to our{" "}
                    <a href="#" className="underline hover:text-black transition-colors">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
