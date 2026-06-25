/**
 * Assessment question definitions for all 7 categories.
 * Updated per "New pre-assessment questions" (NIST CSF 2.0; Ghana Acts 843, 1038, 772).
 *
 * Each question: { id, category, field, text, type, options, required, scored }
 *
 * Notes:
 * - Section 1 (Organization Profile) is PROFILE ONLY — not scored. Stored for context.
 * - "tools" is a multi-select (type: 'multiselect') — informational only, not scored.
 * - N/A has been retired across the board; every scored question is fully weighted.
 * - Scoring lives in scoringLogic.js (client) and assessment_scoring.js (server).
 *   Both must agree. THIS UPDATE TOUCHES THE CLIENT ONLY — the server scoring
 *   file still references the old field names and MUST be updated before this
 *   goes live (see SCORING_REFERENCE below for the values to mirror).
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

// Standard Yes / No / Don't Know (scored: yes=1 best, no=5 worst, dont_know=5)
const YES_NO_DK = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'dont_know', label: "Don't Know" },
];

export const QUESTIONS = [
  // ── Section 1: Organization Profile (PROFILE ONLY — not scored) ───────────
  {
    id: 'cp_1', category: 'companyProfile', field: 'primaryBusinessModel',
    text: 'What is your primary business / organization model?',
    type: 'select', required: true, scored: false,
    options: [
      { value: 'b2b', label: 'B2B (You sell to other businesses)' },
      { value: 'b2c', label: 'B2C (You sell directly to customers)' },
      { value: 'b2b_b2c', label: 'B2B & B2C' },
      { value: 'b2g', label: 'B2G (You sell to government)' },
      { value: 'b2b_b2g', label: 'B2B & B2G' },
      { value: 'all', label: 'All of the above' },
    ],
  },
  {
    id: 'cp_2', category: 'companyProfile', field: 'criticalInfrastructure',
    text: 'Do you consider your business / organization as critical infrastructure? (Systems and assets that impact national security, public health, or economic stability.)',
    type: 'radio', required: true, scored: false,
    options: YES_NO_DK,
  },
  {
    id: 'cp_3', category: 'companyProfile', field: 'employeeRange',
    text: 'What is the range of employees / contractors working in your business / organization?',
    type: 'select', required: true, scored: false,
    options: [
      { value: '0-3', label: '0 - 3' },
      { value: '4-10', label: '4 - 10' },
      { value: '11-20', label: '11 - 20' },
      { value: '21-35', label: '21 - 35' },
      { value: '36+', label: '36+' },
    ],
  },
  {
    id: 'cp_4', category: 'companyProfile', field: 'annualRevenue',
    text: 'What is your annual revenue range?',
    type: 'select', required: true, scored: false,
    options: [
      { value: 'under_200k', label: 'Under GHS 200,000.00' },
      { value: '200k_500k', label: 'GHS 200,000.00 - GHS 500,000.00' },
      { value: '500k_5m', label: 'GHS 500,000.00 - GHS 5M' },
      { value: '5m_plus', label: 'GHS 5M+' },
      { value: 'prefer_not_say', label: 'Prefer not to say' },
    ],
  },
  {
    id: 'cp_5', category: 'companyProfile', field: 'toolsUsed',
    text: 'Which of these tools does your business use? (Select all that apply)',
    type: 'multiselect', required: true, scored: false,
    options: [
      { value: 'whatsapp_business', label: 'WhatsApp for business communication' },
      { value: 'personal_email', label: 'Gmail or personal email for business' },
      { value: 'social_media', label: 'Facebook / Instagram for business' },
      { value: 'mobile_money', label: 'Mobile Money (MTN, Vodafone, AirtelTigo)' },
      { value: 'cloud_storage', label: 'Google Drive / Dropbox for file storage' },
      { value: 'accounting_software', label: 'Online accounting software (Sage, QuickBooks, Wave)' },
      { value: 'none', label: 'None of the above' },
    ],
  },
  {
    id: 'cp_6', category: 'companyProfile', field: 'dataProtectionOfficer',
    text: 'Do you have a Data Protection Officer working with your business / organization?',
    type: 'select', required: true, scored: false,
    options: [
      { value: 'yes_fulltime', label: 'Yes - Full time' },
      { value: 'yes_parttime', label: 'Yes - Part time / Contractor' },
      { value: 'no_planning', label: 'No - but planning to' },
      { value: 'dont_know', label: "Don't Know" },
    ],
  },
  {
    id: 'cp_7', category: 'companyProfile', field: 'cybersecurityProfessional',
    text: 'Do you have a Cybersecurity Professional working with your business / organization?',
    type: 'select', required: true, scored: false,
    options: [
      { value: 'yes_fulltime', label: 'Yes - Full time' },
      { value: 'yes_parttime', label: 'Yes - Part time / Contractor' },
      { value: 'no_planning', label: 'No - but planning to' },
      { value: 'dont_know', label: "Don't Know" },
    ],
  },

  // ── Section 2: Governance (GV | Acts 843, 1038) ───────────────────────────
  {
    id: 'gov_1', category: 'governance', field: 'writtenPolicy',
    text: 'Does your business have a written cybersecurity policy that staff follow?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'gov_2', category: 'governance', field: 'responsiblePerson',
    text: 'Is there a specific person in your business responsible for cybersecurity decisions?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'gov_3', category: 'governance', field: 'appPolicy',
    text: 'Do you have a written policy for managing the apps and online tools your business uses?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'gov_4', category: 'governance', field: 'discussRisks',
    text: 'Do you discuss cybersecurity risks in your business with other decision makers regularly?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'gov_5', category: 'governance', field: 'complianceRequirements',
    text: "Do you have compliance requirements under Ghana's Data Protection Act (Act 843) or Cybersecurity Act (Act 1038)?",
    type: 'select', required: true, scored: true,
    options: [
      { value: 'yes_both', label: 'Yes - both Acts' },
      { value: 'yes_843', label: 'Yes - Act 843 only' },
      { value: 'yes_1038', label: 'Yes - Act 1038 only' },
      { value: 'dont_know_acts', label: "I don't know these Acts" },
      { value: 'no', label: 'No' },
    ],
  },
  {
    id: 'gov_6', category: 'governance', field: 'independentAudit',
    text: 'Has your business had an independent cybersecurity review or audit in the last 12 months?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'gov_7', category: 'governance', field: 'dpcRegistration',
    text: "Are you currently registered with Ghana's Data Protection Commission (DPC)?",
    type: 'select', required: true, scored: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'not_sure_required', label: 'Not sure if required' },
      { value: 'dont_know', label: "Don't Know" },
    ],
  },

  // ── Section 3: Identify (ID | Acts 843, 1038) ─────────────────────────────
  {
    id: 'id_1', category: 'identify', field: 'deviceList',
    text: 'Do you have a list of all the devices your business uses? (laptops, phones, tablets, routers)',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'id_2', category: 'identify', field: 'appList',
    text: 'Do you have a list of all the apps and software your business uses?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'id_3', category: 'identify', field: 'criticalSystems',
    text: 'Do you know which systems or tools are most critical to keeping your business running?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'id_4', category: 'identify', field: 'externalAccess',
    text: 'Do any external apps, tools, or service providers have access to your business data? (Google, WhatsApp, accountants, IT support, etc.)',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'id_5', category: 'identify', field: 'dataLocation',
    text: 'Do you know where your customer and business data is stored and who can access it?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'id_6', category: 'identify', field: 'recentIncident',
    text: 'Has your business experienced any cybersecurity incident in the last 12 months? (hacking, fraud, phishing, unauthorized access, ransomware)',
    type: 'radio', required: true, scored: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'dont_know', label: "Don't Know / Not sure" },
    ],
  },

  // ── Section 4: Protect (PR | Acts 843, 1038, 772) ─────────────────────────
  {
    id: 'pr_1', category: 'protect', field: 'twoStepLogin',
    text: 'Do your business accounts require a two-step login verification? (e.g., a code sent to your phone after entering your password)',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'pr_2', category: 'protect', field: 'accessUpdatedOnExit',
    text: 'When a staff member leaves or changes roles, are their account access and passwords updated immediately?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'pr_3', category: 'protect', field: 'staffTraining',
    text: 'Have your staff received any training on how to stay safe online and protect business data?',
    type: 'select', required: true, scored: true,
    options: [
      { value: 'yes_regular', label: 'Yes - annually / semi-annually' },
      { value: 'yes_onboarding', label: 'Yes - at onboarding only' },
      { value: 'no', label: 'No' },
      { value: 'dont_know', label: "Don't Know" },
    ],
  },
  {
    id: 'pr_4', category: 'protect', field: 'dataProtected',
    text: 'Is your customer and business data password protected or encrypted when stored and shared?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'pr_5', category: 'protect', field: 'disposalProcess',
    text: 'Does your business have a process for safely getting rid of old phones, laptops, or computers?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'pr_6', category: 'protect', field: 'passwordPolicy',
    text: 'Does your business have a password policy? (rules for creating strong passwords and changing them regularly)',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },

  // ── Section 5: Detect (DE | Act 1038) ─────────────────────────────────────
  {
    id: 'det_1', category: 'detect', field: 'securityTools',
    text: 'Does your business use any security tools to protect against viruses, hackers, or suspicious activity? (Antivirus, firewall, etc.)',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'det_2', category: 'detect', field: 'checkUnusualActivity',
    text: 'Does anyone in your business regularly check for unusual activity on your accounts or systems?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'det_3', category: 'detect', field: 'receiveAlerts',
    text: 'Do you receive alerts when unusual network activity occurs?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'det_4', category: 'detect', field: 'softwareUpdated',
    text: 'Are the apps and software your business uses kept up to date with the latest security updates?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'det_5', category: 'detect', field: 'wouldKnowUnauthorizedAccess',
    text: 'Would you know if someone was accessing your data without permission?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },

  // ── Section 6: Respond (RS | Acts 843, 1038) ──────────────────────────────
  {
    id: 'res_1', category: 'respond', field: 'writtenPlan',
    text: 'If your business was hacked today, do you have a written plan for what to do?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'res_2', category: 'respond', field: 'designatedLead',
    text: 'Is there a specific person in your business who would take charge if a cyber incident happened?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'res_3', category: 'respond', field: 'firstHourSteps',
    text: 'If your business was hacked today, would you know what steps to take in the first hour?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'res_4', category: 'respond', field: 'staffKnowToReport',
    text: 'Does your staff know how to report a suspected cyberattack or suspicious activity?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'res_5', category: 'respond', field: 'breachNotificationProcess',
    text: 'Do you have a process for notifying your customers and relevant authorities if their data was compromised? (DPC within 72 hours, CERT-GH within 24 hours)',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'res_6', category: 'respond', field: 'certAwareness',
    text: 'Are you aware of the requirement to notify CERT-GH within 24 hours and DPC within 72 hours of a data breach?',
    type: 'select', required: true, scored: true,
    options: [
      { value: 'yes_process', label: 'Yes and we have a process' },
      { value: 'yes_no_process', label: 'Yes but no process in place' },
      { value: 'no', label: 'No' },
      { value: 'dont_know', label: "Don't Know" },
    ],
  },

  // ── Section 7: Recover (RC | Acts 843, 1038) ──────────────────────────────
  {
    id: 'rec_1', category: 'recover', field: 'keepOperatingPlan',
    text: 'If your business systems were shut down by a cyberattack, do you have a plan to keep operating?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'rec_2', category: 'recover', field: 'dataBackedUp',
    text: 'Is your important business data backed up regularly? (customer records, financial data, emails)',
    type: 'select', required: true, scored: true,
    options: [
      { value: 'yes_automated', label: 'Yes - automated daily' },
      { value: 'yes_manual', label: 'Yes - manually / occasionally' },
      { value: 'no', label: 'No' },
      { value: 'dont_know', label: "Don't Know" },
    ],
  },
  {
    id: 'rec_3', category: 'recover', field: 'testedRestore',
    text: 'Have you ever tested whether you can restore your data from a backup?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'rec_4', category: 'recover', field: 'recoveryPlan',
    text: 'Do you have a plan for how your business would recover and continue operating after a cyberattack?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
  {
    id: 'rec_5', category: 'recover', field: 'postIncidentReviews',
    text: 'Do you conduct post-incident reviews to improve your security measures?',
    type: 'radio', required: true, scored: true, options: YES_NO_DK,
  },
];

/** Return questions for a given category key */
export function getQuestionsByCategory(categoryKey) {
  return QUESTIONS.filter(q => q.category === categoryKey);
}
