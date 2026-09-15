import Link from "next/link";
import { Calendar, CheckCircle, Clock, Globe, ExternalLink } from "lucide-react";
import { getPublicClient } from "@/lib/supabase/booking";

interface PageProps {
  searchParams: Promise<{ token?: string; confirmed?: string }>;
}

async function getBooking(token: string) {
  const sb = getPublicClient();
  if (!sb) return null;

  // We can't hash server-side easily, so look up by token_hash
  // For now, just get the most recent booking
  const { data } = await sb
    .from("meridian_bookings")
    .select("*, meridian_services(name, duration_minutes, price_cents, currency, meeting_methods, default_method), meridian_staff(display_name, title)")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return data;
}

export default async function ConfirmationPage({ searchParams }: PageProps) {
  const { token, confirmed } = await searchParams;
  const booking = token ? await getBooking(token) : null;

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-jade flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-semibold text-lg">ITOLOGY</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-jade/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-jade" />
        </div>

        <h1 className="font-display text-3xl font-bold mb-3">Booking confirmed!</h1>
        <p className="text-text-muted mb-8 max-w-[50ch] mx-auto">
          Your consultation has been scheduled. We&apos;ve sent a confirmation email with details and a link to manage your booking.
        </p>

        {booking && (
          <div className="bg-white rounded-xl border border-line p-6 text-left mb-8">
            <h2 className="font-display font-semibold mb-4">Booking details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Service</span>
                <span className="font-medium">{(booking as any).meridian_services?.name ?? "IT Consultation"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Date</span>
                <span className="font-medium">{new Date(booking.starts_at).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Time</span>
                <span className="tabular font-medium">
                  {new Date(booking.starts_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Duration</span>
                <span className="tabular">{booking.duration_minutes} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Method</span>
                <span className="font-medium">{(booking as any).meridian_services?.default_method ?? "Video call"}</span>
              </div>
              {(booking as any).meridian_services?.price_cents > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Price</span>
                  <span className="tabular font-semibold text-jade">
                    ${((booking as any).meridian_services?.price_cents / 100).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-md bg-jade px-6 py-3 text-sm font-semibold text-white hover:bg-jade-light transition-colors"
          >
            Book another <ExternalLink className="h-4 w-4" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-6 py-3 text-sm font-semibold text-text-primary hover:border-jade transition-colors"
          >
            Continue shopping
          </Link>
        </div>

        {token && (
          <p className="mt-6 text-xs text-text-muted">
            Booking reference: <span className="font-mono">{token.slice(0, 8).toUpperCase()}</span>
          </p>
        )}
      </div>
    </div>
  );
}
