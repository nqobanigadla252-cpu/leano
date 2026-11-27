import { useState } from "react";
import { Mail, Search } from "lucide-react";
import type { Customer } from "../data";

type Props = {
  customers: Customer[];
};

export function CustomersView({ customers: allCustomers }: Props) {
  const [search, setSearch] = useState("");
  const customers = allCustomers.filter((c) =>
    `${c.name} ${c.email} ${c.location}`.toLowerCase().includes(search.toLowerCase()),
  );

  const totalSpent = allCustomers.reduce((sum, c) => sum + c.spent, 0);
  const repeat = allCustomers.filter((c) => c.orders > 1).length;

  return (
    <>
      <section className="border-b border-border px-5 py-7 md:px-8 md:py-9">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-['DM_Mono'] text-[7px] uppercase tracking-[.2em] text-accent">
              <span className="size-1.5 bg-accent" /> Relationships · {allCustomers.length} customers
            </div>
            <h1 className="mt-3 font-['Fraunces'] text-[40px] font-medium leading-none tracking-[-.04em] md:text-[52px]">
              People who <i className="font-normal text-[#b75543]">come back.</i>
            </h1>
            <p className="mt-3 max-w-xl text-[11px] leading-5 text-muted-foreground">
              Your customer list — what they buy, how often, and where they are.
            </p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-border border border-border bg-card">
            {[
              ["Lifetime value", `R${totalSpent.toLocaleString()}`],
              ["Repeat buyers", repeat],
              ["Avg. spend", `R${Math.round(totalSpent / (allCustomers.length || 1))}`],
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
        <label className="relative block md:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers"
            className="h-10 w-full border border-border bg-card pl-9 pr-3 text-[10px] outline-none transition focus:border-accent"
          />
        </label>
      </section>

      <section>
        <div className="hidden grid-cols-[1fr_1fr_90px_100px_130px_90px] gap-3 border-b border-border bg-card px-5 py-3 font-['DM_Mono'] text-[7px] uppercase tracking-wider text-muted-foreground md:grid md:px-7">
          <span>Customer</span><span>Email</span><span>Orders</span><span>Spent</span><span>Location</span><span className="text-right">Contact</span>
        </div>
        {customers.map((customer) => (
          <div key={customer.id} className="grid grid-cols-2 gap-3 border-b border-border px-5 py-4 text-[10px] md:grid-cols-[1fr_1fr_90px_100px_130px_90px] md:items-center md:px-7">
            <span className="flex min-w-0 items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center bg-[#20372f] font-['Fraunces'] text-[13px] font-semibold text-white">
                {customer.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-['Fraunces'] text-[14px] font-semibold">{customer.name}</span>
                <span className="font-['DM_Mono'] text-[7px] uppercase tracking-wider text-muted-foreground">since {customer.joined}</span>
              </span>
            </span>
            <span className="truncate text-muted-foreground">{customer.email}</span>
            <span>{customer.orders}</span>
            <span className="font-['DM_Mono']">R{customer.spent.toFixed(2)}</span>
            <span className="truncate">{customer.location}</span>
            <span className="col-span-2 md:col-span-1 md:text-right">
              <a href={`mailto:${customer.email}`} className="inline-flex h-8 items-center gap-1.5 border border-border px-3 text-[8px] font-semibold transition hover:border-accent hover:text-accent">
                <Mail size={12} /> Email
              </a>
            </span>
          </div>
        ))}
        {customers.length === 0 && <p className="p-10 text-center text-[10px] text-muted-foreground">No customers match your search.</p>}
      </section>
    </>
  );
}
