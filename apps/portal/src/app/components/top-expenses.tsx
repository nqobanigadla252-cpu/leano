import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { category: "Salaries & Wages", amount: 285000 },
  { category: "Office Rent", amount: 95000 },
  { category: "Marketing & Ads", amount: 85000 },
  { category: "Software Licenses", amount: 68000 },
  { category: "Equipment", amount: 52000 },
  { category: "Professional Services", amount: 48000 },
  { category: "Utilities", amount: 30000 },
  { category: "Travel", amount: 28000 },
];

export function TopExpenses() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-gray-900">Top Expenses</h2>
        <p className="text-gray-600 text-sm">Highest spending categories YTD</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis type="category" dataKey="category" stroke="#6b7280" width={150} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Bar dataKey="amount" fill="#ef4444" name="Amount" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
