/**
 * Client-side scoring preview — mirrors server-side assessment_scoring.js exactly.
 * Non-authoritative: the canonical score is always computed server-side.
 *
 * Matches the Cyber_Assessment_Toolkit Excel formulas:
 * - Company profile has per-field scoring tables
 * - "Don't Know" = 5 (worst case / high risk)
 * - "N/A" = 0 score AND reduces max score (question excluded)
 * - Max scores are dynamic based on N/A answers
 */

const CP_SCORES = {
  primaryBusinessModel: {
    b2c: 1, b2b: 2, b2g: 4, b2b_b2c: 4, all_3: 5, dont_know: 5,
  },
  criticalInfrastructure: {
    yes: 5, no: 3, na: 0, dont_know: 5,
  },
  employeeRange: {
    '0-9': 1, '10-49': 2, '50-199': 3, '200-999': 4, '1000-4999': 5, '5000+': 5,
  },
  annualRevenue: {
    under_1m: 1, '1m_10m': 3, '10m_plus': 5, dont_know: 5,
  },
  handlesSensitiveData: {
    yes: 5, no: 3, na: 0, dont_know: 5,
  },
  hasCybersecurityPro: {
    no: 3, na: 0, yes_inhouse: 5, yes_outsourced: 5, yes_both: 5, dont_know: 5,
  },
};

const CP_MAX_PER_QUESTION = 5;
const YES_NO_SCORES = { yes: 1, no: 5, dont_know: 5, na: 0 };
const YES_NO_MAX = 5;
const NIST_FUNCTIONS = ['identify', 'protect', 'detect', 'respond', 'recover'];

function scoreCompanyProfile(responses) {
  let score = 0;
  let maxScore = 0;
  for (const [field, table] of Object.entries(CP_SCORES)) {
    const answer = responses?.[field];
    score += table[answer] ?? 0;
    maxScore += answer === 'na' ? 0 : CP_MAX_PER_QUESTION;
  }
  return { score, maxScore };
}

function scoreYesNoCategory(responses) {
  let score = 0;
  let maxScore = 0;
  if (!responses || typeof responses !== 'object') return { score: 0, maxScore: 0 };
  for (const value of Object.values(responses)) {
    score += YES_NO_SCORES[value] ?? 0;
    maxScore += value === 'na' ? 0 : YES_NO_MAX;
  }
  return { score, maxScore };
}

export function getRiskLevel(percentage) {
  if (percentage <= 30) return 'low';
  if (percentage <= 50) return 'moderate';
  if (percentage <= 70) return 'high';
  return 'critical';
}

export function getNistStatus(score, maxScore) {
  if (maxScore === 0) return 'adequate';
  const pct = (score / maxScore) * 100;
  // Higher score = higher risk (no=5, yes=1)
  if (pct >= 80) return 'critical';
  if (pct >= 50) return 'needs_improvement';
  return 'adequate';
}

export function calculateAllScores(responses) {
  const cp = scoreCompanyProfile(responses?.companyProfile);
  const gov = scoreYesNoCategory(responses?.governance);
  const identify = scoreYesNoCategory(responses?.identify);
  const protect = scoreYesNoCategory(responses?.protect);
  const detect = scoreYesNoCategory(responses?.detect);
  const respond = scoreYesNoCategory(responses?.respond);
  const recover = scoreYesNoCategory(responses?.recover);

  const totalScore = cp.score + gov.score + identify.score + protect.score + detect.score + respond.score + recover.score;
  const totalMax = cp.maxScore + gov.maxScore + identify.maxScore + protect.maxScore + detect.maxScore + respond.maxScore + recover.maxScore;

  const percentage = totalMax > 0
    ? Math.round((totalScore / totalMax) * 10000) / 100
    : 0;
  const riskLevel = getRiskLevel(percentage);

  const nistFunctions = {};
  const nistData = { identify, protect, detect, respond, recover };
  for (const fn of NIST_FUNCTIONS) {
    const { score, maxScore } = nistData[fn];
    nistFunctions[fn] = { score, maxScore, status: getNistStatus(score, maxScore) };
  }

  return {
    companyProfile: cp.score,
    companyProfileMax: cp.maxScore,
    governance: gov.score,
    governanceMax: gov.maxScore,
    identify: identify.score,
    protect: protect.score,
    detect: detect.score,
    respond: respond.score,
    recover: recover.score,
    total: totalScore,
    totalMax,
    percentage,
    riskLevel,
    nistFunctions,
  };
}
