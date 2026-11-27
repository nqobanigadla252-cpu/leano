import { PricingCard } from "./pricing-card";
import { Sparkles } from "lucide-react";

const pricingPlans = [
  {
    name: "Free Tier",
    subtitle: "Prototype • View-only access",
    seatsUsed: 0,
    seatsAvailable: "Unlimited",
    price: "₦0",
    period: "Forever",
    primaryButton: "Preview App",
    secondaryButton: "WhatsApp",
    isPrimary: false,
    isPopular: false,
    features: [
      "View-only access",
      "Unlimited users",
      "Basic features",
      "Community support",
    ],
  },
  {
    name: "Monthly Plan",
    subtitle: "Professional features",
    seatsUsed: 0,
    seatsAvailable: "Unlimited",
    price: "₦80,000",
    period: "per month",
    primaryButton: "Request License (Email)",
    secondaryButton: "WhatsApp",
    isPrimary: false,
    isPopular: false,
    features: [
      "Full feature access",
      "Unlimited seats",
      "Priority support",
      "Monthly billing",
    ],
  },
  {
    name: "Annual Plan",
    subtitle: "Professional features + Savings",
    seatsUsed: 0,
    seatsAvailable: "Unlimited",
    price: "₦800,000",
    period: "per year",
    primaryButton: "Request License (Email)",
    secondaryButton: "WhatsApp",
    isPrimary: false,
    isPopular: true,
    features: [
      "Full feature access",
      "Unlimited seats",
      "Priority support",
      "Save 2 months free",
    ],
  },
  {
    name: "Lifetime Plan",
    subtitle: "One-time payment • Best value",
    seatsUsed: 0,
    seatsAvailable: "Unlimited",
    price: "Contact Us",
    period: "one-time payment",
    primaryButton: "Request License (Email)",
    secondaryButton: "WhatsApp",
    isPrimary: true,
    isPopular: false,
    features: [
      "Lifetime access",
      "Unlimited seats",
      "Premium support",
      "All future updates",
    ],
  },
];

export function PricingSection() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-5">
        <h2 className="text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Pricing Plans
        </h2>
        <p className="text-blue-100 text-sm mt-1">Choose the perfect plan for your business</p>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}