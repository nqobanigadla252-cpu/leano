import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  Eye,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  Store,
  Tag,
  Truck,
  Users,
  X,
} from "lucide-react";
import "../styles/fonts.css";
import "../styles/theme.css";
import { supabase, supabaseConfigured } from "./lib/supabase";
import {
  fetchCustomers,
  productToRow,
  rowToCategory,
  rowToOrder,
  rowToProduct,
  rowToZone,
} from "./lib/db";
import { useSyncedTable } from "./lib/useSyncedTable";
import { onSyncError } from "./lib/db";
import type { Category, Customer, Order, Product, ShippingZone } from "./data";
import { ProductsView } from "./views/Products";
import { AddProductForm } from "./views/AddProduct";
import { OverviewView } from "./views/Overview";
import { OrdersView } from "./views/Orders";
import { CategoriesView } from "./views/Categories";
import { CustomersView } from "./views/Customers";
import { ShippingView } from "./views/Shipping";
import { LoginScreen, SetupScreen } from "./views/Login";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Products", icon: Package },
  { label: "Orders", icon: ShoppingBag },
  { label: "Categories", icon: Tag },
  { label: "Customers", icon: Users },
  { label: "Shipping", icon: Truck },
];

const breadcrumbs: Record<string, [string, string]> = {
  Overview: ["Store / Overview", "How your store is performing"],
  Products: ["Catalog / Products", "Manage what customers see in your store"],
  Orders: ["Sales / Orders", "Fulfil and track customer orders"],
  Categories: ["Catalog / Categories", "Organise your product collections"],
  Customers: ["Sales / Customers", "Know the people buying from you"],
  Shipping: ["Settings / Shipping", "Delivery zones and rates"],
};

