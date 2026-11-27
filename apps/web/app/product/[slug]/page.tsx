"use client"

import { use } from "react"
import Link from "next/link"
import { ProductPage, SiteHeader } from "@/components/storefront/storefront"
import { useCatalog } from "@/lib/catalog"

export default function ProductRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { products, loaded } = useCatalog()

  if (!loaded) {
    return (
      <>
        <SiteHeader />
        <main className="search-page">
          <p className="eyebrow">LOADING</p>
          <h1>One moment<em>.</em></h1>
        </main>
      </>
    )
  }

  const product = products.find((item) => item.slug === slug)

  if (!product) {
    return (
      <>
        <SiteHeader />
        <main className="search-page">
          <p className="eyebrow">NOT FOUND</p>
          <h1>This one got <em>away.</em></h1>
          <p>That product isn&apos;t available right now.</p>
          <Link className="button button-dark" href="/">Back to the shop</Link>
        </main>
      </>
    )
  }

  return <ProductPage product={product} />
}
