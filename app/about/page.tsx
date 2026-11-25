import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/storefront/storefront"

export const metadata: Metadata = { title: "Our story | Leano Distributions", description: "Good things for the everyday, thoughtfully found." }

export default function AboutPage() { return <><SiteHeader /><main className="info-page"><p className="eyebrow">A LITTLE ABOUT US</p><h1>Good things for<br /><em>the everyday.</em></h1><p className="info-lead">Leano is about the useful little things that make home feel more like yours.</p><div className="info-story"><p>We believe a good find should earn its place. It should make a routine simpler, a weekend more comfortable, or an ordinary moment feel a bit more considered.</p><p>That’s why our collections bring together practical, thoughtful essentials for growing families, welcoming homes and people always ready for their next adventure.</p><p>We’re glad you found us. Make yourself at home.</p></div><Link className="button button-coral" href="/shop/baby-accessories">Explore our collections</Link></main></> }
