"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Check, ChevronDown, Heart, Menu, Minus, Moon, Plus, Search, ShoppingBag, Sparkles, Star, Sun, User, X } from "lucide-react"
import { CURRENCY_SYMBOL, type Category, type Product } from "@/data/products"
import { useCatalog, FALLBACK_IMAGE, FALLBACK_IMAGES } from "@/lib/catalog"
import { useStore } from "@/components/storefront/store"

const formatPrice = (price: number) => `${CURRENCY_SYMBOL}${price.toLocaleString("en-ZA")}`
const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } } }

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addToCart = useStore((state) => state.addToCart)
  const toggleWishlist = useStore((state) => state.toggleWishlist)
  const liked = useStore((state) => state.wishlist.includes(product.id))
  return <motion.article variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ delay: index * .04 }} className="product-card group">
    <div className="product-visual">
      <Link href={`/product/${product.slug}`} className="product-image-link" aria-label={`View ${product.name}`}>
        <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 80vw, (max-width: 1000px) 42vw, 24vw" className="product-image" unoptimized />
        {product.images[1] && <Image src={product.images[1]} alt={`${product.name}, alternate view`} fill sizes="(max-width: 640px) 80vw, (max-width: 1000px) 42vw, 24vw" className="product-image product-image-alt" unoptimized />}
      </Link>
      {product.compareAtPrice && <span className="product-badge">A little less</span>}
      <button className={`heart-button ${liked ? "is-liked" : ""}`} aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} onClick={() => toggleWishlist(product.id)}><Heart fill={liked ? "currentColor" : "none"} /></button>
      <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to bag`}>Quick add <Plus /></button>
    </div>
    <div className="product-meta"><div><Link href={`/product/${product.slug}`} className="product-name">{product.name}</Link><p>{product.subcategory}</p></div><span className="product-price">{formatPrice(product.price)}</span></div>
    <div className="rating-line"><span aria-label={`${product.rating} out of 5 stars`}><Star fill="currentColor" /> {product.rating}</span><span>({product.reviewCount})</span></div>
  </motion.article>
}

function CartPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const cart = useStore((state) => state.cart)
  const remove = useStore((state) => state.removeFromCart)
  const setQuantity = useStore((state) => state.setQuantity)
  const total = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
  const count = cart.reduce((sum, line) => sum + line.quantity, 0)
  const whatsapp = `https://wa.me/27000000000?text=${encodeURIComponent(`Hello Leano, I'd like to order:\n${cart.map((line) => `${line.quantity} × ${line.product.name} — ${formatPrice(line.product.price * line.quantity)}`).join("\n")}\nTotal: ${formatPrice(total)}`)}`
  return <AnimatePresence>{open && <><motion.button className="scrim" aria-label="Close bag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} /><motion.aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }}>
    <div className="drawer-head"><div><p className="eyebrow">YOUR LITTLE EDIT</p><h2 id="cart-title">Your bag <span>({count})</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Close bag"><X /></button></div>
    {total > 0 && <div className="delivery-progress"><div className="progress-copy">{total >= 500 ? "Lovely — delivery is on us." : `You’re ${formatPrice(500 - total)} away from free delivery`}</div><div className="progress-track"><span style={{ width: `${Math.min(total / 500 * 100, 100)}%` }} /></div></div>}
    <div className="cart-lines">{cart.length === 0 ? <div className="empty-cart"><ShoppingBag /><h3>Your bag is taking a breather.</h3><p>Find something useful, lovely or both.</p><button className="button button-dark" onClick={onClose}>Keep exploring <ArrowRight /></button></div> : cart.map((line) => <div className="cart-line" key={line.product.id}><div className="cart-thumb"><Image src={line.product.images[0]} alt="" fill sizes="80px" unoptimized /></div><div className="cart-line-info"><Link href={`/product/${line.product.slug}`} onClick={onClose}>{line.product.name}</Link><span>{formatPrice(line.product.price)}</span><div className="qty-stepper"><button aria-label="Decrease quantity" onClick={() => setQuantity(line.product.id, line.quantity - 1)}><Minus /></button><span>{line.quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(line.product.id, line.quantity + 1)}><Plus /></button></div></div><button className="remove-line" onClick={() => remove(line.product.id)} aria-label={`Remove ${line.product.name}`}><X /></button></div>)}</div>
    {cart.length > 0 && <div className="cart-footer"><div className="subtotal"><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><p>Shipping and any applicable discounts calculated at checkout.</p><a className="button button-coral checkout-button" href={whatsapp} target="_blank" rel="noreferrer">Order on WhatsApp <ArrowRight /></a><button className="text-link" onClick={onClose}>Continue shopping</button></div>}
  </motion.aside></>}</AnimatePresence>
}

