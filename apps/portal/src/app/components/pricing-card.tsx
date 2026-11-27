import { MessageCircle, Check, Crown, TrendingUp } from "lucide-react";

interface PricingCardProps {
  name: string;
  subtitle: string;
  seatsUsed: number;
  seatsAvailable: string;
  price: string;
  period: string;
  primaryButton: string;
  secondaryButton: string;
  isPrimary?: boolean;
  isPopular?: boolean;
  features: string[];
}

export function PricingCard({
  name,
  subtitle,
  seatsUsed,
  seatsAvailable,
  price,
  period,
  primaryButton,
  secondaryButton,
  isPrimary = false,
  isPopular = false,
  features,
}: PricingCardProps) {
  return (
    <div
      className={`relative border-2 rounded-2xl p-6 transition-all hover:shadow-2xl hover:-translate-y-1 ${
        isPrimary
          ? "border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl"
          : isPopular
          ? "border-teal-400 bg-white shadow-lg"
          : "border-gray-200 bg-white hover:border-teal-300"
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-1 shadow-lg">
            <TrendingUp className="w-3.5 h-3.5" />
            Most Popular
          </div>
        </div>
      )}

      {/* Premium Badge */}
      {isPrimary && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-1 shadow-lg">
            <Crown className="w-3.5 h-3.5" />
            Best Value
          </div>
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-gray-900 mb-1.5 flex items-center gap-2">
          {isPrimary && <Crown className="w-5 h-5 text-purple-600" />}
          {name}
        </h3>
        <p className="text-gray-600 text-sm leading-snug">{subtitle}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="text-gray-900 mb-1">{price}</div>
        <p className="text-gray-500 text-sm">{period}</p>
      </div>

      {/* Seats Info */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-gray-600">Seats Used</span>
          <span className="text-gray-900">{seatsUsed}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Available</span>
          <span className="text-teal-600">{seatsAvailable}</span>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6 space-y-2.5">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <button
          className={`w-full py-3 rounded-xl transition-all shadow-lg ${
            isPrimary
              ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-purple-500/30"
              : "bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-teal-500/30"
          }`}
        >
          {primaryButton}
        </button>
        <button className="w-full py-3 border-2 border-teal-500 text-teal-600 hover:bg-teal-50 rounded-xl transition-all flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4" />
          {secondaryButton}
        </button>
      </div>
    </div>
  );
}