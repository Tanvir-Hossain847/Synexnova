"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X, Loader2, Eye, Heart, Clock } from "lucide-react";
import Loader from "@/components/Loader";
import ImageUpload from "@/components/ImageUpload";
import { useModalScroll } from "@/lib/useModalScroll";
import { swal } from "@/lib/swal";

const API = "https://synexnova-backend.vercel.app/blogs";

const emptyForm = {
  title: "", slug: "", excerpt: "", content: "", status: "published",
  visibility: "public", featured: false,
  author: { name: "", email: "", avatar: "", bio: "" },
  category: { name: "", slug: "" },
  tags: [{ name: "", slug: "" }],
  coverImage: { url: "", alt: "", width: 1200, height: 630 },
  seo: { metaTitle: "", metaDescription: "", canonicalUrl: "", ogImage: "" },
};

const inp = "w-full px-3 py-2 rounded-xl border-2 border-accent/50 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-accent transition-colors anta bg-white";

function Section({ title, children }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3 border-b border-gray-100 pb-1.5">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogDashboardPage() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding]   = useState(false);
  const [form, setForm]       = useState(emptyForm);
  const [saving, setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(null);
  useModalScroll(adding);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error();
      setPosts(await res.json());
    } catch { }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchPosts(); }, []);

  function set(path, value) {
    setForm(prev => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }

  async function handleAdd(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, createdAt: new Date().toISOString(), publishedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error();
      setAdding(false);
      setForm(emptyForm);
      swal.success("Post published");
      fetchPosts();
    } catch { swal.error("Failed to publish post"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!await swal.confirmDelete("this post")) return;
    setDeleting(id);
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      swal.success("Post deleted");
      fetchPosts();
    } catch { swal.error("Failed to delete post"); }
    finally { setDeleting(null); }
  }

  const statusStyle = {
    published: "bg-emerald-50 text-emerald-700 border-emerald-200",
    draft:     "bg-amber-50 text-amber-700 border-amber-200",
    archived:  "bg-gray-50 text-gray-500 border-gray-200",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl text-black odibee">Blog</h1>
          <p className="text-sm text-gray-400 anta mt-0.5">Manage all blog posts.</p>
        </div>
        <button onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity shrink-0"
          style={{ backgroundColor: "var(--color-accent)" }}>
          <Plus size={15} /> New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Posts",     value: posts.length },
          { label: "Published",       value: posts.filter(p => p.status === "published").length },
          { label: "Featured",        value: posts.filter(p => p.featured).length },
          { label: "Total Views",     value: posts.reduce((a, p) => a + (p.stats?.views || 0), 0).toLocaleString() },
        ].map(s => (
          <Card key={s.label} className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <CardContent className="p-5">
              <p className="text-2xl anta text-black">{s.value}</p>
              <p className="text-xs text-gray-400 anta mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Posts table */}
      <Card className="border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <CardContent className="p-0">
          {loading ? <Loader text="Loading posts..." /> : posts.length === 0 ? (
            <p className="text-center text-gray-400 anta py-10 text-sm">No posts yet.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Title", "Category", "Status", "Stats", "Date", ""].map(h => (
                    <th key={h} className="text-left text-[10px] font-semibold tracking-widest uppercase text-gray-400 px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors">
                    <td className="px-6 py-3.5 max-w-[240px]">
                      <p className="text-sm font-semibold text-black truncate">{post.title}</p>
                      <p className="text-xs text-gray-400 anta truncate">{post.slug}</p>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-gray-500 anta">{post.category?.name || "—"}</td>
                    <td className="px-6 py-3.5">
                      <Badge variant="outline" className={`text-[10px] font-semibold ${statusStyle[post.status] || statusStyle.draft}`}>
                        {post.status || "draft"}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3 text-xs text-gray-400 anta">
                        {post.stats?.views && <span className="flex items-center gap-1"><Eye size={10} />{(post.stats.views/1000).toFixed(1)}k</span>}
                        {post.stats?.likes && <span className="flex items-center gap-1"><Heart size={10} />{post.stats.likes}</span>}
                        {post.stats?.readingTimeMinutes && <span className="flex items-center gap-1"><Clock size={10} />{post.stats.readingTimeMinutes}m</span>}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-gray-400 anta whitespace-nowrap">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <a href={`/blog/${post.slug}`} target="_blank"
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-black hover:text-black transition-colors">
                          <Eye size={12} />
                        </a>
                        <button onClick={() => handleDelete(post._id)} disabled={deleting === post._id}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors">
                          {deleting === post._id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Add Post Modal */}
      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 shrink-0">
              <h2 className="text-lg odibee text-black">New Blog Post</h2>
              <button onClick={() => { setAdding(false); setForm(emptyForm); }} className="text-gray-400 hover:text-black transition-colors">
                <X size={18} />
              </button>
            </div>

            <form id="blog-form" onSubmit={handleAdd} className="overflow-y-auto overscroll-contain flex-1 px-7 py-5 space-y-6">

              <Section title="Basic Info">
                <Field label="Title *">
                  <input required value={form.title} onChange={e => set("title", e.target.value)} placeholder="Post title" className={inp} />
                </Field>
                <Field label="Slug *">
                  <input required value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="post-slug" className={inp} />
                </Field>
                <Field label="Excerpt *">
                  <textarea required rows={2} value={form.excerpt} onChange={e => set("excerpt", e.target.value)} placeholder="Short summary..." className={inp + " resize-none"} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Status">
                    <select value={form.status} onChange={e => set("status", e.target.value)} className={inp}>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </Field>
                  <Field label="Visibility">
                    <select value={form.visibility} onChange={e => set("visibility", e.target.value)} className={inp}>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </Field>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="featured" checked={form.featured} onChange={e => set("featured", e.target.checked)} className="w-4 h-4 accent-(--color-accent)" />
                  <label htmlFor="featured" className="text-sm text-gray-600 anta">Mark as featured</label>
                </div>
              </Section>

              <Section title="Content">
                <Field label="Content (Markdown) *">
                  <textarea required rows={8} value={form.content} onChange={e => set("content", e.target.value)}
                    placeholder="## Heading&#10;&#10;Your content here..." className={inp + " resize-none font-mono text-xs"} />
                </Field>
              </Section>

              <Section title="Author">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Name *"><input required value={form.author.name} onChange={e => set("author.name", e.target.value)} placeholder="Jane Smith" className={inp} /></Field>
                  <Field label="Email"><input type="email" value={form.author.email} onChange={e => set("author.email", e.target.value)} placeholder="jane@example.com" className={inp} /></Field>
                </div>
                <ImageUpload label="Avatar" value={form.author.avatar} onChange={url => set("author.avatar", url)} placeholder="https://... or upload" />
                <Field label="Bio"><input value={form.author.bio} onChange={e => set("author.bio", e.target.value)} placeholder="Short bio..." className={inp} /></Field>
              </Section>

              <Section title="Category">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Name"><input value={form.category.name} onChange={e => set("category.name", e.target.value)} placeholder="Technology" className={inp} /></Field>
                  <Field label="Slug"><input value={form.category.slug} onChange={e => set("category.slug", e.target.value)} placeholder="technology" className={inp} /></Field>
                </div>
              </Section>

              <Section title="Tags">
                {form.tags.map((tag, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input value={tag.name} onChange={e => { const t=[...form.tags]; t[i]={...t[i],name:e.target.value}; setForm(p=>({...p,tags:t})); }} placeholder="Tag name" className={inp + " flex-1"} />
                    <input value={tag.slug} onChange={e => { const t=[...form.tags]; t[i]={...t[i],slug:e.target.value}; setForm(p=>({...p,tags:t})); }} placeholder="tag-slug" className={inp + " flex-1"} />
                    <button type="button" onClick={() => setForm(p=>({...p,tags:p.tags.filter((_,j)=>j!==i)}))} className="text-gray-400 hover:text-red-500 transition-colors"><X size={14} /></button>
                  </div>
                ))}
                <button type="button" onClick={() => setForm(p=>({...p,tags:[...p.tags,{name:"",slug:""}]}))}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-black transition-colors">
                  <Plus size={12} /> Add tag
                </button>
              </Section>

              <Section title="Cover Image">
                <ImageUpload label="Cover Image" value={form.coverImage.url} onChange={url => set("coverImage.url", url)} placeholder="https://... or upload" />
                <Field label="Alt Text"><input value={form.coverImage.alt} onChange={e => set("coverImage.alt", e.target.value)} placeholder="Image description" className={inp} /></Field>
              </Section>

              <Section title="SEO">
                <Field label="Meta Title"><input value={form.seo.metaTitle} onChange={e => set("seo.metaTitle", e.target.value)} placeholder="SEO title" className={inp} /></Field>
                <Field label="Meta Description"><textarea rows={2} value={form.seo.metaDescription} onChange={e => set("seo.metaDescription", e.target.value)} placeholder="SEO description" className={inp + " resize-none"} /></Field>
                <Field label="Canonical URL"><input value={form.seo.canonicalUrl} onChange={e => set("seo.canonicalUrl", e.target.value)} placeholder="https://..." className={inp} /></Field>
              </Section>

            </form>

            <div className="flex gap-3 px-7 py-5 border-t border-gray-100 shrink-0">
              <button form="blog-form" type="submit" disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--color-accent)" }}>
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Publish Post
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