export function SiteHeader() {
  const { products, categories, load } = useCatalog()
  useEffect(() => { load() }, [load])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [dark, setDark] = useState(false)
  useEffect(() => { const saved = window.localStorage.getItem("leano-theme") === "dark"; setDark(saved); document.documentElement.classList.toggle("dark", saved) }, [])
  const toggleTheme = () => { const next = !dark; setDark(next); document.documentElement.classList.toggle("dark", next); window.localStorage.setItem("leano-theme", next ? "dark" : "light") }
  const count = useStore((state) => state.cart.reduce((sum, line) => sum + line.quantity, 0))
  const results = useMemo(() => query.trim() ? products.filter((product) => `${product.name} ${product.category} ${product.subcategory}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : [], [query])
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true) } if (event.key === "Escape") { setSearchOpen(false); setCartOpen(false); setMenuOpen(false) } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey) }, [])
  return <>
    <div className="announcement"><span className="announcement-dot" /> A little something for your everyday <span className="announcement-divider">·</span> Free delivery over R500</div>
    <header className="site-header"><div className="header-inner"><button className="mobile-menu icon-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></button>
      <Link href="/" className="wordmark" aria-label="Leano Distributions homepage"><span className="wordmark-symbol">l</span><span>leano<small>distributions</small></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation"><Link href="/">Home</Link><Link href="/shop/all">Shop all</Link>{categories.slice(0, 4).map((category) => <Link key={category.name} href={category.href}>{category.name}</Link>)}<Link href="/about">About</Link></nav>
      <div className="header-actions"><button className="icon-button search-trigger" aria-label="Search products" onClick={() => setSearchOpen(true)}><Search /><span>Search</span><kbd>⌘ K</kbd></button><Link className="icon-button" href="/account" aria-label="Your account"><User /></Link><Link className="icon-button wishlist-link" href="/wishlist" aria-label="Wishlist"><Heart /></Link><button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <Sun /> : <Moon />}</button><button className="icon-button bag-trigger" onClick={() => setCartOpen(true)} aria-label={`Shopping bag, ${count} items`}><ShoppingBag /><span className="bag-count">{count}</span></button></div>
    </div></header>
    <AnimatePresence>{menuOpen && <><motion.button className="scrim" aria-label="Close navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} /><motion.nav className="mobile-drawer" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} aria-label="Mobile navigation"><div className="drawer-head"><Link href="/" className="wordmark" onClick={() => setMenuOpen(false)}>leano</Link><button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button></div><Link href="/" onClick={() => setMenuOpen(false)}>Home<ArrowRight /></Link><Link href="/shop/all" onClick={() => setMenuOpen(false)}>Shop all<ArrowRight /></Link>{categories.map((category) => <Link key={category.name} href={category.href} onClick={() => setMenuOpen(false)}>{category.name}<ArrowRight /></Link>)}<Link href="/wishlist" onClick={() => setMenuOpen(false)}>Your wishlist<Heart /></Link><Link href="/account" onClick={() => setMenuOpen(false)}>Your account<User /></Link><Link href="/about" onClick={() => setMenuOpen(false)}>Our story<ArrowRight /></Link><Link href="/contact" onClick={() => setMenuOpen(false)}>Get in touch<ArrowRight /></Link></motion.nav></>}</AnimatePresence>
    <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    <AnimatePresence>{searchOpen && <><motion.button className="search-scrim" aria-label="Close search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSearchOpen(false)} /><motion.div className="search-modal" role="dialog" aria-modal="true" aria-label="Search Leano" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}><div className="search-input-wrap"><Search /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What are you looking for?" aria-label="Search products" /><kbd>ESC</kbd><button className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></button></div><div className="search-results">{query ? results.length ? results.map((product) => <Link key={product.id} href={`/product/${product.slug}`} onClick={() => setSearchOpen(false)}><div className="search-result-image"><Image src={product.images[0]} alt="" fill sizes="48px" unoptimized /></div><span>{product.name}<small>{product.category}</small></span><span>{formatPrice(product.price)}</span><ArrowUpRight /></Link>) : <p className="search-empty">No little finds for “{query}”. Try another search.</p> : <><p className="eyebrow">A FEW GOOD PLACES TO START</p>{["Baby feeding", "Storage", "Travel"].map((item) => <button className="search-suggestion" key={item} onClick={() => setQuery(item)}>{item}<ArrowUpRight /></button>)}</>}</div></motion.div></>}</AnimatePresence>
  </>
}

export function HomePage() {
  const { products, categories } = useCatalog()
  const [activeCategory, setActiveCategory] = useState<Category>("")
  const activeTab = categories.some((c) => c.name === activeCategory) ? activeCategory : (categories[0]?.name ?? "")
  const displayCategories = categories.length ? categories : [
    { name: "Kitchen & Homeware", href: "/shop/all", description: "Good things for the everyday table.", image: FALLBACK_IMAGES[1] },
    { name: "Textiles", href: "/shop/all", description: "Softness for every corner of home.", image: FALLBACK_IMAGES[2] },
    { name: "Sports & Outdoors", href: "/shop/all", description: "A little more outside, a little more often.", image: FALLBACK_IMAGES[7] },
    { name: "Bags & Luggage", href: "/shop/all", description: "Ready when the day takes you somewhere.", image: FALLBACK_IMAGES[4] },
  ]
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const featured = products.filter((product) => product.category === "Baby Accessories").slice(0, 5)
  const bestsellers = products.filter((product) => product.category === activeTab).slice(0, 4)
  return <>
    <SiteHeader />
    <main>
      <section className="hero section-shell"><motion.div className="hero-copy" initial="hidden" animate="visible" variants={reveal}><p className="eyebrow"><span className="eyebrow-rule" /> GOOD THINGS, FOR EVERYDAY</p><h1>Everyday made<br /><em>a little more</em> <span>lovely.</span></h1><p className="hero-intro">Thoughtful finds for the people and places you love. From first feeds to faraway weekends.</p><div className="hero-actions"><Link href="/shop/baby-accessories" className="button button-coral">Shop baby essentials <ArrowRight /></Link><a href="#categories" className="button button-quiet">Browse everything <ArrowDown /></a></div><div className="hero-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>A</span></div><div><div className="proof-stars" aria-label="Rated 4.9 out of 5"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div><p>Loved by 2,000+ happy homes</p></div></div></motion.div>
        <motion.div className="hero-art" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .12 }}><div className="hero-image-main"><Image src={(products[0]?.images[1] ?? products[0]?.images[0] ?? FALLBACK_IMAGE)} alt="A parent preparing fresh food for a little one" fill priority sizes="(max-width: 768px) 90vw, 48vw" unoptimized /></div><div className="hero-image-small"><Image src={(products[7]?.images[0] ?? FALLBACK_IMAGE)} alt="Felt storage tote for everyday essentials" fill sizes="220px" unoptimized /></div><motion.div className="float-card delivery-card" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}><span className="float-icon"><ShoppingBag /></span><span><b>Delivery, on us</b><small>When your bag is R500+</small></span></motion.div><div className="float-card quality-card"><span className="quality-mark"><Sparkles /></span><span><b>Thoughtfully chosen</b><small>Everyday favourites, made better</small></span></div><div className="hero-stamp">GOOD<br />THINGS<br /><span>INSIDE</span></div></motion.div>
      </section>
      <div className="hero-bottom-note"><span>Curated for life as it happens</span><span>01 — 04</span></div>
      <section className="section-shell category-section" id="categories"><div className="section-heading"><div><p className="eyebrow">A GOOD PLACE TO START</p><h2>Little things.<br /><em>Big everyday joy.</em></h2></div><Link className="text-link desktop-only" href="/shop/baby-accessories">Explore all collections <ArrowRight /></Link></div><div className="category-grid">{displayCategories.map((category, index) => <Link href={category.href} key={category.name} className={`category-tile category-tile-${index + 1}`}><Image src={category.image} alt="" fill sizes="(max-width: 700px) 80vw, 40vw" unoptimized /><span className="category-shade" /><span className="category-copy"><small>0{index + 1} / COLLECTION</small><strong>{category.name}</strong><span>{category.description}</span></span><span className="category-arrow"><ArrowUpRight /></span></Link>)}</div></section>
      <section className="featured-section"><div className="section-shell"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-rule" /> THE LITTLE ONES EDIT</p><h2>For their <em>firsts.</em></h2><p className="section-subtitle">Gentle, practical favourites for the moments you&apos;ll remember.</p></div><Link className="text-link desktop-only" href="/shop/baby-accessories">Shop baby essentials <ArrowRight /></Link></div><div className="product-carousel">{featured.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}</div><div className="carousel-footer"><span>Made for small beginnings, chosen with care.</span><div className="carousel-controls"><button aria-label="Scroll products left" onClick={() => document.querySelector(".product-carousel")?.scrollBy({ left: -320, behavior: "smooth" })}><ArrowLeft /></button><button aria-label="Scroll products right" onClick={() => document.querySelector(".product-carousel")?.scrollBy({ left: 320, behavior: "smooth" })}><ArrowRight /></button></div></div></div></section>
      <section className="section-shell best-section"><div className="section-heading"><div><p className="eyebrow">THE GOOD STUFF</p><h2>Everyday <em>favourites.</em></h2></div><p className="best-note">The things that make the little routines<br />feel like something special.</p></div><div className="category-tabs" role="tablist" aria-label="Shop best sellers by category">{displayCategories.map((category) => <button role="tab" aria-selected={activeTab === category.name} className={activeTab === category.name ? "active" : ""} onClick={() => setActiveCategory(category.name)} key={category.name}>{category.name}</button>)}</div><div className="best-grid">{bestsellers.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}</div></section>
      <section className="trust-marquee" aria-label="Our promises"><div className="marquee-track">{[0, 1, 2].map((row) => <div className="marquee-group" key={row}><span><Check /> Quality checked</span><i /> <span><Check /> Fast, friendly delivery</span><i /> <span><Check /> Easy returns</span><i /> <span><Check /> Secure payments</span><i /></div>)}</div></section>
      <section className="section-shell lifestyle-section"><div className="lifestyle-photo"><Image src={(products[6]?.images[0] ?? FALLBACK_IMAGE)} alt="A considered feeding set for little family moments" fill sizes="(max-width: 700px) 90vw, 48vw" unoptimized /><span className="photo-caption">THE SLOW MORNINGS COLLECTION</span></div><div className="lifestyle-copy"><p className="eyebrow">MADE FOR YOUR KIND OF EVERYDAY</p><h2>For the life<br />you&apos;re <em>living.</em></h2><p>New routines, long lunches, spontaneous weekends and the beautiful in-between. Find something that fits.</p><div className="lifestyle-links">{["New parents", "Home cooks", "Weekend adventurers", "Always on the go"].map((item, index) => <Link href={index === 0 ? "/shop/baby-accessories" : index === 3 ? "/shop/bags-luggage" : index === 1 ? "/shop/kitchen-homeware" : "/shop/sports-outdoors"} key={item}><span>0{index + 1}</span>{item}<ArrowUpRight /></Link>)}</div><Link className="text-link" href="/shop/baby-accessories">Find your everyday <ArrowRight /></Link></div></section>
      <section className="quote-section"><div className="quote-flower">✳</div><p className="eyebrow">KIND WORDS FROM HOME</p><div className="quote-stars" aria-label="5 stars"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div><blockquote>“The pouch set has made our morning routine so much easier. Practical, lovely, and genuinely well made.”</blockquote><div className="quote-person"><span className="quote-avatar">N</span><span><b>Natasha M.</b><small>Verified Leano customer</small></span></div><div className="quote-index">01 <span /> 03</div></section>
      <section className="newsletter-section"><div className="newsletter-ornament">✳</div><div><p className="eyebrow">A LITTLE NOTE FROM US</p><h2>Good things in<br /><em>your inbox.</em></h2><p>Thoughtful finds, happy home ideas, and 10% off your first order.</p></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (email.includes("@")) setSubscribed(true) }}><label htmlFor="newsletter-email">Your email address</label><div className="newsletter-input"><input id="newsletter-email" type="email" required placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} /><button aria-label="Subscribe to newsletter">{subscribed ? <Check /> : <ArrowRight />}</button></div><small>{subscribed ? "You’re on the list. Keep an eye on your inbox." : "A little lovely, never a lot. Unsubscribe whenever."}</small></form></section>
    </main>
    <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><Link href="/" className="wordmark"><span className="wordmark-symbol">l</span><span>leano<small>distributions</small></span></Link><p>Good things for the everyday.<br />Thoughtfully found, ready for home.</p><a className="whatsapp-link" href="https://wa.me/27000000000" target="_blank" rel="noreferrer">Talk to us on WhatsApp <ArrowUpRight /></a></div><div className="footer-column"><h3>Find your things</h3>{categories.map((category) => <Link href={category.href} key={category.name}>{category.name}</Link>)}</div><div className="footer-column"><h3>Here to help</h3><a href="mailto:hello@leanodistributions.co.za">Get in touch</a><Link href="/delivery-returns">Delivery & returns</Link><Link href="/faq">Frequently asked</Link><Link href="/about">Our story</Link></div><div className="footer-column footer-contact"><h3>A little note</h3><p>Questions, kind words, or a hand choosing? We&apos;re right here.</p><a href="mailto:hello@leanodistributions.co.za">hello@leanodistributions.co.za</a><span>Monday – Friday, 9 to 5</span></div></div><div className="footer-bottom"><span>© 2026 Leano Distributions</span><span>Made for the everyday, with care.</span><div><span>VISA</span><span>Mastercard</span><span>PayFast</span></div><button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">Back to top <ArrowUp /></button></div></footer>
    <a className="whatsapp-float" href="https://wa.me/27000000000" target="_blank" rel="noreferrer" aria-label="Chat with Leano on WhatsApp"><span>Let&apos;s chat</span><span className="whatsapp-mark">W</span></a>
  </>
}

export function CatalogPage({ categoryName }: { categoryName: string }) {
  const { products, categories } = useCatalog()
  const [sort, setSort] = useState("featured")
  const [selected, setSelected] = useState<string[]>([])
  const category = categories.find((item) => item.name.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-") === categoryName) ?? categories.find((item) => item.name === categoryName)
  const title = category?.name ?? "All the good things"
  let list = products.filter((product) => !category || product.category === category.name)
  if (selected.length) list = list.filter((product) => selected.includes(product.subcategory))
  if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price)
  if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price)
  const subcategories = Array.from(new Set(products.filter((product) => product.category === title).map((product) => product.subcategory).filter(Boolean)))
  const countFor = (name: string) => products.filter((p) => p.category === name).length
  return <>
    <SiteHeader />
    <main className="catalog-page">
      <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>{title}</span></div>
      <section className="catalog-banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(28,27,26,.72), rgba(28,27,26,.05)), url("${category?.image ?? categories[0]?.image ?? FALLBACK_IMAGE}")` }}>
        <p className="eyebrow">THE LEANO COLLECTION</p>
        <h1>{title === "Baby Accessories" ? <>Little things<br /><em>for little people.</em></> : <>{title}<br /><em>for everyday living.</em></>}</h1>
        <p>{category?.description ?? "Thoughtfully chosen essentials for everyday living."}</p>
      </section>

      <nav className="cat-strip" aria-label="Browse by category">
        <Link href="/shop/all" className={`cat-chip ${!category ? "active" : ""}`}>
          <span className="cat-chip-img"><Image src={FALLBACK_IMAGES[0]} alt="" fill sizes="44px" unoptimized /></span>
          <span className="cat-chip-copy">All things<small>{products.length} find{products.length === 1 ? "" : "s"}</small></span>
        </Link>
        {categories.map((item) => (
          <Link href={item.href} key={item.name} className={`cat-chip ${category?.name === item.name ? "active" : ""}`}>
            <span className="cat-chip-img"><Image src={item.image} alt="" fill sizes="44px" unoptimized /></span>
            <span className="cat-chip-copy">{item.name}<small>{countFor(item.name)} find{countFor(item.name) === 1 ? "" : "s"}</small></span>
          </Link>
        ))}
      </nav>

      <div className="catalog-toolbar"><span>{list.length} thoughtful find{list.length === 1 ? "" : "s"}</span><label>Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>

      {list.length === 0 ? (
        <div className="empty-catalog">
          <div className="empty-collage">
            {[2, 3, 4].map((i) => <span key={i} className="empty-collage-img"><Image src={FALLBACK_IMAGES[i]} alt="" fill sizes="(max-width: 700px) 30vw, 220px" unoptimized /></span>)}
          </div>
          <h2>Beautiful things are <em>on their way.</em></h2>
          <p>This collection is being carefully put together. Check back soon — or browse everything else in the meantime.</p>
          <Link className="button button-dark" href="/shop/all">Browse all the good things <ArrowRight /></Link>
        </div>
      ) : (
        <div className="catalog-layout">
          <aside className="catalog-filters">
            <p className="eyebrow">REFINE YOUR FINDS</p>
            {subcategories.length > 0 && <>
              <h3>Type</h3>
              {subcategories.map((subcategory) => <label className="filter-option" key={subcategory}><input type="checkbox" checked={selected.includes(subcategory)} onChange={() => setSelected((current) => current.includes(subcategory) ? current.filter((item) => item !== subcategory) : [...current, subcategory])} />{subcategory}</label>)}
            </>}
            <h3>Collections</h3>
            {categories.map((item) => <Link className={`filter-option ${category?.name === item.name ? "current" : ""}`} href={item.href} key={item.name}>{item.name}<ArrowRight /></Link>)}
            <p className="filter-note"><Sparkles /><span>Good things, chosen with care.<small>Every order helps us bring useful finds home.</small></span></p>
          </aside>
          <div className="catalog-grid">{list.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}</div>
        </div>
      )}
    </main>
    <FooterOnly />
  </>
}

