// Country metadata for the hero threat globe — ISO alpha-2 code, display name
// and rough centroid as [longitude, latitude]. Mirrors the backend's
// countryCentroids table so arc endpoints (which arrive as coordinates from the
// /threat-feed endpoint) can be reverse-mapped to a human-readable country name
// for the hover/tap readout. Coordinates are [longitude, latitude].
//
// Pure data + a nearest-match helper. No imports, no rendering.

export const COUNTRY_META = [
  { code: "US", name: "United States", lng: -98.35, lat: 39.5 },
  { code: "CA", name: "Canada", lng: -106.3, lat: 56.1 },
  { code: "MX", name: "Mexico", lng: -102.5, lat: 23.6 },
  { code: "BR", name: "Brazil", lng: -51.9, lat: -14.2 },
  { code: "AR", name: "Argentina", lng: -63.6, lat: -38.4 },
  { code: "CL", name: "Chile", lng: -71.5, lat: -35.7 },
  { code: "CO", name: "Colombia", lng: -74.3, lat: 4.6 },
  { code: "GB", name: "United Kingdom", lng: -1.5, lat: 52.5 },
  { code: "IE", name: "Ireland", lng: -8.2, lat: 53.4 },
  { code: "FR", name: "France", lng: 2.2, lat: 46.2 },
  { code: "DE", name: "Germany", lng: 10.4, lat: 51.2 },
  { code: "NL", name: "Netherlands", lng: 5.3, lat: 52.1 },
  { code: "BE", name: "Belgium", lng: 4.5, lat: 50.6 },
  { code: "ES", name: "Spain", lng: -3.7, lat: 40.4 },
  { code: "PT", name: "Portugal", lng: -8.2, lat: 39.4 },
  { code: "IT", name: "Italy", lng: 12.6, lat: 41.9 },
  { code: "CH", name: "Switzerland", lng: 8.2, lat: 46.8 },
  { code: "AT", name: "Austria", lng: 14.6, lat: 47.5 },
  { code: "SE", name: "Sweden", lng: 15.6, lat: 62.2 },
  { code: "NO", name: "Norway", lng: 8.5, lat: 60.5 },
  { code: "FI", name: "Finland", lng: 25.7, lat: 61.9 },
  { code: "DK", name: "Denmark", lng: 9.5, lat: 56.3 },
  { code: "PL", name: "Poland", lng: 19.1, lat: 51.9 },
  { code: "RO", name: "Romania", lng: 24.9, lat: 45.9 },
  { code: "UA", name: "Ukraine", lng: 31.2, lat: 48.4 },
  { code: "RU", name: "Russia", lng: 90.0, lat: 61.5 },
  { code: "TR", name: "Türkiye", lng: 35.2, lat: 39.0 },
  { code: "GR", name: "Greece", lng: 21.8, lat: 39.1 },
  { code: "CZ", name: "Czechia", lng: 15.5, lat: 49.8 },
  { code: "HU", name: "Hungary", lng: 19.5, lat: 47.2 },
  { code: "CN", name: "China", lng: 104.2, lat: 35.9 },
  { code: "JP", name: "Japan", lng: 138.3, lat: 36.2 },
  { code: "KR", name: "South Korea", lng: 127.8, lat: 36.4 },
  { code: "IN", name: "India", lng: 78.9, lat: 20.6 },
  { code: "ID", name: "Indonesia", lng: 113.9, lat: -0.8 },
  { code: "VN", name: "Vietnam", lng: 108.3, lat: 14.1 },
  { code: "SG", name: "Singapore", lng: 103.8, lat: 1.35 },
  { code: "MY", name: "Malaysia", lng: 101.98, lat: 4.2 },
  { code: "TH", name: "Thailand", lng: 100.99, lat: 15.9 },
  { code: "PH", name: "Philippines", lng: 122.9, lat: 12.9 },
  { code: "PK", name: "Pakistan", lng: 69.3, lat: 30.4 },
  { code: "BD", name: "Bangladesh", lng: 90.4, lat: 23.7 },
  { code: "IR", name: "Iran", lng: 53.7, lat: 32.4 },
  { code: "IL", name: "Israel", lng: 34.9, lat: 31.0 },
  { code: "SA", name: "Saudi Arabia", lng: 45.1, lat: 23.9 },
  { code: "AE", name: "United Arab Emirates", lng: 53.8, lat: 23.4 },
  { code: "QA", name: "Qatar", lng: 51.2, lat: 25.3 },
  { code: "IQ", name: "Iraq", lng: 43.7, lat: 33.2 },
  { code: "ZA", name: "South Africa", lng: 24.7, lat: -28.5 },
  { code: "NG", name: "Nigeria", lng: 8.68, lat: 9.08 },
  { code: "KE", name: "Kenya", lng: 37.9, lat: 0.02 },
  { code: "EG", name: "Egypt", lng: 30.8, lat: 26.8 },
  { code: "GH", name: "Ghana", lng: -1.03, lat: 7.95 },
  { code: "MA", name: "Morocco", lng: -7.09, lat: 31.79 },
  { code: "DZ", name: "Algeria", lng: 1.66, lat: 28.03 },
  { code: "TN", name: "Tunisia", lng: 9.56, lat: 33.89 },
  { code: "ET", name: "Ethiopia", lng: 40.5, lat: 9.15 },
  { code: "TZ", name: "Tanzania", lng: 34.9, lat: -6.37 },
  { code: "UG", name: "Uganda", lng: 32.3, lat: 1.37 },
  { code: "SN", name: "Senegal", lng: -14.45, lat: 14.5 },
  { code: "CI", name: "Côte d'Ivoire", lng: -5.55, lat: 7.54 },
  { code: "CM", name: "Cameroon", lng: 12.35, lat: 7.37 },
  { code: "AO", name: "Angola", lng: 17.87, lat: -11.2 },
  { code: "MZ", name: "Mozambique", lng: 35.53, lat: -18.67 },
  { code: "RW", name: "Rwanda", lng: 29.87, lat: -1.94 },
  { code: "ZM", name: "Zambia", lng: 27.85, lat: -13.13 },
  { code: "ZW", name: "Zimbabwe", lng: 29.15, lat: -19.02 },
  { code: "AU", name: "Australia", lng: 133.8, lat: -25.3 },
  { code: "NZ", name: "New Zealand", lng: 172.9, lat: -41.3 },
];

// Set of African ISO codes present above, so the globe can emphasise arcs that
// land on the continent Krafo is positioned around.
export const AFRICAN_CODES = new Set([
  "ZA", "NG", "KE", "EG", "GH", "MA", "DZ", "TN", "ET", "TZ",
  "UG", "SN", "CI", "CM", "AO", "MZ", "RW", "ZM", "ZW",
]);

// Nearest-country lookup for an [lng, lat] point. Arc endpoints come straight
// from the backend centroid table, so this is effectively an exact match; the
// nearest-distance approach just makes it robust to tiny rounding differences
// and to the illustrative city coordinates used offline.
export function lookupCountry([lng, lat]) {
  let best = null;
  let bestD = Infinity;
  for (const c of COUNTRY_META) {
    const dLng = c.lng - lng;
    const dLat = c.lat - lat;
    const d = dLng * dLng + dLat * dLat;
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  // Guard against a wildly-off point (e.g. bad data): only trust a match within
  // ~12° of a known centroid, otherwise return null so the caller can skip it.
  return best && bestD <= 144 ? best : null;
}
