import { useRef, useState } from "react";
import { Check, ImagePlus, Plus, Tag, Trash2 } from "lucide-react";
import type { Category, Product } from "../data";
import { AddCategoryForm } from "./AddCategory";
import { uploadProductImage } from "../lib/db";

type Props = {
  products: Product[];
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export function CategoriesView({ products, categories, setCategories }: Props) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const countFor = (name: string) => products.filter((p) => p.category === name).length;

  const addCategory = ({ name, description, image }: Omit<Category, "id">) => {
    setCategories((current) => [...current, { id: `CAT-${current.length + 1}`, name, description, image }]);
  };

  const photoInput = useRef<HTMLInputElement>(null);
  const photoTarget = useRef<string | null>(null);

  const changePhoto = (id: string) => {
    photoTarget.current = id;
    photoInput.current?.click();
  };

  const pickPhoto = (file: File | undefined) => {
    if (!file || !photoTarget.current) return;
    const id = photoTarget.current;
    // instant local preview, then persist to Supabase storage
    const reader = new FileReader();
    reader.onload = () =>
      setCategories((current) => current.map((c) => (c.id === id ? { ...c, image: reader.result as string } : c)));
    reader.readAsDataURL(file);
    uploadProductImage(file)
      .then((url) => setCategories((current) => current.map((c) => (c.id === id ? { ...c, image: url } : c))))
      .catch((err) => console.error("image upload failed", err));
  };

  const rename = (id: string) => {
    const name = draft.trim();
    if (name) setCategories((current) => current.map((c) => (c.id === id ? { ...c, name } : c)));
    setEditingId(null);
  };

  return (
    <>
      <section className="border-b border-border px-5 py-7 md:px-8 md:py-9">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-['DM_Mono'] text-[7px] uppercase tracking-[.2em] text-accent">
              <span className="size-1.5 bg-accent" /> Catalog structure · {categories.length} categories
            </div>
            <h1 className="mt-3 font-['Fraunces'] text-[40px] font-medium leading-none tracking-[-.04em] md:text-[52px]">
              Categories, <i className="font-normal text-[#b75543]">kept tidy.</i>
            </h1>
            <p className="mt-3 max-w-xl text-[11px] leading-5 text-muted-foreground">
              Group your products so customers can browse the store by collection.
            </p>
          </div>
          <button onClick={() => setFormOpen(true)} className="flex h-10 items-center gap-2 self-start bg-accent px-5 text-[9px] font-semibold text-accent-foreground transition hover:bg-[#df4e38] md:self-auto">
            <Plus size={14} /> Add category
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-border p-5 md:border-r md:p-6">
            <div className="flex items-start justify-between">
              <button
                onClick={() => changePhoto(category.id)}
                title="Change category photo"
                className="group relative block h-14 w-20 overflow-hidden bg-[#20372f] text-white"
              >
                {category.image ? (
                  <>
                    <img src={category.image} alt="" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition group-hover:opacity-100"><ImagePlus size={14} /></span>
                  </>
                ) : (
                  <span className="grid h-full place-items-center transition group-hover:text-[#ff8a76]"><Tag size={15} /></span>
                )}
              </button>
              <span className="font-['DM_Mono'] text-[8px] text-muted-foreground">{category.id}</span>
            </div>
            {editingId === category.id ? (
              <div className="mt-4 flex gap-2">
                <input
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && rename(category.id)}
                  className="h-9 flex-1 border border-accent bg-background px-2 text-[11px] outline-none"
                />
                <button onClick={() => rename(category.id)} className="grid size-9 place-items-center bg-[#20372f] text-white"><Check size={14} /></button>
              </div>
            ) : (
              <h2
                className="mt-4 cursor-pointer font-['Fraunces'] text-[19px] font-semibold hover:text-accent"
                title="Click to rename"
                onClick={() => { setEditingId(category.id); setDraft(category.name); }}
              >
                {category.name}
              </h2>
            )}
            <p className="mt-2 text-[9px] leading-4 text-muted-foreground">{category.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="font-['DM_Mono'] text-[8px] uppercase tracking-wider text-muted-foreground">
                {countFor(category.name)} product{countFor(category.name) === 1 ? "" : "s"}
              </span>
              <button
                onClick={() => {
                  const used = countFor(category.name);
                  const note = used ? ` ${used} product(s) will keep their label but lose this collection.` : "";
                  if (!window.confirm(`Remove the “${category.name}” category?${note}`)) return;
                  setCategories((current) => current.filter((c) => c.id !== category.id));
                }}
                className="flex items-center gap-1 text-[8px] font-semibold text-[#a24435] hover:underline"
              >
                <Trash2 size={12} /> Remove
              </button>
            </div>
          </div>
        ))}
      </section>

      <input
        ref={photoInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          pickPhoto(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <AddCategoryForm open={formOpen} onClose={() => setFormOpen(false)} onCreate={addCategory} />
    </>
  );
}
