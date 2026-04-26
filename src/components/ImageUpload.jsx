"use client";
import { useState, useRef } from "react";
import { Upload, Loader2, X, ImageIcon } from "lucide-react";

const IMGBB_KEY = "1aac778c1b172794481a1450a43caa0f";

export default function ImageUpload({ value, onChange, label = "Image", placeholder = "Paste URL or upload" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState(null);
  const inputRef                  = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message || "Upload failed");
      onChange(data.data.url);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
          {label}
        </label>
      )}

      <div className="flex gap-2">
        {/* URL input */}
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-xl border-2 border-accent/50 text-sm text-black placeholder-gray-300
            focus:outline-none focus:border-accent transition-colors anta bg-white"
        />

        {/* Upload button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-accent/50 text-sm font-medium
            text-gray-600 hover:border-accent hover:text-black transition-colors shrink-0 disabled:opacity-60"
        >
          {uploading
            ? <Loader2 size={14} className="animate-spin" />
            : <Upload size={14} />}
          {uploading ? "Uploading..." : "Upload"}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => handleFile(e.target.files?.[0])}
        />
      </div>

      {/* Preview */}
      {value && value.startsWith("http") && (
        <div className="mt-2 relative w-full h-28 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black transition-colors"
          >
            <X size={11} />
          </button>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-500 anta">{error}</p>}
    </div>
  );
}
