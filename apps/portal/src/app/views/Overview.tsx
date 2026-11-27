import { ArrowDownRight, ArrowUpRight, Package, ShoppingBag, Users } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Order, Product } from "../data";

function buildRevenueData(orders: Order[]) {
  const months: { key: string; month: string; revenue: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      month: d.toLocaleDateString("en-GB", { month: "short" }),
      revenue: 0,
    });
  }
  for (const order of orders) {
    if (order.status === "Cancelled" || !order.createdAt) continue;
    const d = new Date(order.createdAt);
    const bucket = months.find((m) => m.key === `${d.getFullYear()}-${d.getMonth()}`);
    if (bucket) bucket.revenue += order.total;
  }
  return months;
}

const statusStyles: Record<Order["status"], string> = {
  Pending: "border-[#d8b186] bg-[#f6ead8] text-[#8a5a1d]",
  Paid: "border-[#9ab0a1] bg-[#e5eee8] text-[#31523e]",
  Shipped: "border-[#9aa9c4] bg-[#e4e9f4] text-[#33456e]",
  Delivered: "border-[#9ab0a1] bg-[#e5eee8] text-[#31523e]",
  Cancelled: "border-[#d8a49a] bg-[#f6e3df] text-[#8a3a2a]",
};

type Props = {
  products: Product[];
  orders: Order[];
  onNavigate: (label: string) => void;
};

