import { useState } from "react";
import { Plus, Truck } from "lucide-react";
import type { ShippingZone } from "../data";

type Props = {
  zones: ShippingZone[];
  setZones: React.Dispatch<React.SetStateAction<ShippingZone[]>>;
};

export function ShippingView({ zones, setZones }: Props) {
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) => {
    setZones((current) => current.map((z) => (z.id === id ? { ...z, enabled: !z.enabled } : z)));
    setSaved(false);
  };

  const updateRate = (id: string, rate: number) => {
    setZones((current) => current.map((z) => (z.id === id ? { ...z, rate } : z)));
    setSaved(false);
  };

  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const activeCount = zones.filter((z) => z.enabled).length;

  return (
    <>
      <section className="border-b border-border px-5 py-7 md:px-8 md:py-9">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-['DM_Mono'] text-[7px] uppercase tracking-[.2em] text-accent">
              <span className="size-1.5 bg-accent" /> Delivery · {activeCount} active zones
            </div>
            <h1 className="mt-3 font-['Fraunces'] text-[40px] font-medium leading-none tracking-[-.04em] md:text-[52px]">
              Shipping, <i className="font-normal text-[#b75543]">without surprises.</i>
            </h1>
            <p className="mt-3 max-w-xl text-[11px] leading-5 text-muted-foreground">
              Choose where you deliver and what it costs. Rates apply at checkout immediately after saving.
            </p>
          </div>
          <button onClick={save} className="flex h-10 items-center gap-2 self-start bg-accent px-5 text-[9px] font-semibold text-accent-foreground transition hover:bg-[#df4e38] md:self-auto">
            <Truck size={14} /> {saved ? "Saved ✓" : "Save shipping settings"}
          </button>
        </div>
      </section>

      <section>
        {zones.map((zone) => (
          <div key={zone.id} className={`grid gap-4 border-b border-border px-5 py-5 md:grid-cols-[auto_1fr_140px_130px_120px] md:items-center md:px-7 ${!zone.enabled ? "opacity-55" : ""}`}>
            <button
              onClick={() => toggle(zone.id)}
              aria-label={`Toggle ${zone.name}`}
              className={`relative h-6 w-11 shrink-0 border transition ${zone.enabled ? "border-[#31523e] bg-[#476b57]" : "border-border bg-secondary"}`}
            >
              <span className={`absolute top-1/2 size-4 -translate-y-1/2 bg-white transition-all ${zone.enabled ? "left-[calc(100%-20px)]" : "left-1"}`} />
            </button>
            <div className="min-w-0">
              <h2 className="font-['Fraunces'] text-[17px] font-semibold">{zone.name}</h2>
              <p className="mt-1 text-[9px] text-muted-foreground">{zone.regions} · {zone.eta}</p>
            </div>
            <label>
              <span className="font-['DM_Mono'] text-[6px] uppercase tracking-wider text-muted-foreground">Flat rate</span>
              <div className="relative mt-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">R</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={zone.rate}
                  onChange={(e) => updateRate(zone.id, Number(e.target.value))}
                  className="h-9 w-full border border-border bg-background pl-6 pr-2 text-[10px] outline-none focus:border-accent"
                />
              </div>
            </label>
            <div>
              <span className="font-['DM_Mono'] text-[6px] uppercase tracking-wider text-muted-foreground">Free over</span>
              <p className="mt-1 flex h-9 items-center text-[10px]">{zone.freeOver ? `R${zone.freeOver}` : "—"}</p>
            </div>
            <span className={`inline-flex w-fit border px-2 py-1 font-['DM_Mono'] text-[6px] uppercase tracking-wider ${
              zone.enabled ? "border-[#9ab0a1] bg-[#e5eee8] text-[#31523e]" : "border-border text-muted-foreground"
            }`}>
              {zone.enabled ? "Active" : "Disabled"}
            </span>
          </div>
        ))}
      </section>

      <section className="px-5 py-8 md:px-7">
        <button className="flex h-11 items-center gap-2 border border-dashed border-muted-foreground/50 px-5 text-[9px] font-semibold text-muted-foreground transition hover:border-accent hover:text-accent">
          <Plus size={14} /> Add a new shipping zone
        </button>
        <p className="mt-6 max-w-lg text-[9px] leading-4 text-muted-foreground">
          Tip: customers outside your active zones can't check out. Enable International when you're ready to ship worldwide.
        </p>
      </section>
    </>
  );
}
