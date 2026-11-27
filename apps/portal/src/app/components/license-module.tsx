import { LicenseActivation } from "./license-activation";
import { PricingSection } from "./pricing-section";
import { Shield } from "lucide-react";

export function LicenseModule() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-3 rounded-xl shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">License Management</h1>
              <p className="text-gray-600">Manage your subscription and activate licenses</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <LicenseActivation />
          <PricingSection />
        </div>
      </div>
    </div>
  );
}