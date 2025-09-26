import React from "react";

export default function PaymentLinkButton({ href, children, disabled }) {
  const cls = `block text-center py-3 rounded-lg font-semibold transition-all shadow-lg relative overflow-hidden group ${
    disabled
      ? "bg-gray-700 text-gray-300 cursor-not-allowed"
      : "bg-gradient-to-r from-[#F2600B] to-orange-500 text-black hover:from-orange-500 hover:to-[#F2600B]"
  }`;

  if (!href || disabled) {
    return (
      <button type="button" className={cls} disabled>
        {children}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[#F2600B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-white/30"></div>
    </a>
  );
}
