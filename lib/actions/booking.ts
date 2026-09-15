"use server";

import { getServiceClient } from "@/lib/supabase/booking";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateToken, hashToken } from "@/lib/utils";

export async function createBooking(formData: FormData) {
  const sb = getServiceClient();
  if (!sb) redirect("/");

  const serviceId = formData.get("service_id") as string;
  const staffId = formData.get("staff_id") as string;
  const customerName = formData.get("customer_name") as string;
  const customerEmail = formData.get("customer_email") as string;
  const customerPhone = formData.get("customer_phone") as string;
  const company = formData.get("company") as string;
  const subject = formData.get("subject") as string;
  const notes = formData.get("notes") as string;
  const startsAt = formData.get("starts_at") as string;
  const durationMinutes = Number(formData.get("duration_minutes") as string);
  const customerTimezone = formData.get("customer_timezone") as string;
  const staffTimezone = formData.get("staff_timezone") as string;

  // Generate secure token for booking management
  const token = generateToken();
  const tokenHash = await hashToken(token);

  // Get service data for meeting method
  const { data: service } = await sb
    .from("meridian_services")
    .select("*")
    .eq("id", serviceId)
    .single();

  if (!service) redirect("/");

  // Get staff name for denormalized storage
  const { data: staffMember } = await sb
    .from("meridian_staff")
    .select("display_name")
    .eq("id", staffId)
    .single();

  const startsAtDate = new Date(startsAt);
  const endsAt = new Date(startsAtDate.getTime() + durationMinutes * 60000);

  const { data: customer } = await sb
    .from("meridian_customers")
    .select("id")
    .eq("email", customerEmail)
    .single();

  let customerId;
  if (customer) {
    customerId = customer.id;
    // Update customer info
    await sb
      .from("meridian_customers")
      .update({
        full_name: customerName,
        phone: customerPhone || null,
        company: company || null,
        timezone: customerTimezone,
      })
      .eq("id", customerId);
  } else {
    // Create new customer
    const { data: newCustomer } = await sb
      .from("meridian_customers")
      .insert({
        full_name: customerName,
        email: customerEmail,
        phone: customerPhone || null,
        company: company || null,
        timezone: customerTimezone,
        total_bookings: 1,
        is_blocked: false,
      })
      .select("id")
      .single();
    customerId = newCustomer?.id || "";
  }

  const { data: booking, error } = await sb
    .from("meridian_bookings")
    .insert({
      service_id: serviceId,
      staff_id: staffId,
      customer_id: customerId,
      starts_at: startsAtDate.toISOString(),
      ends_at: endsAt.toISOString(),
      duration_minutes: durationMinutes,
      status: service.requires_confirmation ? "pending" : "confirmed",
      meeting_method: service.default_method,
      customer_timezone: customerTimezone,
      staff_timezone: staffTimezone,
      notes: notes || null,
      token_hash: tokenHash,
      service_name: service.name,
      staff_name: staffMember?.display_name || null,
      price_cents: service.price_cents,
      currency: service.currency,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Booking error:", error);
    redirect("/");
  }

  // Create booking answers for custom fields
  if (subject) {
    await sb.from("meridian_booking_answers").insert({
      booking_id: booking.id,
      field_key: "subject",
      value: subject,
    });
  }

  revalidatePath("/book");
  redirect(`/b/${token}?confirmed=true`);
}

export async function cancelBooking(formData: FormData) {
  const sb = getServiceClient();
  if (!sb) redirect("/");

  const bookingId = formData.get("booking_id") as string;
  const token = formData.get("token") as string;

  const { error } = await sb
    .from("meridian_bookings")
    .update({
      status: "cancelled",
      cancelled_at: new Date().toISOString(),
      cancelled_by: "customer",
    })
    .eq("id", bookingId);

  if (error) {
    console.error("Cancel error:", error);
  }

  revalidatePath(`/b/${token}`);
  redirect(`/b/${token}`);
}

export async function rescheduleBooking(formData: FormData) {
  const sb = getServiceClient();
  if (!sb) redirect("/");

  const bookingId = formData.get("booking_id") as string;
  const token = formData.get("token") as string;
  const newStartsAt = formData.get("new_starts_at") as string;

  if (!newStartsAt) {
    redirect(`/b/${token}`);
  }

  // Get the booking (we already know its duration — no join needed)
  const { data: booking } = await sb
    .from("meridian_bookings")
    .select("duration_minutes")
    .eq("id", bookingId)
    .single();

  if (!booking) {
    redirect(`/b/${token}`);
  }

  const startsAt = new Date(newStartsAt);
  const endsAt = new Date(startsAt.getTime() + booking.duration_minutes * 60000);

  const { error } = await sb
    .from("meridian_bookings")
    .update({
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
      status: "confirmed",
    })
    .eq("id", bookingId);

  if (error) {
    console.error("Reschedule error:", error);
  }

  revalidatePath(`/b/${token}`);
  redirect(`/b/${token}`);
}
