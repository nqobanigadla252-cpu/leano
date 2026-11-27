import { useRef, useState } from "react";
import { Check, ImagePlus, X } from "lucide-react";
import { motion } from "motion/react";
import type { Category, Product } from "../data";
import { uploadProductImage } from "../lib/db";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (product: Omit<Product, "id">) => void;
  categories: Category[];
};

const fallbackImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=1100&fit=crop&auto=format";

export function AddProductForm({ open, onClose, onCreate, categories }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<Product["status"]>("Draft");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  if (!open) return null;

  const reset = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setStatus("Draft");
    setImage(null);
    setError("");
  };

  const close = () => {
    reset();
    onClose();
  };

  const pickImage = (file: File | undefined) => {
    if (!file) return;
    // instant local preview, then persist to Supabase storage
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
    setUploading(true);
    uploadProductImage(file)
      .then((url) => setImage(url))
      .catch((err) => {
        console.error("image upload failed", err);
        setError("Photo upload failed — check the product-images bucket exists, then try again.");
      })
      .finally(() => setUploading(false));
  };

  const submit = () => {
    if (!name.trim()) {
      setError("Give the product a title before adding it.");
      return;
    }
    onCreate({
      name: name.trim(),
      description: description.trim() || "Add a short, useful description for this product.",
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      category: category || categories[0]?.name || "Uncategorised",
      status,
      image: image ?? fallbackImage,
    });
    close();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6" onClick={close}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-7">
          <div>
            <p className="font-['DM_Mono'] text-[7px] uppercase tracking-[.18em] text-muted-foreground">Catalog / New product</p>
            <h2 className="mt-1 font-['Fraunces'] text-[23px] font-semibold">Add a product</h2>
          </div>
          <button onClick={close} className="grid size-9 place-items-center border border-border hover:bg-secondary" aria-label="Close form">
            <X size={16} />
          </button>
        </div>

        <div className="grid gap-7 p-5 md:grid-cols-[220px_1fr] md:p-7">
          <div>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => pickImage(e.target.files?.[0])}
            />
            <button
              onClick={() => fileInput.current?.click()}
              className="group relative block aspect-[4/5] w-full overflow-hidden border border-dashed border-muted-foreground/50 bg-secondary transition hover:border-accent"
            >
              {image ? (
                <>
                  <img src={image} alt="Product" className="h-full w-full object-cover" />
                  <span className="absolute inset-x-3 bottom-3 flex h-9 items-center justify-center gap-2 bg-white/90 text-[9px] font-semibold backdrop-blur">
                    <ImagePlus size={14} /> Change photo
                  </span>
                </>
              ) : (
                <span className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground transition group-hover:text-accent">
                  <ImagePlus size={22} />
                  <span className="text-[9px] font-semibold">Add product photo</span>
                  <span className="px-4 text-center text-[8px] leading-4">JPG or PNG · 1600 × 2000 px recommended</span>
                </span>
              )}
            </button>
          </div>

          <div className="space-y-5">
            <label className="block">
              <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Product title *</span>
              <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Stoneware dinner plate" className="mt-2 h-11 w-full border border-border bg-background px-3 text-[11px] outline-none focus:border-accent" />
            </label>
            <label className="block">
              <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Description</span>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="What makes this product good?" className="mt-2 w-full resize-none border border-border bg-background p-3 text-[10px] leading-5 outline-none focus:border-accent" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label>
                <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Price (ZAR)</span>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">R</span>
                  <input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" className="h-11 w-full border border-border bg-background pl-7 pr-3 text-[11px] outline-none focus:border-accent" />
                </div>
              </label>
              <label>
                <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Inventory</span>
                <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" className="mt-2 h-11 w-full border border-border bg-background px-3 text-[11px] outline-none focus:border-accent" />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label>
                <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Category</span>
                <select value={category || categories[0]?.name || ""} onChange={(e) => setCategory(e.target.value)} className="mt-2 h-11 w-full border border-border bg-background px-3 text-[10px] outline-none focus:border-accent">
                  {categories.map((c) => <option key={c.id}>{c.name}</option>)}
                </select>
              </label>
              <label>
                <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-muted-foreground">Visibility</span>
                <select value={status} onChange={(e) => setStatus(e.target.value as Product["status"])} className="mt-2 h-11 w-full border border-border bg-background px-3 text-[10px] outline-none focus:border-accent">
                  <option>Draft</option>
                  <option>Active</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {error && <p className="mx-5 mb-3 border border-[#d8a49a] bg-[#f6e3df] px-3 py-2 text-[9px] text-[#8a3a2a] md:mx-7">{error}</p>}

        <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center md:px-7">
          <button onClick={close} className="h-10 border border-foreground px-5 text-[9px] font-semibold sm:mr-auto">Cancel</button>
          <button onClick={submit} disabled={uploading} className="flex h-10 items-center justify-center gap-2 bg-accent px-5 text-[9px] font-semibold text-accent-foreground transition hover:bg-[#df4e38] disabled:opacity-50">
            <Check size={14} /> {uploading ? "Uploading photo…" : "Add product"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
