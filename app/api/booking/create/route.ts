import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/booking";
import { generateToken, hashToken } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  const sb = getServiceClient();
  if (!sb) {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }

  const formData = await request.formData();

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

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const startsAtDate = new Date(startsAt);
  const endsAt = new Date(startsAtDate.getTime() + durationMinutes * 60000);

  // Create or update customer
  const { data: existingCustomer } = await sb
    .from("meridian_customers")
    .select("id")
    .eq("email", customerEmail)
    .single();

  let customerId: string;
  if (existingCustomer) {
    customerId = existingCustomer.id;
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
    })
    .select("*")
    .single();

  if (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  redirect(`/book/confirmation?token=${token}`);
}
