import React from "react";
import { INDUSTRY_PROFILES } from "./industryProfiles";

/**
 * Slim, in-place industry chooser for the homepage hero.
 *
 * A compact pill row (radiogroup) — no bulky panel. The parent owns the
 * selected profile. Keyboard/pointer accessible.
 */
export default function IndustrySelector({
  selectedProfileKey = null,
  onSelect = () => {},
}) {
  return (
    <div className="min-w-0">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        Who are you protecting?
      </span>

      <div
        className="mt-2 flex flex-wrap gap-2"
        role="radiogroup"
        aria-label="Organisation profile"
      >
        {INDUSTRY_PROFILES.map((profile) => {
          const isSelected = profile.key === selectedProfileKey;
          return (
            <button
              key={profile.key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(profile.key)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] ${
                isSelected
                  ? "border-[#F2600B] bg-[#F2600B]/15 text-[#ff8534]"
                  : "border-white/15 bg-white/[0.04] text-gray-300 hover:border-[#F2600B]/50 hover:text-white"
              }`}
            >
              {profile.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
