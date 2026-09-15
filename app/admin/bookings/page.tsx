"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Mail, Phone, Globe, CheckCircle, XCircle, AlertTriangle, Search } from "lucide-react";
import { cn, formatTime, formatDate, formatCurrency } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface Booking {
  id: string;
  reference: string;
  service_name: string;
  staff_name: string;
  customer_name: string;
  customer_email: string;
  starts_at: string;
  duration_minutes: number;
  status: "pending" | "confirmed" | "cancelled" | "completed" | "no_show";
  meeting_method: string;
  customer_timezone: string;
  price_cents: number;
  currency: string;
  created_at: string;
}

const STATUS_OPTIONS = ["pending", "confirmed", "cancelled", "completed", "no_show"] as const;

const statusStyles: Record<string, string> = {
  pending: "bg-warn/10 text-warn border-warn/20",
  confirmed: "bg-ok/10 text-ok border-ok/20",
  cancelled: "bg-stop/10 text-stop border-stop/20",
  completed: "bg-jade/10 text-jade border-jade/20",
  no_show: "bg-mute/10 text-mute border-mute/20",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const sb = createClient();

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  async function fetchBookings() {
    setLoading(true);
    let query = sb.from("meridian_bookings").select("*").order("starts_at", { ascending: false });
    if (statusFilter !== "all") query = query.eq("status", statusFilter);
    const { data } = await query;
    setBookings((data ?? []) as Booking[]);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await sb.from("meridian_bookings").update({ status }).eq("id", id);
    fetchBookings();
  }

  async function deleteBooking(id: string) {
    if (!confirm("Delete this booking?")) return;
    await sb.from("meridian_bookings").delete().eq("id", id);
    fetchBookings();
  }

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    return (
      !q ||
      b.reference?.toLowerCase().includes(q) ||
      b.customer_name?.toLowerCase().includes(q) ||
      b.service_name?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Bookings</h1>
          <p className="mt-1 text-sm text-text-muted">{bookings.length} total bookings</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-line bg-white px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by reference, customer, or service…"
          className="w-full rounded-md border border-line bg-white pl-10 pr-4 py-2.5 text-sm"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading bookings…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-text-muted">No bookings found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((booking) => (
            <div key={booking.id} className="rounded-xl border border-line bg-white p-5 hover:shadow-card-hover transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm font-medium text-jade">{booking.reference}</span>
                    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize", statusStyles[booking.status])}>
                      {booking.status}
                    </span>
                    {booking.price_cents > 0 && (
                      <span className="tabular text-sm font-medium text-text-muted">
                        {formatCurrency(booking.price_cents, booking.currency)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-text-primary">{booking.service_name}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
                    <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{booking.customer_name}</span>
                    <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{booking.customer_email}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(booking.starts_at)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatTime(booking.starts_at)} ({booking.duration_minutes} min)</span>
                    {booking.staff_name && <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{booking.staff_name}</span>}
                    <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{booking.customer_timezone}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <select
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                    className="rounded-md border border-line bg-white px-2 py-1.5 text-xs"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => deleteBooking(booking.id)}
                    className="rounded-md border border-stop/20 px-2 py-1.5 text-xs text-stop hover:bg-stop/10 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
