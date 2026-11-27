import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", margin: 27.1 },
  { month: "Feb", margin: 29.3 },
  { month: "Mar", margin: 30.7 },
  { month: "Apr", margin: 28.4 },
  { month: "May", margin: 31.4 },
  { month: "Jun", margin: 33.0 },
  { month: "Jul", margin: 34.3 },
  { month: "Aug", margin: 33.9 },
  { month: "Sep", margin: 34.4 },
  { month: "Oct", margin: 35.6 },
  { month: "Nov", margin: 35.2 },
  { month: "Dec", margin: 37.9 },
];

export function ProfitMarginTrend() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-gray-900">Profit Margin Trend</h2>
        <p className="text-gray-600 text-sm">Percentage over 12 months</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            formatter={(value: number) => `${value}%`}
          />
          <Area type="monotone" dataKey="margin" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMargin)" name="Profit Margin" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
