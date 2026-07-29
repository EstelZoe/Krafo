// quote.js — pure, testable logic for the Services page Quote_Configurator.
//
// No React, no side effects. These functions operate purely on the Pricing_Data
// structure exported from ./pricingData.js and a caller-supplied selection, so the
// Estimated_Total computation can be exercised by unit and property tests
// independently of the presentation layer.
//
// This file will later gain formatGHS + buildQuoteRequest (task 1.6) and
// resolveParticleCount (task 1.9). This task (1.2) implements only the tier lookup
// and estimated-total computation.
//
// _Requirements: 6.1, 6.2, 6.3, 5.2, 5.3, 5.5_

/**
 * Find a tier by id across every category in the Pricing_Data.
 *
 * @param {object} data - Pricing_Data (expects data.categories[].tiers[]).
 * @param {string} tierId - The tier id to locate.
 * @returns {object|undefined} The matching tier object, or undefined if not found.
 */
export function findTier(data, tierId) {
  if (!data || !Array.isArray(data.categories)) return undefined;
  for (const category of data.categories) {
    if (!category || !Array.isArray(category.tiers)) continue;
    const tier = category.tiers.find((t) => t && t.id === tierId);
    if (tier) return tier;
  }
  return undefined;
}

/**
 * Determine whether a tier is a custom-quote tier (non-numeric price).
 *
 * @param {object} data - Pricing_Data.
 * @param {string} tierId - The tier id to inspect.
 * @returns {boolean} True when the tier exists and is flagged custom.
 */
export function isCustomQuote(data, tierId) {
  const tier = findTier(data, tierId);
  return tier ? tier.custom === true : false;
}

/**
 * Compute the Estimated_Total (GHS) for a base tier plus selected add-ons.
 *
 * The add-on sum is derived by filtering the canonical data.addOns list by
 * membership in selectedAddOnIds. Filtering the canonical list (rather than
 * trusting the incoming id array) means duplicate ids cannot double-count and
 * unknown ids contribute nothing, keeping the total well-defined for any input.
 *
 * @param {object} data - Pricing_Data.
 * @param {string} tierId - The selected base tier id.
 * @param {string[]} [selectedAddOnIds] - Ids of currently selected add-ons.
 * @returns {number|null} tier.price + addOnSum, or null for custom/missing tiers.
 */
export function computeEstimatedTotal(data, tierId, selectedAddOnIds = []) {
  const tier = findTier(data, tierId);
  if (!tier || tier.custom) return null;

  const selected = Array.isArray(selectedAddOnIds) ? selectedAddOnIds : [];
  const addOns = data && Array.isArray(data.addOns) ? data.addOns : [];
  const addOnSum = addOns
    .filter((addOn) => addOn && selected.includes(addOn.id))
    .reduce((sum, addOn) => sum + addOn.price, 0);

  return tier.price + addOnSum;
}

/**
 * Format an integer GHS cedis amount as a display string with thousands grouping.
 *
 * Uses the data.currency convention ("GHS") as a prefix. Non-finite amounts
 * (null/undefined/NaN) yield an empty amount portion so callers never render
 * "GHS NaN"; custom-quote handling lives in the display/builder layer, not here.
 *
 * @param {number} amount - Integer GHS cedis amount.
 * @param {string} [currency="GHS"] - Currency prefix.
 * @returns {string} e.g. "GHS 12,300".
 */
export function formatGHS(amount, currency = "GHS") {
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    return currency;
  }
  const grouped = Math.trunc(amount).toLocaleString("en-US");
  return `${currency} ${grouped}`;
}

