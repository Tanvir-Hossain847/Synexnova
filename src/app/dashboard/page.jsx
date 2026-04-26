import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users, MessageSquare, Star, TrendingUp,
  ArrowUpRight, ArrowDownRight, Package,
} from "lucide-react";

const stats = [
  { label: "Total Users",     value: "12,483", change: "+12%", up: true,  icon: Users },
  { label: "Active Services", value: "8",       change: "+2",   up: true,  icon: Package },
  { label: "Avg. Rating",     value: "4.8",     change: "+0.2", up: true,  icon: Star },
  { label: "Open Messages",   value: "24",      change: "-6",   up: false, icon: MessageSquare },
];

const recentUsers = [
  { name: "Sarah Mitchell", email: "sarah@vendra.com",   plan: "Pro",       avatar: "SM", joined: "2h ago" },
  { name: "James Okafor",   email: "james@stackly.io",   plan: "Enterprise",avatar: "JO", joined: "5h ago" },
  { name: "Priya Nair",     email: "priya@lumio.sg",     plan: "Starter",   avatar: "PN", joined: "1d ago" },
  { name: "Carlos Mendez",  email: "carlos@freshroute.com", plan: "Pro",    avatar: "CM", joined: "2d ago" },
];

const services = [
  { name: "Point of Sale",   users: 3240, pct: 82 },
  { name: "CRM",             users: 2810, pct: 71 },
  { name: "E-Commerce",      users: 2190, pct: 55 },
  { name: "Mobile Apps",     users: 1640, pct: 41 },
  { name: "HRM",             users: 1200, pct: 30 },
];

const planColor = { Pro: "bg-black text-white", Enterprise: "text-black", Starter: "text-gray-500" };

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl text-black odibee">Overview</h1>
        <p className="text-sm text-gray-400 anta mt-0.5">Here's what's happening across SynexNova today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Icon size={16} className="text-gray-500" />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-semibold ${s.up ? "text-emerald-600" : "text-red-500"}`}>
                    {s.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl anta text-black">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5 anta">{s.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
        {/* Recent users */}
        <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-black">Recent Users</CardTitle>
              <a href="/dashboard/users" className="text-xs font-medium text-gray-400 hover:text-black transition-colors">View all →</a>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[10px] font-semibold tracking-widest uppercase text-gray-400 px-6 py-2.5">User</th>
                  <th className="text-left text-[10px] font-semibold tracking-widest uppercase text-gray-400 px-6 py-2.5 hidden sm:table-cell">Plan</th>
                  <th className="text-left text-[10px] font-semibold tracking-widest uppercase text-gray-400 px-6 py-2.5">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.email} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback className="text-[10px] font-bold text-white" style={{ backgroundColor: "var(--color-accent)" }}>{u.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-black">{u.name}</p>
                          <p className="text-xs text-gray-400 anta">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 hidden sm:table-cell">
                      <Badge variant="outline" className={`text-[10px] font-semibold ${planColor[u.plan]}`}>{u.plan}</Badge>
                    </td>
                    <td className="px-6 py-3 text-xs text-gray-400 anta">{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Service usage */}
        <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black">Service Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {services.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-black">{s.name}</span>
                  <span className="text-xs text-gray-400 anta">{s.users.toLocaleString()} users</span>
                </div>
                <Progress value={s.pct} className="h-1.5 bg-gray-100" style={{ "--progress-color": "var(--color-accent)" }} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}




