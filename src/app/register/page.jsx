"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import Cubes from "@/components/Cubes";

const perks = [
  "Free 14-day trial, no credit card",
  "Onboarding in under 48 hours",
  "Dedicated success manager",
  "Cancel anytime",
];

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", password: "" });
  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left — Cubes panel */}
      <div className="relative hidden md:flex items-center justify-center bg-white overflow-hidden">
        <div className="absolute inset-0">
          <Cubes
           gridSize={10}
            maxAngle={40}
            radius={3}
            borderStyle="2px solid #59839d"
            faceColor="#ffff"
            rippleColor="#59839d"
            rippleSpeed={2}
            autoAnimate
            rippleOnClick
          />
        </div>

        {/* Overlay content */}
        <div className="relative z-10 flex flex-col justify-between h-full w-full p-12 pointer-events-none">
          <a href="/" className="flex items-center pointer-events-auto">
            <span className="text-4xl text-accent odibee">Synex</span>
            <span className="text-4xl odibee" style={{ color: "var(--color-accent)" }}>Nova</span>
          </a>

          <div className="bg-white/10 backdrop-blur-xs p-2 border-2 border-accent rounded-2xl">
            <p className="text-black text-xs odibee font-semibold tracking-widest uppercase mb-4">What you get</p>
            <div className="space-y-3 mb-8">
              {perks.map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <CheckCircle size={15} style={{ color: "var(--color-accent)" }} className="shrink-0" />
                  <span className="text-sm text-black anta">{p}</span>
                </div>
              ))}
            </div>

            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <p className="text-black text-sm font-light leading-relaxed anta">
                "We were live in 48 hours. SynexNova is the fastest way to get enterprise-grade tech without the enterprise price tag."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: "var(--color-accent)" }}>
                  JO
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">James Okafor</p>
                  <p className="text-xs text-black anta">Founder, Stackly HQ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-12 bg-accent overflow-y-auto">
        <a href="/" className="flex items-center mb-10 md:hidden">
          <span className="text-xl font-black tracking-tight text-black">Synex</span>
          <span className="text-xl font-black tracking-tight" style={{ color: "var(--color-accent)" }}>Nova</span>
        </a>

        <motion.div
          className="max-w-sm w-full mx-auto"
          variants={stagger(0.08)} initial="hidden" animate="show"
        >
          <motion.span variants={fadeUp} className="text-xs odibee font-semibold tracking-widest uppercase text-white">
            Get started free
          </motion.span>
          <motion.h1 variants={fadeUp} className="mt-2 text-3xl md:text-4xl text-white odibee">
            Create your<br />
            <span className="text-accent odibee">account.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-3 text-sm text-white anta font-light">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-white hover:underline transition-colors">Sign in</a>
          </motion.p>

          <motion.form
            variants={stagger(0.07)} initial="hidden" animate="show"
            className="mt-8 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.div variants={fadeUp}>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white mb-1.5">Full Name</label>
              <input
                name="name" type="text" required value={form.name} onChange={onChange}
                placeholder="Jane Smith"
                className="w-full px-4 py-3 rounded-xl border-2 border-white text-sm text-black placeholder-gray-300
                  focus:outline-none focus:border-accent focus:ring-1 focus:ring-white
                  0. transition-colors anta"
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white mb-1.5">Work Email</label>
              <input
                name="email" type="email" required value={form.email} onChange={onChange}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-white text-sm text-black placeholder-gray-300
                  focus:outline-none focus:border-accent focus:ring-1 focus:ring-white
                  0. transition-colors anta"
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white mb-1.5">
                Company <span className="normal-case font-light text-gray-300">(optional)</span>
              </label>
              <input
                name="company" type="text" value={form.company} onChange={onChange}
                placeholder="Your company name"
                className="w-full px-4 py-3 rounded-xl border-2 border-white text-sm text-black placeholder-gray-300
                  focus:outline-none focus:border-accent focus:ring-1 focus:ring-white
                  0. transition-colors anta"
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password" type={show ? "text" : "password"} required value={form.password} onChange={onChange}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 rounded-xl border-2 border-white text-sm text-black placeholder-gray-300
                    focus:outline-none focus:border-accent focus:ring-1 focus:ring-white
                    0. transition-colors anta pr-11"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            <motion.button
              variants={fadeUp} type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm text-white hover:opacity-90 transition-opacity mt-2"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Create Account <ArrowRight size={15} />
            </motion.button>

            <motion.p variants={fadeUp} className="text-xs text-gray-400 text-center font-light anta">
              By signing up, you agree to our{" "}
              <a href="#" className="underline hover:text-black transition-colors">Terms</a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-black transition-colors">Privacy Policy</a>.
            </motion.p>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
