import type { Metadata } from "next"
import { CatalogPage } from "@/components/storefront/storefront"

const titles: Record<string, string> = {
  "baby-accessories": "Baby Accessories",
  "kitchen-homeware": "Kitchen & Homeware",
  "sports-outdoors": "Sports & Outdoors",
  "bags-luggage": "Bags & Luggage",
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const title = titles[category] ?? "Shop all"
  return { title: `${title} | Leano Distributions`, description: `Thoughtful ${title.toLowerCase()} finds for everyday living, chosen with care by Leano Distributions.` }
}

export default async function ShopCategory({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  return <CatalogPage categoryName={category} />
}
