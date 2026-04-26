"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, Star, Users, Mail,
  MessageSquare, BarChart3, Settings, LogOut,
  Menu, X, Bell, ChevronDown, FileText, Zap, HelpCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const nav = [
  { label: "Overview",    href: "/dashboard",              icon: LayoutDashboard },
  { label: "Services",    href: "/dashboard/services",     icon: Package },
  { label: "Software",    href: "/dashboard/software",     icon: Package },
  { label: "Reviews",     href: "/dashboard/reviews",      icon: Star },
  { label: "Users",       href: "/dashboard/users",        icon: Users },
  { label: "Newsletter",  href: "/dashboard/newsletter",   icon: Mail },
  { label: "Messages",    href: "/dashboard/messages",     icon: MessageSquare, badge: 4 },
  { label: "Blog",        href: "/dashboard/blog",         icon: FileText },
  { label: "Features",    href: "/dashboard/features",     icon: Zap },
  { label: "FAQ",         href: "/dashboard/faq",          icon: HelpCircle },
  { label: "Stats",       href: "/dashboard/stats",        icon: BarChart3 },
];

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-60 bg-black flex flex-col
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link href="/" className="flex items-center">
            <span className="text-lg text-white">Synex</span>
            <span className="text-lg" style={{ color: "var(--color-accent)" }}>Nova</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {nav.map(({ label, href, icon: Icon, badge }) => {
            const active = path === href;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                  ${active
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
              >
                <Icon size={16} className={active ? "text-accent" : "text-white/40 group-hover:text-white/70"} style={active ? { color: "var(--color-accent)" } : {}} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-black" style={{ backgroundColor: "var(--color-accent)" }}>
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/10 space-y-0.5 shrink-0">
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <Settings size={16} />Settings
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
            onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/login"; }}>
            <LogOut size={16} />Log out
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
          <button className="md:hidden p-2 text-gray-500" onClick={() => setOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="hidden md:block">
            <p className="text-xs text-gray-400 font-medium">Welcome back,</p>
            <p className="text-sm font-bold text-black">Admin</p>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 text-gray-500 hover:text-black transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs font-bold text-white" style={{ backgroundColor: "var(--color-accent)" }}>AD</AvatarFallback>
              </Avatar>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}




