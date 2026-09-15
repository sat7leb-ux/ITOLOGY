import Link from "next/link";
import {
  Laptop,
  Cpu,
  Router,
  ShieldCheck,
  Server,
  Monitor,
  Keyboard,
  Smartphone,
  Wrench,
  Cloud,
  LifeBuoy,
  Headset,
  ArrowRight,
  Truck,
  ShieldCheck as ShieldIcon,
  Clock,
  Zap,
  TrendingUp,
  ChevronRight,
  Package,
} from "lucide-react";
import { CategoryTile } from "@/components/category-tile";
import { ProductCard } from "@/components/product-card";
import { getFeaturedCategories, getFeaturedProducts, getProductsByCategory, getServices } from "@/lib/data";
import type { Category, Product } from "@/lib/types";

const CATEGORY_ICONS: Record<string, any> = {
  computers: Laptop,
  components: Cpu,
  networking: Router,
  cybersecurity: ShieldCheck,
  "servers-storage": Server,
  displays: Monitor,
  accessories: Keyboard,
  gadgets: Smartphone,
};

const SERVICE_ICONS: Record<string, typeof Cloud> = {
  "it-consulting": Headset,
  "managed-it": ShieldIcon,
  cloud: Cloud,
  support: LifeBuoy,
};

async function safe<T>(fn: () => Promise<T>): Promise<T | undefined> {
  try {
    return await fn();
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export default async function HomePage() {
  const categoriesResult = await safe(getFeaturedCategories);
  const featuredProductsResult = await safe(getFeaturedProducts);
  const servicesResult = await safe(getServices);

  const categories: Category[] = categoriesResult ?? [];
  const featuredProducts: Product[] = featuredProductsResult ?? [];
  const services: any[] = servicesResult ?? [];

  // Get products for each category
  const categoryProducts: Record<string, any[]> = {};
  for (const cat of categories) {
    const products = await safe(() => getProductsByCategory(cat.id, { limit: 8 }));
    categoryProducts[cat.slug] = products ?? [];
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-text-onDark overflow-hidden">
        <div className="container-page py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-jade/10 border border-jade/20 text-jade-light text-xs font-medium mb-6">
                <Zap size={12} />
                New: Enterprise server solutions
              </div>
              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Technology infrastructure,{" "}
                <span className="text-jade-light">sourced and supported</span> in one place.
              </h1>
              <p className="mt-6 max-w-[46ch] text-text-onDark/70 text-lg">
                ITOLOGY supplies the hardware your business runs on and the IT
                expertise to install, secure, and maintain it — from a single
                laptop to a full network build-out.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/shop" className="inline-flex items-center gap-2 rounded-md bg-jade px-7 py-3.5 text-sm font-semibold text-ink hover:bg-jade-light">
                  Shop hardware
                  <ArrowRight size={16} />
                </Link>
                <Link href="/services" className="inline-flex items-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold hover:border-jade-light hover:text-jade-light">
                  Explore IT services
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-text-onDark/60">
                <span className="flex items-center gap-2">
                  <Truck size={16} className="text-jade-light" />
                  Free shipping $200+
                </span>
                <span className="flex items-center gap-2">
                  <ShieldIcon size={16} className="text-jade-light" />
                  2-year warranty
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-jade-light" />
                  24/7 support
                </span>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 gap-4 p-6">
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    <Laptop size={48} className="text-jade-light/60" />
                  </div>
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mt-6">
                    <Server size={48} className="text-jade-light/60" />
                  </div>
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center -mt-6">
                    <Router size={48} className="text-jade-light/60" />
                  </div>
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    <ShieldCheck size={48} className="text-jade-light/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white border-b border-line">
        <div className="container-page">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Shop by category</h2>
              <p className="mt-1 text-text-muted">Find exactly what you need</p>
            </div>
            <Link href="/shop" className="text-sm text-jade-dark font-medium hover:text-jade flex items-center gap-1">
              View all
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {categories.map((cat: Category) => (
              <CategoryTile
                key={cat.id}
                name={cat.name}
                slug={cat.slug}
                icon={CATEGORY_ICONS[cat.slug] ?? Laptop}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="container-page">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Featured products</h2>
                <p className="mt-1 text-text-muted">Hand-picked by our team</p>
              </div>
              <Link href="/shop" className="text-sm text-jade-dark font-medium hover:text-jade flex items-center gap-1">
                View all
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categorySlug={product.category?.slug ?? "computers"}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products by Category */}
      {categories.map((cat: Category) => {
        const products = categoryProducts[cat.slug] ?? [];
        if (products.length === 0) return null;
        return (
          <section key={cat.id} className="py-16 border-t border-line">
            <div className="container-page">
              <div className="flex items-end justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-jade/10 flex items-center justify-center">
                    {(CATEGORY_ICONS[cat.slug] ?? Laptop)({ size: 20, className: "text-jade" } as any)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{cat.name}</h2>
                    <p className="text-sm text-text-muted">{cat.description}</p>
                  </div>
                </div>
                <Link href={`/shop/${cat.slug}`} className="text-sm text-jade-dark font-medium hover:text-jade flex items-center gap-1">
                  View all
                  <ChevronRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categorySlug={cat.slug}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* IT Services */}
      <section className="py-16 bg-ink text-text-onDark">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold">IT services</h2>
            <p className="mt-3 text-text-onDark/70">
              Hardware is half the job. Our engineers install, secure, and support the systems you buy.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(services.length ? services : []).map((service) => {
              const Icon = SERVICE_ICONS[service.slug] ?? Headset;
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group p-6 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] hover:border-jade/30 transition"
                >
                  <div className="w-12 h-12 rounded-lg bg-jade/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-jade-light" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{service.name}</h3>
                  <p className="mt-2 text-sm text-text-onDark/60">{service.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-jade text-ink">
        <div className="container-page py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl font-bold max-w-[28ch]">
            Talk to us before your next infrastructure purchase.
          </h2>
          <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 rounded-md bg-ink px-7 py-3.5 text-sm font-semibold text-text-onDark hover:bg-ink/90">
            Contact sales
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
