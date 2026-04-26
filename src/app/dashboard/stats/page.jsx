import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, DollarSign, Globe, ArrowUpRight } from "lucide-react";

const monthly = [
  { month: "Oct", revenue: 68, users: 42 },
  { month: "Nov", revenue: 74, users: 51 },
  { month: "Dec", revenue: 82, users: 58 },
  { month: "Jan", revenue: 71, users: 63 },
  { month: "Feb", revenue: 88, users: 72 },
  { month: "Mar", revenue: 100, users: 88 },
];

const regions = [
  { name: "North America", pct: 38, revenue: "$83,600" },
  { name: "Europe",        pct: 24, revenue: "$52,800" },
  { name: "Southeast Asia",pct: 18, revenue: "$39,600" },
  { name: "Middle East",   pct: 12, revenue: "$26,400" },
  { name: "South Asia",    pct: 5,  revenue: "$11,000" },
  { name: "Latin America", pct: 3,  revenue: "$6,600"  },
];

const kpis = [
  { label: "Monthly Revenue",  value: "$220K",  change: "+18%", icon: DollarSign },
  { label: "Active Users",     value: "11,204", change: "+12%", icon: Users },
  { label: "Countries",        value: "30+",    change: "+4",   icon: Globe },
  { label: "MoM Growth",       value: "18%",    change: "+3pp", icon: TrendingUp },
];

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-black odibee">Stats</h1>
        <p className="text-sm text-gray-400 anta mt-0.5">Platform performance and growth metrics.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(({ label, value, change, icon: Icon }) => (
          <Card key={label} className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                  <Icon size={16} className="text-gray-500" />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight size={13} />{change}
                </span>
              </div>
              <p className="text-2xl anta text-black">{value}</p>
              <p className="text-xs text-gray-400 anta mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart — revenue */}
        <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black">Revenue (last 6 months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-36">
              {monthly.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md transition-all duration-500"
                    style={{ height: `${m.revenue}%`, backgroundColor: "var(--color-accent)", opacity: m.month === "Mar" ? 1 : 0.4 }}
                  />
                  <span className="text-[10px] text-gray-400 anta">{m.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional breakdown */}
        <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black">Revenue by Region</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {regions.map((r) => (
              <div key={r.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-black">{r.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 anta">{r.revenue}</span>
                    <span className="text-xs font-semibold text-black w-8 text-right">{r.pct}%</span>
                  </div>
                </div>
                <Progress value={r.pct} className="h-1.5 bg-gray-100" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}




