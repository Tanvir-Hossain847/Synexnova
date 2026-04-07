"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "#products" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? "bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <span className="text-xl font-black tracking-tight text-black">Synex</span>
          <span className="text-xl font-black tracking-tight" style={{ color: "var(--color-accent)" }}>Nova</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
