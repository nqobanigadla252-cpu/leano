import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", products: 52000, services: 25000, consulting: 8000 },
  { month: "Feb", products: 58000, services: 26000, consulting: 8000 },
  { month: "Mar", products: 54000, services: 25000, consulting: 9000 },
  { month: "Apr", products: 60000, services: 26000, consulting: 9000 },
  { month: "May", products: 67000, services: 28000, consulting: 10000 },
  { month: "Jun", products: 72000, services: 29000, consulting: 11000 },
  { month: "Jul", products: 68000, services: 29000, consulting: 11000 },
  { month: "Aug", products: 75000, services: 31000, consulting: 12000 },
  { month: "Sep", products: 80000, services: 32000, consulting: 13000 },
  { month: "Oct", products: 85000, services: 33000, consulting: 14000 },
  { month: "Nov", products: 82000, services: 32000, consulting: 14000 },
  { month: "Dec", products: 95000, services: 35000, consulting: 15000 },
];

export function RevenueByCategory() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-gray-900">Revenue by Category</h2>
        <p className="text-gray-600 text-sm">Stacked monthly breakdown</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Legend />
          <Bar dataKey="products" stackId="a" fill="#3b82f6" name="Products" radius={[0, 0, 0, 0]} />
          <Bar dataKey="services" stackId="a" fill="#10b981" name="Services" radius={[0, 0, 0, 0]} />
          <Bar dataKey="consulting" stackId="a" fill="#f59e0b" name="Consulting" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
