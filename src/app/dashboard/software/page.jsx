import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const releases = [
  { version: "v4.2.1", name: "POS Offline Mode",       date: "Mar 22, 2026", status: "Live",       notes: "Improved offline sync reliability and faster checkout." },
  { version: "v4.2.0", name: "AI Agents Beta",          date: "Mar 10, 2026", status: "Live",       notes: "Initial release of AI workflow automation agents." },
  { version: "v4.1.5", name: "CRM Pipeline Update",     date: "Feb 28, 2026", status: "Live",       notes: "New Kanban view and bulk deal management." },
  { version: "v4.3.0", name: "Mobile App v2",           date: "Apr 8, 2026",  status: "Scheduled",  notes: "Full redesign with biometric auth and offline support." },
  { version: "v4.2.2", name: "HRM Payroll Module",      date: "Apr 2, 2026",  status: "In Progress",notes: "Multi-currency payroll with tax compliance." },
];

const statusIcon = {
  Live:        <CheckCircle size={14} className="text-emerald-600" />,
  Scheduled:   <Clock size={14} className="text-blue-500" />,
  "In Progress":<AlertCircle size={14} className="text-amber-500" />,
};
const statusStyle = {
  Live:         "bg-emerald-50 text-emerald-700 border-emerald-200",
  Scheduled:    "bg-blue-50 text-blue-600 border-blue-200",
  "In Progress":"bg-amber-50 text-amber-700 border-amber-200",
};

const health = [
  { name: "API Uptime",       value: 99.9 },
  { name: "POS Uptime",       value: 99.7 },
  { name: "Mobile CDN",       value: 100  },
  { name: "Database",         value: 99.8 },
];

export default function SoftwarePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-black odibee">Software</h1>
        <p className="text-sm text-gray-400 anta mt-0.5">Releases, deployments, and system health.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Current Version", value: "v4.2.1" },
          { label: "Releases YTD",    value: "12" },
          { label: "Uptime (30d)",    value: "99.9%" },
          { label: "Open Issues",     value: "3" },
        ].map((s) => (
          <Card key={s.label} className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <CardContent className="p-5">
              <p className="text-2xl anta text-black">{s.value}</p>
              <p className="text-xs text-gray-400 anta mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4">
        <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black">Release History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Version", "Name", "Date", "Status"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold tracking-widest uppercase text-gray-400 px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {releases.map((r) => (
                  <tr key={r.version} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-mono font-semibold text-black">{r.version}</td>
                    <td className="px-6 py-3.5">
                      <p className="text-sm font-semibold text-black">{r.name}</p>
                      <p className="text-xs text-gray-400 anta font-light">{r.notes}</p>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-gray-400 anta whitespace-nowrap">{r.date}</td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {statusIcon[r.status]}
                        <Badge variant="outline" className={`text-[10px] font-semibold ${statusStyle[r.status]}`}>{r.status}</Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {health.map((h) => (
              <div key={h.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-black">{h.name}</span>
                  <span className="text-xs font-semibold text-emerald-600">{h.value}%</span>
                </div>
                <Progress value={h.value} className="h-1.5 bg-gray-100" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}




