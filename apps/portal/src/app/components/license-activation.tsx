import { useState } from "react";
import { Key, RefreshCw, CheckCircle2, Clock, Users, Calendar } from "lucide-react";

export function LicenseActivation() {
  const [licenseKey, setLicenseKey] = useState("");
  const [isActivating, setIsActivating] = useState(false);

  const handleActivate = () => {
    setIsActivating(true);
    // Simulate activation
    setTimeout(() => {
      setIsActivating(false);
    }, 1500);
  };

  const handleRefresh = () => {
    // Refresh license status
    console.log("Refreshing status...");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-5">
        <h2 className="text-white flex items-center gap-2">
          <Key className="w-5 h-5" />
          License Activation
        </h2>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - License Key Input */}
          <div>
            <label className="block text-gray-900 mb-2">
              Enter License Key
            </label>
            <p className="text-gray-500 text-sm mb-4">
              Enter your product license key to unlock full features
            </p>
            
            <div className="relative mb-6">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Key className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-900"
              />
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={handleActivate}
                disabled={isActivating}
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl transition-all shadow-lg shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isActivating ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Activating...
                  </span>
                ) : (
                  "Activate License"
                )}
              </button>
              <button
                onClick={handleRefresh}
                className="px-5 py-3.5 border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 text-gray-700 rounded-xl transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
              <p className="text-gray-700 text-sm flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                Prototype mode activation optional. All users can enter the app.
              </p>
              <p className="text-teal-600 text-sm flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                Free tier enabled: view-only prototype access
              </p>
            </div>
          </div>

          {/* Right Side - License Status */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              License Status
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Plan Type</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full text-sm">
                    Prototype
                  </span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Status
                  </span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm uppercase tracking-wide">
                    Open
                  </span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Expiry Date
                  </span>
                  <span className="text-gray-900">—</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    License Key
                  </span>
                  <span className="text-gray-400 text-sm">Not activated</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border-t-2 border-teal-500">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Seats Used
                  </span>
                  <span className="text-gray-900">0</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Seats Available</span>
                  <span className="text-teal-600">Unlimited</span>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-blue-600 w-0 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}