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
}

// Replace images and prices with supplier-approved product assets and current retail pricing.
const remote = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`

export const products: Product[] = [
  { id: "baby-01", slug: "fresh-food-feeder-set", name: "Fresh Food Feeder Set", category: "Baby Accessories", subcategory: "Feeding", price: 289, compareAtPrice: 349, images: [photos.feeder, photos.lifestyleFeeder], description: "A little more confidence at every first taste. This easy-to-hold feeder helps little ones explore fresh flavours, with soft spherical contact points and a reassuring grip.", features: ["Gentle, baby-friendly contact points", "Easy-grip handle", "Three cheerful colour options"], rating: 4.9, reviewCount: 38, stock: 14, tags: ["feeding", "baby", "bestseller"] },
  { id: "baby-02", slug: "baby-food-pouch-organiser", name: "Food Pouch Organiser", category: "Baby Accessories", subcategory: "Feeding", price: 399, images: [photos.dispenser, photos.dimensions], description: "A tidy little home for everyday feeding. Keeps reusable pouches upright, organised and ready for busy mornings.", features: ["Compact countertop footprint", "Three bottle compartments", "Includes 10 reusable food bags"], rating: 4.8, reviewCount: 24, stock: 9, tags: ["feeding", "storage"] },
  { id: "baby-03", slug: "reusable-squeeze-pouch-set", name: "Reusable Squeeze Pouches · 17 pc", category: "Baby Accessories", subcategory: "Feeding", price: 329, compareAtPrice: 399, images: [photos.pouches, photos.pouchUse], description: "Make snacks from scratch and take them anywhere. A practical set of reusable pouches in three handy sizes.", features: ["17-piece set", "200 ml, 300 ml and 500 ml sizes", "Freezer-friendly design"], rating: 4.7, reviewCount: 31, stock: 21, tags: ["feeding", "travel", "bestseller"] },
  { id: "baby-04", slug: "non-contact-thermometer", name: "No-touch Digital Thermometer", category: "Baby Accessories", subcategory: "Bath Time", price: 549, compareAtPrice: 699, images: [photos.thermometer, photos.thermometerSize], description: "A quick, contact-free temperature check with a clear colour display and gentle fever alert.", features: ["Non-contact forehead reading", "Easy-read colour display", "Compact, lightweight shape"], rating: 4.8, reviewCount: 52, stock: 11, tags: ["care", "health", "bestseller"] },
  { id: "baby-05", slug: "gentle-baby-hair-trimmer", name: "Gentle Baby Hair Trimmer", category: "Baby Accessories", subcategory: "Bath Time", price: 479, images: [photos.trimmerWash, photos.babyHair], description: "A calm, considered trim at home. The compact cordless shape is easy to hold and simple to rinse clean.", features: ["Washable head", "Quiet, gentle trimming", "Three colour options"], rating: 4.6, reviewCount: 19, stock: 8, tags: ["grooming", "care"] },
  { id: "baby-06", slug: "baby-grooming-kit", name: "Little One Grooming Kit", category: "Baby Accessories", subcategory: "Clothing Accessories", price: 599, images: [photos.trimmerKit, photos.trimmerKitAlt], description: "Everything for easy at-home trims, thoughtfully gathered in one simple grooming set.", features: ["USB rechargeable trimmer", "Guide comb attachments", "Cleaning brush and cable included"], rating: 4.8, reviewCount: 27, stock: 12, tags: ["grooming", "gift"] },
  { id: "baby-07", slug: "silicone-feeding-bundle", name: "Soft Start Feeding Bundle", category: "Baby Accessories", subcategory: "Feeding", price: 699, compareAtPrice: 799, images: [photos.feedingSet, photos.feedingBags], description: "A soft, coordinated mealtime set made for first tastes and the happy messes that come with them.", features: ["Silicone bib and divided plate", "Training cup and spoon set", "Five soft colour options"], rating: 4.9, reviewCount: 41, stock: 6, tags: ["feeding", "gift", "new"] },
  { id: "home-01", slug: "felt-storage-tote", name: "Everyday Felt Storage Tote", category: "Bags & Luggage", subcategory: "Organisers", price: 449, images: [photos.feltTote], description: "A generous felt carry-all for toys, linens and the everyday things that deserve a home.", features: ["Structured felt body", "Comfortable carry handles", "Front zip pocket"], rating: 4.8, reviewCount: 16, stock: 12, tags: ["storage", "home"] },
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
  }))
]

export const categories: { name: Category; href: string; description: string; image: string }[] = [
  { name: "Baby Accessories", href: "/shop/baby-accessories", description: "Little comforts for big beginnings.", image: photos.lifestyleFeeder },
  { name: "Kitchen & Homeware", href: "/shop/kitchen-homeware", description: "Good things for the everyday table.", image: remote("photo-1600210492486-724fe5c67fb0") },
  { name: "Sports & Outdoors", href: "/shop/sports-outdoors", description: "A little more outside, a little more often.", image: remote("photo-1472396961693-142e6e269027") },
  { name: "Bags & Luggage", href: "/shop/bags-luggage", description: "Ready when the day takes you somewhere.", image: photos.feltTote },
]
