// Types only — all catalog data lives in Supabase and is loaded live
// through lib/catalog.ts. Nothing is seeded locally.

export type Category = string

export type Product = {
  id: string
  slug: string
  name: string
  category: Category
  subcategory: string
  price: number
  compareAtPrice?: number
  images: string[]
  description: string
  features: string[]
  rating: number
  reviewCount: number
  stock: number
  tags: string[]
}

export type CategoryNav = {
  name: Category
  href: string
  description: string
  image: string
}

export const CURRENCY = "ZAR"
export const CURRENCY_SYMBOL = "R"
