import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Payroll", value: 285000 },
  { name: "Rent & Utilities", value: 125000 },
  { name: "Marketing", value: 95000 },
  { name: "Supplies", value: 78000 },
  { name: "Insurance", value: 52000 },
  { name: "Technology", value: 68000 },
  { name: "Other", value: 42000 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#6b7280"];

export function ExpenseBreakdown() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-gray-900">Expense Breakdown</h2>
        <p className="text-gray-600 text-sm">Distribution by category</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
