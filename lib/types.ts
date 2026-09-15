// Domain types mirroring supabase/migrations/0001_init.sql.
// Once the project is linked, replace `Database` with the generated types:
//   npx supabase gen types typescript --project-id <id> > lib/database.types.ts

export type Category = {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
};

export type ProductImage = {
  id: string;
  url: string;
  sort_order: number;
};

export type ProductAttributeValue = {
  attribute_name: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: Pick<Brand, "id" | "name" | "slug"> | null;
  category_id: string;
  category?: { slug: string } | null;
  sku: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  stock_qty: number;
  is_published: boolean;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  warranty_text: string | null;
  images: ProductImage[];
  attributes: ProductAttributeValue[];
  rating_avg?: number;
  rating_count?: number;
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
};

export type CartItem = {
  product: Pick<Product, "id" | "name" | "slug" | "price" | "sale_price"> & {
    image_url: string | null;
  };
  variant_id: string | null;
  qty: number;
};

// Minimal placeholder so the Supabase client generics compile before
// `supabase gen types` has been run against a real project.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Database = any;

/* ------------------------------------------------------------------ */
/* Meridian booking types                                              */
/* ------------------------------------------------------------------ */

export type Slot = {
  start: Date;
  end: Date;
};

export type AvailabilityRule = {
  weekday: number; // 0 = Sunday … 6 = Saturday
  startTime: string; // "09:00"
  endTime: string; // "17:00"
};

export type AvailabilityOverride = {
  date: string;
  isClosed: boolean;
  startTime?: string;
  endTime?: string;
};

export type BusyInterval = {
  start: Date;
  end: Date;
};

export type MeridianService = {
  id: string;
  org_id: string;
  slug: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  slot_interval_minutes: number;
  price_cents: number;
  currency: string;
  meeting_methods: string[];
  default_method: string;
  buffer_before_minutes: number;
  buffer_after_minutes: number;
  minimum_notice_minutes: number;
  maximum_advance_days: number;
  max_bookings_per_day: number | null;
  requires_confirmation: boolean;
  allow_reschedule: boolean;
  allow_cancellation: boolean;
  cancellation_notice_hours: number;
  capacity: number;
  is_published: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type MeridianStaff = {
  id: string;
  org_id: string;
  slug: string;
  display_name: string;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  phone: string | null;
  timezone: string;
  color: string | null;
  is_bookable: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type MeridianBooking = {
  id: string;
  org_id: string;
  reference: string;
  service_id: string;
  staff_id: string;
  customer_id: string;
  starts_at: string;
  ends_at: string;
  duration_minutes: number;
  status: string;
  meeting_method: string;
  meeting_url: string | null;
  meeting_phone: string | null;
  meeting_location: string | null;
  customer_timezone: string;
  staff_timezone: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type MeridianSchedule = {
  id: string;
  org_id: string;
  staff_id: string;
  name: string;
  timezone: string;
  is_default: boolean;
  availability_rules: AvailabilityRule[];
  created_at: string;
  updated_at: string;
};

export type MeridianOrganization = {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  currency: string;
  logo_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Booking = MeridianBooking;
export type Staff = MeridianStaff;
export type Schedule = MeridianSchedule;

/** @deprecated Use MeridianService instead */
export type MeridianServiceAlias = MeridianService;
