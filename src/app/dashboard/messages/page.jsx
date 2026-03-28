import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";

const messages = [
  { name: "Sarah Mitchell", company: "Vendra Commerce", avatar: "SM", subject: "POS integration question", preview: "Hi, we're trying to connect our existing hardware to the POS system...", time: "10m ago",  read: false, service: "POS" },
  { name: "James Okafor",   company: "Stackly HQ",      avatar: "JO", subject: "CRM data export",          preview: "Is there a way to bulk export our CRM contacts to CSV format?",       time: "1h ago",  read: false, service: "CRM" },
  { name: "Priya Nair",     company: "Lumio Health",    avatar: "PN", subject: "App store submission",      preview: "The app was rejected by Apple — can you help us resolve the issue?",  time: "3h ago",  read: false, service: "Mobile" },
  { name: "Carlos Mendez",  company: "FreshRoute",      avatar: "CM", subject: "Warehouse sync issue",      preview: "One of our warehouses stopped syncing yesterday around 3pm EST...",    time: "5h ago",  read: false, service: "IUT" },
  { name: "Aisha Khalid",   company: "NovaBridge",      avatar: "AK", subject: "Onboarding new client",     preview: "We have a new portfolio company that wants to get started with...",    time: "1d ago",  read: true,  service: "CRM" },
  { name: "Liam Torres",    company: "ShelfSync",        avatar: "LT", subject: "Billing question",          preview: "I noticed a discrepancy in this month's invoice...",                  time: "2d ago",  read: true,  service: "General" },
];

export default function MessagesPage() {
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-black odibee">Messages</h1>
          <p className="text-sm text-gray-400 anta mt-0.5">{unread} unread messages.</p>
        </div>
        <Badge className="text-xs font-bold text-black" style={{ backgroundColor: "var(--color-accent)" }}>
          {unread} New
        </Badge>
      </div>

      <div className="space-y-2">
        {messages.map((m) => (
          <Card
            key={m.subject}
            className={`border-gray-100 cursor-pointer transition-all duration-200
              hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] hover:-translate-y-0.5
              ${!m.read ? "shadow-[0_2px_12px_rgba(0,0,0,0.06)]" : "shadow-none opacity-70"}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-9 h-9 shrink-0 mt-0.5">
                  <AvatarFallback className="text-[10px] font-bold text-white" style={{ backgroundColor: "var(--color-accent)" }}>{m.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-black">{m.name}</span>
                      <span className="text-xs text-gray-400 anta">{m.company}</span>
                      <Badge variant="outline" className="text-[10px] font-semibold text-gray-500">{m.service}</Badge>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!m.read && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "var(--color-accent)" }} />}
                      <span className="text-xs text-gray-400 anta">{m.time}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-black">{m.subject}</p>
                  <p className="text-xs text-gray-400 anta font-light truncate mt-0.5">{m.preview}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}



