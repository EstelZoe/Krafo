/**
 * Client-side scoring preview — mirrors assessmentScoring.js exactly.
 * Non-authoritative: the canonical score is always computed server-side.
 */

const COMPANY_PROFILE_SCORES = {
  primaryBusinessModel: { product: 3, service: 3, both: 5, nonprofit: 3, government: 3 },
  criticalInfrastructure: { yes: 5, no: 3 },
  employeeRange: { '0-9': 1, '10-49': 2, '50-249': 3, '250+': 5 },
  annualRevenue: { under_1m: 1, '1m_10m': 2, '10m_50m': 3, '50m_plus': 5 },
  handlesSensitiveData: { yes: 5, no: 1 },
  hasCybersecurityPro: { yes_inhouse: 0, yes_outsourced: 3, no: 5 },
};

const YES_NO_SCORES = { yes: 1, no: 5 };
const TOTAL_MAX = 185;
const NIST_FUNCTIONS = ['identify', 'protect', 'detect', 'respond', 'recover'];
const MAX_SCORES = { companyProfile: 30, governance: 30, identify: 25, protect: 25, detect: 25, respond: 25, recover: 25 };

function scoreCompanyProfile(responses) {
  let subtotal = 0;
  for (const [field, table] of Object.entries(COMPANY_PROFILE_SCORES)) {
    subtotal += table[responses?.[field]] ?? 0;
  }
  return subtotal;
}

function scoreCategory(responses) {
  let subtotal = 0;
  if (!responses || typeof responses !== 'object') return subtotal;
  for (const value of Object.values(responses)) {
    subtotal += YES_NO_SCORES[value] ?? 0;
  }
  return subtotal;
}

export function getRiskLevel(percentage) {
  if (percentage <= 30) return 'low';
  if (percentage <= 50) return 'moderate';
  if (percentage <= 70) return 'high';
  return 'critical';
}

export function getNistStatus(score, maxScore) {
  const pct = (score / maxScore) * 100;
  if (pct >= 80) return 'adequate';
  if (pct >= 50) return 'needs_improvement';
  return 'critical';
}

export function calculateAllScores(responses) {
  const cp = scoreCompanyProfile(responses?.companyProfile);
  const gov = scoreCategory(responses?.governance);
  const identify = scoreCategory(responses?.identify);
  const protect = scoreCategory(responses?.protect);
  const detect = scoreCategory(responses?.detect);
  const respond = scoreCategory(responses?.respond);
  const recover = scoreCategory(responses?.recover);

  const total = cp + gov + identify + protect + detect + respond + recover;
  const percentage = Math.round((total / TOTAL_MAX) * 10000) / 100;
  const riskLevel = getRiskLevel(percentage);

  const nistFunctions = {};
  const nistScores = { identify, protect, detect, respond, recover };
  for (const fn of NIST_FUNCTIONS) {
    const score = nistScores[fn];
    const maxScore = MAX_SCORES[fn];
    nistFunctions[fn] = { score, maxScore, status: getNistStatus(score, maxScore) };
  }

  return { companyProfile: cp, governance: gov, identify, protect, detect, respond, recover, total, percentage, riskLevel, nistFunctions };
}
