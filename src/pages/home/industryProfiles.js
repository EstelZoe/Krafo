import audGovernment from "../../assets/images/aud-government.webp";
import audBusiness from "../../assets/images/aud-business.webp";
import audInstitution from "../../assets/images/aud-institution.webp";
import audNgo from "../../assets/images/aud-ngo.webp";

/**
 * Stable keys for the homepage audience profiles.
 *
 * These keys are intentionally independent of the visible labels so they can
 * safely be used by selector state and browser-local preferences.
 */
export const PROFILE_KEYS = Object.freeze({
  GOVERNMENT: "government",
  BUSINESS: "business",
  INSTITUTION: "institution",
  NGO: "ngo",
});

/**
 * Approved audience content used by the homepage selector and audience tiles.
 * Keep copy here grounded in the existing homepage content; do not infer a
 * profile or add claims from visitor data.
 */
export const INDUSTRY_PROFILES = Object.freeze([
  Object.freeze({
    key: PROFILE_KEYS.GOVERNMENT,
    label: "Government & Public Sector",
    shortText:
      "Citizen data, critical services and the scrutiny that comes with both. Compliance-aware security and systems built to be audited.",
    selectorText:
      "Citizen data, critical services and the scrutiny that comes with both. Compliance-aware security and systems built to be audited.",
    image: audGovernment,
    wide: true,
  }),
  Object.freeze({
    key: PROFILE_KEYS.BUSINESS,
    label: "Businesses & SMEs",
    shortText: "One incident shouldn't be able to undo years of work.",
    selectorText: "One incident shouldn't be able to undo years of work.",
    image: audBusiness,
    wide: false,
  }),
  Object.freeze({
    key: PROFILE_KEYS.INSTITUTION,
    label: "Institutions & Schools",
    shortText: "Modernising without exposing the people you serve.",
    selectorText: "Modernising without exposing the people you serve.",
    image: audInstitution,
    wide: false,
  }),
  Object.freeze({
    key: PROFILE_KEYS.NGO,
    label: "NGOs & Impact",
    shortText: "Sensitive beneficiary data, protected on a real budget.",
    selectorText: "Sensitive beneficiary data, protected on a real budget.",
    image: audNgo,
    wide: false,
  }),
]);

/**
 * Return a profile only for a supported key. Invalid or absent keys represent
 * the neutral selector state and never fall back to another audience.
 */
export function getIndustryProfile(profileKey) {
  if (typeof profileKey !== "string") return null;
  return INDUSTRY_PROFILES.find((profile) => profile.key === profileKey) || null;
}

export function isValidProfileKey(profileKey) {
  return getIndustryProfile(profileKey) !== null;
}
