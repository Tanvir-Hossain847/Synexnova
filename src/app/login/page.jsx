"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Cubes from "@/components/Cubes";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow]     = useState(false);
  const [form, setForm]     = useState({ email: "", password: "" });
  const [error, setError]   = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Invalid credentials"); return; }
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left — Cubes panel */}
      <div className="relative hidden md:flex items-center justify-center bg-accent overflow-hidden">
        {/* Cubes fill the panel */}
        <div className="absolute inset-0">
          <Cubes
            gridSize={10}
            maxAngle={40}
            radius={3}
            borderStyle="2px solid #ffff"
            faceColor="#59839d"
            rippleColor="#ffff"
            rippleSpeed={2}
            autoAnimate
            rippleOnClick
          />
        </div>

        {/* Overlay content */}
        <div className="relative z-10 flex flex-col justify-between h-full w-full p-12 pointer-events-none">
          {/* Logo */}
          <a href="/" className="flex items-center pointer-events-auto">
            <span className="text-4xl odibee text-white">Synex</span>
            <span className="text-4xl odibee text-white">Nova</span>
          </a>

          {/* Quote */}
          <div className="bg-white/10 backdrop-blur-xs p-2 border-2 border-white rounded-2xl">
            <p className="text-white/80 text-xl font-light leading-relaxed max-w-sm odibee">
              "One platform. Every solution your business needs to launch and scale."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: "var(--color-accent)" }}>
                SM
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sarah Mitchell</p>
                <p className="text-xs text-white/50 anta">Co-Founder, Vendra Commerce</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-12 bg-white">
        <a href="/" className="flex items-center mb-10 md:hidden">
          <span className="text-xl font-black tracking-tight text-black">Synex</span>
          <span className="text-xl font-black tracking-tight" style={{ color: "var(--color-accent)" }}>Nova</span>
        </a>

        <motion.div
          className="max-w-sm w-full mx-auto"
          variants={stagger(0.08)} initial="hidden" animate="show"
        >
          <motion.span variants={fadeUp} className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">
            Welcome back
          </motion.span>
          <motion.h1 variants={fadeUp} className="mt-2 text-3xl md:text-4xl text-black odibee">
            Sign in to your<br />
            <span className="text-accent odibee">account.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-3 text-sm text-gray-400 anta font-light">
            Don't have an account?{" "}
            <a href="/register" className="font-medium text-black hover:underline transition-colors">
              Create one free
            </a>
          </motion.p>

          <motion.form
            variants={stagger(0.07)} initial="hidden" animate="show"
            className="mt-8 space-y-4"
            onSubmit={handleSubmit}
          >
            <motion.div variants={fadeUp}>
              <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Email</label>
              <input
                name="email" type="email" required value={form.email} onChange={onChange}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-accent/50 text-sm text-black placeholder-gray-300
                  focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors anta"
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold tracking-widest uppercase text-gray-400">Password</label>
                <a href="#" className="text-xs font-medium text-gray-500 hover:text-black transition-colors anta">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  name="password" type={show ? "text" : "password"} required value={form.password} onChange={onChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border-2 border-accent/50 text-sm text-black placeholder-gray-300
                    focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors anta pr-11"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            <motion.button
              variants={fadeUp} type="submit"
              disabled={loading}
              className="w-full anta flex items-center justify-center gap-2 py-3.5 rounded-full text-sm text-white hover:opacity-90 transition-opacity mt-2 disabled:opacity-60"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {loading ? "Signing in..." : <>Sign In <ArrowRight size={15} /></>}
            </motion.button>

            {error && (
              <motion.p variants={fadeUp} className="text-xs text-red-500 text-center anta">{error}</motion.p>
            )}

            <motion.div variants={fadeUp} className="relative flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 anta">or continue with</span>
              <div className="flex-1 h-px bg-gray-100" />
            </motion.div>

            <motion.button
              variants={fadeUp} type="button"
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-accent/50 text-sm font-medium text-gray-700
                hover:border-gray-400 hover:bg-gray-50 transition-all anta"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
