import { supabase } from "./supabase";
import type { Category, Customer, Order, Product, ShippingZone } from "../data";

// ---------- row <-> UI mappers (snake_case db <-> camelCase UI) ----------

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "product";

export function productToRow(p: Product) {
  return {
    id: p.id,
    slug: `${slugify(p.name)}-${p.id.toLowerCase()}`,
    name: p.name,
    category: p.category,
    price: p.price,
    stock: p.stock,
    status: p.status,
    description: p.description,
    images: p.image ? [p.image] : [],
  };
}

export function rowToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category ?? "",
    price: Number(row.price ?? 0),
    stock: row.stock ?? 0,
    status: row.status ?? "Draft",
    description: row.description ?? "",
    image: row.images?.[0] ?? "",
  };
}

export function rowToCategory(row: any): Category {
  return { id: row.id, name: row.name, description: row.description ?? "", image: row.image ?? undefined };
}

export function rowToOrder(row: any): Order {
  return {
    id: row.id,
    customer: row.customer,
    items: row.items ?? 1,
    total: Number(row.total ?? 0),
    status: row.status,
    date: new Date(row.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    channel: row.channel ?? "Online store",
    createdAt: row.created_at,
  };
}

export function rowToZone(row: any): ShippingZone {
  return {
    id: row.id,
    name: row.name,
    regions: row.regions ?? "",
    rate: Number(row.rate ?? 0),
    freeOver: row.free_over == null ? null : Number(row.free_over),
    enabled: row.enabled ?? true,
    eta: row.eta ?? "",
  };
}

export function rowToCustomer(row: any): Customer {
  return {
    id: row.id.slice(0, 8).toUpperCase(),
    name: row.full_name || "Unnamed customer",
    email: row.email ?? "",
    orders: row.order_count ?? 0,
    spent: Number(row.total_spent ?? 0),
    location: "",
    joined: new Date(row.created_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
  };
}

// ---------- fetchers ----------

export async function fetchTable<T>(table: string, map: (row: any) => T): Promise<T[]> {
  const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(map);
}

export async function fetchCustomers(): Promise<Customer[]> {
  const { data: profiles, error } = await supabase.from("profiles").select("*").eq("role", "customer");
  if (error) throw error;
  const { data: orders } = await supabase.from("orders").select("user_id, total");
  const stats = (orders ?? []).reduce<Record<string, { count: number; spent: number }>>((acc, o) => {
    if (!o.user_id) return acc;
    acc[o.user_id] = acc[o.user_id] ?? { count: 0, spent: 0 };
    acc[o.user_id].count += 1;
    acc[o.user_id].spent += Number(o.total ?? 0);
    return acc;
  }, {});
  return (profiles ?? []).map((p) =>
    rowToCustomer({ ...p, order_count: stats[p.id]?.count ?? 0, total_spent: stats[p.id]?.spent ?? 0 }),
  );
}

// ---------- mutation error reporting ----------

type Listener = (msg: string) => void;
const listeners = new Set<Listener>();

export function onSyncError(fn: Listener) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

function reportError(msg: string) {
  listeners.forEach((fn) => fn(msg));
}

// ---------- mutations ----------

export async function insertRow(table: string, row: any) {
  const { error } = await supabase.from(table).insert(row);
  if (error) {
    console.error(`insert ${table} failed`, error);
    reportError(`Couldn't save to ${table}: ${error.message}`);
  }
}

export async function updateRow(table: string, id: string, patch: any) {
  const { error } = await supabase.from(table).update(patch).eq("id", id);
  if (error) {
    console.error(`update ${table} failed`, error);
    reportError(`Couldn't update ${table}: ${error.message}`);
  }
}

export async function deleteRow(table: string, id: string) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) {
    console.error(`delete ${table} failed`, error);
    reportError(`Couldn't delete from ${table}: ${error.message}`);
  }
}

// ---------- image upload ----------

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file, { cacheControl: "3600" });
  if (error) throw error;
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}
