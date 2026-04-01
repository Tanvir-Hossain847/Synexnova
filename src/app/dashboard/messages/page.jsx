"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, Loader2 } from "lucide-react";
import Loader from "@/components/Loader";

const API = "https://synexnova-backend.vercel.app/messages";

function timeAgo(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function initials(name = "") {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [deleting, setDeleting] = useState(null);

  async function fetchMessages() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // Sort newest first
      setMessages(data.sort((a, b) => new Date(b.sentAt || b.createdAt) - new Date(a.sentAt || a.createdAt)));
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchMessages(); }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this message?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      fetchMessages();
    } catch (e) { alert("Failed: " + e.message); }
    finally { setDeleting(null); }
  }

  const unread = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-black odibee">Messages</h1>
          <p className="text-sm text-gray-400 anta mt-0.5">
            {loading ? "Loading..." : `${unread} unread message${unread !== 1 ? "s" : ""}.`}
          </p>
        </div>
        {unread > 0 && (
          <Badge className="text-xs font-bold text-black" style={{ backgroundColor: "var(--color-accent)" }}>
            {unread} New
          </Badge>
        )}
      </div>

      {loading ? (
        <Loader text="Loading messages..." />
      ) : error ? (
        <p className="text-sm text-red-500 anta text-center py-10">
          Failed to load: {error}
          <button onClick={fetchMessages} className="underline text-black ml-2">Retry</button>
        </p>
      ) : messages.length === 0 ? (
        <p className="text-sm text-gray-400 anta text-center py-10">No messages yet.</p>
      ) : (
        <div className="space-y-2">
          {messages.map((m) => (
            <Card
              key={m.id}
              className={`border-gray-100 transition-all duration-200
                hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] hover:-translate-y-0.5
                ${!m.read ? "shadow-[0_2px_12px_rgba(0,0,0,0.06)]" : "shadow-none opacity-70"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-9 h-9 shrink-0 mt-0.5">
                    <AvatarFallback className="text-[10px] font-bold text-white" style={{ backgroundColor: "var(--color-accent)" }}>
                      {initials(m.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-black">{m.name}</span>
                        {m.company && <span className="text-xs text-gray-400 anta">{m.company}</span>}
                        {m.service && (
                          <Badge variant="outline" className="text-[10px] font-semibold text-gray-500">{m.service}</Badge>
                        )}
                        {m.email && <span className="text-xs text-gray-400 anta">{m.email}</span>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {!m.read && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />}
                        <span className="text-xs text-gray-400 anta">{timeAgo(m.sentAt || m.createdAt)}</span>
                        <button
                          onClick={() => handleDelete(m.id)}
                          disabled={deleting === m.id}
                          className="w-6 h-6 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors"
                        >
                          {deleting === m.id
                            ? <Loader2 size={10} className="animate-spin" />
                            : <Trash2 size={10} />}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-black">{m.message?.slice(0, 80)}{m.message?.length > 80 ? "..." : ""}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
