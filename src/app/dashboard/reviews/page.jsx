import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const reviews = [
  { name: "Sarah Mitchell", company: "Vendra Commerce", avatar: "SM", rating: 5, service: "POS", comment: "Incredible platform. We were live in 48 hours and haven't looked back.", date: "Mar 20, 2026" },
  { name: "James Okafor",   company: "Stackly HQ",      avatar: "JO", rating: 5, service: "CRM", comment: "Best CRM we've used. Multi-country support out of the box.", date: "Mar 18, 2026" },
  { name: "Priya Nair",     company: "Lumio Health",    avatar: "PN", rating: 4, service: "Mobile", comment: "App quality was excellent. Delivery was slightly delayed but worth it.", date: "Mar 15, 2026" },
  { name: "Carlos Mendez",  company: "FreshRoute",      avatar: "CM", rating: 5, service: "IUT", comment: "Unified all 8 warehouses. Real-time visibility is a game changer.", date: "Mar 12, 2026" },
  { name: "Aisha Khalid",   company: "NovaBridge",      avatar: "AK", rating: 5, service: "HRM", comment: "Recommended to 20+ portfolio companies. Consistently excellent.", date: "Mar 10, 2026" },
];

function Stars({ n }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className={i < n ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-black odibee">Reviews</h1>
        <p className="text-sm text-gray-400 anta mt-0.5">Client feedback across all services.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Average Rating", value: avg + " / 5" },
          { label: "Total Reviews",  value: reviews.length },
          { label: "5-Star Reviews", value: reviews.filter(r => r.rating === 5).length },
        ].map((s) => (
          <Card key={s.label} className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <CardContent className="p-5">
              <p className="text-2xl anta text-black">{s.value}</p>
              <p className="text-xs text-gray-400 anta mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {reviews.map((r) => (
          <Card key={r.name} className="border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarFallback className="text-xs font-bold text-white" style={{ backgroundColor: "var(--color-accent)" }}>{r.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-black">{r.name}</p>
                      <span className="text-xs text-gray-400 anta">{r.company}</span>
                      <Badge variant="outline" className="text-[10px] font-semibold text-gray-500">{r.service}</Badge>
                    </div>
                    <Stars n={r.rating} />
                    <p className="text-sm text-gray-500 anta font-light mt-1.5 leading-relaxed">"{r.comment}"</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 anta shrink-0">{r.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}



