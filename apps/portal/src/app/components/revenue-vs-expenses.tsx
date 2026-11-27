import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 85000, expenses: 62000 },
  { month: "Feb", revenue: 92000, expenses: 65000 },
  { month: "Mar", revenue: 88000, expenses: 61000 },
  { month: "Apr", revenue: 95000, expenses: 68000 },
  { month: "May", revenue: 105000, expenses: 72000 },
  { month: "Jun", revenue: 112000, expenses: 75000 },
  { month: "Jul", revenue: 108000, expenses: 71000 },
  { month: "Aug", revenue: 118000, expenses: 78000 },
  { month: "Sep", revenue: 125000, expenses: 82000 },
  { month: "Oct", revenue: 132000, expenses: 85000 },
  { month: "Nov", revenue: 128000, expenses: 83000 },
  { month: "Dec", revenue: 145000, expenses: 90000 },
];

export function RevenueVsExpenses() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-gray-900">Revenue vs Expenses</h2>
        <p className="text-gray-600 text-sm">Monthly comparison over time</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
          <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
