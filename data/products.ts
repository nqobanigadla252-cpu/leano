export type Category = "Baby Accessories" | "Kitchen & Homeware" | "Sports & Outdoors" | "Bags & Luggage"

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

export const CURRENCY = "ZAR"
export const CURRENCY_SYMBOL = "R"

const photos = {
  feeder: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.07-c04AjNflRZ1zQg7dhDdq9RqsuxCe7Y.jpeg",
  dispenser: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.04%20%282%29-H072PVlB3tsoRBmcm5zRALUj6gwoZm.jpeg",
  pouches: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.06%20%281%29-pu6MjKiLMjgJzsSI1658tYwEmseiNR.jpeg",
  lifestyleFeeder: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.05-rWUld5wIJrhLpKCVPaHklIikPV7lcq.jpeg",
  dimensions: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.04%20%281%29-Cnj2ym1UTHN38Z78qcR2X1CKgKQM82.jpeg",
  pouchUse: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.03-e7gbuRXEsM5HnEkJgnhx25SbSwHhCf.jpeg",
  thermometer: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.03%20%281%29-OL2FxZyQeKJ1iy5SupsMDBaTnSqqoJ.jpeg",
  thermometerSize: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.54-laFy6Tzp5wH0M5q36jsGgkPTnb4Bbf.jpeg",
  trimmerWash: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.04-Nz5GMjSx4vwQ0pQWRCnOccKyZOeglw.jpeg",
  babyHair: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.53%20%281%29-QZ9DErLhde1pmMNTQXCf54skE9wlo7.jpeg",
  trimmerKit: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.52%20%282%29-ZRd4HXZ8uJ7CefANM358exr0f4d22o.jpeg",
  feedingSet: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.52%20%283%29-uaAAQQPiPezUlXqZ7243scq4IyXzSN.jpeg",
  trimmerKitAlt: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.52%20%281%29-zQtoeABZTLIykpkMzfgfn8drcd12Ff.jpeg",
  feedingBags: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.52-7aJfX9frLier4uX2wtDN2VmSfaKpKx.jpeg",
  feltTote: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.06-Ws98Qbvz8ByoZOS2nf5ORplt5uGy9k.jpeg",
  headPanda: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.19-mF6ULnGI8rE7PvDu069Nfk1G7MasRp.jpeg",
  formulaOpen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.19%20%281%29-whFRUT5wvygcBZsuWXMPRSsdTWSQmt.jpeg",
  formulaColors: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.17%20%282%29-4XkxMEvUO4yW3z3pSZoILuiFBBoy7O.jpeg",
  formulaGo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.18-Wv4XhNg3OEBhHUBO0OSqcx1MmOKBGd.jpeg",
  headButterfly: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.17%20%281%29-yNpAPOc21KHHZlk3qGLOwPiLQDLaOJ.jpeg",
  formulaMint: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.17-nNBD1UC6POQOrisPw662AhhJIs1cIJ.jpeg",
  feederGreen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.14%20%282%29-ko3U4VyWGKfBIjpkCPAxAGXLtMYRCN.jpeg",
  headBee: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.15%20%281%29-pj6tlbawqlRth6nNFeuRZPbu2wKWLm.jpeg",
  cupHero: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.15-NEkK6T7YEZ2kJI2BeUpKzpNWLPMZZm.jpeg",
  cupFlatlay: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.14%20%281%29-h5rMVBOf7GcXVI1aIJ4WZASV5wxXLk.jpeg",
  feedingBowls: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.12%20%282%29-KXjGr8aPxVeOMcufAylVzE14mFgo3l.jpeg",
  cupColors: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.12%20%281%29-aY96KI7XHOZgpR6WX5UlG34kgkQJ0u.jpeg",
  feedingBowl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.14-HDhkXxP6pBMljCM7fHb9wEvuGpxeX0.jpeg",
  wetBag: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.13-7kT9N8TizfmP9PDFpw4CMEKUTEzR3x.jpeg",
  dryingRack: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.13%20%281%29-E7FbO1GWMzaBAfTKE1zke83hS4RAYp.jpeg",
  feedingBundle: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.12-YKGdwX8rfegjlnIv0U6ex7i75rcQAg.jpeg",
  suppliedFeltTote: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.06-L3z4aGByy0MqWJPdG9LqdydjUT8V9a.jpeg",
  suppliedJuicerLifestyle: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.05-kcxfdKr9f46RbFxH8ewws4GkvV9Oay.jpeg",
  suppliedJuicerDimensions: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.04%20%282%29-SPZAXN96NIdq9h36mobDUF3cViLxYF.jpeg",
  suppliedTrimmerWash: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.04-iMJE2yhuPc7YNDJNzC17iNzL6AAonR.jpeg",
  suppliedThermometerSize: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.54-exMQkoNyqoqIZTgL2SMGlhHhAWfBEf.jpeg",
  suppliedPouchUse: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.03-ns9OeGI9NLxu45a1dGGzwpZTG6IH5G.jpeg",
  suppliedThermometerGuide: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2013.53.03%20%281%29-ZRfQl7v573dG3866Ounm2A7VAlKW2h.jpeg",
  suppliedPouchSet: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.53%20%282%29-gK3ZfemBKUyW4RXWmEXQzLxqZn5uAg.jpeg",
  suppliedTrimmerBaby: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.53%20%281%29-WrlsUxszQxYxYEV1UvK6k4ebZ1Vbhk.jpeg",
  suppliedTrimmerSide: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.53-O1dTTC8w14YpHlkrivXRk02S3v3dta.jpeg",
  suppliedFeedingSetDimensions: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.52%20%283%29-9kQ1vg7otk1yTxCD0P2r3Wz7yK2qp0.jpeg",
  suppliedTrimmerKit: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.52%20%282%29-75DTEOd88nlGFyjTDgoqlHDHm6NSIy.jpeg",
  suppliedJuicerSet: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.52-BonwMh6pLxrRYcvjUvuKIkrCXutdrm.jpeg",
  suppliedBottleCarrier: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.51-rxloWCbNJBrQbiihS5p6VTL41eWK65.jpeg",
  suppliedThermometerFeatures: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%2012.56.50-r2WERDd9xofiiL232QbIsEZcSS5JbQ.jpeg",
}

