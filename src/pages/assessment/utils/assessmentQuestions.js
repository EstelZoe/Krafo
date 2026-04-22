/**
 * Assessment question definitions for all 7 categories.
 * Each question: { id, category, field, text, type, options, required }
 */

export const CATEGORIES = [
  { key: 'companyProfile', label: 'Organization Profile', step: 0 },
  { key: 'governance', label: 'Governance', step: 1 },
  { key: 'identify', label: 'Identify', step: 2 },
  { key: 'protect', label: 'Protect', step: 3 },
  { key: 'detect', label: 'Detect', step: 4 },
  { key: 'respond', label: 'Respond', step: 5 },
  { key: 'recover', label: 'Recover', step: 6 },
];

const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'dont_know', label: "Don't Know" },
];

const YES_NO_NA_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'na', label: 'N/A' },
  { value: 'dont_know', label: "Don't Know" },
];

export const QUESTIONS = [
  // ── Company Profile ──────────────────────────────────────────────────────
  {
    id: 'cp_1', category: 'companyProfile', field: 'primaryBusinessModel',
    text: 'What is your primary business / organization model?',
    type: 'select', required: true,
    options: [
      { value: 'dont_know', label: "Don't Know" },
      { value: 'b2c', label: 'B2C' },
      { value: 'b2b', label: 'B2B' },
      { value: 'b2g', label: 'B2G' },
      { value: 'b2b_b2c', label: 'B2B_B2C' },
      { value: 'all_3', label: 'ALL 3' },
    ],
  },
  {
    id: 'cp_2', category: 'companyProfile', field: 'criticalInfrastructure',
    text: 'Do you consider your business / organization as critical infrastructure? (Systems and assets that impact national security, public health, or economic stability.)',
    type: 'radio', required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'na', label: 'N/A' },
      { value: 'dont_know', label: "Don't Know" },
    ],
  },
  {
    id: 'cp_3', category: 'companyProfile', field: 'employeeRange',
    text: 'What is the range of employees / contractors working in your business / organization?',
    type: 'select', required: true,
    options: [
      { value: '0-9', label: '0 → 9' },
      { value: '10-49', label: '10 → 49' },
      { value: '50-199', label: '50 → 199' },
      { value: '200-999', label: '200 → 999' },
      { value: '1000-4999', label: '1000 → 4999' },
      { value: '5000+', label: '5000+' },
    ],
  },
  {
    id: 'cp_4', category: 'companyProfile', field: 'annualRevenue',
    text: 'What is your annual revenue range?',
    type: 'select', required: true,
    options: [
      { value: 'dont_know', label: "Don't Know" },
      { value: 'under_1m', label: 'Under 1M' },
      { value: '1m_10m', label: '1M - 10M' },
      { value: '10m_plus', label: '10M+' },
    ],
  },
  {
    id: 'cp_5', category: 'companyProfile', field: 'handlesSensitiveData',
    text: 'Do you handle sensitive data (PII, PHI, financial data, or intellectual property)?',
    type: 'radio', required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'na', label: 'N/A' },
      { value: 'dont_know', label: "Don't Know" },
    ],
  },
  {
    id: 'cp_6', category: 'companyProfile', field: 'hasCybersecurityPro',
    text: 'Do you currently have a Cybersecurity Professional working with your business / organization?',
    type: 'select', required: true,
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes_inhouse', label: 'Yes – In-House' },
      { value: 'yes_outsourced', label: 'Yes – Outsourced / MSP' },
      { value: 'yes_both', label: 'Yes – both' },
      { value: 'dont_know', label: "Don't Know" },
    ],
  },

  // ── Governance ───────────────────────────────────────────────────────────
  {
    id: 'gov_1', category: 'governance', field: 'formalPolicy',
    text: 'Do you have a formal cybersecurity policy in place?',
    type: 'radio', required: true, options: YES_NO_OPTIONS,
  },
  {
    id: 'gov_2', category: 'governance', field: 'oversightAssigned',
    text: 'Is cybersecurity oversight assigned to a specific role or leader?',
    type: 'radio', required: true, options: YES_NO_OPTIONS,
  },
  {
    id: 'gov_3', category: 'governance', field: 'vendorRiskPolicy',
    text: 'Do you have a vendor / third-party risk management policy?',
    type: 'radio', required: true, options: YES_NO_OPTIONS,
  },
  {
    id: 'gov_4', category: 'governance', field: 'risksReportedToBoard',
    text: 'Are cybersecurity risks reported to executive leadership or the board?',
    type: 'radio', required: true, options: YES_NO_OPTIONS,
  },
  {
    id: 'gov_5', category: 'governance', field: 'complianceRequirement',
    text: 'Do you have a compliance requirement? (HIPAA, PCI-DSS, CMMC, SOC2, etc.)',
    type: 'radio', required: true, options: YES_NO_OPTIONS,
  },
  {
    id: 'gov_6', category: 'governance', field: 'thirdPartyAudit',
    text: 'Have you had a third-party security audit or assessment in the last 12 months?',
    type: 'radio', required: true, options: YES_NO_OPTIONS,
  },

  // ── Identify ─────────────────────────────────────────────────────────────
  {
    id: 'id_1', category: 'identify', field: 'hardwareInventory',
    text: 'Do you maintain an inventory of all hardware assets (computers, servers, mobile devices)?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'id_2', category: 'identify', field: 'softwareInventory',
    text: 'Do you maintain an inventory of all software and applications?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'id_3', category: 'identify', field: 'knowCriticalSystems',
    text: 'Do you know which systems are most critical to your business operations?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'id_4', category: 'identify', field: 'thirdPartyVendors',
    text: 'Do you have third-party vendors or partners involved in your operations?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'id_5', category: 'identify', field: 'knowSensitiveDataLocation',
    text: 'Do you know where all your sensitive data is stored and who has access to it?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },

  // ── Protect ──────────────────────────────────────────────────────────────
  {
    id: 'pr_1', category: 'protect', field: 'requiresMfa',
    text: 'Do you require multi-factor authentication (MFA) for accessing business systems?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'pr_2', category: 'protect', field: 'accessPrivilegesReviewed',
    text: 'Are user access privileges reviewed and updated regularly?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'pr_3', category: 'protect', field: 'cybersecurityTraining',
    text: 'Do employees receive cybersecurity awareness training?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'pr_4', category: 'protect', field: 'dataEncrypted',
    text: 'Is sensitive data encrypted both at rest and in transit?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'pr_5', category: 'protect', field: 'secureDisposalProcess',
    text: 'Do you have a formal process for securely disposing of old devices and data?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },

  // ── Detect ───────────────────────────────────────────────────────────────
  {
    id: 'det_1', category: 'detect', field: 'securityMonitoringTools',
    text: 'Do you have security monitoring tools in place (antivirus, firewall, intrusion detection)?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'det_2', category: 'detect', field: 'logsReviewedRegularly',
    text: 'Are system logs reviewed regularly for suspicious activity?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'det_3', category: 'detect', field: 'alertsForUnusualActivity',
    text: 'Do you receive alerts when unusual network activity occurs?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'det_4', category: 'detect', field: 'regularVulnerabilityScans',
    text: 'Are software and systems regularly scanned for vulnerabilities?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'det_5', category: 'detect', field: 'detectUnauthorizedAccess',
    text: 'Do you have a process to detect unauthorized access attempts?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },

  // ── Respond ──────────────────────────────────────────────────────────────
  {
    id: 'res_1', category: 'respond', field: 'incidentResponsePlan',
    text: 'Do you have an incident response plan documented?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'res_2', category: 'respond', field: 'designatedIncidentHandler',
    text: 'Is there a designated team or person responsible for handling security incidents?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'res_3', category: 'respond', field: 'containMitigateProcess',
    text: 'Do you have a process to contain and mitigate security incidents?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'res_4', category: 'respond', field: 'employeesTrainedToReport',
    text: 'Are employees trained on how to report suspected security incidents?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'res_5', category: 'respond', field: 'communicationProtocols',
    text: 'Do you have communication protocols for notifying affected parties during an incident?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },

  // ── Recover ──────────────────────────────────────────────────────────────
  {
    id: 'rec_1', category: 'recover', field: 'disasterRecoveryPlan',
    text: 'Do you have a disaster recovery plan?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'rec_2', category: 'recover', field: 'regularBackups',
    text: 'Are critical systems and data backed up regularly?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'rec_3', category: 'recover', field: 'testedBackupRestoration',
    text: 'Have you tested your backup restoration process in the last year?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'rec_4', category: 'recover', field: 'businessContinuityPlan',
    text: 'Do you have a business continuity plan for operating during / after an incident?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
  {
    id: 'rec_5', category: 'recover', field: 'postIncidentReviews',
    text: 'Do you conduct post-incident reviews to improve security measures?',
    type: 'radio', required: true, options: YES_NO_NA_OPTIONS,
  },
];

/** Return questions for a given category key */
export function getQuestionsByCategory(categoryKey) {
  return QUESTIONS.filter(q => q.category === categoryKey);
}
