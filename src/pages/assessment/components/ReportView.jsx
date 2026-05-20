import { Calendar, ExternalLink, ChevronDown, ChevronUp, AlertTriangle, FileQuestion } from 'lucide-react';
import { useState } from 'react';
import { calculateResponseStats, getVulnerabilitiesByCategory } from '../utils/reportUtils';
import { calculateAllScores } from '../utils/scoringLogic';
import { QUESTIONS, CATEGORIES } from '../utils/assessmentQuestions';

const RISK_COLORS = {
  low: 'text-green-400',
  moderate: 'text-yellow-400',
  high: 'text-orange-400',
  critical: 'text-red-400',
};

const RISK_BG = {
  low: 'bg-green-400/10 border-green-400/30',
  moderate: 'bg-yellow-400/10 border-yellow-400/30',
  high: 'bg-orange-400/10 border-orange-400/30',
  critical: 'bg-red-400/10 border-red-400/30 animate-pulse-subtle',
};

const CALENDLY_URL = 'https://calendly.com/krafosystems';

export default function ReportView({ submission, isAdmin = false }) {
  const { responses, completedAt } = submission;
  // Always recalculate from raw responses for correctness
  const scores = calculateAllScores(responses);
  const reportDate = completedAt ? new Date(completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

  // Calculate response statistics
  const stats = calculateResponseStats(responses);
  
  // Get vulnerability breakdown by category
  const vulnBreakdown = getVulnerabilitiesByCategory(responses);
  
  // State for collapsible sections
  const [expandedCategories, setExpandedCategories] = useState({});

  // Identify vulnerabilities (no answers)
  const vulns = [];
  const cats = ['governance', 'identify', 'protect', 'detect', 'respond', 'recover'];
  for (const cat of cats) {
    const catR = responses?.[cat] || {};
    for (const [field, val] of Object.entries(catR)) {
      if (val === 'no') {
        vulns.push({ field, category: cat });
      }
    }
  }

  const FIELD_LABELS = {
    hardwareInventory: 'Hardware Asset Inventory', softwareInventory: 'Software Inventory',
    knowCriticalSystems: 'Critical Systems Identification', thirdPartyVendors: 'Third-Party Vendor Management',
    knowSensitiveDataLocation: 'Sensitive Data Location', requiresMfa: 'Multi-Factor Authentication',
    accessPrivilegesReviewed: 'Access Privilege Reviews', cybersecurityTraining: 'Cybersecurity Training',
    dataEncrypted: 'Data Encryption', secureDisposalProcess: 'Secure Disposal Process',
    securityMonitoringTools: 'Security Monitoring', logsReviewedRegularly: 'Log Reviews',
    alertsForUnusualActivity: 'Unusual Activity Alerts', regularVulnerabilityScans: 'Vulnerability Scans',
    detectUnauthorizedAccess: 'Unauthorized Access Detection', incidentResponsePlan: 'Incident Response Plan',
    designatedIncidentHandler: 'Incident Handler', containMitigateProcess: 'Containment Process',
    employeesTrainedToReport: 'Employee Reporting Training', communicationProtocols: 'Communication Protocols',
    disasterRecoveryPlan: 'Disaster Recovery Plan', regularBackups: 'Regular Backups',
    testedBackupRestoration: 'Backup Restoration Testing', businessContinuityPlan: 'Business Continuity Plan',
    postIncidentReviews: 'Post-Incident Reviews', formalPolicy: 'Formal Cybersecurity Policy',
    oversightAssigned: 'Cybersecurity Oversight', vendorRiskPolicy: 'Vendor Risk Policy',
    risksReportedToBoard: 'Risk Reporting to Board', complianceRequirement: 'Compliance Requirements',
    thirdPartyAudit: 'Third-Party Audit',
  };
  
  const CATEGORY_LABELS = {
    identify: 'Identify',
    protect: 'Protect',
    detect: 'Detect',
    respond: 'Respond',
    recover: 'Recover',
    governance: 'Governance'
  };
  
  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
          <Calendar size={14} /> Assessment completed {reportDate}
        </p>
      </div>

      {/* Score + NIST grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Overall risk score */}
        {(() => {
          const totalQ = 31; // governance (6) + NIST (5×5) = 31 security questions
          const minTotal = totalQ; // all yes = 1 per question
          // Exclude company profile from risk — CP measures inherent risk, not security controls
          const securityScore = (scores.total || 0) - (scores.companyProfile || 0);
          const securityMax = (scores.totalMax || 185) - (scores.companyProfileMax || 30);
          const riskPct = securityMax > minTotal ? Math.round(((securityScore - minTotal) / (securityMax - minTotal)) * 100) : 0;
          const level = riskPct <= 30 ? "low" : riskPct <= 50 ? "moderate" : riskPct <= 70 ? "high" : "critical";
          const lColor = RISK_COLORS[level] || 'text-orange-400';
          const lBg = RISK_BG[level] || 'bg-orange-400/10 border-orange-400/30';
          return (
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[280px]">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Overall Risk Score</p>
              <div className={`text-7xl font-bold ${lColor} mb-2`}>{riskPct}%</div>
              <div className={`inline-block border rounded-full px-4 py-1 text-sm font-semibold ${lBg} ${lColor}`}>
                {level.toUpperCase()} RISK
              </div>
            </div>
          );
        })()}

        {/* NIST bars */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 min-h-[280px]">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">NIST Pillars — Risk Level</p>
          <div className="space-y-3">
            {/* Governance (scored separately, not in nistFunctions) */}
            {(() => {
              const govScore = scores.governance || 0;
              const govMax = scores.governanceMax || 30;
              const govMin = 6;
              const govRange = govMax - govMin;
              const riskPct = govRange > 0 ? Math.round(((govScore - govMin) / govRange) * 100) : 0;
              const barColor = riskPct <= 30 ? 'bg-green-400' : riskPct <= 50 ? 'bg-yellow-400' : riskPct <= 70 ? 'bg-orange-400' : 'bg-red-400';
              const textColor = riskPct <= 30 ? 'text-green-400' : riskPct <= 50 ? 'text-yellow-400' : riskPct <= 70 ? 'text-orange-400' : 'text-red-400';
              return (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white font-medium">Governance</span>
                    <span className={textColor}>{riskPct}%</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2">
                    <div className={`${barColor} h-2 rounded-full transition-all duration-700`} style={{ width: `${riskPct}%` }} />
                  </div>
                </div>
              );
            })()}
            {Object.entries(scores.nistFunctions || {}).map(([fn, data]) => {
              const numQ = { identify: 5, protect: 5, detect: 5, respond: 5, recover: 5 }[fn] || 5;
              const minScore = numQ * 1;
              const range = data.maxScore - minScore;
              const riskPct = range > 0 ? Math.round(((data.score - minScore) / range) * 100) : 0;
              const barColor = riskPct <= 30 ? 'bg-green-400' : riskPct <= 50 ? 'bg-yellow-400' : riskPct <= 70 ? 'bg-orange-400' : 'bg-red-400';
              const textColor = riskPct <= 30 ? 'text-green-400' : riskPct <= 50 ? 'text-yellow-400' : riskPct <= 70 ? 'text-orange-400' : 'text-red-400';
              return (
                <div key={fn}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white font-medium capitalize">{fn}</span>
                    <span className={textColor}>{riskPct}%</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2">
                    <div className={`${barColor} h-2 rounded-full transition-all duration-700`} style={{ width: `${riskPct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
        <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Assessment Analytics</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
            <div className="text-gray-400 text-sm">Total Questions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">{stats.yesCount}</div>
            <div className="text-gray-400 text-sm">Controls in Place</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400">{stats.noCount}</div>
            <div className="text-gray-400 text-sm">Vulnerabilities</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500">{stats.compliance}%</div>
            <div className="text-gray-400 text-sm">Yes Response Rate</div>
          </div>
        </div>
      </div>

      {/* Vulnerability Breakdown by NIST Category */}
      {stats.noCount > 0 && (
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Vulnerability Breakdown by NIST Function</p>
          <div className="space-y-3">
            {Object.entries(vulnBreakdown)
              .filter(([, data]) => data.count > 0)
              .map(([cat, data]) => (
                <div key={cat} className="border border-gray-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-900/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium capitalize">{CATEGORY_LABELS[cat]}</span>
                      <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                        {data.count} {data.count === 1 ? 'issue' : 'issues'}
                      </span>
                    </div>
                    {expandedCategories[cat] ? (
                      <ChevronUp className="text-gray-400" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </button>
                  {expandedCategories[cat] && (
                    <div className="border-t border-gray-800 p-4 bg-gray-900/30">
                      <div className="space-y-2">
                        {data.fields.map((field, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-red-400 mt-1">•</span>
                            <span className="text-gray-300">{FIELD_LABELS[field] || field}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Critical vulnerabilities */}
      {vulns.length > 0 && (
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
            <AlertTriangle size={16} /> Critical Vulnerabilities
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {vulns.slice(0, 6).map((v, i) => (
              <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-xs font-semibold uppercase mb-1">{v.category}</p>
                <p className="text-white text-sm">{FIELD_LABELS[v.field] || v.field}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin-only: User Answers */}
      {isAdmin && (() => {
        const ANSWER_COLORS = {
          yes: 'text-green-400 bg-green-400/10 border-green-400/30',
          no: 'text-red-400 bg-red-400/10 border-red-400/30',
          dont_know: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
          na: 'text-gray-400 bg-gray-400/10 border-gray-400/30',
        };
        return (
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileQuestion size={16} /> User Responses (Admin View)
            </p>
            <div className="space-y-5">
              {CATEGORIES.map(cat => {
                const catQuestions = QUESTIONS.filter(q => q.category === cat.key);
                const catResponses = responses?.[cat.key] || {};
                if (catQuestions.length === 0) return null;
                return (
                  <div key={cat.key} className="border-b border-gray-800 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="text-white font-semibold text-sm mb-3">{cat.label}</h4>
                    <div className="space-y-2">
                      {catQuestions.map(q => {
                        const answer = catResponses[q.field];
                        const option = q.options?.find(o => o.value === answer);
                        const label = option?.label || (answer || 'Not answered');
                        const colorClass = answer ? (ANSWER_COLORS[answer] || 'text-gray-300 bg-gray-500/10 border-gray-500/30') : 'text-gray-500 bg-gray-500/10 border-gray-500/30';
                        return (
                          <div key={q.field} className="flex items-start justify-between gap-4 text-sm">
                            <p className="text-gray-300 flex-1 leading-snug">{q.text}</p>
                            <span className={`inline-block border rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${colorClass}`}>
                              {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* CTA */}
      <div className="bg-[#111] border-2 border-orange-500/30 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold mb-2">Ready to Address These Findings?</h3>
        <p className="text-gray-400 mb-6 text-sm">Our cybersecurity experts will help you build a prioritized remediation roadmap.</p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Schedule a Free Consultation <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
