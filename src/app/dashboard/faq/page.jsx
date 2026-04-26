"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, X, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import Loader from "@/components/Loader";
import { useModalScroll } from "@/lib/useModalScroll";
import { swal } from "@/lib/swal";

const API = "https://synexnova-backend.vercel.app/faq";

const inp = "w-full px-3 py-2 rounded-xl border-2 border-accent/50 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-accent transition-colors anta bg-white";

export default function FAQDashboardPage() {
  const [faqs, setFaqs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding]   = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [form, setForm]       = useState({ question: "", answer: "" });
  const [saving, setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(null);
  useModalScroll(adding);

  async function fetchFaqs() {
    setLoading(true);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error();
      setFaqs(await res.json());
    } catch {}
    finally { setLoading(false); }
  }

  useEffect(() => { fetchFaqs(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setAdding(false);
      setForm({ question: "", answer: "" });
      swal.success("FAQ added");
      fetchFaqs();
    } catch { swal.error("Failed to add FAQ"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!await swal.confirmDelete("this FAQ")) return;
    setDeleting(id);
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      swal.success("FAQ deleted");
      fetchFaqs();
    } catch { swal.error("Failed to delete FAQ"); }
    finally { setDeleting(null); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl text-black odibee">FAQ</h1>
          <p className="text-sm text-gray-400 anta mt-0.5">Manage frequently asked questions shown on the website.</p>
        </div>
        <button onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity shrink-0"
          style={{ backgroundColor: "var(--color-accent)" }}>
          <Plus size={15} /> Add FAQ
        </button>
      </div>

      {/* Stat */}
      <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] w-fit">
        <CardContent className="p-5">
          <p className="text-2xl anta text-black">{faqs.length}</p>
          <p className="text-xs text-gray-400 anta mt-0.5">Total FAQs</p>
        </CardContent>
      </Card>

      {/* FAQ list */}
      {loading ? (
        <Loader text="Loading FAQs..." />
      ) : faqs.length === 0 ? (
        <p className="text-sm text-gray-400 anta text-center py-10">No FAQs yet. Add one above.</p>
      ) : (
        <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <CardContent className="p-0">
            {faqs.map((faq, i) => {
              const id = faq._id || faq.id;
              const q = faq.question || faq.q;
              const a = faq.answer || faq.a;
              const isOpen = expanded === id;
              return (
                <div key={id} className="border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3 px-6 py-4">
                    <button onClick={() => setExpanded(isOpen ? null : id)}
                      className="flex-1 flex items-center justify-between text-left gap-4 group">
                      <span className="text-sm font-semibold text-black group-hover:text-gray-700 transition-colors">{q}</span>
                      {isOpen ? <ChevronUp size={15} className="text-gray-400 shrink-0" /> : <ChevronDown size={15} className="text-gray-400 shrink-0" />}
                    </button>
                    <button onClick={() => handleDelete(id)} disabled={deleting === id}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors shrink-0">
                      {deleting === id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="px-6 pb-4">
                      <p className="text-sm text-gray-400 anta font-light leading-relaxed">{a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Add Modal */}
      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
              <h2 className="text-lg odibee text-black">Add FAQ</h2>
              <button onClick={() => { setAdding(false); setForm({ question: "", answer: "" }); }}
                className="text-gray-400 hover:text-black transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="px-7 py-5 space-y-4">
              <div>
                <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Question *</label>
                <input required value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))}
                  placeholder="e.g. How quickly can we get started?" className={inp} />
              </div>
              <div>
                <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Answer *</label>
                <textarea required rows={5} value={form.answer} onChange={e => setForm(p => ({ ...p, answer: e.target.value }))}
                  placeholder="Provide a clear, helpful answer..." className={inp + " resize-none"} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "var(--color-accent)" }}>
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add FAQ
                </button>
                <button type="button" onClick={() => { setAdding(false); setForm({ question: "", answer: "" }); }}
                  className="flex-1 py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

