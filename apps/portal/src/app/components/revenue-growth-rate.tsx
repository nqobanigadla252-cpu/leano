import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const data = [
  { month: "Jan", growthRate: 8.5 },
  { month: "Feb", growthRate: 12.3 },
  { month: "Mar", growthRate: 6.8 },
  { month: "Apr", growthRate: 15.2 },
  { month: "May", growthRate: 18.4 },
  { month: "Jun", growthRate: 14.7 },
  { month: "Jul", growthRate: 10.2 },
  { month: "Aug", growthRate: 16.8 },
  { month: "Sep", growthRate: 19.5 },
  { month: "Oct", growthRate: 22.3 },
  { month: "Nov", growthRate: 17.1 },
  { month: "Dec", growthRate: 24.6 },
];

export function RevenueGrowthRate() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-gray-900">Revenue Growth Rate</h2>
        <p className="text-gray-600 text-sm">Year-over-year percentage change</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            formatter={(value: number) => `${value}%`}
          />
          <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="growthRate" 
            stroke="#10b981" 
            strokeWidth={3} 
            name="Growth Rate"
            dot={{ fill: "#10b981", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
