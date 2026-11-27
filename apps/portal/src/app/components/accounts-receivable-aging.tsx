import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { period: "Current", amount: 125000 },
  { period: "1-30 Days", amount: 85000 },
  { period: "31-60 Days", amount: 42000 },
  { period: "61-90 Days", amount: 18000 },
  { period: "90+ Days", amount: 8500 },
];

export function AccountsReceivableAging() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-gray-900">Accounts Receivable Aging</h2>
        <p className="text-gray-600 text-sm">Outstanding invoices by age</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis type="category" dataKey="period" stroke="#6b7280" width={100} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Bar dataKey="amount" fill="#3b82f6" name="Amount" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