function FooterOnly() { return <footer className="mini-footer"><Link href="/">leano</Link><span>Good things for the everyday.</span><Link href="mailto:hello@leanodistributions.co.za">Need a hand? Get in touch <ArrowRight /></Link></footer> }

export function ProductPage({ product }: { product: Product }) {
  const { products } = useCatalog()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState(false)
  const add = useStore((state) => state.addToCart)
  const toggle = useStore((state) => state.toggleWishlist)
  const liked = useStore((state) => state.wishlist.includes(product.id))
  const recommendations = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)
  const whatsapp = `https://wa.me/27000000000?text=${encodeURIComponent(`Hello Leano, I'd like ${quantity} × ${product.name} for ${formatPrice(product.price * quantity)}.`)}`
  return <><SiteHeader /><main className="product-page"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={`/shop/${product.category.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}`}>{product.category}</Link><span>/</span><span>{product.name}</span></div><div className="product-detail"><div className="product-gallery"><div className="gallery-main"><Image src={product.images[activeImage]} alt={product.name} fill priority sizes="(max-width: 800px) 100vw, 55vw" unoptimized /></div><div className="gallery-thumbs">{product.images.map((image, index) => <button className={activeImage === index ? "selected" : ""} onClick={() => setActiveImage(index)} aria-label={`View product image ${index + 1}`} key={image}><Image src={image} alt="" fill sizes="90px" unoptimized /></button>)}</div></div><div className="product-detail-copy"><p className="eyebrow">{product.category} <span>·</span> {product.subcategory}</p><h1>{product.name}</h1><div className="detail-rating"><span><Star fill="currentColor" /> {product.rating}</span> · {product.reviewCount} thoughtful reviews</div><div className="detail-price">{formatPrice(product.price)} {product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}</div><p className="detail-description">{product.description}</p><ul className="feature-list">{product.features.map((feature) => <li key={feature}><Check />{feature}</li>)}</ul><div className="quantity-row"><span>Quantity</span><div className="qty-stepper"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus /></button></div><span className="stock-copy">{product.stock > 0 ? "Ready to find a home" : "Out of stock"}</span></div><button className="button button-coral detail-add" onClick={() => { for (let i = 0; i < quantity; i++) add(product); setMessage(true); window.setTimeout(() => setMessage(false), 2600) }}>{message ? <><Check /> Added to your bag</> : <>Add to bag · {formatPrice(product.price * quantity)} <ArrowRight /></>}</button><a className="button button-outline detail-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">Order on WhatsApp <ArrowUpRight /></a><button className={`detail-wishlist ${liked ? "is-liked" : ""}`} onClick={() => toggle(product.id)}><Heart fill={liked ? "currentColor" : "none"} />{liked ? "Saved to your wishlist" : "Save for later"}</button><div className="detail-info"><details open><summary>A little more about it <ChevronDown /></summary><p>{product.description} Thoughtfully selected for everyday use. Please check dimensions and care details on supplier packaging before first use.</p></details><details><summary>Delivery & returns <ChevronDown /></summary><p>Free delivery on orders over R500. For smaller orders, delivery is calculated at checkout. Get in touch within 7 days if you need a hand with a return.</p></details><details><summary>A kind note <ChevronDown /></summary><p>Product imagery is supplied for illustration. Colours may vary slightly between screens and real life.</p></details></div></div></div><section className="recommend-section"><div className="section-heading"><div><p className="eyebrow">MORE GOOD THINGS</p><h2>You might <em>love these.</em></h2></div></div><div className="best-grid">{recommendations.map((item, index) => <ProductCard product={item} index={index} key={item.id} />)}</div></section></main><FooterOnly /></>
}

export function WishlistPage() {
  const { products } = useCatalog()
  const wishlist = useStore((state) => state.wishlist)
  const saved = products.filter((product) => wishlist.includes(product.id))
  return <><SiteHeader /><main className="wishlist-page"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Your wishlist</span></div><p className="eyebrow">YOUR LITTLE LIST</p><h1>Good things,<br /><em>saved for later.</em></h1>{saved.length ? <div className="catalog-grid">{saved.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}</div> : <div className="wishlist-empty"><Heart /><h2>Nothing saved just yet.</h2><p>Tap the little heart on anything you love, and it&apos;ll be right here.</p><Link className="button button-dark" href="/shop/baby-accessories">Find something lovely <ArrowRight /></Link></div>}</main><FooterOnly /></>
}
