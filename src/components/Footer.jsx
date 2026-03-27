import { ArrowRight, Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram } from "lucide-react";

const links = {
  Products: [
    "Point of Sale",
    "Inventory Management",
    "E-Commerce",
    "HRM",
    "CRM",
    "Mobile Apps",
    "IUT Solutions",
    "AI Agents",
  ],
  Company: ["About Us", "Careers", "Blog", "Press", "Partners"],
  Support: ["Documentation", "API Reference", "Status", "Contact Support", "Book a Demo"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
};

const socials = [
  { icon: Twitter,  href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github,   href: "#", label: "GitHub" },
  { icon: Instagram,href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-accent text-white">
      {/* CTA band */}
      <div className="border-b border-white/40">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-lg font-semibold tracking-widest odibee uppercase text-primary mb-2">
              Ready to launch?
            </p>
            <h2 className="text-3xl md:text-6xl odibee">
              Build your business<br />
              <span style={{ color: "var(--color-accent)" }}>with SynexNova.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-accent transition-opacity hover:opacity-90 bg-white"
            >
              Get Started <ArrowRight size={14} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white border border-white/20 hover:border-white/50 transition-colors"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12">
          {/* Brand col */}
          <div className="space-y-5">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-black tracking-tight text-white">Synex</span>
              <span className="text-2xl font-black tracking-tight" style={{ color: "var(--color-accent)" }}>Nova</span>
            </a>
            <p className="text-sm text-white font-light leading-relaxed max-w-xs">
              A USA-based technology company delivering end-to-end business solutions — built to launch fast and scale globally.
            </p>
            {/* Contact */}
            <div className="space-y-2.5">
              <a href="mailto:hello@synexnova.com" className="flex items-center gap-2.5 text-sm text-white transition-colors">
                <Mail size={13} className="shrink-0" />
                hello@synexnova.com
              </a>
              <a href="tel:+18005551234" className="flex items-center gap-2.5 text-sm text-white transition-colors">
                <Phone size={13} className="shrink-0" />
                +1 (800) 555-1234
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white">
                <MapPin size={13} className="shrink-0 mt-0.5" />
                <span>123 Innovation Drive,<br />Austin, TX 78701, USA</span>
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-white/40 transition-all duration-200"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p className="text-xs font-semibold tracking-widest uppercase text-white mb-4">
                {heading}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white">
            © {new Date().getFullYear()} SynexNova Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-xs text-gray-600 hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
