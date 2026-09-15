import Link from "next/link";
import { Calendar, Clock, Video, Phone, MapPin, Globe, ChevronLeft, User } from "lucide-react";
import { getPublicClient } from "@/lib/supabase/booking";
import { getAvailableSlots, type Slot } from "@/lib/scheduling/availability";
import { detectTimezone, formatTime, formatDate, formatCurrency } from "@/lib/utils";
import { BookingForm } from "./booking-form";

interface PageProps {
  params: Promise<{ serviceSlug: string }>;
}

async function getServiceData(serviceSlug: string) {
  const sb = getPublicClient();
  if (!sb) return null;

  const { data: service } = await sb
    .from("meridian_services")
    .select("*")
    .eq("slug", serviceSlug)
    .eq("is_published", true)
    .eq("is_active", true)
    .single();

  if (!service) return null;

  const { data: staffList } = await sb
    .from("meridian_staff")
    .select("*")
    .eq("is_active", true)
    .eq("is_bookable", true)
    .order("display_name");

  const { data: serviceStaff } = await sb
    .from("meridian_service_staff")
    .select("staff_id")
    .eq("service_id", service.id);

  const assignedStaffIds = (serviceStaff ?? []).map((ss: { staff_id: string }) => ss.staff_id);
  const assignedStaff = (staffList ?? []).filter((s: { id: string }) => assignedStaffIds.includes(s.id));

  return { service, staff: assignedStaff };
}

export default async function ServiceBookingPage({ params }: PageProps) {
  const { serviceSlug } = await params;
  const data = await getServiceData(serviceSlug);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Service not found</h1>
          <p className="text-text-muted">This booking link is invalid or has been deactivated.</p>
          <Link href="/book" className="text-jade mt-4 inline-block">← Back to services</Link>
        </div>
      </div>
    );
  }

  const { service, staff } = data;
  const staffTimezone = staff[0]?.timezone ?? "Asia/Beirut";

  // Get busy intervals for the next 60 days
  const now = new Date();
  const from = new Date(now);
  const to = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

  const sb = getPublicClient();
  let busyIntervals: { start: Date; end: Date }[] = [];

  if (sb && staff.length > 0) {
    const { data: busyData } = await sb
      .from("meridian_bookings")
      .select("starts_at, ends_at, meridian_services!inner(buffer_before_minutes, buffer_after_minutes)")
      .eq("staff_id", staff[0].id)
      .not("status", "in", "(cancelled,no_show)")
      .gte("starts_at", from.toISOString())
      .lte("starts_at", to.toISOString());

    if (busyData) {
      busyIntervals = busyData.map((b: { starts_at: string; ends_at: string; meridian_services: { buffer_before_minutes: number; buffer_after_minutes: number }[] | null }) => ({
        start: new Date(new Date(b.starts_at).getTime() - ((b.meridian_services?.[0]?.buffer_before_minutes) ?? 0) * 60000),
        end: new Date(new Date(b.ends_at).getTime() + ((b.meridian_services?.[0]?.buffer_after_minutes) ?? 0) * 60000),
      }));
    }
  }

  // Calculate slots
  const slots = getAvailableSlots({
    from,
    to,
    scheduleTimezone: staffTimezone,
    rules: [], // No schedule rules for now — availability comes from busy intervals
    busy: busyIntervals,
    service: {
      durationMinutes: service.duration_minutes,
      slotIntervalMinutes: service.slot_interval_minutes,
      bufferBeforeMinutes: service.buffer_before_minutes,
      bufferAfterMinutes: service.buffer_after_minutes,
      minimumNoticeMinutes: service.minimum_notice_minutes,
      maximumAdvanceDays: service.maximum_advance_days,
      maxBookingsPerDay: service.max_bookings_per_day,
    },
    now,
  });

  const slotsByDay = slots.reduce<Record<string, Slot[]>>((acc, slot) => {
    const key = slot.start.toISOString().slice(0, 10);
    (acc[key] ??= []).push(slot);
    return acc;
  }, {});

  const methodIcons: Record<string, typeof Video> = {
    video: Video,
    phone: Phone,
    audio: Phone,
    online_meeting: Video,
    in_person: MapPin,
    custom: Globe,
  };

  const inputStyle = "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-jade focus:outline-none focus:ring-2 focus:ring-jade/20";

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/book" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-jade flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-semibold text-lg">ITOLOGY</span>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/book" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-jade mb-6">
          <ChevronLeft className="h-4 w-4" /> Back to services
        </Link>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">{service.name}</h1>
            {service.description && <p className="text-text-muted mb-6">{service.description}</p>}

            {staff.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-medium text-text-muted mb-3">Available staff</h2>
                <div className="flex flex-wrap gap-2">
                  {staff.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-md border border-line bg-white text-sm"
                    >
                      {s.avatar_url ? (
                        <img src={s.avatar_url} alt={s.display_name} className="h-6 w-6 rounded-full" />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-jade/10 flex items-center justify-center">
                          <User className="h-3 w-3 text-jade" />
                        </div>
                      )}
                      <span>{s.display_name}</span>
                      {s.title && <span className="text-text-muted text-xs">· {s.title}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <BookingForm
              service={service}
              staff={staff}
              slotsByDay={Object.fromEntries(
                Object.entries(slotsByDay).map(([k, v]) => [k, v.map((s) => ({ start: s.start.toISOString(), end: s.end.toISOString() }))])
              )}
              timezone={detectTimezone()}
              staffTimezone={staffTimezone}
            />
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <div className="rounded-xl border border-line bg-white p-5 shadow-card">
              <h3 className="font-display font-semibold mb-4">Booking summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Service</span>
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Duration</span>
                  <span className="tabular">{service.duration_minutes} min</span>
                </div>
                {service.price_cents > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-muted">Price</span>
                    <span className="tabular font-semibold text-jade">{formatCurrency(service.price_cents, service.currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-muted">Methods</span>
                  <span className="flex gap-1">
                    {service.meeting_methods.map((m: string) => {
                      const Icon = methodIcons[m] ?? Globe;
                      return <Icon key={m} className="h-4 w-4 text-jade" />;
                    })}
                  </span>
                </div>
              </div>
              <hr className="my-4 border-line" />
              <p className="text-xs text-text-muted">
                Pick a time slot to continue. You&apos;ll get a confirmation link to manage or cancel your booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
