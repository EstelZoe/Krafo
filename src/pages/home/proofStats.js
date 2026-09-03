// Truthful, verifiable proof points for the homepage credibility ribbon.
//
// No unverified vanity metrics live here — every item can be backed up. The one
// animated number is "years in operation", derived from the founding year, so
// it can never drift out of date or overstate anything. When real figures for
// organisations supported / assessments completed / trainings delivered are
// confirmed, add them as extra { kind: "count", value: <n>, suffix: "+" } items
// and they'll render with the same count-up treatment.

export const PROOF_SINCE_YEAR = 2022;

export const PROOF_POINTS = [
  {
    kind: "count",
    // value is computed at render from PROOF_SINCE_YEAR (current year − 2022)
    label: "Years in operation",
    note: "Founded in 2022",
  },
  {
    kind: "badge",
    value: "CSA",
    label: "Licensed",
    note: "Cyber Security Authority",
  },
  {
    kind: "badge",
    value: "DPC",
    label: "Registered",
    note: "Data Protection Commission",
  },
  {
    kind: "badge",
    value: "GH",
    label: "Based in Ghana",
    note: "Headquartered in Accra",
  },
];
