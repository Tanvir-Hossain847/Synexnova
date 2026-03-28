import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const users = [
  { name: "Sarah Mitchell", email: "sarah@vendra.com",      avatar: "SM", plan: "Pro",        country: "USA",       joined: "Jan 12, 2026", status: "Active" },
  { name: "James Okafor",   email: "james@stackly.io",      avatar: "JO", plan: "Enterprise", country: "Nigeria",   joined: "Feb 3, 2026",  status: "Active" },
  { name: "Priya Nair",     email: "priya@lumio.sg",        avatar: "PN", plan: "Starter",    country: "Singapore", joined: "Feb 18, 2026", status: "Active" },
  { name: "Carlos Mendez",  email: "carlos@freshroute.com", avatar: "CM", plan: "Pro",        country: "USA",       joined: "Mar 1, 2026",  status: "Active" },
  { name: "Aisha Khalid",   email: "aisha@novabridge.ae",   avatar: "AK", plan: "Enterprise", country: "UAE",       joined: "Mar 5, 2026",  status: "Active" },
  { name: "Liam Torres",    email: "liam@shelfsync.com",    avatar: "LT", plan: "Starter",    country: "USA",       joined: "Mar 10, 2026", status: "Inactive" },
  { name: "Mei Zhang",      email: "mei@orbis.sg",          avatar: "MZ", plan: "Pro",        country: "Singapore", joined: "Mar 14, 2026", status: "Active" },
  { name: "David Osei",     email: "david@paybridge.gh",    avatar: "DO", plan: "Enterprise", country: "Ghana",     joined: "Mar 20, 2026", status: "Active" },
];

const planStyle = {
  Pro:        "bg-black text-white border-black",
  Enterprise: "bg-gray-900 text-white border-gray-900",
  Starter:    "text-gray-500 border-gray-200",
};
const statusStyle = {
  Active:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  Inactive: "bg-gray-50 text-gray-500 border-gray-200",
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-black odibee">Users</h1>
        <p className="text-sm text-gray-400 anta mt-0.5">All registered accounts on the platform.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Users",    value: "12,483" },
          { label: "Active",         value: "11,204" },
          { label: "Enterprise",     value: "342" },
          { label: "New This Month", value: "1,280" },
        ].map((s) => (
          <Card key={s.label} className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <CardContent className="p-5">
              <p className="text-2xl anta text-black">{s.value}</p>
              <p className="text-xs text-gray-400 anta mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["User", "Plan", "Country", "Joined", "Status"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold tracking-widest uppercase text-gray-400 px-6 py-3 hidden sm:table-cell first:table-cell last:table-cell">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 shrink-0">
                        <AvatarFallback className="text-[10px] font-bold text-white" style={{ backgroundColor: "var(--color-accent)" }}>{u.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-black">{u.name}</p>
                        <p className="text-xs text-gray-400 anta">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 hidden sm:table-cell">
                    <Badge variant="outline" className={`text-[10px] font-semibold ${planStyle[u.plan]}`}>{u.plan}</Badge>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-gray-500 anta hidden sm:table-cell">{u.country}</td>
                  <td className="px-6 py-3.5 text-xs text-gray-400 anta hidden sm:table-cell">{u.joined}</td>
                  <td className="px-6 py-3.5">
                    <Badge variant="outline" className={`text-[10px] font-semibold ${statusStyle[u.status]}`}>{u.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}



