import type { Metadata } from "next"
import { WishlistPage } from "@/components/storefront/storefront"

export const metadata: Metadata = { title: "Your wishlist | Leano Distributions", description: "Keep your favourite everyday finds close." }

export default function Page() { return <WishlistPage /> }
