const STORAGE_KEY = "krafo.homepage.industryPreference";

const PROFILE_KEYS = new Set([
  "government",
  "business",
  "institution",
  "ngo",
]);

/**
 * Return whether a value is one of the supported homepage profile keys.
 *
 * This module deliberately owns the validation boundary so stored values can
 * never become an implicit source of profile inference.
 */
export function isValidProfileKey(profileKey) {
  return typeof profileKey === "string" && PROFILE_KEYS.has(profileKey);
}

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
    return null;
  }
}

function isStoredPreference(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const keys = Object.keys(value);
  return (
    keys.length === 2 &&
    keys.includes("enabled") &&
    keys.includes("profileKey") &&
    value.enabled === true &&
    isValidProfileKey(value.profileKey)
  );
}

/**
 * Read the explicitly enabled local homepage preference.
 *
 * A null result means that storage is unavailable, no preference exists, or
 * the stored value is malformed. All storage and parsing failures are
 * intentionally treated as a neutral state.
 */
export function readIndustryPreference() {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  let rawValue;
  try {
    rawValue = storage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }

  if (rawValue === null) {
    return null;
  }

  let parsedValue;
  try {
    parsedValue = JSON.parse(rawValue);
  } catch {
    try {
      storage.removeItem(STORAGE_KEY);
    } catch {
      // A restricted storage implementation may reject cleanup as well.
    }
    return null;
  }

  if (!isStoredPreference(parsedValue)) {
    try {
      storage.removeItem(STORAGE_KEY);
    } catch {
      // Malformed data must never prevent the homepage from rendering.
    }
    return null;
  }

  return {
    enabled: true,
    profileKey: parsedValue.profileKey,
  };
}

/**
 * Persist a selected profile only after the visitor explicitly opts in.
 * Invalid keys and unavailable/quota-restricted storage are safe no-ops.
 */
export function writeIndustryPreference(profileKey) {
  if (!isValidProfileKey(profileKey)) {
    return;
  }

  const storage = getStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(
      STORAGE_KEY,
      JSON.stringify({ enabled: true, profileKey }),
    );
  } catch {
    // Quota, security, and serialization failures leave the in-memory choice
    // usable without making persistence a requirement.
  }
}

/**
 * Clear the local preference without affecting the current in-memory choice.
 */
export function clearIndustryPreference() {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // Clearing is best effort when browser storage is restricted.
  }
}

export { STORAGE_KEY };
