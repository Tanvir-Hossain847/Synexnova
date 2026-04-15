"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, X, Loader2, Zap } from "lucide-react";
import Loader from "@/components/Loader";

const API = "http://localhost:4000/features";

const inp = "w-full px-3 py-2 rounded-xl border-2 border-accent/50 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-accent transition-colors anta bg-white";

export default function FeaturesPage() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [adding, setAdding]     = useState(false);
  const [form, setForm]         = useState({ title: "", description: "" });
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(null);

  async function fetchFeatures() {
    setLoading(true);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error();
      setFeatures(await res.json());
    } catch {}
    finally { setLoading(false); }
  }

  useEffect(() => { fetchFeatures(); }, []);

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
      setForm({ title: "", description: "" });
      fetchFeatures();
    } catch { alert("Failed to add feature."); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this feature?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      fetchFeatures();
    } catch { alert("Failed to delete."); }
    finally { setDeleting(null); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl text-black odibee">Features</h1>
          <p className="text-sm text-gray-400 anta mt-0.5">
            Manage the "Why Choose Us" features shown on the homepage.
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity shrink-0"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          <Plus size={15} /> Add Feature
        </button>
      </div>

      {/* Stat */}
      <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] w-fit">
        <CardContent className="p-5">
          <p className="text-2xl anta text-black">{features.length}</p>
          <p className="text-xs text-gray-400 anta mt-0.5">Total Features</p>
        </CardContent>
      </Card>

      {/* Cards grid */}
      {loading ? (
        <Loader text="Loading features..." />
      ) : features.length === 0 ? (
        <p className="text-sm text-gray-400 anta text-center py-10">No features yet. Add one above.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card
              key={f._id}
              className="group relative border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden
                hover:-translate-y-0.5 hover:border-accent/30
                hover:shadow-[0_8px_32px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]
                transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent" />
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 group-hover:bg-accent/10 flex items-center justify-center shrink-0 transition-colors">
                    <Zap size={16} className="text-gray-500 group-hover:text-accent transition-colors" />
                  </div>
                  <button
                    onClick={() => handleDelete(f._id)}
                    disabled={deleting === f._id}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors shrink-0"
                  >
                    {deleting === f._id
                      ? <Loader2 size={11} className="animate-spin" />
                      : <Trash2 size={11} />}
                  </button>
                </div>
                <h3 className="text-sm font-bold text-black mt-3 mb-1.5 anta">{f.title}</h3>
                <p className="text-xs text-gray-400 anta font-light leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
              <h2 className="text-lg odibee text-black">Add Feature</h2>
              <button onClick={() => { setAdding(false); setForm({ title: "", description: "" }); }}
                className="text-gray-400 hover:text-black transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="px-7 py-5 space-y-4">
              <div>
                <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Launch-Ready Stack"
                  className={inp}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Describe this feature..."
                  className={inp + " resize-none"}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  Add Feature
                </button>
                <button
                  type="button"
                  onClick={() => { setAdding(false); setForm({ title: "", description: "" }); }}
                  className="flex-1 py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors"
                >
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
