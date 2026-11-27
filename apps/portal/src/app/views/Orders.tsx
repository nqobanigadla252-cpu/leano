import { useState } from "react";
import { Check, Search, Truck, X } from "lucide-react";
import type { Order } from "../data";

const statusStyles: Record<Order["status"], string> = {
  Pending: "border-[#d8b186] bg-[#f6ead8] text-[#8a5a1d]",
  Paid: "border-[#9ab0a1] bg-[#e5eee8] text-[#31523e]",
  Shipped: "border-[#9aa9c4] bg-[#e4e9f4] text-[#33456e]",
  Delivered: "border-[#9ab0a1] bg-[#e5eee8] text-[#31523e]",
  Cancelled: "border-[#d8a49a] bg-[#f6e3df] text-[#8a3a2a]",
};

const nextStatus: Partial<Record<Order["status"], Order["status"]>> = {
  Pending: "Paid",
  Paid: "Shipped",
  Shipped: "Delivered",
};

const filters = ["All", "Pending", "Paid", "Shipped", "Delivered", "Cancelled"] as const;

type Props = {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
};

export function OrdersView({ orders, setOrders }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = orders.filter((order) => {
    const matches = `${order.id} ${order.customer}`.toLowerCase().includes(search.toLowerCase());
    return matches && (filter === "All" || order.status === filter);
  });

  const advance = (id: string) => {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order;
        const next = nextStatus[order.status];
        return next ? { ...order, status: next } : order;
      }),
    );
  };

  const cancel = (id: string) => {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, status: "Cancelled" } : order)));
  };

  const openTotal = orders.filter((o) => o.status === "Pending" || o.status === "Paid").reduce((sum, o) => sum + o.total, 0);

  return (
    <>
      <section className="border-b border-border px-5 py-7 md:px-8 md:py-9">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-['DM_Mono'] text-[7px] uppercase tracking-[.2em] text-accent">
              <span className="size-1.5 bg-accent" /> Fulfilment · {orders.length} orders
            </div>
            <h1 className="mt-3 font-['Fraunces'] text-[40px] font-medium leading-none tracking-[-.04em] md:text-[52px]">
              Orders <i className="font-normal text-[#b75543]">in motion.</i>
            </h1>
            <p className="mt-3 max-w-xl text-[11px] leading-5 text-muted-foreground">
              Track each order from payment to delivery. Advance the status as you fulfil them.
            </p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-border border border-border bg-card">
            {[
              ["To fulfil", orders.filter((o) => o.status === "Pending" || o.status === "Paid").length],
              ["In transit", orders.filter((o) => o.status === "Shipped").length],
              ["Open value", `R${openTotal.toFixed(0)}`],
            ].map(([label, value]) => (
              <div key={label} className="px-4 py-3 md:px-5">
                <p className="font-['Fraunces'] text-[20px] font-semibold leading-none">{value}</p>
                <p className="mt-1.5 font-['DM_Mono'] text-[6px] uppercase tracking-wider text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-[#f1ece4] p-4 md:px-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative block md:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order or customer"
              className="h-10 w-full border border-border bg-card pl-9 pr-3 text-[10px] outline-none transition focus:border-accent"
            />
          </label>
          <div className="flex flex-wrap gap-1">
            {filters.map((item) => (
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
      </section>

      <section>
        <div className="hidden grid-cols-[110px_1fr_90px_90px_110px_110px_150px] gap-3 border-b border-border bg-card px-5 py-3 font-['DM_Mono'] text-[7px] uppercase tracking-wider text-muted-foreground md:grid md:px-7">
          <span>Order</span><span>Customer</span><span>Items</span><span>Total</span><span>Date</span><span>Status</span><span className="text-right">Actions</span>
        </div>
        {visible.map((order) => (
          <div key={order.id} className="grid grid-cols-2 gap-3 border-b border-border px-5 py-4 text-[10px] md:grid-cols-[110px_1fr_90px_90px_110px_110px_150px] md:items-center md:px-7">
            <span className="font-['DM_Mono'] text-[9px]">{order.id}</span>
            <span className="min-w-0">
              <span className="block truncate font-['Fraunces'] text-[14px] font-semibold">{order.customer}</span>
              <span className="text-[8px] text-muted-foreground">{order.channel}</span>
            </span>
            <span>{order.items} item{order.items === 1 ? "" : "s"}</span>
            <span className="font-['DM_Mono']">R{order.total.toFixed(2)}</span>
            <span className="text-muted-foreground">{order.date}</span>
            <span><span className={`inline-flex border px-2 py-1 font-['DM_Mono'] text-[6px] uppercase tracking-wider ${statusStyles[order.status]}`}>{order.status}</span></span>
            <span className="col-span-2 flex gap-2 md:col-span-1 md:justify-end">
              {nextStatus[order.status] && (
                <button onClick={() => advance(order.id)} className="flex h-8 items-center gap-1.5 bg-[#20372f] px-3 text-[8px] font-semibold text-white transition hover:bg-accent">
                  {nextStatus[order.status] === "Shipped" ? <Truck size={12} /> : <Check size={12} />}
                  Mark {nextStatus[order.status]}
                </button>
              )}
              {(order.status === "Pending" || order.status === "Paid") && (
                <button onClick={() => cancel(order.id)} className="flex h-8 items-center gap-1.5 border border-border px-3 text-[8px] font-semibold text-[#a24435] transition hover:border-[#a24435]">
                  <X size={12} /> Cancel
                </button>
              )}
            </span>
          </div>
        ))}
        {visible.length === 0 && <p className="p-10 text-center text-[10px] text-muted-foreground">No orders match this filter.</p>}
      </section>
    </>
  );
}
