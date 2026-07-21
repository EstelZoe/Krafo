import { scoreAnswer, CONTROL_MAX_SCORE, VULNERABILITY_MIN_SCORE } from './scoringLogic';

const SCORED_CATEGORIES = ['governance', 'identify', 'protect', 'detect', 'respond', 'recover'];

/**
 * Calculate response statistics from assessment responses.
 *
 * Score-based (not text-based): a question counts as a "control in place" when
 * its answer scores well and a "vulnerability" when it scores poorly, using the
 * same scoring tables as the risk %. This correctly handles reverse-polarity
 * questions (e.g. recentIncident, where "No" is good) and graduated options.
 *
 * @param {Object} responses - Assessment responses object with categories
 * @returns {Object} { total, controlsInPlace, vulnerabilities, coverage }
 */
export function calculateResponseStats(responses) {
  let controlsInPlace = 0;
  let vulnerabilities = 0;
  let total = 0;

  for (const cat of SCORED_CATEGORIES) {
    const catResponses = responses?.[cat] || {};
    for (const [field, value] of Object.entries(catResponses)) {
      const score = scoreAnswer(field, value);
      if (score == null) continue; // blank or unscored — ignore
      total++;
      if (score <= CONTROL_MAX_SCORE) controlsInPlace++;
      else if (score >= VULNERABILITY_MIN_SCORE) vulnerabilities++;
      // scores of 3 are "partial" — counted in total but neither bucket
    }
  }

  const coverage = total > 0 ? Math.round((controlsInPlace / total) * 100) : 0;

  return { total, controlsInPlace, vulnerabilities, coverage };
}

/**
 * Get vulnerabilities grouped by NIST category. A field is a vulnerability when
 * its answer scores poorly (>= VULNERABILITY_MIN_SCORE), regardless of whether
 * the literal answer was "yes" or "no".
 *
 * @param {Object} responses - Assessment responses object with categories
 * @returns {Object} Breakdown of vulnerabilities by category { count, fields }
 */
export function getVulnerabilitiesByCategory(responses) {
  const breakdown = {};

  for (const cat of SCORED_CATEGORIES) {
    const catResponses = responses?.[cat] || {};
    const vulns = Object.entries(catResponses)
      .filter(([field, value]) => {
        const score = scoreAnswer(field, value);
        return score != null && score >= VULNERABILITY_MIN_SCORE;
      })
      .map(([field]) => field);

    breakdown[cat] = {
      count: vulns.length,
      fields: vulns,
    };
  }

  return breakdown;
}
