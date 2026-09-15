"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slot {
  start: string;
  end: string;
}

interface BookingFormProps {
  service: {
    id: string;
    slug: string;
    name: string;
    duration_minutes: number;
    price_cents: number;
    currency: string;
  };
  staff: Array<{
    id: string;
    display_name: string;
    title: string | null;
    avatar_url: string | null;
    timezone: string;
  }>;
  slotsByDay: Record<string, Slot[]>;
  timezone: string;
  staffTimezone: string;
}

export function BookingForm({ service, staff, slotsByDay, timezone, staffTimezone }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDayKey = (day: number) => {
    const m = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${currentMonth.getFullYear()}-${m}-${d}`;
  };

  const isToday = (day: number) => {
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return d.toDateString() === today.toDateString();
  };

  const isPast = (day: number) => {
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const hasSlots = (day: number) => {
    const key = getDayKey(day);
    return (slotsByDay[key]?.length ?? 0) > 0;
  };

  const getDensity = (day: number) => {
    const key = getDayKey(day);
    const count = slotsByDay[key]?.length ?? 0;
    if (count === 0) return "none";
    if (count <= 3) return "low";
    if (count <= 8) return "medium";
    return "high";
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const selectedStaff = staff[0];

  const inputStyle = "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-jade focus:outline-none focus:ring-2 focus:ring-jade/20";
  const labelStyle = "block text-sm font-medium text-text-primary mb-1.5";

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-8">
      {/* Left: Slot picker */}
      <div>
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 rounded-md hover:bg-paper transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="font-display font-semibold text-lg">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-md hover:bg-paper transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="bg-white rounded-xl border border-line p-4 mb-6">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-text-muted py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayKey = getDayKey(day);
              const isSelected = selectedDate === dayKey;
              const density = getDensity(day);
              return (
                <button
                  key={day}
                  onClick={() => {
                    if (!isPast(day)) {
                      setSelectedDate(dayKey);
                      setSelectedSlot(null);
                    }
                  }}
                  disabled={isPast(day) || density === "none"}
                  className={cn(
                    "aspect-square rounded-md flex flex-col items-center justify-center text-sm transition-all",
                    isPast(day) && "opacity-30 cursor-not-allowed",
                    !isPast(day) && density !== "none" && "hover:bg-jade/5 cursor-pointer",
                    isSelected && "bg-jade text-white",
                    !isSelected && density !== "none" && "text-text-primary",
                    !isSelected && density === "none" && "text-text-muted/40",
                    isToday(day) && !isSelected && "ring-1 ring-jade"
                  )}
                >
                  <span className="font-medium">{day}</span>
                  {density !== "none" && (
                    <span
                      className={cn(
                        "text-[9px] mt-0.5",
                        isSelected ? "text-white/80" : density === "low" ? "text-warn" : density === "medium" ? "text-amber" : "text-jade"
                      )}
                    >
                      {density === "low" ? "·" : density === "medium" ? "··" : "···"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        {selectedDate && slotsByDay[selectedDate] && slotsByDay[selectedDate].length > 0 && (
          <div className="bg-white rounded-xl border border-line p-4">
            <h3 className="text-sm font-medium text-text-muted mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Available times for {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slotsByDay[selectedDate].map((slot) => {
                const start = new Date(slot.start);
                const isSelected = selectedSlot?.start === slot.start;
                return (
                  <button
                    key={slot.start}
                    onClick={() => setSelectedSlot(slot)}
                    className={cn(
                      "px-3 py-2 rounded-md border text-sm font-medium transition-all",
                      isSelected
                        ? "border-jade bg-jade text-white"
                        : "border-line text-text-primary hover:border-jade/50"
                    )}
                  >
                    {start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right: Customer form */}
      <div className="lg:sticky lg:top-8 h-fit">
        {selectedSlot ? (
          <form
            action="/api/booking/create"
            method="POST"
            className="bg-white rounded-xl border border-line p-5 shadow-card space-y-4"
          >
            <h3 className="font-display font-semibold text-lg mb-2">Your details</h3>

            <input type="hidden" name="service_id" value={service.id} />
            <input type="hidden" name="staff_id" value={selectedStaff?.id || ""} />
            <input type="hidden" name="starts_at" value={selectedSlot.start} />
            <input type="hidden" name="duration_minutes" value={service.duration_minutes} />
            <input type="hidden" name="customer_timezone" value={timezone} />
            <input type="hidden" name="staff_timezone" value={staffTimezone} />

            <div>
              <label className={labelStyle}>Full Name *</label>
              <input name="customer_name" className={inputStyle} placeholder="John Doe" required />
            </div>

            <div>
              <label className={labelStyle}>Email Address *</label>
              <input name="customer_email" type="email" className={inputStyle} placeholder="john@example.com" required />
            </div>

            <div>
              <label className={labelStyle}>Phone Number</label>
              <input name="customer_phone" type="tel" className={inputStyle} placeholder="+961 70 000 000" />
            </div>

            <div>
              <label className={labelStyle}>Company</label>
              <input name="company" className={inputStyle} placeholder="Your company name" />
            </div>

            <div>
              <label className={labelStyle}>Subject *</label>
              <select name="subject" className={inputStyle} required>
                <option value="">Select a topic…</option>
                <option value="Network or connectivity">Network or connectivity</option>
                <option value="Broadcast or streaming">Broadcast or streaming</option>
                <option value="Servers and storage">Servers and storage</option>
                <option value="Security review">Security review</option>
                <option value="Something else">Something else</option>
              </select>
            </div>

            <div>
              <label className={labelStyle}>Notes (optional)</label>
              <textarea name="notes" className={cn(inputStyle, "min-h-[80px]")} placeholder="Anything we should know?" />
            </div>

            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Globe className="h-4 w-4 flex-none" />
              <span>Timezone: {timezone}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-jade px-4 py-3 text-sm font-semibold text-white hover:bg-jade-light transition-colors disabled:opacity-50"
            >
              Confirm booking
            </button>

            <p className="text-xs text-text-muted text-center">
              By booking you agree to our terms. A confirmation link will be sent to your email.
            </p>
          </form>
        ) : (
          <div className="bg-white rounded-xl border border-line p-5 text-center text-text-muted">
            <Clock className="h-8 w-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Select a time slot to continue</p>
          </div>
        )}

        {/* Staff info */}
        {selectedStaff && (
          <div className="mt-4 bg-white rounded-xl border border-line p-4">
            <div className="flex items-center gap-3">
              {selectedStaff.avatar_url ? (
                <img src={selectedStaff.avatar_url} alt={selectedStaff.display_name} className="h-10 w-10 rounded-full" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-jade/10 flex items-center justify-center text-jade font-semibold">
                  {selectedStaff.display_name[0]}
                </div>
              )}
              <div>
                <p className="font-medium text-sm">{selectedStaff.display_name}</p>
                {selectedStaff.title && <p className="text-xs text-text-muted">{selectedStaff.title}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
