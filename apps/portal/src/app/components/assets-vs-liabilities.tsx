import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { quarter: "Q1 2023", assets: 580000, liabilities: 320000, equity: 260000 },
  { quarter: "Q2 2023", assets: 625000, liabilities: 335000, equity: 290000 },
  { quarter: "Q3 2023", assets: 680000, liabilities: 345000, equity: 335000 },
  { quarter: "Q4 2023", assets: 735000, liabilities: 355000, equity: 380000 },
  { quarter: "Q1 2024", assets: 785000, liabilities: 365000, equity: 420000 },
  { quarter: "Q2 2024", assets: 845000, liabilities: 375000, equity: 470000 },
  { quarter: "Q3 2024", assets: 910000, liabilities: 385000, equity: 525000 },
  { quarter: "Q4 2024", assets: 985000, liabilities: 390000, equity: 595000 },
];

export function AssetsVsLiabilities() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-gray-900">Assets vs Liabilities</h2>
        <p className="text-gray-600 text-sm">Quarterly balance sheet overview</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="quarter" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Legend />
          <Bar dataKey="assets" fill="#10b981" name="Assets" radius={[8, 8, 0, 0]} />
          <Bar dataKey="liabilities" fill="#ef4444" name="Liabilities" radius={[8, 8, 0, 0]} />
          <Line type="monotone" dataKey="equity" stroke="#3b82f6" strokeWidth={2} name="Equity" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
