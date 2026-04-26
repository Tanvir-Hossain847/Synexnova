"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Mail, Users, Loader2 } from "lucide-react";
import Loader from "@/components/Loader";
import { swal } from "@/lib/swal";

const API = "https://synexnova-backend.vercel.app/emails";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function NewsletterPage() {
  const [emails, setEmails]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [deleting, setDeleting] = useState(null);

  async function fetchEmails() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setEmails(await res.json());
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchEmails(); }, []);

  async function handleDelete(id) {
    if (!await swal.confirmDelete("this subscriber")) return;
    setDeleting(id);
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      swal.success("Subscriber removed");
      fetchEmails();
    } catch (e) { swal.error("Failed to remove subscriber"); }
    finally { setDeleting(null); }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-black odibee">Newsletter</h1>
        <p className="text-sm text-gray-400 anta mt-0.5">All email subscribers from the website.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              <Users size={16} className="text-gray-500" />
            </div>
            <div>
              <p className="text-2xl anta text-black">{emails.length}</p>
              <p className="text-xs text-gray-400 anta mt-0.5">Total Subscribers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              <Mail size={16} className="text-gray-500" />
            </div>
            <div>
              <p className="text-2xl anta text-black">
                {emails.filter(e => {
                  if (!e.subscribedAt) return false;
                  const d = new Date(e.subscribedAt);
                  const now = new Date();
                  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                }).length}
              </p>
              <p className="text-xs text-gray-400 anta mt-0.5">New This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-black odibee">Subscribers</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <Loader text="Loading subscribers..." />
          ) : error ? (
            <p className="text-sm text-red-500 anta text-center py-10">
              Failed to load: {error}
              <button onClick={fetchEmails} className="underline text-black ml-2">Retry</button>
            </p>
          ) : emails.length === 0 ? (
            <p className="text-sm text-gray-400 anta text-center py-10">No subscribers yet.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Email", "Subscribed", ""].map((h, i) => (
                    <th key={i} className="text-left text-[10px] font-semibold tracking-widest uppercase text-gray-400 px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {emails.map((e) => (
                  <tr key={e.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)" }}>
                          <Mail size={12} style={{ color: "var(--color-accent)" }} />
                        </div>
                        <span className="text-sm text-black anta">{e.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-gray-400 anta">
                      {formatDate(e.subscribedAt || e.createdAt)}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => handleDelete(e.id)}
                        disabled={deleting === e.id}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors ml-auto"
                      >
                        {deleting === e.id
                          ? <Loader2 size={11} className="animate-spin" />
                          : <Trash2 size={11} />
                        }
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

