"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus, Trash2, Pencil, Check, X, Loader2, Package,
} from "lucide-react";
import Loader from "@/components/Loader";

const API = "https://synexnova-backend.vercel.app/services";

const STATUS_OPTIONS = [null, "Active", "Beta", "Inactive", "Deprecated"];

const statusStyle = {
  Active:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  Beta:       "bg-amber-50 text-amber-700 border-amber-200",
  Inactive:   "bg-gray-50 text-gray-500 border-gray-200",
  Deprecated: "bg-red-50 text-red-600 border-red-200",
  null:       "bg-gray-50 text-gray-400 border-gray-200",
};

// shared input class
const inp = "w-full px-3 py-2 rounded-xl border-2 border-accent/50 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors anta";

// Section wrapper
function Section({ title, children }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3 border-b border-gray-100 pb-1.5">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// Label + input wrapper
function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

// Dynamic string array field
function ArrayField({ items, placeholder, onChange }) {
  const update = (i, val) => { const a = [...items]; a[i] = val; onChange(a); };
  const add    = () => onChange([...items, ""]);
  const remove = (i) => onChange(items.filter((_, j) => j !== i));
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input value={item} onChange={(e) => update(i, e.target.value)} placeholder={placeholder} className={inp + " flex-1"} />
          <button type="button" onClick={() => remove(i)} className="text-gray-400 hover:text-red-500 transition-colors shrink-0">
            <X size={14} />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-black transition-colors">
        <Plus size={12} /> Add item
      </button>
    </div>
  );
}

const emptyForm = {
  slug: "", icon: "", title: "", shortDescription: "", tag: "", category: "",
  highlight: false, status: null,
  image: { hero: "", thumbnail: "", alt: "" },
  description: "",
  keyFeatures: [""],
  useCases: [""],
  integrations: [""],
  pricing: { model: "", startingAt: "" },
  stats: [{ value: "", label: "" }],
};

