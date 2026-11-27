import type { Metadata } from "next"
import { SiteHeader } from "@/components/storefront/storefront"

export const metadata: Metadata = { title: "Frequently asked | Leano Distributions", description: "Answers to a few common questions about shopping with Leano." }
const questions = [
  ["How much is delivery?", "Delivery is free on orders over R500. Orders below that threshold will have the delivery cost shown when you get in touch to arrange your order."],
  ["How do I place an order?", "Add the things you love to your bag, then choose Order on WhatsApp. We’ll confirm availability, delivery details and payment with you directly."],
  ["Can I return an item?", "Please contact us within 7 days of receiving your order if something isn’t right. We’ll help you find a fair solution. Items should be unused and in their original packaging."],
  ["Are product colours exact?", "We do our best to represent every item accurately. Colours can look a little different across screens and in different lighting."],
  ["How can I reach you?", "Send us a note at hello@leanodistributions.co.za or use the WhatsApp link in the footer. We’re around Monday to Friday, 9 to 5."],
]
export default function FaqPage() { return <><SiteHeader /><main className="info-page faq-page"><p className="eyebrow">HERE TO HELP</p><h1>A few <em>good answers.</em></h1><p className="info-lead">Still wondering? We’re only a message away.</p><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></main></> }
