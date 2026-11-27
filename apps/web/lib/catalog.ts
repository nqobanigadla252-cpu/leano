"use client"

import { create } from "zustand"
import { supabase } from "./supabase"
import type { CategoryNav, Product } from "@/data/products"

// Curated lifestyle photos so the store looks beautiful even before
// products/categories exist. Chosen to match the shop's warm, neutral aesthetic.
export const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85", // insulated bottle
  "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85", // porcelain mug
  "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85", // soft linens
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85", // acacia serving board
  "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=900&q=85", // woven basket
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85", // serving tray
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85", // kitchen textiles
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=85", // cork yoga mat
]

export const FALLBACK_IMAGE = FALLBACK_IMAGES[1]

// deterministic pick — each category always gets the same image
export function fallbackFor(key: string): string {
  let hash = 0
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length]
}

export const categorySlug = (name: string) =>
  name.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")

function rowToProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category ?? "",
    subcategory: row.subcategory ?? "",
    price: Number(row.price ?? 0),
    compareAtPrice: row.compare_at_price == null ? undefined : Number(row.compare_at_price),
    images: row.images?.length ? row.images : [FALLBACK_IMAGE],
    description: row.description ?? "",
    features: row.features ?? [],
    rating: Number(row.rating ?? 4.8),
    reviewCount: row.review_count ?? 0,
    stock: row.stock ?? 0,
    tags: row.tags ?? [],
  }
}

async function fetchCatalog(set: (partial: Partial<CatalogState>) => void) {
  const [{ data: productRows }, { data: categoryRows }] = await Promise.all([
    supabase.from("products").select("*").eq("status", "Active").order("created_at", { ascending: false }),
    supabase.from("categories").select("*").order("created_at", { ascending: true }),
  ])

  const products = (productRows ?? []).map(rowToProduct)

  const categories: CategoryNav[] = (categoryRows ?? []).map((row) => ({
    name: row.name,
    href: `/shop/${categorySlug(row.name)}`,
    description: row.description ?? "",
    image: row.image ?? products.find((p) => p.category === row.name)?.images[0] ?? fallbackFor(row.name),
  }))

  set({ products, categories, loaded: true })
}

type CatalogState = {
  products: Product[]
  categories: CategoryNav[]
  loaded: boolean
  load: () => void
}

let started = false

export const useCatalog = create<CatalogState>()((set) => ({
  products: [],
  categories: [],
  loaded: false,
  load: () => {
    // idempotent — safe to call from every component
    if (started || typeof window === "undefined") return
    started = true
    fetchCatalog(set)
    // realtime: re-fetch whenever the catalog changes in the portal
    supabase
      .channel("storefront-catalog")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => fetchCatalog(set))
      .on("postgres_changes", { event: "*", schema: "public", table: "categories" }, () => fetchCatalog(set))
      .subscribe()
  },
}))
