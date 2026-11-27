import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { category: "Sales", budget: 120000, actual: 128000 },
  { category: "Marketing", budget: 35000, actual: 32000 },
  { category: "Operations", budget: 85000, actual: 88000 },
  { category: "HR", budget: 45000, actual: 43000 },
  { category: "IT", budget: 28000, actual: 30000 },
  { category: "Admin", budget: 22000, actual: 20000 },
];

export function BudgetVsActual() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-gray-900">Budget vs Actual</h2>
        <p className="text-gray-600 text-sm">Current month comparison</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="category" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Legend />
          <Bar dataKey="budget" fill="#94a3b8" name="Budget" radius={[8, 8, 0, 0]} />
          <Bar dataKey="actual" fill="#3b82f6" name="Actual" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
