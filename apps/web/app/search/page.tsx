"use client"

import { use } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { ProductCard, SiteHeader } from "@/components/storefront/storefront"
import { useCatalog } from "@/lib/catalog"

export default function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = use(searchParams)
  const { products } = useCatalog()
  const query = q.toLowerCase()
  const results = products.filter((product) =>
    `${product.name} ${product.category} ${product.subcategory} ${product.tags.join(" ")}`.toLowerCase().includes(query),
  )

  return (
    <>
      <SiteHeader />
      <main className="search-page">
        <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Search</span></div>
        <p className="eyebrow">A GOOD LITTLE FIND</p>
        <h1>Search <em>Leano.</em></h1>
        <form className="search-page-form">
          <Search />
          <input aria-label="Search products" name="q" defaultValue={q} placeholder="Try ‘feeding’ or ‘travel’" />
          <button>Search</button>
        </form>
        <p className="search-count">{q ? `${results.length} thoughtful finds for “${q}”` : "A few things to get you started"}</p>
        {results.length ? (
          <div className="catalog-grid">{results.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
        ) : (
          <div className="wishlist-empty">
            <Search />
            <h2>No finds for that search.</h2>
            <p>Try another word, or browse one of our collections.</p>
            <Link className="button button-dark" href="/">Browse collections</Link>
          </div>
        )}
      </main>
    </>
  )
}
