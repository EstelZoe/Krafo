import React from "react";
import PaymentLinkButton from "./PaymentLinkButton";

// Renders pricing-style option cards with a bold price band, image slot, features, and CTA
export default function EnrollmentOptions({ options = [], brand = {}, showImages = false }) {
  const primary = brand.primary || "#F2600B";
  return (
    <div className="grid grid-cols-1 gap-y-6 gap-x-6 md:grid-cols-2 xl:grid-cols-3 items-start">
      {options.map((opt) => (
        <div
          key={opt.id}
          className="rounded-xl overflow-hidden border border-white/10 bg-[#0c0c0c] shadow-lg min-h-[360px] flex flex-col"
        >
          {/* Price/Header band */}
          <div
            className="px-4 py-3 text-center font-extrabold tracking-tight text-2xl"
            style={{ background: opt.color || primary, color: "#000" }}
          >
            {opt.price || opt.priceNote || "Enrollment Option"}
          </div>

          {/* Optional top image */}
          {showImages && opt.image && (
            <img src={opt.image} alt={opt.label} className="w-full h-32 object-cover" />
          )}

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-white text-xl font-bold">{opt.label}</h4>
            {opt.priceNote && (
              <p className="text-gray-400 text-sm mt-1">{opt.priceNote}</p>
            )}
            {Array.isArray(opt.features) && opt.features.length > 0 && (
              <ul className="mt-3 text-sm text-gray-300 space-y-1">
                {opt.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#F2600B]">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-5">
              <PaymentLinkButton href={opt.payLink} disabled={!opt.payLink}>
                {opt.payLink ? "Pay with Paystack" : "Coming Soon"}
              </PaymentLinkButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
