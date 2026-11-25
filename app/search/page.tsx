import type { Metadata } from "next"
import Link from "next/link"
import { Search } from "lucide-react"
import { products } from "@/data/products"
import { ProductCard, SiteHeader } from "@/components/storefront/storefront"

export const metadata: Metadata = { title: "Search | Leano Distributions", description: "Find your next everyday favourite." }

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams
  const results = products.filter((product) => `${product.name} ${product.category} ${product.subcategory} ${product.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()))
  return <><SiteHeader /><main className="search-page"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Search</span></div><p className="eyebrow">A GOOD LITTLE FIND</p><h1>Search <em>Leano.</em></h1><form className="search-page-form"><Search /><input aria-label="Search products" name="q" defaultValue={q} placeholder="Try ‘feeding’ or ‘travel’" /><button>Search</button></form><p className="search-count">{q ? `${results.length} thoughtful finds for “${q}”` : "A few things to get you started"}</p>{results.length ? <div className="catalog-grid">{results.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <div className="wishlist-empty"><Search /><h2>No finds for that search.</h2><p>Try another word, or browse one of our collections.</p><Link className="button button-dark" href="/shop/baby-accessories">Browse collections</Link></div>}</main></>
}