export function OverviewView({ products, orders, onNavigate }: Props) {
  const revenueData = buildRevenueData(orders);
  const monthRevenue = revenueData[revenueData.length - 1].revenue;
  const prevRevenue = revenueData[revenueData.length - 2].revenue;
  const growth = prevRevenue ? (((monthRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1) : "0.0";
  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Paid").length;
  const lowStock = products.filter((p) => p.stock < 10);
  const categoryTotals = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  const pieColors = ["#20372f", "#ff674d", "#b75543", "#8a9b8f", "#d8b186"];

  const stats = [
    { label: `Revenue · ${revenueData[revenueData.length - 1].month}`, value: `R${monthRevenue.toLocaleString()}`, delta: `+${growth}%`, up: true },
    { label: "Open orders", value: pendingOrders, delta: `${orders.length} total`, up: true },
    { label: "Active products", value: products.filter((p) => p.status === "Active").length, delta: `${products.length} in catalog`, up: true },
    { label: "Low stock", value: lowStock.length, delta: "needs attention", up: false },
  ];

  return (
    <>
      <section className="border-b border-border px-5 py-7 md:px-8 md:py-9">
        <div className="flex items-center gap-2 font-['DM_Mono'] text-[7px] uppercase tracking-[.2em] text-accent">
          <span className="size-1.5 bg-accent" /> Store performance · last 6 months
        </div>
        <h1 className="mt-3 font-['Fraunces'] text-[40px] font-medium leading-none tracking-[-.04em] md:text-[52px]">
          Good morning, <i className="font-normal text-[#b75543]">here's the store.</i>
        </h1>
        <p className="mt-3 max-w-xl text-[11px] leading-5 text-muted-foreground">
          Revenue, orders and inventory at a glance. Everything is synced with your storefront.
        </p>
      </section>

      <section className="grid grid-cols-2 divide-border border-b border-border md:grid-cols-4 md:divide-x">
        {stats.map(({ label, value, delta, up }) => (
          <div key={label} className="border-border px-5 py-5 md:px-7">
            <p className="font-['DM_Mono'] text-[7px] uppercase tracking-[.17em] text-muted-foreground">{label}</p>
            <p className="mt-2 font-['Fraunces'] text-[30px] font-semibold leading-none">{value}</p>
            <p className={`mt-2 flex items-center gap-1 text-[9px] ${up ? "text-[#476b57]" : "text-[#b75543]"}`}>
              {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {delta}
            </p>
          </div>
        ))}
      </section>

      <section className="grid border-b border-border xl:grid-cols-[1.6fr_1fr]">
        <div className="border-b border-border p-5 md:p-7 xl:border-b-0 xl:border-r">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-['DM_Mono'] text-[7px] uppercase tracking-[.17em] text-muted-foreground">Revenue</p>
              <h2 className="mt-1 font-['Fraunces'] text-[21px] font-semibold">Revenue, last 6 months</h2>
            </div>
            <div className="flex gap-4 font-['DM_Mono'] text-[7px] uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2 bg-[#20372f]" /> Revenue</span>
            </div>
          </div>
          <div className="mt-5 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ left: -18, right: 6, top: 4 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="#d8d2c6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#7a7568" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#7a7568" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R${v / 1000}k`} />
                <Tooltip formatter={(value: number) => `R${value.toLocaleString()}`} contentStyle={{ fontSize: 10, border: "1px solid #d8d2c6", borderRadius: 0, background: "#f8f4ed" }} />
                <Area type="monotone" dataKey="revenue" stroke="#20372f" fill="#20372f" fillOpacity={0.12} strokeWidth={2} name="Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 md:p-7">
          <p className="font-['DM_Mono'] text-[7px] uppercase tracking-[.17em] text-muted-foreground">Catalog mix</p>
          <h2 className="mt-1 font-['Fraunces'] text-[21px] font-semibold">Products by category</h2>
          <div className="mt-2 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={75} paddingAngle={3} strokeWidth={0}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 10, border: "1px solid #d8d2c6", borderRadius: 0, background: "#f8f4ed" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1 space-y-1.5">
            {pieData.map(({ name, value }, i) => (
              <div key={name} className="flex items-center gap-2 text-[9px]">
                <span className="size-2" style={{ background: pieColors[i % pieColors.length] }} />
                <span className="flex-1">{name}</span>
                <span className="font-['DM_Mono'] text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid xl:grid-cols-2">
        <div className="border-b border-border xl:border-b-0 xl:border-r">
          <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-7">
            <h2 className="flex items-center gap-2 font-['Fraunces'] text-[18px] font-semibold"><ShoppingBag size={16} /> Recent orders</h2>
            <button onClick={() => onNavigate("Orders")} className="font-['DM_Mono'] text-[7px] uppercase tracking-wider text-accent hover:underline">View all</button>
          </div>
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center gap-4 border-b border-border px-5 py-3.5 md:px-7">
              <span className="font-['DM_Mono'] text-[9px] text-muted-foreground">{order.id}</span>
              <span className="min-w-0 flex-1 truncate text-[11px] font-medium">{order.customer}</span>
              <span className={`border px-2 py-1 font-['DM_Mono'] text-[6px] uppercase tracking-wider ${statusStyles[order.status]}`}>{order.status}</span>
              <span className="w-14 text-right font-['DM_Mono'] text-[10px]">R{order.total.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-7">
            <h2 className="flex items-center gap-2 font-['Fraunces'] text-[18px] font-semibold"><Package size={16} /> Low stock alerts</h2>
            <button onClick={() => onNavigate("Products")} className="font-['DM_Mono'] text-[7px] uppercase tracking-wider text-accent hover:underline">Manage</button>
          </div>
          {lowStock.length === 0 && <p className="p-8 text-center text-[10px] text-muted-foreground">All stocked up — nothing below 10 units.</p>}
          {lowStock.map((product) => (
            <div key={product.id} className="flex items-center gap-4 border-b border-border px-5 py-3.5 md:px-7">
              <span className="h-11 w-9 overflow-hidden bg-secondary"><img src={product.image} alt="" className="h-full w-full object-cover" /></span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-medium">{product.name}</span>
                <span className="font-['DM_Mono'] text-[7px] uppercase tracking-wider text-muted-foreground">{product.id}</span>
              </span>
              <span className={`font-['DM_Mono'] text-[9px] ${product.stock === 0 ? "text-[#b75543]" : "text-[#8a5a1d]"}`}>
                {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-3 px-5 py-5 md:px-7">
            <Users size={15} className="text-muted-foreground" />
            <p className="text-[10px] leading-4 text-muted-foreground">
              Repeat customers drive <span className="font-semibold text-foreground">38%</span> of revenue this month. Keep them close.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
