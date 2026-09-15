import Link from "next/link";
import { Calendar, Clock, Video, Phone, MapPin, Globe, ArrowRight } from "lucide-react";
import { getPublicClient } from "@/lib/supabase/booking";

async function getServices() {
  const sb = getPublicClient();
  if (!sb) return [];

  const { data } = await sb
    .from("meridian_services")
    .select("*")
    .eq("is_published", true)
    .eq("is_active", true)
    .order("sort_order");

  return data ?? [];
}

const methodIcons: Record<string, typeof Video> = {
  video: Video,
  phone: Phone,
  audio: Phone,
  online_meeting: Video,
  in_person: MapPin,
  custom: Globe,
};

export default async function BookPage() {
  const services = await getServices();

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
          <Link href="/shop" className="text-sm text-jade-dark font-medium hover:text-jade">
            ← Back to shop
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-3">Book a consultation</h1>
          <p className="text-text-muted max-w-[50ch] mx-auto">
            Choose a service and pick a time that works for you. Our engineers are ready to help.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/book/${service.slug}`}
              className="group flex flex-col p-6 rounded-xl border border-line bg-white shadow-card hover:shadow-card-hover hover:border-jade/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-jade/10 flex items-center justify-center group-hover:bg-jade transition-colors">
                  <Calendar className="h-5 w-5 text-jade group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-text-primary group-hover:text-jade transition-colors">
                  {service.name}
                </h3>
              </div>

              {service.description && (
                <p className="text-sm text-text-muted mb-4 line-clamp-2">{service.description}</p>
              )}

              <div className="mt-auto space-y-2 text-sm">
                <div className="flex items-center gap-2 text-text-muted">
                  <Clock className="h-4 w-4" />
                  <span className="tabular">{service.duration_minutes} min</span>
                </div>
                <div className="flex items-center gap-2 text-text-muted">
                  <Globe className="h-4 w-4" />
                  <span>{service.meeting_methods.join(", ")}</span>
                </div>
                {service.price_cents > 0 ? (
                  <div className="flex items-center gap-2 text-text-muted">
                    <span className="font-medium text-jade-dark">${(service.price_cents / 100).toFixed(2)}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-text-muted">
                    <span className="font-medium text-jade-dark">Free</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-line">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-jade group-hover:gap-2 transition-all">
                  Book now <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