export default function ServicesPage() {
  const [services, setServices]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  // inline edit state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm]   = useState({});

  // add modal state
  const [adding, setAdding]       = useState(false);
  const [addForm, setAddForm]     = useState(emptyForm);
  const [saving, setSaving]       = useState(false);

  // ── Fetch ──────────────────────────────────────────────
  async function fetchServices() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setServices(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchServices(); }, []);

  // ── Add ───────────────────────────────────────────────
  async function handleAdd(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...addForm, status: addForm.status ?? null }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setAdding(false);
      setAddForm(emptyForm);
      fetchServices();
    } catch (e) {
      alert("Failed to add service: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  // ── Edit ──────────────────────────────────────────────
  function startEdit(svc) {
    setEditingId(svc.id);
    setEditForm({ ...svc });
  }

  async function saveEdit(id) {
    setSaving(true);
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setEditingId(null);
      fetchServices();
    } catch (e) {
      alert("Failed to update: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  // ── Status-only update ────────────────────────────────
  async function updateStatus(id, status) {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      fetchServices();
    } catch (e) {
      alert("Failed to update status: " + e.message);
    }
  }

  // ── Delete ────────────────────────────────────────────
  async function handleDelete(id) {
    if (!confirm("Remove this service?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      fetchServices();
    } catch (e) {
      alert("Failed to delete: " + e.message);
    }
  }

  // ── Derived stats ─────────────────────────────────────
  const total    = services.length;
  const active   = services.filter((s) => s.status === "Active").length;
  const beta     = services.filter((s) => s.status === "Beta").length;
  const noStatus = services.filter((s) => !s.status).length;
  // ── Render ────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl text-black odibee">Services</h1>
          <p className="text-sm text-gray-400 anta mt-0.5">Manage all services. Status starts as unset until assigned.</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity shrink-0"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          <Plus size={15} /> Add Service
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Services", value: total },
          { label: "Active",         value: active },
          { label: "Beta",           value: beta },
          { label: "Unset Status",   value: noStatus },
        ].map((s) => (
          <Card key={s.label} className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <CardContent className="p-5">
              <p className="text-2xl anta text-black">{s.value}</p>
              <p className="text-xs text-gray-400 anta mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <CardContent className="p-0">
          {loading ? (
            <Loader text="Loading services..." />
          ) : error ? (
            <div className="py-16 text-center text-sm text-red-500 anta">
              Failed to load: {error}
              <button onClick={fetchServices} className="ml-3 underline text-black">Retry</button>
            </div>
          ) : services.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-400 anta">
              No services yet. Add one above.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Service", "Category", "Tag", "Stats", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold tracking-widest uppercase text-gray-400 px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((svc) => {
                  const isEditing = editingId === svc.id;
                  return (
                    <tr key={svc.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors">

                      {/* Service name */}
                      <td className="px-6 py-3.5">
                        {isEditing ? (
                          <input
                            value={editForm.title ?? ""}
                            onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                            className="w-full px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-accent anta"
                          />
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                              <Package size={14} className="text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-black">{svc.title || svc.name || "—"}</p>
                              <p className="text-xs text-gray-400 anta">{svc.slug || ""}</p>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-3.5 text-sm text-gray-500 anta">
                        {isEditing ? (
                          <input
                            value={editForm.category ?? ""}
                            onChange={(e) => setEditForm((p) => ({ ...p, category: e.target.value }))}
                            className="w-28 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-accent anta"
                          />
                        ) : (
                          svc.category || "—"
                        )}
                      </td>

                      {/* Tag */}
                      <td className="px-6 py-3.5">
                        {isEditing ? (
                          <input
                            value={editForm.tag ?? ""}
                            onChange={(e) => setEditForm((p) => ({ ...p, tag: e.target.value }))}
                            className="w-24 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-accent anta"
                          />
                        ) : svc.tag ? (
                          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">
                            {svc.tag}
                          </span>
                        ) : "—"}
                      </td>

                      {/* Stats — show first stat value+label */}
                      <td className="px-6 py-3.5 text-sm text-gray-500 anta">
                        {svc.stats && svc.stats.length > 0 ? (
                          <div className="flex flex-col gap-0.5">
                            {svc.stats.slice(0, 2).map((st, i) => (
                              <span key={i} className="text-xs">
                                <span className="font-semibold text-black">{st.value}</span>
                                <span className="text-gray-400"> {st.label}</span>
                              </span>
                            ))}
                          </div>
                        ) : "—"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-3.5">
                        {isEditing ? (
                          <select
                            value={editForm.status ?? ""}
                            onChange={(e) => setEditForm((p) => ({ ...p, status: e.target.value || null }))}
                            className="px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-accent anta bg-white"
                          >
                            <option value="">— Unset —</option>
                            {STATUS_OPTIONS.filter(Boolean).map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        ) : (
                          <select
                            value={svc.status ?? ""}
                            onChange={(e) => updateStatus(svc.id, e.target.value || null)}
                            className={`px-2 py-1 text-xs border rounded-lg focus:outline-none anta bg-white cursor-pointer
                              ${statusStyle[svc.status] ?? statusStyle.null}`}
                          >
                            <option value="">— Unset —</option>
                            {STATUS_OPTIONS.filter(Boolean).map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => saveEdit(svc.id)}
                                disabled={saving}
                                className="w-7 h-7 rounded-lg bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                              >
                                {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(svc)}
                                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors"
                              >
                                <Pencil size={12} />
                              </button>
                              <button
                                onClick={() => handleDelete(svc.id)}
                                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-red-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={12} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Add Service Modal */}
      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            {/* Modal header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 shrink-0">
              <h2 className="text-lg odibee text-black">Add Service</h2>
              <button onClick={() => { setAdding(false); setAddForm(emptyForm); }} className="text-gray-400 hover:text-black transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="overflow-y-auto flex-1">
              <div className="px-7 py-5 space-y-6">

                {/* ── Basic Info ── */}
                <Section title="Basic Info">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Slug *" required>
                      <input required value={addForm.slug} onChange={(e) => setAddForm(p => ({ ...p, slug: e.target.value }))} placeholder="pos" className={inp} />
                    </Field>
                    <Field label="Icon name">
                      <input value={addForm.icon} onChange={(e) => setAddForm(p => ({ ...p, icon: e.target.value }))} placeholder="ShoppingCart" className={inp} />
                    </Field>
                    <Field label="Title *" className="col-span-2" required>
                      <input required value={addForm.title} onChange={(e) => setAddForm(p => ({ ...p, title: e.target.value }))} placeholder="Point of Sale" className={inp} />
                    </Field>
                    <Field label="Tag">
                      <input value={addForm.tag} onChange={(e) => setAddForm(p => ({ ...p, tag: e.target.value }))} placeholder="Retail" className={inp} />
                    </Field>
                    <Field label="Category">
                      <input value={addForm.category} onChange={(e) => setAddForm(p => ({ ...p, category: e.target.value }))} placeholder="Commerce" className={inp} />
                    </Field>
                  </div>
                  <Field label="Short Description">
                    <textarea rows={2} value={addForm.shortDescription} onChange={(e) => setAddForm(p => ({ ...p, shortDescription: e.target.value }))} placeholder="Brief one-liner..." className={inp + " resize-none"} />
                  </Field>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="highlight" checked={addForm.highlight} onChange={(e) => setAddForm(p => ({ ...p, highlight: e.target.checked }))} className="w-4 h-4 accent-(--color-accent)" />
                    <label htmlFor="highlight" className="text-sm text-gray-600 anta">Highlight this service</label>
                  </div>
                  <Field label="Status">
                    <select value={addForm.status ?? ""} onChange={(e) => setAddForm(p => ({ ...p, status: e.target.value || null }))} className={inp + " bg-white"}>
                      <option value="">— Unset —</option>
                      {STATUS_OPTIONS.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                </Section>

                {/* ── Images ── */}
                <Section title="Images">
                  <Field label="Hero URL">
                    <input value={addForm.image.hero} onChange={(e) => setAddForm(p => ({ ...p, image: { ...p.image, hero: e.target.value } }))} placeholder="https://..." className={inp} />
                  </Field>
                  <Field label="Thumbnail URL">
                    <input value={addForm.image.thumbnail} onChange={(e) => setAddForm(p => ({ ...p, image: { ...p.image, thumbnail: e.target.value } }))} placeholder="https://..." className={inp} />
                  </Field>
                  <Field label="Image Alt Text">
                    <input value={addForm.image.alt} onChange={(e) => setAddForm(p => ({ ...p, image: { ...p.image, alt: e.target.value } }))} placeholder="Descriptive alt text" className={inp} />
                  </Field>
                </Section>

                {/* ── Description ── */}
                <Section title="Full Description">
                  <textarea rows={5} value={addForm.description} onChange={(e) => setAddForm(p => ({ ...p, description: e.target.value }))} placeholder="Full markdown-friendly description..." className={inp + " resize-none"} />
                </Section>

                {/* ── Key Features ── */}
                <Section title="Key Features">
                  <ArrayField
                    items={addForm.keyFeatures}
                    placeholder="e.g. Multi-register support"
                    onChange={(arr) => setAddForm(p => ({ ...p, keyFeatures: arr }))}
                  />
                </Section>

                {/* ── Use Cases ── */}
                <Section title="Use Cases">
                  <ArrayField
                    items={addForm.useCases}
                    placeholder="e.g. Retail stores"
                    onChange={(arr) => setAddForm(p => ({ ...p, useCases: arr }))}
                  />
                </Section>

                {/* ── Integrations ── */}
                <Section title="Integrations">
                  <ArrayField
                    items={addForm.integrations}
                    placeholder="e.g. Stripe"
                    onChange={(arr) => setAddForm(p => ({ ...p, integrations: arr }))}
                  />
                </Section>

                {/* ── Pricing ── */}
                <Section title="Pricing">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Model">
                      <input value={addForm.pricing.model} onChange={(e) => setAddForm(p => ({ ...p, pricing: { ...p.pricing, model: e.target.value } }))} placeholder="subscription" className={inp} />
                    </Field>
                    <Field label="Starting At">
                      <input value={addForm.pricing.startingAt} onChange={(e) => setAddForm(p => ({ ...p, pricing: { ...p.pricing, startingAt: e.target.value } }))} placeholder="$49/month" className={inp} />
                    </Field>
                  </div>
                </Section>

                {/* ── Stats ── */}
                <Section title="Stats">
                  {addForm.stats.map((st, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input
                        value={st.value}
                        onChange={(e) => { const a = [...addForm.stats]; a[i] = { ...a[i], value: e.target.value }; setAddForm(p => ({ ...p, stats: a })); }}
                        placeholder="0.3s"
                        className={inp + " flex-1"}
                      />
                      <input
                        value={st.label}
                        onChange={(e) => { const a = [...addForm.stats]; a[i] = { ...a[i], label: e.target.value }; setAddForm(p => ({ ...p, stats: a })); }}
                        placeholder="Avg transaction time"
                        className={inp + " flex-1"}
                      />
                      <button type="button" onClick={() => setAddForm(p => ({ ...p, stats: p.stats.filter((_, j) => j !== i) }))} className="text-gray-400 hover:text-red-500 transition-colors shrink-0">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setAddForm(p => ({ ...p, stats: [...p.stats, { value: "", label: "" }] }))}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-black transition-colors mt-1">
                    <Plus size={12} /> Add stat
                  </button>
                </Section>

              </div>

              {/* Footer */}
              <div className="flex gap-3 px-7 py-5 border-t border-gray-100 shrink-0">
                <button type="submit" disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "var(--color-accent)" }}>
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  Add Service
                </button>
                <button type="button" onClick={() => { setAdding(false); setAddForm(emptyForm); }}
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
