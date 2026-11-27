import { useMemo, useRef, useState } from "react";
import { Check, ImagePlus, MoreHorizontal, Search, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import type { Category, Product } from "../data";
import { uploadProductImage } from "../lib/db";

type Props = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
};

export function ProductsView({ products, setProducts, categories }: Props) {
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Draft">("All");
  const [saved, setSaved] = useState(false);
  const photoInput = useRef<HTMLInputElement>(null);

  const replacePhoto = (file: File | undefined) => {
    if (!file) return;
    // instant local preview, then persist to Supabase storage
    const reader = new FileReader();
    reader.onload = () => updateSelected({ image: reader.result as string });
    reader.readAsDataURL(file);
    uploadProductImage(file)
      .then((url) => updateSelected({ image: url }))
      .catch((err) => console.error("image upload failed", err));
  };

  const selected = products.find((product) => product.id === selectedId) ?? products[0];
  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = `${product.name} ${product.id} ${product.category}`
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchesSearch && (filter === "All" || product.status === filter);
      }),
    [filter, products, search],
  );

  const updateSelected = (patch: Partial<Product>) => {
    setProducts((current) =>
      current.map((product) => (product.id === selectedId ? { ...product, ...patch } : product)),
    );
    setSaved(false);
  };

  const saveChanges = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <>
      <section className="border-b border-border px-5 py-7 md:px-8 md:py-9">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-['DM_Mono'] text-[7px] uppercase tracking-[.2em] text-accent">
              <span className="size-1.5 bg-accent" /> Store catalog · {products.length} items
            </div>
            <h1 className="mt-3 font-['Fraunces'] text-[40px] font-medium leading-none tracking-[-.04em] md:text-[52px]">
              Product <i className="font-normal text-[#b75543]">workroom.</i>
            </h1>
            <p className="mt-3 max-w-xl text-[11px] leading-5 text-muted-foreground">
              Update details, inventory and pricing. Your changes publish to the storefront when you save.
            </p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-border border border-border bg-card">
            {[
              ["Active", products.filter((p) => p.status === "Active").length],
              ["Drafts", products.filter((p) => p.status === "Draft").length],
              ["Low stock", products.filter((p) => p.stock < 10).length],
            ].map(([label, value]) => (
              <div key={label} className="px-4 py-3 md:px-5">
                <p className="font-['Fraunces'] text-[20px] font-semibold leading-none">{value}</p>
                <p className="mt-1.5 font-['DM_Mono'] text-[6px] uppercase tracking-wider text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid min-h-[700px] xl:grid-cols-[minmax(420px,.95fr)_minmax(560px,1.45fr)]">
        <div className="border-b border-border bg-[#f1ece4] xl:border-b-0 xl:border-r">
          <div className="border-b border-border p-4 md:p-5">
            <label className="relative block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products or SKU"
                className="h-10 w-full border border-border bg-card pl-9 pr-3 text-[10px] outline-none transition focus:border-accent"
              />
            </label>
            <div className="mt-3 flex gap-1">
              {(["All", "Active", "Draft"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-3 py-2 font-['DM_Mono'] text-[7px] uppercase tracking-wider ${
                    filter === item ? "bg-[#20372f] text-white" : "border border-border bg-card text-muted-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className={`relative grid w-full grid-cols-[62px_1fr_auto] items-center gap-4 border-b border-border p-4 pr-12 text-left transition ${
                  selectedId === product.id ? "bg-card shadow-[inset_3px_0_0_#ff674d]" : "hover:bg-card/60"
                }`}
              >
                <button onClick={() => setSelectedId(product.id)} className="absolute inset-0 cursor-pointer" aria-label={`Edit ${product.name}`} />
                <span className="pointer-events-none h-[70px] overflow-hidden bg-secondary">
                  <img src={product.image} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="pointer-events-none min-w-0">
                  <span className="block truncate font-['Fraunces'] text-[16px] font-semibold">{product.name}</span>
                  <span className="mt-1 block font-['DM_Mono'] text-[7px] uppercase tracking-wider text-muted-foreground">{product.id} · {product.category}</span>
                  <span className={`mt-2 inline-block text-[8px] ${product.stock < 10 ? "text-[#b75543]" : "text-[#476b57]"}`}>
                    {product.stock === 0 ? "Out of stock" : `${product.stock} in stock`}
                  </span>
                </span>
                <span className="pointer-events-none text-right">
                  <span className="block font-['DM_Mono'] text-[10px]">R{product.price.toFixed(2)}</span>
                  <span className={`mt-2 inline-flex border px-2 py-1 font-['DM_Mono'] text-[6px] uppercase tracking-wider ${
                    product.status === "Active" ? "border-[#9ab0a1] bg-[#e5eee8] text-[#31523e]" : "border-border text-muted-foreground"
                  }`}>{product.status}</span>
                </span>
                <button
                  onClick={() => {
                    if (!window.confirm(`Delete “${product.name}”? This can't be undone.`)) return;
                    setProducts((current) => current.filter((item) => item.id !== product.id));
                    if (selectedId === product.id) setSelectedId(products.find((item) => item.id !== product.id)?.id ?? "");
                  }}
                  className="absolute right-3 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center border border-border bg-card text-[#a24435] transition hover:border-[#a24435] hover:bg-[#f6e3df]"
                  aria-label={`Delete ${product.name}`}
                  title="Delete product"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            {visibleProducts.length === 0 && <p className="p-10 text-center text-[10px] text-muted-foreground">No matching products found.</p>}
          </div>
        </div>

        {selected && (
          <motion.div key={selected.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-7">
              <div>
                <p className="font-['DM_Mono'] text-[7px] uppercase tracking-[.18em] text-muted-foreground">Editing / {selected.id}</p>
                <h2 className="mt-1 font-['Fraunces'] text-[23px] font-semibold">Product details</h2>
              </div>
              <button className="grid size-9 place-items-center border border-border hover:bg-secondary" aria-label="More product actions">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="grid gap-7 p-5 md:grid-cols-[220px_1fr] md:p-7">
              <div>
                <div className="group relative aspect-[4/5] overflow-hidden bg-secondary">
                  <input
                    ref={photoInput}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      replacePhoto(e.target.files?.[0]);
                      e.target.value = "";
                    }}
                  />
                  <img src={selected.image} alt={selected.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  <button onClick={() => photoInput.current?.click()} className="absolute inset-x-3 bottom-3 flex h-9 items-center justify-center gap-2 bg-white/90 text-[9px] font-semibold backdrop-blur transition hover:bg-white">
                    <ImagePlus size={14} /> Replace photo
                  </button>
                </div>
                <p className="mt-3 text-[8px] leading-4 text-muted-foreground">JPG or PNG · 1600 × 2000 px recommended</p>
              </div>

              <div className="space-y-5">
                <label className="block">
                  <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Product title</span>
                  <input value={selected.name} onChange={(e) => updateSelected({ name: e.target.value })} className="mt-2 h-11 w-full border border-border bg-background px-3 text-[11px] outline-none focus:border-accent" />
                </label>
                <label className="block">
                  <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Description</span>
                  <textarea value={selected.description} onChange={(e) => updateSelected({ description: e.target.value })} rows={4} className="mt-2 w-full resize-none border border-border bg-background p-3 text-[10px] leading-5 outline-none focus:border-accent" />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label>
                    <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Price (ZAR)</span>
                    <div className="relative mt-2"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">R</span><input type="number" min="0" value={selected.price} onChange={(e) => updateSelected({ price: Number(e.target.value) })} className="h-11 w-full border border-border bg-background pl-7 pr-3 text-[11px] outline-none focus:border-accent" /></div>
                  </label>
                  <label>
                    <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Inventory</span>
                    <input type="number" min="0" value={selected.stock} onChange={(e) => updateSelected({ stock: Number(e.target.value) })} className="mt-2 h-11 w-full border border-border bg-background px-3 text-[11px] outline-none focus:border-accent" />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label>
                    <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Category</span>
                    <select value={selected.category} onChange={(e) => updateSelected({ category: e.target.value })} className="mt-2 h-11 w-full border border-border bg-background px-3 text-[10px] outline-none focus:border-accent">
                      <option>Kitchen & Homeware</option><option>Textiles</option><option>Baby Accessories</option><option>Sports & Outdoors</option><option>Bags & Luggage</option>
                    </select>
                  </label>
                  <label>
                    <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Visibility</span>
                    <select value={selected.status} onChange={(e) => updateSelected({ status: e.target.value as Product["status"] })} className="mt-2 h-11 w-full border border-border bg-background px-3 text-[10px] outline-none focus:border-accent">
                      <option>Active</option><option>Draft</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div className="mx-5 mb-6 border border-border bg-[#f1ece4] p-4 md:mx-7">
              <p className="font-['DM_Mono'] text-[7px] uppercase tracking-[.17em] text-muted-foreground">Storefront preview</p>
              <div className="mt-3 flex items-center gap-4">
                <span className="size-12 overflow-hidden bg-secondary"><img src={selected.image} alt="" className="h-full w-full object-cover" /></span>
                <span className="flex-1"><span className="block font-['Fraunces'] text-[15px] font-semibold">{selected.name}</span><span className="mt-1 block text-[8px] text-muted-foreground">{selected.category}</span></span>
                <span className="font-['DM_Mono'] text-[10px]">R{selected.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center md:px-7">
              <button
                onClick={() => {
                  setProducts((current) => current.filter((product) => product.id !== selected.id));
                  setSelectedId(products.find((product) => product.id !== selected.id)?.id ?? "");
                }}
                className="flex h-10 items-center justify-center gap-2 text-[9px] font-semibold text-[#a24435] sm:mr-auto"
              >
                <Trash2 size={14} /> Delete product
              </button>
              <button className="h-10 border border-foreground px-5 text-[9px] font-semibold">Discard</button>
              <button onClick={saveChanges} className="flex h-10 items-center justify-center gap-2 bg-accent px-5 text-[9px] font-semibold text-accent-foreground transition hover:bg-[#df4e38]">
                <Check size={14} /> Save changes
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {saved && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 bg-[#20372f] px-5 py-3 font-['DM_Mono'] text-[8px] text-white shadow-xl lg:left-[calc(50%+116px)]">
          <Check size={13} className="text-[#ff8a76]" /> Product changes saved
        </motion.div>
      )}
    </>
  );
}
