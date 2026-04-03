import { Calendar, ExternalLink, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { calculateResponseStats, getVulnerabilitiesByCategory } from '../utils/reportUtils';

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

const STATUS_COLORS = {
  adequate: 'text-green-400',
  needs_improvement: 'text-yellow-400',
  critical: 'text-red-400',
};

const STATUS_BAR = {
  adequate: 'bg-green-400',
  needs_improvement: 'bg-yellow-400',
  critical: 'bg-red-400',
};

const CALENDLY_URL = 'https://calendly.com/krafosystems';

export default function ReportView({ submission }) {
  const { scores, responses, completedAt } = submission;
  const riskColor = RISK_COLORS[scores.riskLevel] || 'text-orange-400';
  const riskBg = RISK_BG[scores.riskLevel] || 'bg-orange-400/10 border-orange-400/30';
  const reportDate = completedAt ? new Date(completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

  // Calculate response statistics
  const stats = calculateResponseStats(responses);
  
  // Get vulnerability breakdown by category
  const vulnBreakdown = getVulnerabilitiesByCategory(responses);
  
  // State for collapsible sections
  const [expandedCategories, setExpandedCategories] = useState({});

  // Identify vulnerabilities (no answers)
  const vulns = [];
  const cats = ['identify', 'protect', 'detect', 'respond', 'recover', 'governance'];
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
        {/* Overall score */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Overall Risk Score</p>
          <div className={`text-7xl font-bold ${riskColor} mb-2`}>{scores.percentage}%</div>
          <div className={`inline-block border rounded-full px-4 py-1 text-sm font-semibold ${riskBg} ${riskColor}`}>
            {scores.riskLevel?.toUpperCase()} RISK
          </div>
        </div>

        {/* NIST bars */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">NIST Pillars Performance</p>
          <div className="space-y-3">
            {Object.entries(scores.nistFunctions || {}).map(([fn, data]) => {
              const pct = Math.round((data.score / data.maxScore) * 100);
              const barColor = STATUS_BAR[data.status] || 'bg-orange-500';
              const textColor = STATUS_COLORS[data.status] || 'text-orange-400';
              return (
                <div key={fn}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white font-medium capitalize">{fn}</span>
                    <span className={textColor}>{data.score}/{data.maxScore}</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2">
                    <div className={`${barColor} h-2 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
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
            <div className="text-gray-400 text-sm">Compliance</div>
          </div>
        </div>
      </div>

      {/* Vulnerability Breakdown by NIST Category */}
      {stats.noCount > 0 && (
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Vulnerability Breakdown by NIST Function</p>
          <div className="space-y-3">
            {Object.entries(vulnBreakdown)
              .filter(([cat, data]) => data.count > 0)
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
