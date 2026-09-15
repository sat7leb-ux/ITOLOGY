"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Edit, Trash2, User, Mail, Phone, Globe, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface Staff {
  id: string;
  slug: string;
  display_name: string;
  title: string | null;
  email: string | null;
  phone: string | null;
  timezone: string;
  color: string | null;
  is_bookable: boolean;
  is_active: boolean;
}

const inputStyle = "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-jade focus:outline-none focus:ring-2 focus:ring-jade/20";
const labelStyle = "block text-sm font-medium text-text-primary mb-1.5";

export default function AdminStaff() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Staff | null>(null);
  const [form, setForm] = useState({ display_name: "", slug: "", title: "", email: "", phone: "", timezone: "Asia/Beirut", color: "#0E7C7B", is_bookable: true, is_active: true });
  const sb = createClient();

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    const { data } = await sb.from("meridian_staff").select("*").order("display_name");
    setStaff((data ?? []) as Staff[]);
    setLoading(false);
  }, [sb]);

  useEffect(() => { fetchStaff(); }, [fetchStaff]);

  async function saveStaff() {
    const payload = {
      ...form,
      id: editing?.id || crypto.randomUUID(),
      updated_at: new Date().toISOString(),
    };
    if (!editing) (payload as any).created_at = new Date().toISOString();
    await sb.from("meridian_staff").upsert(payload);
    setShowForm(false);
    setEditing(null);
    setForm({ display_name: "", slug: "", title: "", email: "", phone: "", timezone: "Asia/Beirut", color: "#0E7C7B", is_bookable: true, is_active: true });
    fetchStaff();
  }

  async function deleteStaff(id: string) {
    if (!confirm("Delete this staff member?")) return;
    await sb.from("meridian_staff").delete().eq("id", id);
    fetchStaff();
  }

  function startEdit(s: Staff) {
    setEditing(s);
    setForm({ display_name: s.display_name, slug: s.slug, title: s.title || "", email: s.email || "", phone: s.phone || "", timezone: s.timezone, color: s.color || "#0E7C7B", is_bookable: s.is_bookable, is_active: s.is_active });
    setShowForm(true);
  }

  const filtered = staff.filter((s) => {
    const q = search.toLowerCase();
    return !q || s.display_name.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q) || s.slug.includes(q);
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Staff</h1>
          <p className="mt-1 text-sm text-text-muted">{staff.length} team members</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ display_name: "", slug: "", title: "", email: "", phone: "", timezone: "Asia/Beirut", color: "#0E7C7B", is_bookable: true, is_active: true }); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-md bg-jade px-4 py-2 text-sm font-semibold text-white hover:bg-jade-light transition-colors"
        >
          <Plus className="h-4 w-4" /> Add staff
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search staff…" className="w-full rounded-md border border-line bg-white pl-10 pr-4 py-2.5 text-sm" />
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-float p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg">{editing ? "Edit staff" : "Add staff"}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-md hover:bg-paper transition-colors"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelStyle}>Display Name *</label>
                <input className={inputStyle} value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} placeholder="Elie Khachane" />
              </div>
              <div>
                <label className={labelStyle}>Slug *</label>
                <input className={inputStyle} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="elie-khachane" />
              </div>
              <div>
                <label className={labelStyle}>Title</label>
                <input className={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="IT Consultant" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelStyle}>Email</label>
                  <input className={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="elie@itology.com" />
                </div>
                <div>
                  <label className={labelStyle}>Phone</label>
                  <input className={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+961 ..." />
                </div>
              </div>
              <div>
                <label className={labelStyle}>Timezone</label>
                <select className={inputStyle} value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })}>
                  <option value="Asia/Beirut">Asia/Beirut</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.is_bookable} onChange={(e) => setForm({ ...form, is_bookable: e.target.checked })} className="rounded border-line" />
                  Bookable
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded border-line" />
                  Active
                </label>
              </div>
              <button onClick={saveStaff} className="w-full rounded-md bg-jade px-4 py-2.5 text-sm font-semibold text-white hover:bg-jade-light transition-colors">
                {editing ? "Save changes" : "Add staff"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading staff…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-text-muted">No staff found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-line bg-white p-4 hover:shadow-card-hover transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: s.color || "#0E7C7B" }}>
                  {s.display_name[0] || <User className="h-5 w-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-text-primary">{s.display_name}</p>
                    {!s.is_active && <span className="text-xs text-stop">(inactive)</span>}
                    {s.is_bookable && <span className="text-xs text-jade">(bookable)</span>}
                  </div>
                  <p className="text-sm text-text-muted">{s.title || "—"}</p>
                  <div className="flex gap-3 mt-1 text-xs text-text-muted">
                    {s.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{s.email}</span>}
                    {s.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{s.phone}</span>}
                    <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{s.timezone}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(s)} className="p-2 rounded-md hover:bg-paper transition-colors text-text-muted hover:text-jade">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => deleteStaff(s.id)} className="p-2 rounded-md hover:bg-paper transition-colors text-text-muted hover:text-stop">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
