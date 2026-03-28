import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Users, TrendingUp, MousePointer } from "lucide-react";

const campaigns = [
  { name: "March Product Update",   sent: 8420,  opened: 4210, clicked: 1840, status: "Sent",    date: "Mar 15, 2026" },
  { name: "AI Agents Launch",       sent: 9100,  opened: 5460, clicked: 2730, status: "Sent",    date: "Mar 8, 2026"  },
  { name: "Startup Onboarding Tips",sent: 7800,  opened: 3900, clicked: 1560, status: "Sent",    date: "Feb 28, 2026" },
  { name: "April Newsletter",       sent: 0,     opened: 0,    clicked: 0,    status: "Draft",   date: "Apr 1, 2026"  },
  { name: "Q2 Feature Preview",     sent: 0,     opened: 0,    clicked: 0,    status: "Scheduled",date: "Apr 5, 2026" },
];

const statusStyle = {
  Sent:      "bg-emerald-50 text-emerald-700 border-emerald-200",
  Draft:     "bg-gray-50 text-gray-500 border-gray-200",
  Scheduled: "bg-blue-50 text-blue-600 border-blue-200",
};

export default function NewsletterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-black odibee">Newsletter</h1>
        <p className="text-sm text-gray-400 anta mt-0.5">Email campaigns and subscriber stats.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Subscribers",  value: "9,840",  icon: Users },
          { label: "Campaigns Sent",value: "3",     icon: Mail },
          { label: "Avg Open Rate", value: "51%",   icon: TrendingUp },
          { label: "Avg CTR",       value: "22%",   icon: MousePointer },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <CardContent className="p-5">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mb-3">
                <Icon size={15} className="text-gray-500" />
              </div>
              <p className="text-2xl anta text-black">{value}</p>
              <p className="text-xs text-gray-400 anta mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-black">Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Campaign", "Sent", "Opened", "Clicked", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold tracking-widest uppercase text-gray-400 px-6 py-3 hidden sm:table-cell first:table-cell last:table-cell">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5 text-sm font-semibold text-black">{c.name}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-500 anta hidden sm:table-cell">{c.sent > 0 ? c.sent.toLocaleString() : "—"}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-500 anta hidden sm:table-cell">
                    {c.opened > 0 ? `${c.opened.toLocaleString()} (${Math.round(c.opened/c.sent*100)}%)` : "—"}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-gray-500 anta hidden sm:table-cell">
                    {c.clicked > 0 ? `${c.clicked.toLocaleString()} (${Math.round(c.clicked/c.sent*100)}%)` : "—"}
                  </td>
                  <td className="px-6 py-3.5 hidden sm:table-cell">
                    <Badge variant="outline" className={`text-[10px] font-semibold ${statusStyle[c.status]}`}>{c.status}</Badge>
                  </td>
                  <td className="px-6 py-3.5 text-xs text-gray-400 anta">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}



