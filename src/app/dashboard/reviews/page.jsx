"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Trash2, X, Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useModalScroll } from "@/lib/useModalScroll";
import Loader from "@/components/Loader";
import ImageUpload from "@/components/ImageUpload";

const API = "https://synexnova-backend.vercel.app/reviews";

const emptyForm = {
  user: { name: "", avatar: "", initials: "" },
  rating: 5, serviceTag: "", title: "", body: "", verified: false,
};

function Stars({ n }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className={i < n ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
      ))}
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [adding, setAdding]   = useState(false);
  const [form, setForm]       = useState(emptyForm);
  const [saving, setSaving]   = useState(false);
  useModalScroll(adding);

  async function fetchReviews() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setReviews(await res.json());
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchReviews(); }, []);

  async function handleAdd(e) {
    e.preventDefault(); setSaving(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: Number(form.rating), date: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setAdding(false); setForm(emptyForm);
      swal.success("Review added");
      fetchReviews();
    } catch (e) { swal.error("Failed to add review"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!await swal.confirmDelete("this review")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      swal.success("Review deleted");
      fetchReviews();
    } catch (e) { swal.error("Failed to delete review"); }
  }

  const avg = reviews.length
    ? (reviews.reduce((a, r) => a + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : "—";

  const inp = "w-full px-3 py-2 rounded-xl border-2 border-accent/50 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-accent transition-colors anta bg-white";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl text-black odibee">Reviews</h1>
          <p className="text-sm text-gray-400 anta mt-0.5">Client feedback across all services.</p>
        </div>
        <button onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity shrink-0"
          style={{ backgroundColor: "var(--color-accent)" }}>
          <Plus size={15} /> Add Review
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Average Rating",  value: avg !== "—" ? `${avg} / 5` : "—" },
          { label: "Total Reviews",   value: reviews.length },
          { label: "5-Star Reviews",  value: reviews.filter(r => r.rating === 5).length },
        ].map((s) => (
          <Card key={s.label} className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <CardContent className="p-5">
              <p className="text-2xl anta text-black">{s.value}</p>
              <p className="text-xs text-gray-400 anta mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* List */}
      {loading ? <Loader text="Loading reviews..." /> : error ? (
        <p className="text-sm text-red-500 anta text-center py-10">
          Failed to load: {error}
          <button onClick={fetchReviews} className="underline text-black ml-2">Retry</button>
        </p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-gray-400 anta text-center py-10">No reviews yet.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <Card key={r.id} className="border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100">
                      {r.user?.avatar ? (
                        <Image src={r.user.avatar} alt={r.user.name || ""} width={40} height={40} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "var(--color-accent)" }}>
                          {r.user?.initials || r.user?.name?.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Top row */}
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="text-sm font-bold text-black">{r.user?.name}</p>
                        {r.verified && (
                          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
                            <ShieldCheck size={11} /> Verified
                          </span>
                        )}
                        {r.serviceTag && (
                          <Badge variant="outline" className="text-[10px] font-semibold text-gray-500">{r.serviceTag}</Badge>
                        )}
                        <span className="text-xs text-gray-400 anta ml-auto">{formatDate(r.date)}</span>
                      </div>

                      <Stars n={r.rating || 0} />

                      <p className="text-sm font-semibold text-black mt-1.5">{r.title}</p>
                      <p className="text-sm text-gray-500 anta font-light mt-1 leading-relaxed">{r.body}</p>
                    </div>
                  </div>

                  <button onClick={() => handleDelete(r.id)}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors shrink-0 mt-0.5">
                    <Trash2 size={12} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 shrink-0">
              <h2 className="text-lg odibee text-black">Add Review</h2>
              <button onClick={() => { setAdding(false); setForm(emptyForm); }} className="text-gray-400 hover:text-black transition-colors">
                <X size={18} />
              </button>
            </div>

            <form id="review-form" onSubmit={handleAdd} className="overflow-y-auto overscroll-contain flex-1 px-7 py-5 space-y-4">
              {[
                { label: "Full Name *",      key: "name",     required: true,  placeholder: "Jane Smith",   nested: "user" },
                { label: "Initials",         key: "initials", placeholder: "JS",                            nested: "user" },
                { label: "Service Tag",      key: "serviceTag", placeholder: "Point of Sale" },
                { label: "Review Title *",   key: "title",    required: true,  placeholder: "Great experience" },
              ].map(({ label, key, required, placeholder, nested }) => (
                <div key={key}>
                  <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">{label}</label>
                  <input
                    required={required}
                    value={nested ? form[nested][key] : form[key]}
                    onChange={(e) => nested
                      ? setForm(p => ({ ...p, [nested]: { ...p[nested], [key]: e.target.value } }))
                      : setForm(p => ({ ...p, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    className={inp}
                  />
                </div>
              ))}

              <ImageUpload
                label="Avatar"
                value={form.user.avatar}
                onChange={url => setForm(p => ({ ...p, user: { ...p.user, avatar: url } }))}
                placeholder="https://... or upload photo"
              />

              <div>
                <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Rating</label>
                <select value={form.rating} onChange={(e) => setForm(p => ({ ...p, rating: Number(e.target.value) }))} className={inp}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n !== 1 ? "s" : ""}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Review Body *</label>
                <textarea required rows={4} value={form.body}
                  onChange={(e) => setForm(p => ({ ...p, body: e.target.value }))}
                  placeholder="Detailed review..." className={inp + " resize-none"} />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="verified" checked={form.verified}
                  onChange={(e) => setForm(p => ({ ...p, verified: e.target.checked }))}
                  className="w-4 h-4 accent-(--color-accent)" />
                <label htmlFor="verified" className="text-sm text-gray-600 anta">Mark as verified</label>
              </div>
            </form>

            <div className="flex gap-3 px-7 py-5 border-t border-gray-100 shrink-0">
              <button form="review-form" type="submit" disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--color-accent)" }}>
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add Review
              </button>
              <button type="button" onClick={() => { setAdding(false); setForm(emptyForm); }}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

