import { TrendingUp, Calendar } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Financial Dashboard</h1>
              <p className="text-gray-600 text-sm">Real-time accounting insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700 text-sm">Fiscal Year 2024</span>
          </div>
        </div>
      </div>
    </header>
  );
}