const newId = (prefix: string) => `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

const categoryToRow = (c: Category) => ({ id: c.id, name: c.name, description: c.description, ...(c.image ? { image: c.image } : {}) });
const orderToRow = (o: Order) => ({ customer: o.customer, items: o.items, total: o.total, status: o.status, channel: o.channel });
const zoneToRow = (z: ShippingZone) => ({ id: z.id, name: z.name, regions: z.regions, rate: z.rate, free_over: z.freeOver, eta: z.eta, enabled: z.enabled });

function Portal({ userEmail }: { userEmail: string }) {
  const [activeNav, setActiveNav] = useState("Products");
  const [mobileNav, setMobileNav] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);

  const { rows: products, setRows: setProducts, loading: loadingProducts } = useSyncedTable<Product>("products", rowToProduct, productToRow, true);
  const { rows: categories, setRows: setCategories } = useSyncedTable<Category>("categories", rowToCategory, categoryToRow, true);
  const { rows: orders, setRows: setOrders } = useSyncedTable<Order>("orders", rowToOrder, orderToRow, true);
  const { rows: zones, setRows: setZones } = useSyncedTable<ShippingZone>("shipping_zones", rowToZone, zoneToRow, true);

  const [syncError, setSyncError] = useState("");
  useEffect(() => onSyncError((msg) => {
    setSyncError(msg);
    window.setTimeout(() => setSyncError(""), 5000);
  }), []);

  const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
    fetchCustomers().then(setCustomers).catch((err) => console.error("load customers failed", err));
  }, [orders]);

  const navigate = (label: string) => {
    setActiveNav(label);
    setMobileNav(false);
    window.scrollTo({ top: 0 });
  };

  const openAddForm = () => {
    setActiveNav("Products");
    setAddFormOpen(true);
  };

  const createProduct = (draft: Omit<Product, "id">) => {
    setProducts((current) => [{ ...draft, id: newId("LN") }, ...current]);
  };

  const signOut = () => supabase.auth.signOut();

  const openOrders = orders.filter((o) => o.status === "Pending" || o.status === "Paid").length;
  const [crumb, crumbSub] = breadcrumbs[activeNav] ?? breadcrumbs.Overview;

  return (
    <div className="min-h-screen bg-background font-['DM_Sans'] text-foreground selection:bg-accent selection:text-accent-foreground">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[232px] flex-col border-r border-[#34483f] bg-[#20372f] text-[#f8f4ed] transition-transform duration-300 lg:translate-x-0 ${
          mobileNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-end gap-2">
            <span className="font-['Fraunces'] text-[27px] font-semibold leading-none tracking-[-.05em]">
              <i className="mr-0.5 text-[#ff674d]">l</i>leano
            </span>
            <span className="mb-0.5 font-['DM_Mono'] text-[6px] uppercase tracking-[.22em] text-white/45">office</span>
          </div>
          <button className="lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-white/10 p-4">
          <button className="flex w-full items-center gap-3 border border-white/10 bg-white/[.04] p-3 text-left transition hover:bg-white/[.08]">
            <span className="grid size-8 place-items-center bg-[#ff674d] text-white"><Store size={15} /></span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] font-semibold">Leano Distributions</span>
              <span className="block truncate text-[8px] text-white/45">{userEmail}</span>
            </span>
            <ChevronDown size={13} className="text-white/45" />
          </button>
        </div>

        <nav className="flex-1 p-3 pt-6">
          <p className="mb-3 px-3 font-['DM_Mono'] text-[7px] uppercase tracking-[.2em] text-white/35">Store management</p>
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => navigate(label)}
              className={`mb-1 flex h-10 w-full items-center gap-3 px-3 text-[11px] transition ${
                activeNav === label ? "bg-[#f8f4ed] font-semibold text-[#20372f]" : "text-white/60 hover:bg-white/[.06] hover:text-white"
              }`}
            >
              <Icon size={15} strokeWidth={1.7} />
              <span className="flex-1 text-left">{label}</span>
              {label === "Orders" && openOrders > 0 && (
                <span className="font-['DM_Mono'] text-[8px] text-[#ff8a76]">{openOrders}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="m-4 border border-white/10 p-4">
          <p className="font-['Fraunces'] text-[16px]">Good things, managed with care.</p>
          <p className="mt-2 text-[9px] leading-4 text-white/45">Your catalog is synced and ready for customers.</p>
        </div>
        <button onClick={signOut} className="flex h-14 items-center gap-3 border-t border-white/10 px-6 text-[10px] text-white/60 hover:text-white">
          <LogOut size={15} /> Sign out
        </button>
      </aside>

      {mobileNav && (
        <button className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close overlay" />
      )}

      <div className="lg:pl-[232px]">
        <header className="sticky top-0 z-30 flex h-[64px] items-center border-b border-border bg-background/90 px-4 backdrop-blur-xl md:px-7">
          <button onClick={() => setMobileNav(true)} className="mr-3 grid size-9 place-items-center border border-border lg:hidden" aria-label="Open navigation">
            <Menu size={17} />
          </button>
          <div>
            <p className="font-['DM_Mono'] text-[7px] uppercase tracking-[.18em] text-muted-foreground">{crumb}</p>
            <p className="mt-0.5 hidden text-[10px] text-foreground sm:block">{crumbSub}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="grid size-9 place-items-center border border-border bg-card" aria-label="Notifications">
              <Bell size={15} /><span className="absolute mt-[-13px] ml-[13px] size-1.5 rounded-full bg-accent" />
            </button>
            <a href="http://localhost:3030" target="_blank" rel="noreferrer" className="hidden h-9 items-center gap-2 border border-foreground px-3 text-[9px] font-semibold sm:flex">
              <Eye size={14} /> View store
            </a>
            <button onClick={openAddForm} className="flex h-9 items-center gap-2 bg-primary px-3 text-[9px] font-semibold text-primary-foreground transition hover:bg-accent">
              <Plus size={14} /> Add product
            </button>
          </div>
        </header>

        <main className="min-h-[calc(100vh-64px)]">
          {loadingProducts ? (
            <div className="grid min-h-[60vh] place-items-center">
              <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[.2em] text-muted-foreground">Loading your store…</p>
            </div>
          ) : (
            <>
              {activeNav === "Overview" && <OverviewView products={products} orders={orders} onNavigate={navigate} />}
              {activeNav === "Products" && <ProductsView products={products} setProducts={setProducts} categories={categories} />}
              {activeNav === "Orders" && <OrdersView orders={orders} setOrders={setOrders} />}
              {activeNav === "Categories" && <CategoriesView products={products} categories={categories} setCategories={setCategories} />}
              {activeNav === "Customers" && <CustomersView customers={customers} />}
              {activeNav === "Shipping" && <ShippingView zones={zones} setZones={setZones} />}
            </>
          )}
        </main>
      </div>

      <AddProductForm open={addFormOpen} onClose={() => setAddFormOpen(false)} onCreate={createProduct} categories={categories} />

      {syncError && (
        <div className="fixed bottom-5 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2 border border-[#d8a49a] bg-[#f6e3df] px-5 py-3 font-['DM_Mono'] text-[8px] text-[#8a3a2a] shadow-xl lg:left-[calc(50%+116px)]">
          <X size={13} /> {syncError}
        </div>
      )}

      <button className="fixed bottom-5 right-5 grid size-11 place-items-center rounded-full bg-[#20372f] text-white shadow-lg transition hover:bg-accent" aria-label="Get help">
        <CircleHelp size={18} />
      </button>
    </div>
  );
}

function SessionGate() {
  const [state, setState] = useState<{ status: "loading" } | { status: "signed-out" } | { status: "denied"; email: string } | { status: "admin"; email: string }>({ status: "loading" });

  useEffect(() => {
    let active = true;

    const resolve = async (session: any) => {
      if (!active) return;
      if (!session) {
        setState({ status: "signed-out" });
        return;
      }
      let role = session.user.app_metadata?.role;
      if (role !== "admin") {
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
        role = profile?.role ?? role;
      }
      if (!active) return;
      const email = session.user.email ?? "";
      if (role === "admin") {
        setState({ status: "admin", email });
      } else {
        setState({ status: "denied", email });
      }
    };

    supabase.auth.getSession().then(({ data }) => resolve(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => resolve(session));
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-[#20372f]">
        <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[.25em] text-white/50">leano office · loading…</p>
      </div>
    );
  }
  if (state.status === "signed-out") return <LoginScreen />;
  if (state.status === "denied") {
    return (
      <div className="grid min-h-screen place-items-center bg-[#20372f] p-6 font-['DM_Sans']">
        <div className="w-full max-w-sm border border-white/10 bg-[#f8f4ed] p-8 text-center">
          <p className="font-['Fraunces'] text-[22px] font-semibold text-[#20372f]">Not an admin account</p>
          <p className="mt-3 text-[10px] leading-5 text-[#20372f]/70">
            <span className="font-semibold">{state.email}</span> doesn't have admin access. Ask the store owner to set this user's role to <code className="bg-[#e8e2d6] px-1">admin</code> in the profiles table.
          </p>
          <button onClick={() => supabase.auth.signOut()} className="mt-6 h-10 w-full border border-[#20372f] text-[9px] font-semibold text-[#20372f] transition hover:bg-[#20372f] hover:text-white">
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return <Portal userEmail={state.email} />;
}

function App() {
  if (!supabaseConfigured) return <SetupScreen />;
  return <SessionGate />;
}

export default App;
