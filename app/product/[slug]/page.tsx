import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { products } from "@/data/products"
import { ProductPage } from "@/components/storefront/storefront"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)
  if (!product) return { title: "Find your next favourite | Leano" }
  return { title: `${product.name} | Leano Distributions`, description: product.description, openGraph: { title: product.name, description: product.description, images: [product.images[0]] } }
}

export default async function ProductRoute({ params }: Props) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()
  return <><ProductPage product={product} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: product.name, image: product.images, description: product.description, offers: { "@type": "Offer", priceCurrency: "ZAR", price: product.price, availability: product.stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" }, ...(product.reviewCount > 0 ? { aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount } } : {}) }).replace(/</g, "\\u003c") }} /></>
}
