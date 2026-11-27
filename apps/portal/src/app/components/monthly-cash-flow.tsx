import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const data = [
  { month: "Jan", cashFlow: 23000 },
  { month: "Feb", cashFlow: 27000 },
  { month: "Mar", cashFlow: 27000 },
  { month: "Apr", cashFlow: 27000 },
  { month: "May", cashFlow: 33000 },
  { month: "Jun", cashFlow: 37000 },
  { month: "Jul", cashFlow: 37000 },
  { month: "Aug", cashFlow: 40000 },
  { month: "Sep", cashFlow: 43000 },
  { month: "Oct", cashFlow: 47000 },
  { month: "Nov", cashFlow: 45000 },
  { month: "Dec", cashFlow: 55000 },
];

export function MonthlyCashFlow() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-gray-900">Monthly Cash Flow</h2>
        <p className="text-gray-600 text-sm">Net cash position each month</p>
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
          <ReferenceLine y={0} stroke="#6b7280" />
          <Bar dataKey="cashFlow" fill="#10b981" name="Cash Flow" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