/**
 * Build a structured Quote_Request prefill object from the current selection.
 *
 * Reuses findTier / isCustomQuote / computeEstimatedTotal rather than duplicating
 * logic. The returned add-ons are derived by filtering the canonical data.addOns
 * list by membership in selectedAddOnIds, so the result reflects exactly the set
 * selected (duplicate ids collapse, unknown ids are dropped).
 *
 * For a custom-quote tier, `custom` is true, `total` is null, and `totalLabel`
 * is a "Custom quote" indication. For a numeric tier, `total` is the numeric
 * Estimated_Total and `totalLabel` is its formatted GHS string.
 *
 * @param {object} data - Pricing_Data.
 * @param {string} tierId - The selected base tier id.
 * @param {string[]} [selectedAddOnIds] - Ids of currently selected add-ons.
 * @returns {{
 *   currency: string,
 *   tier: { id: string, name: string, price: (number|null), custom: boolean, priceLabel: string }|null,
 *   addOns: Array<{ id: string, label: string, price: number, priceLabel: string }>,
 *   custom: boolean,
 *   total: (number|null),
 *   totalLabel: string,
 * }} Structured prefill object.
 */
export function buildQuoteRequest(data, tierId, selectedAddOnIds = []) {
  const currency = data && typeof data.currency === "string" ? data.currency : "GHS";
  const tier = findTier(data, tierId);
  const custom = isCustomQuote(data, tierId);

  const selected = Array.isArray(selectedAddOnIds) ? selectedAddOnIds : [];
  const allAddOns = data && Array.isArray(data.addOns) ? data.addOns : [];
  const addOns = allAddOns
    .filter((addOn) => addOn && selected.includes(addOn.id))
    .map((addOn) => ({
      id: addOn.id,
      label: addOn.label,
      price: addOn.price,
      priceLabel: formatGHS(addOn.price, currency),
    }));

  const total = computeEstimatedTotal(data, tierId, selected);
  const totalLabel = custom ? "Custom quote" : formatGHS(total, currency);

  return {
    currency,
    tier: tier
      ? {
          id: tier.id,
          name: tier.name,
          price: tier.price,
          custom: tier.custom === true,
          priceLabel: tier.custom ? "Custom quote" : formatGHS(tier.price, currency),
        }
      : null,
    addOns,
    custom,
    total,
    totalLabel,
  };
}

/**
 * DENSITY_DIVISOR — controls Hero_Constellation particle density.
 *
 * The particle count is derived from the hero area (width × height) divided by
 * this constant, then clamped by a caller-supplied cap. A larger divisor yields
 * fewer particles per pixel; ~18,000 px² per particle keeps the field readable
 * on large heroes while still protecting weak GPUs via the hard cap.
 *
 * @type {number}
 */
export const DENSITY_DIVISOR = 18000;

/**
 * Resolve the number of Hero_Constellation particles for a given hero area.
 *
 * Returns min(maxParticles, floor(area / DENSITY_DIVISOR)) as a non-negative
 * integer, where area = width * height. Any invalid input (non-finite, negative,
 * or non-number width/height/maxParticles) is treated as 0 so the result is
 * always a non-negative integer that never exceeds maxParticles.
 *
 * @param {number} width - Hero width in pixels.
 * @param {number} height - Hero height in pixels.
 * @param {number} maxParticles - Hard cap on the particle count.
 * @returns {number} A non-negative integer in the range [0, maxParticles].
 */
export function resolveParticleCount(width, height, maxParticles) {
  const cap = toNonNegativeInt(maxParticles);
  if (cap === 0) return 0;

  const safeWidth = toNonNegativeNumber(width);
  const safeHeight = toNonNegativeNumber(height);
  const area = safeWidth * safeHeight;
  if (!Number.isFinite(area) || area <= 0) return 0;

  const density = Math.floor(area / DENSITY_DIVISOR);
  return Math.min(cap, density);
}

/**
 * Coerce a value to a non-negative, finite number (invalid -> 0).
 * @param {*} value
 * @returns {number}
 */
function toNonNegativeNumber(value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return 0;
  }
  return value;
}

/**
 * Coerce a value to a non-negative integer (invalid -> 0).
 * @param {*} value
 * @returns {number}
 */
function toNonNegativeInt(value) {
  const n = toNonNegativeNumber(value);
  return Math.floor(n);
}
