"use server";

import { createClient } from "@/lib/supabase/server";
import type { Category, Product } from "@/lib/types";

const PRODUCT_SELECT = `
  id, name, slug, sku, description, price, sale_price, stock_qty,
  is_published, is_featured, is_bestseller, is_new, warranty_text, category_id,
  brand:brands ( id, name, slug ),
  category:categories ( slug ),
  images:product_images ( id, url, sort_order )
`;

export async function getFeaturedCategories(limit = 8): Promise<Category[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .is("parent_id", null)
      .eq("is_active", true)
      .order("sort_order")
      .limit(limit);

    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) return [];
    return (data ?? []) as unknown as Product[];
  } catch {
    return [];
  }
}

export async function getProductsByCategory(
  categoryId: string,
  {
    sort = "featured",
    limit = 10,
  }: { sort?: "featured" | "price_asc" | "price_desc" | "newest"; limit?: number } = {}
): Promise<Product[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("category_id", categoryId)
      .eq("is_published", true);

    if (sort === "price_asc") query = query.order("price", { ascending: true });
    else if (sort === "price_desc") query = query.order("price", { ascending: false });
    else if (sort === "newest") query = query.order("created_at", { ascending: false });
    else query = query.order("is_featured", { ascending: false });

    const { data, error } = await query.limit(limit);
    if (error) return [];
    return (data ?? []) as unknown as Product[];
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select(
        `${PRODUCT_SELECT},
         attributes:product_attributes (
           attribute:attributes ( name ),
           attribute_value:attribute_values ( value )
         )`
      )
      .eq("slug", slug)
      .maybeSingle();

    if (error) return null;
    if (!data) return null;

    const raw = data as unknown as Record<string, unknown>;
    const flatAttributes = ((raw.attributes as unknown[]) ?? []).map((row: any) => ({
      attribute_name: row.attribute?.name,
      value: row.attribute_value?.value,
    }));

    return { ...(data as unknown as Product), attributes: flatAttributes };
  } catch {
    return null;
  }
}

export async function getServices() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order");

    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}
