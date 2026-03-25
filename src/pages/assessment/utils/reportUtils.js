/**
 * Calculate response statistics from assessment responses
 * @param {Object} responses - Assessment responses object with categories
 * @returns {Object} Statistics including total, yesCount, noCount, compliance
 */
export function calculateResponseStats(responses) {
  const categories = ['identify', 'protect', 'detect', 'respond', 'recover', 'governance'];
  let yesCount = 0;
  let noCount = 0;
  let total = 0;
  
  for (const cat of categories) {
    const catResponses = responses?.[cat] || {};
    for (const [field, value] of Object.entries(catResponses)) {
      total++;
      if (value === 'yes') yesCount++;
      if (value === 'no') noCount++;
    }
  }
  
  const compliance = total > 0 ? Math.round((yesCount / total) * 100) : 0;
  
  return { total, yesCount, noCount, compliance };
}

/**
 * Get vulnerabilities grouped by NIST category
 * @param {Object} responses - Assessment responses object with categories
 * @returns {Object} Breakdown of vulnerabilities by category
 */
export function getVulnerabilitiesByCategory(responses) {
  const categories = ['identify', 'protect', 'detect', 'respond', 'recover', 'governance'];
  const breakdown = {};
  
  for (const cat of categories) {
    const catResponses = responses?.[cat] || {};
    const vulns = Object.entries(catResponses)
      .filter(([field, value]) => value === 'no')
      .map(([field]) => field);
    
    breakdown[cat] = {
      count: vulns.length,
      fields: vulns
    };
  }
  
  return breakdown;
}
