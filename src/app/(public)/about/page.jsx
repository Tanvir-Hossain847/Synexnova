import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Users, Globe, Rocket, Shield, Award, Heart } from "lucide-react";

const team = [
  { name: "Shakil Mahmud",  role: "CEO & Lead Senior Developer", avatar: "SM", bio: "Leads product engineering and company vision at SynexNova. Full-stack architect with a passion for building scalable, enterprise-grade technology for startups." },
  { name: "Bashire Oscer",  role: "Executive & VC",              avatar: "BO", bio: "Drives strategic growth and investor relations at SynexNova. Brings deep experience in venture capital and executive leadership across global markets." },
];

const values = [
  { icon: Rocket, title: "Move fast, build right",   desc: "Speed matters — but not at the cost of quality. We ship fast and we ship things that last." },
  { icon: Users,  title: "Founders first",            desc: "Every decision we make starts with one question: does this help our customers grow?" },
  { icon: Globe,  title: "Built for the world",       desc: "From Austin to Accra, our platform is designed to work everywhere your business takes you." },
  { icon: Shield, title: "Security by default",       desc: "Enterprise-grade security isn't a premium feature. It's the baseline for every account." },
  { icon: Heart,  title: "Genuine support",           desc: "Real people, real answers. We don't do ticket queues or chatbots for critical issues." },
  { icon: Award,  title: "Relentless improvement",    desc: "We ship updates every week. Your platform gets better while you sleep." },
];

const milestones = [
  { year: "2018", event: "SynexNova founded in Austin, TX with a single POS product." },
  { year: "2019", event: "Launched Inventory Management and E-Commerce modules." },
  { year: "2020", event: "Expanded to 10 countries. Crossed 100 clients." },
  { year: "2021", event: "Launched HRM and CRM. Series A funding secured." },
  { year: "2022", event: "Mobile Apps division launched. 500+ clients milestone." },
  { year: "2023", event: "IUT Solutions released. Expanded to 30+ countries." },
  { year: "2024", event: "AI Agents launched. Named Top 50 B2B SaaS by TechCrunch." },
  { year: "2025", event: "850+ startups served. Global team of 120+." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">

        {/* Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }} />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">Our Story</span>
            <h1 className="mt-3 text-5xl md:text-7xl odibee text-black">
              We build the tools<br />
              <span className="text-accent odibee">founders actually need.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-gray-400 anta font-light max-w-2xl mx-auto leading-relaxed">
              SynexNova started with a simple belief — that every startup deserves the same
              technology infrastructure as a Fortune 500 company, without the Fortune 500 price tag
              or the 18-month implementation timeline.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="/contact"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--color-accent)" }}>
                Work with us <ArrowRight size={14} />
              </a>
              <a href="#team"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-700 hover:border-black hover:text-black transition-colors">
                Meet the team
              </a>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-black py-24">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-500">Our Mission</span>
              <h2 className="mt-3 text-4xl md:text-5xl odibee text-white">
                Democratise enterprise<br />
                <span style={{ color: "var(--color-accent)" }}>technology.</span>
              </h2>
              <p className="mt-5 text-base text-gray-400 anta font-light leading-relaxed">
                The gap between what large enterprises can build and what startups can afford
                has always been unfair. We exist to close that gap — permanently.
              </p>
              <p className="mt-4 text-base text-gray-400 anta font-light leading-relaxed">
                Every product we build is designed to be deployed in hours, not months.
                Every pricing model is designed to grow with you, not against you.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "850+", label: "Startups Served" },
                { val: "30+",  label: "Countries" },
                { val: "8",    label: "Years Building" },
                { val: "120+", label: "Team Members" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-3xl anta text-white">{s.val}</p>
                  <p className="text-xs text-gray-500 anta mt-1 tracking-widest uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">What We Stand For</span>
              <h2 className="mt-3 text-4xl md:text-5xl odibee text-black">Our values.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="group rounded-2xl border border-gray-100 bg-white p-6
                    shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1
                    hover:border-accent/30 hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]
                    transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent" />
                    <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-accent/10 flex items-center justify-center mb-4 transition-colors">
                      <Icon size={18} className="text-gray-500 group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="text-base font-bold text-black mb-1.5">{v.title}</h3>
                    <p className="text-sm text-gray-400 anta font-light leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">How We Got Here</span>
              <h2 className="mt-3 text-4xl md:text-5xl odibee text-black">Our journey.</h2>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-[72px] top-0 bottom-0 w-px bg-gray-100" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="w-[72px] shrink-0 text-right">
                      <span className="text-sm font-bold text-black anta">{m.year}</span>
                    </div>
                    <div className="relative flex items-start gap-4 flex-1 pb-2">
                      <div className="w-3 h-3 rounded-full shrink-0 mt-1 border-2 border-white ring-2 z-10"
                        style={{ backgroundColor: "var(--color-accent)", ringColor: "var(--color-accent)" }} />
                      <p className="text-sm text-gray-500 anta font-light leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs odibee font-semibold tracking-widest uppercase text-gray-400">The People</span>
              <h2 className="mt-3 text-4xl md:text-5xl odibee text-black">Meet the team.</h2>
              <p className="mt-4 text-base text-gray-400 anta font-light max-w-xl mx-auto">
                A small, focused team of builders who've worked at the best companies in tech — and left to build something better.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {team.map((t) => (
                <div key={t.name} className="group rounded-2xl border border-gray-100 bg-white p-6
                  shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1
                  hover:border-accent/30 hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]
                  transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent" />
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white mb-4"
                    style={{ backgroundColor: "var(--color-accent)" }}>
                    {t.avatar}
                  </div>
                  <p className="text-base font-bold text-black">{t.name}</p>
                  <p className="text-xs font-semibold tracking-wide uppercase text-gray-400 anta mt-0.5 mb-3">{t.role}</p>
                  <p className="text-sm text-gray-400 anta font-light leading-relaxed">{t.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-accent border border-white/50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="text-xs odibee font-semibold tracking-widest uppercase text-white/70">Join Us</span>
            <h2 className="mt-3 text-4xl md:text-5xl odibee text-white">
              Ready to build with<br />SynexNova?
            </h2>
            <p className="mt-4 text-base text-white/80 anta font-light leading-relaxed">
              Whether you're pre-launch or scaling globally — we're ready when you are.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="/register"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-white hover:opacity-90 transition-opacity"
                style={{ color: "var(--color-accent)" }}>
                Get Started Free <ArrowRight size={14} />
              </a>
              <a href="/contact"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border-2 border-white text-white hover:bg-white/10 transition-colors">
                Talk to Sales
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