// Replace images and prices with supplier-approved product assets and current retail pricing.
const remote = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`

export const products: Product[] = [
  { id: "baby-01", slug: "fresh-food-feeder-set", name: "Fresh Food Feeder Set", category: "Baby Accessories", subcategory: "Feeding", price: 289, compareAtPrice: 349, images: [photos.feeder, photos.feederGreen, photos.lifestyleFeeder], description: "A little more confidence at every first taste. This easy-to-hold feeder helps little ones explore fresh flavours, with soft spherical contact points and a reassuring grip.", features: ["Gentle, baby-friendly contact points", "Easy-grip handle", "Three cheerful colour options"], rating: 4.9, reviewCount: 38, stock: 14, tags: ["feeding", "baby", "bestseller"] },
  { id: "baby-02", slug: "baby-food-pouch-organiser", name: "Food Pouch Organiser", category: "Baby Accessories", subcategory: "Feeding", price: 399, images: [photos.dispenser, photos.dimensions, photos.suppliedJuicerLifestyle, photos.suppliedJuicerDimensions, photos.suppliedJuicerSet], description: "A tidy little home for everyday feeding. Keeps reusable pouches upright, organised and ready for busy mornings.", features: ["Compact countertop footprint", "Three bottle compartments", "Includes 10 reusable food bags"], rating: 4.8, reviewCount: 24, stock: 9, tags: ["feeding", "storage"] },
  { id: "baby-03", slug: "reusable-squeeze-pouch-set", name: "Reusable Squeeze Pouches · 17 pc", category: "Baby Accessories", subcategory: "Feeding", price: 329, compareAtPrice: 399, images: [photos.pouches, photos.pouchUse, photos.suppliedPouchUse, photos.suppliedPouchSet], description: "Make snacks from scratch and take them anywhere. A practical set of reusable pouches in three handy sizes.", features: ["17-piece set", "200 ml, 300 ml and 500 ml sizes", "Freezer-friendly design"], rating: 4.7, reviewCount: 31, stock: 21, tags: ["feeding", "travel", "bestseller"] },
  { id: "baby-04", slug: "non-contact-thermometer", name: "No-touch Digital Thermometer", category: "Baby Accessories", subcategory: "Bath Time", price: 549, compareAtPrice: 699, images: [photos.thermometer, photos.thermometerSize, photos.suppliedThermometerSize, photos.suppliedThermometerGuide, photos.suppliedThermometerFeatures], description: "A quick, contact-free temperature check with a clear colour display and gentle fever alert.", features: ["Non-contact forehead reading", "Easy-read colour display", "Compact, lightweight shape"], rating: 4.8, reviewCount: 52, stock: 11, tags: ["care", "health", "bestseller"] },
  { id: "baby-05", slug: "gentle-baby-hair-trimmer", name: "Gentle Baby Hair Trimmer", category: "Baby Accessories", subcategory: "Bath Time", price: 479, images: [photos.trimmerWash, photos.babyHair, photos.suppliedTrimmerWash, photos.suppliedTrimmerBaby, photos.suppliedTrimmerSide], description: "A calm, considered trim at home. The compact cordless shape is easy to hold and simple to rinse clean.", features: ["Washable head", "Quiet, gentle trimming", "Three colour options"], rating: 4.6, reviewCount: 19, stock: 8, tags: ["grooming", "care"] },
  { id: "baby-06", slug: "baby-grooming-kit", name: "Little One Grooming Kit", category: "Baby Accessories", subcategory: "Clothing Accessories", price: 599, images: [photos.trimmerKit, photos.trimmerKitAlt, photos.suppliedTrimmerKit], description: "Everything for easy at-home trims, thoughtfully gathered in one simple grooming set.", features: ["USB rechargeable trimmer", "Guide comb attachments", "Cleaning brush and cable included"], rating: 4.8, reviewCount: 27, stock: 12, tags: ["grooming", "gift"] },
  { id: "baby-07", slug: "silicone-feeding-bundle", name: "Soft Start Feeding Bundle", category: "Baby Accessories", subcategory: "Feeding", price: 699, compareAtPrice: 799, images: [photos.feedingSet, photos.feedingBags, photos.suppliedFeedingSetDimensions], description: "A soft, coordinated mealtime set made for first tastes and the happy messes that come with them.", features: ["Silicone bib and divided plate", "Training cup and spoon set", "Five soft colour options"], rating: 4.9, reviewCount: 41, stock: 6, tags: ["feeding", "gift", "new"] },
  { id: "baby-08", slug: "panda-travel-headrest", name: "Little Traveller Headrest", category: "Baby Accessories", subcategory: "Carriers & Strollers", price: 399, images: [photos.headPanda, photos.headButterfly, photos.headBee], description: "A soft, character-shaped travel cushion shown in panda, butterfly and bee designs for cosy-looking journeys.", features: ["Three playful character designs", "Soft plush exterior", "Compact travel-friendly shape"], rating: 4.8, reviewCount: 22, stock: 10, tags: ["travel", "comfort", "new"] },
  { id: "baby-09", slug: "bear-formula-dispenser", name: "Adorable Bear Formula Dispenser", category: "Baby Accessories", subcategory: "Feeding", price: 249, images: [photos.formulaOpen, photos.formulaColors, photos.formulaGo, photos.formulaMint], description: "A compact, handled container with a scoop for portioning powder at home or packing it for a day out.", features: ["Lidded container with carry loop", "Includes a portioning scoop", "Pastel colour options pictured"], rating: 4.8, reviewCount: 26, stock: 15, tags: ["feeding", "travel", "new"] },
  { id: "baby-10", slug: "personalised-silicone-cup", name: "Little Sips Training Cup", category: "Baby Accessories", subcategory: "Feeding", price: 329, images: [photos.cupHero, photos.cupFlatlay, photos.cupColors], description: "A soft-coloured handled cup with a spout lid, pictured in a range of mix-and-match shades.", features: ["Two easy-grip handles", "Spout-style lid", "Multiple colour options pictured"], rating: 4.7, reviewCount: 29, stock: 13, tags: ["feeding", "cup", "new"] },
  { id: "baby-11", slug: "silicone-bowl-and-spoon-set", name: "First Bites Bowl & Spoon Set", category: "Baby Accessories", subcategory: "Feeding", price: 279, images: [photos.feedingBowls, photos.feedingBowl, photos.feedingBundle], description: "A coordinated bowl and utensil set in gentle colours, arranged for easy little mealtimes.", features: ["Bowl with matching utensils pictured", "Several colour combinations shown", "Compact everyday tableware"], rating: 4.8, reviewCount: 33, stock: 12, tags: ["feeding", "tableware", "new"] },
  { id: "baby-12", slug: "bottle-drying-rack", name: "Branch Bottle Drying Rack", category: "Baby Accessories", subcategory: "Feeding", price: 349, images: [photos.dryingRack], description: "A countertop drying stand with branching holders and a catch tray for rinsed bottles and cups.", features: ["Multiple upright drying branches", "Removable catch tray", "Neutral grey-and-white palette"], rating: 4.7, reviewCount: 18, stock: 8, tags: ["feeding", "kitchen", "new"] },
  { id: "baby-13", slug: "leaf-print-wet-bag", name: "Big Leaf Everyday Wet Bag", category: "Baby Accessories", subcategory: "Bags & Organisers", price: 299, images: [photos.wetBag, photos.suppliedBottleCarrier], description: "A roomy, leafy-print zip bag shown beside nursery essentials, ready to tuck into a changing bag.", features: ["Leaf print exterior", "Top zip closure", "Wide carry strap pictured"], rating: 4.8, reviewCount: 21, stock: 11, tags: ["storage", "travel", "new"] },
  // Confirm supplier-approved prices and variant availability before launch.
  { id: "home-01", slug: "felt-storage-tote", name: "Everyday Felt Storage Tote", category: "Bags & Luggage", subcategory: "Organisers", price: 449, images: [photos.feltTote, photos.suppliedFeltTote], description: "A generous felt carry-all for toys, linens and the everyday things that deserve a home.", features: ["Structured felt body", "Comfortable carry handles", "Front zip pocket"], rating: 4.8, reviewCount: 16, stock: 12, tags: ["storage", "home"] },
  ...[
    ["home-02", "ribbed-stoneware-mug", "Ribbed Stoneware Mug Set", "Kitchen & Homeware", "Serveware", 329, "photo-1514228742587-6b1558fcca3d"],
    ["home-03", "linen-table-runner", "Washed Linen Table Runner", "Kitchen & Homeware", "Textiles", 479, "photo-1603199506016-b9a594b593c0"],
    ["home-04", "stackable-glass-containers", "Stackable Glass Container Set", "Kitchen & Homeware", "Storage", 569, "photo-1602143407151-7111542de6e8"],
    ["home-05", "cotton-kitchen-towels", "Everyday Cotton Tea Towels", "Kitchen & Homeware", "Textiles", 249, "photo-1600210492486-724fe5c67fb0"],
    ["home-06", "acacia-serving-board", "Acacia Serving Board", "Kitchen & Homeware", "Serveware", 389, "photo-1547592180-85f173990554"],
    ["home-07", "woven-market-basket", "Woven Market Basket", "Kitchen & Homeware", "Storage", 549, "photo-1590301157890-4810ed352733"],
    ["sport-01", "trail-daypack", "Weekend Trail Daypack", "Sports & Outdoors", "Hiking", 899, "photo-1553062407-98eeb64c6a62"],
    ["sport-02", "insulated-water-bottle", "Insulated Water Bottle", "Sports & Outdoors", "Hydration", 349, "photo-1602143407151-7111542de6e8"],
    ["sport-03", "picnic-blanket", "Water-Resistant Picnic Blanket", "Sports & Outdoors", "Outdoor Living", 649, "photo-1522277815853-4a4c5d62d5f1"],
    ["sport-04", "resistance-band-set", "Everyday Resistance Band Set", "Sports & Outdoors", "Fitness", 279, "photo-1517836357463-d25dfeac3438"],
    ["sport-05", "compact-yoga-mat", "Natural Cork Yoga Mat", "Sports & Outdoors", "Fitness", 799, "photo-1544367567-0f2fcb009e0b"],
    ["sport-06", "camp-mug-pair", "Enamel Camp Mug Pair", "Sports & Outdoors", "Camping", 299, "photo-1514228742587-6b1558fcca3d"],
    ["bag-01", "weekend-duffel", "The Weekend Duffel", "Bags & Luggage", "Travel", 1199, "photo-1553062407-98eeb64c6a62"],
    ["bag-02", "packing-cube-set", "Soft Travel Packing Cubes", "Bags & Luggage", "Organisers", 499, "photo-1553531384-397f05b5eb4a"],
    ["bag-03", "everyday-crossbody", "Everyday Crossbody Bag", "Bags & Luggage", "Everyday Bags", 699, "photo-1548036328-c9fa89d128fa"],
    ["bag-04", "canvas-market-tote", "Canvas Market Tote", "Bags & Luggage", "Everyday Bags", 349, "photo-1590874103328-eac38a683ce7"],
    ["bag-05", "zip-tech-organiser", "Travel Tech Organiser", "Bags & Luggage", "Organisers", 429, "photo-1553062407-98eeb64c6a62"],
    ["bag-06", "weekender-toiletry-case", "Weekender Toiletry Case", "Bags & Luggage", "Travel", 399, "photo-1584917865442-de89df76afd3"],
  ].map(([id, slug, name, category, subcategory, price, image]) => ({
    id: String(id), slug: String(slug), name: String(name), category: category as Category,
    subcategory: String(subcategory), price: Number(price), images: [remote(String(image))],
    description: `A thoughtful everyday essential, designed to make ${String(subcategory).toLowerCase()} feel a little simpler. Made to look at home in your routine and built for regular use.`,
    features: ["Made for everyday use", "Thoughtful, practical design", "A lovely gift for someone"], rating: 4.7, reviewCount: 18, stock: 10, tags: [String(subcategory).toLowerCase()]
  })),
  // Supplier pricing, stock and variants for these new items still need confirmation.
  { id: "home-08", slug: "stainless-steel-fruit-corer", name: "Stainless Steel Fruit Corer", category: "Kitchen & Homeware", subcategory: "Kitchen Tools", price: 149, images: ["/products/kitchen/core-remover-use.jpeg"], description: "A compact silver corer shown removing the centre from fruit and vegetables.", features: ["Silver metal finish", "Compact handheld design", "Shown with several ingredients"], rating: 0, reviewCount: 0, stock: 10, tags: ["kitchen", "prep"] },
  { id: "home-09", slug: "handled-perforated-food-strainer", name: "Handled Perforated Food Strainer", category: "Kitchen & Homeware", subcategory: "Kitchen Tools", price: 129, images: ["/products/kitchen/handled-strainer.jpeg"], description: "A small round white kitchen insert with a raised grip and perforated base.", features: ["Raised carry handle", "Perforated round base", "Approx. 13.1 cm across"], rating: 0, reviewCount: 0, stock: 10, tags: ["kitchen", "prep"] },
  { id: "home-10", slug: "stainless-steel-crinkle-cutter", name: "Stainless Steel Crinkle Cutter", category: "Kitchen & Homeware", subcategory: "Kitchen Tools", price: 179, images: ["/products/kitchen/crinkle-cutter-use.jpeg", "/products/kitchen/crinkle-cutter-detail.jpeg"], description: "A stainless-steel crinkle cutter with a dark handle, pictured slicing potatoes into ridged pieces.", features: ["Crinkle-edge stainless-steel blade", "Dark easy-grip handle", "Shown cutting potatoes"], rating: 0, reviewCount: 0, stock: 10, tags: ["kitchen", "prep"] },
  { id: "home-11", slug: "two-piece-meatball-maker", name: "Two-Piece Meatball Maker Set", category: "Kitchen & Homeware", subcategory: "Kitchen Tools", price: 229, images: ["/products/kitchen/meatball-maker.jpeg", "/products/kitchen/meatball-maker-pair.jpeg", "/products/kitchen/meatball-maker-use.jpeg", "/products/kitchen/meatball-maker-size.jpeg", "/products/kitchen/meatball-maker-serving.jpeg"], description: "A pair of silver hinged meatball makers shown shaping portions in two sizes.", features: ["Two sizes pictured", "Hinged metal design", "Approx. 17.8 cm and 16.5 cm long"], rating: 0, reviewCount: 0, stock: 10, tags: ["kitchen", "prep"] },
  { id: "home-12", slug: "wooden-handle-pastry-wheel", name: "Wooden-Handle Pastry Wheel", category: "Kitchen & Homeware", subcategory: "Baking Tools", price: 129, images: ["/products/kitchen/pastry-wheel.jpeg", "/products/kitchen/pastry-wheel-closeup.jpeg", "/products/kitchen/pastry-wheel-dough.jpeg"], description: "A fluted pastry wheel with a wooden handle, pictured cutting decorative edges in dough.", features: ["Fluted cutting wheel", "Wooden handle", "Shown cutting pastry dough"], rating: 0, reviewCount: 0, stock: 10, tags: ["kitchen", "baking"] },
  { id: "home-13", slug: "stainless-steel-melon-baller", name: "Stainless Steel Melon Baller", category: "Kitchen & Homeware", subcategory: "Kitchen Tools", price: 119, images: ["/products/kitchen/melon-baller.jpeg"], description: "A silver scoop shown lifting a round piece of watermelon.", features: ["Silver metal finish", "Rounded scoop head", "Shown serving watermelon"], rating: 0, reviewCount: 0, stock: 10, tags: ["kitchen", "fruit"] },
  { id: "home-14", slug: "stainless-steel-ice-cream-scoops", name: "Stainless Steel Ice Cream Scoop Set", category: "Kitchen & Homeware", subcategory: "Serveware", price: 199, images: ["/products/kitchen/ice-cream-scoop-set.jpeg", "/products/kitchen/ice-cream-scoop-use.jpeg"], description: "A pair of silver scoops pictured portioning ice cream and serving fruit.", features: ["Two scoops pictured", "Silver metal finish", "Shown with ice cream and fruit"], rating: 0, reviewCount: 0, stock: 10, tags: ["kitchen", "serveware"] }
]

export const categories: { name: Category; href: string; description: string; image: string }[] = [
  { name: "Baby Accessories", href: "/shop/baby-accessories", description: "Little comforts for big beginnings.", image: photos.lifestyleFeeder },
  { name: "Kitchen & Homeware", href: "/shop/kitchen-homeware", description: "Good things for the everyday table.", image: remote("photo-1600210492486-724fe5c67fb0") },
  { name: "Sports & Outdoors", href: "/shop/sports-outdoors", description: "A little more outside, a little more often.", image: remote("photo-1472396961693-142e6e269027") },
  { name: "Bags & Luggage", href: "/shop/bags-luggage", description: "Ready when the day takes you somewhere.", image: photos.feltTote },
]
