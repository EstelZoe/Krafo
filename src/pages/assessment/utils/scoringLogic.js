/**
 * Client-side scoring preview — mirrors server-side assessment_scoring.js.
 * Non-authoritative: the canonical score is always computed server-side.
 *
 * UPDATED for the new pre-assessment question set (NIST CSF 2.0; Acts 843/1038/772).
 *
 * Scoring philosophy (industry standard — higher score = higher risk):
 *   - Standard Yes/No/Don't Know:  yes=1 (best), no=5 (worst), dont_know=5
 *   - Graduated options score a middle value (3) for partial maturity
 *   - "Don't Know" always = 5 (worst case)
 *   - N/A retired — every scored question is fully weighted (max 5)
 *   - Section 1 (Organization Profile) is PROFILE ONLY — not scored
 *
 * ⚠️ These tables MUST match krafo_api/utils/assessment/assessment_scoring.js.
 *    See SCORING_REFERENCE comment for the authoritative value list to mirror
 *    server-side before this branch goes to production.
 */

const MAX_PER_QUESTION = 5;
const MIN_PER_QUESTION = 1;

// Standard Yes / No / Don't Know
const YES_NO_SCORES = { yes: 1, no: 5, dont_know: 5 };

// Per-field score tables for questions with graduated / custom options.
// Anything not in a table falls back to YES_NO_SCORES.
const FIELD_SCORES = {
  // ── Governance ──
  complianceRequirements: {
    yes_both: 1, yes_843: 2, yes_1038: 2, dont_know_acts: 5, no: 5,
  },
  dpcRegistration: {
    yes: 1, no: 5, dont_know: 5,
  },
  // ── Identify ──
  // "Has your business experienced an incident?" — a YES here is itself a risk
  // signal (recent compromise), so yes scores worse than no.
  recentIncident: {
    yes: 5, no: 1, dont_know: 5,
  },
  // ── Protect ──
  staffTraining: {
    yes_regular: 1, yes_onboarding: 3, no: 5, dont_know: 5,
  },
  // ── Respond ──
  certAwareness: {
    yes_process: 1, yes_no_process: 4, no: 5, dont_know: 5,
  },
  // ── Recover ──
  dataBackedUp: {
    yes_automated: 1, yes_manual: 1, no: 5, dont_know: 5,
  },
};

const NIST_FUNCTIONS = ['identify', 'protect', 'detect', 'respond', 'recover'];

/**
 * Score a category of answers. Every answered question contributes MAX_PER_QUESTION
 * to the denominator (no N/A). Unanswered questions are skipped from both sides.
 */
function scoreCategory(responses) {
  let score = 0;
  let maxScore = 0;
  if (!responses || typeof responses !== 'object') return { score: 0, maxScore: 0 };

  for (const [field, value] of Object.entries(responses)) {
    if (value == null || value === '') continue;
    const table = FIELD_SCORES[field];
    const fieldScore = table ? table[value] : YES_NO_SCORES[value];
    if (fieldScore == null) continue; // unknown option, skip defensively
    score += fieldScore;
    maxScore += MAX_PER_QUESTION;
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
  // Section 1 (companyProfile) is intentionally NOT scored.
  const gov = scoreCategory(responses?.governance);
  const identify = scoreCategory(responses?.identify);
  const protect = scoreCategory(responses?.protect);
  const detect = scoreCategory(responses?.detect);
  const respond = scoreCategory(responses?.respond);
  const recover = scoreCategory(responses?.recover);

  const totalScore =
    gov.score + identify.score + protect.score + detect.score + respond.score + recover.score;
  const totalMax =
    gov.maxScore + identify.maxScore + protect.maxScore + detect.maxScore + respond.maxScore + recover.maxScore;

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
    // companyProfile is not scored; keep zeroed fields for backward compatibility
    companyProfile: 0,
    companyProfileMax: 0,
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

/**
 * SCORING_REFERENCE — give this to the team lead / mirror server-side.
 *
 * SECTION 1 (Organization Profile): NOT SCORED (profile/context only)
 *   - primaryBusinessModel, criticalInfrastructure, employeeRange,
 *     annualRevenue, toolsUsed (multi-select), dataProtectionOfficer,
 *     cybersecurityProfessional
 *
 * STANDARD QUESTIONS (yes/no/dont_know): yes=1, no=5, dont_know=5
 *   Governance:  writtenPolicy, responsiblePerson, appPolicy, discussRisks, independentAudit
 *   Identify:    deviceList, appList, criticalSystems, externalAccess, dataLocation
 *   Protect:     twoStepLogin, accessUpdatedOnExit, dataProtected, disposalProcess, passwordPolicy
 *   Detect:      securityTools, checkUnusualActivity, receiveAlerts, softwareUpdated, wouldKnowUnauthorizedAccess
 *   Respond:     writtenPlan, designatedLead, firstHourSteps, staffKnowToReport, breachNotificationProcess
 *   Recover:     keepOperatingPlan, testedRestore, recoveryPlan, postIncidentReviews
 *
 * GRADUATED / CUSTOM QUESTIONS (DEFAULTS — pending team lead confirmation):
 *   complianceRequirements: yes_both=1, yes_843=2, yes_1038=2, dont_know_acts=5, no=5
 *   dpcRegistration:        yes=1, no=5, dont_know=5
 *   recentIncident:         yes=5, no=1, dont_know=5   (a YES = recent compromise = higher risk)
 *   staffTraining:          yes_regular=1, yes_onboarding=3, no=5, dont_know=5
 *   certAwareness:          yes_process=1, yes_no_process=4, no=5, dont_know=5
 *   dataBackedUp:           yes_automated=1, yes_manual=1, no=5, dont_know=5
 *
 * RISK BANDS (% of max, higher = worse):
 *   0-30 low | 31-50 moderate | 51-70 high | 71-100 critical
 *
 * NIST per-function status:
 *   >=80% critical | >=50% needs_improvement | else adequate
 */
