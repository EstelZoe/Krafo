import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, FileText, ChevronRight, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAssessment } from '../hooks/useAssessment';
import { useAssessmentAuth } from '../hooks/useAssessmentAuth';
import { useAssessmentContext } from '../context/AssessmentContext';
import ToolkitNavbar from '../components/ToolkitNavbar';

const RISK_BADGE = {
  low: 'bg-green-400/10 border-green-400/30 text-green-400',
  moderate: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400',
  high: 'bg-orange-400/10 border-orange-400/30 text-orange-400',
  critical: 'bg-red-400/10 border-red-400/30 text-red-400 animate-pulse-subtle',
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

export default function AssessmentDashboard() {
  const { getMyAssessments, loading } = useAssessment();
  const { resendVerification } = useAssessmentAuth();
  const { user, resetAssessment } = useAssessmentContext();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [error, setError] = useState(null);
  const [expandedAssessments, setExpandedAssessments] = useState({});
  const [resendMsg, setResendMsg] = useState(null);

  useEffect(() => {
    getMyAssessments()
      .then(setAssessments)
      .catch(err => setError(err.message));
  }, []);

  function handleNewAssessment() {
    resetAssessment();
    navigate('/assessment-toolkit/form');
  }

  function toggleAssessment(id) {
    setExpandedAssessments(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Unverified email banner */}
        {user && user.isEmailVerified === false && (
          <div className="flex items-center justify-between gap-4 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-xl px-5 py-4 mb-6">
            <p className="text-sm">Please verify your email address to start assessments.</p>
            <button
              onClick={async () => {
                try { await resendVerification(); setResendMsg('Verification email sent!'); } catch { setResendMsg('Could not resend. Try again later.'); }
              }}
              className="text-sm font-semibold text-orange-500 hover:text-orange-400 whitespace-nowrap hover:underline"
            >
              Resend Verification
            </button>
          </div>
        )}
        {resendMsg && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 mb-6 text-sm">
            {resendMsg}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              My <span className="text-orange-500">Assessments</span>
            </h1>
            {user && (
              <p className="text-gray-400 text-sm mt-1">
                Welcome back, {user.firstName} — {user.companyName}
              </p>
            )}
          </div>
          <button
            onClick={handleNewAssessment}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 hover:scale-105 hover:glow-orange-md active:scale-98 text-white font-semibold px-5 py-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            <PlusCircle size={18} />
            Start New Assessment
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-400">Loading your assessments...</div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-5">
            <AlertTriangle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && assessments.length === 0 && (
          <div className="text-center py-20 border border-gray-800 rounded-2xl bg-[#111]">
            <FileText size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 mb-6">You haven't completed any assessments yet.</p>
            <button
              onClick={handleNewAssessment}
              className="bg-orange-500 hover:bg-orange-600 hover:scale-105 hover:glow-orange-md active:scale-98 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Take Your First Assessment
            </button>
          </div>
        )}

        {/* Assessment list */}
        {assessments.length > 0 && (
          <div className="space-y-3">
            {assessments.map(a => {
              const badgeClass = RISK_BADGE[a.scores?.riskLevel] || RISK_BADGE.high;
              const date = a.completedAt
                ? new Date(a.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                : 'In Progress';

              // Validate id exists for debugging (API returns 'id', not '_id')
              if (!a.id) {
                console.warn('[AssessmentDashboard] Missing id for assessment:', a);
              }

              const isExpanded = expandedAssessments[a.id];
              const nistFunctions = a.scores?.nistFunctions || {};

              return (
                <div
                  key={a.id || `assessment-${a.createdAt}`}
                  className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/40 hover:glow-orange-sm hover:-translate-y-1 transition-all duration-300 ease-out"
                >
                  {/* Main row */}
                  <div className="flex items-center justify-between px-6 py-4 flex-wrap gap-4">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div>
                        <p className="text-white font-medium text-sm">{date}</p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {a.status === 'completed' ? 'Completed' : 'In Progress'}
                        </p>
                      </div>
                      {a.scores?.riskLevel && (
                        <span className={`border rounded-full px-3 py-0.5 text-xs font-semibold ${badgeClass}`}>
                          {a.scores.riskLevel.toUpperCase()} RISK
                        </span>
                      )}
                      {a.scores?.percentage != null && (
                        <span className="text-gray-400 text-sm">
                          Score: <span className="text-white font-semibold">{a.scores.percentage}%</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Expand/Collapse button for completed assessments */}
                      {a.status === 'completed' && Object.keys(nistFunctions).length > 0 && (
                        <button
                          onClick={() => toggleAssessment(a.id)}
                          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm font-medium transition"
                        >
                          {isExpanded ? (
                            <>
                              Hide Details <ChevronUp size={16} />
                            </>
                          ) : (
                            <>
                              Show Details <ChevronDown size={16} />
                            </>
                          )}
                        </button>
                      )}

                      {/* View Report / Continue button */}
                      {a.status === 'completed' ? (
                        a.id ? (
                          <Link
                            to={`/assessment-toolkit/report/${a.id}`}
                            className="flex items-center gap-1 text-orange-500 hover:text-orange-400 text-sm font-medium transition"
                          >
                            View Report <ChevronRight size={16} />
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="flex items-center gap-1 text-gray-600 text-sm font-medium cursor-not-allowed"
                            title="Report ID unavailable"
                          >
                            View Report <ChevronRight size={16} />
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => navigate('/assessment-toolkit/form')}
                          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm font-medium transition"
                        >
                          Continue <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded NIST Functions */}
                  {isExpanded && (
                    <div className="border-t border-gray-800 px-6 py-4 bg-black/30">
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">NIST Framework — Controls in Place</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(nistFunctions).map(([fn, data]) => {
                          const numQ = { identify: 5, protect: 5, detect: 5, respond: 5, recover: 5 }[fn] || 5;
                          const minScore = numQ * 1;
                          const range = data.maxScore - minScore;
                          const compliancePct = range > 0 ? Math.round(((data.maxScore - data.score) / range) * 100) : 0;
                          const barColor = compliancePct >= 70 ? 'bg-green-400' : compliancePct >= 40 ? 'bg-yellow-400' : 'bg-red-400';
                          const textColor = compliancePct >= 70 ? 'text-green-400' : compliancePct >= 40 ? 'text-yellow-400' : 'text-red-400';
                          const label = fn.charAt(0).toUpperCase() + fn.slice(1);

                          return (
                            <div key={fn} className="bg-[#111] border border-gray-800 rounded-lg p-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white text-xs font-medium">{label}</span>
                                <span className={`text-xs font-semibold ${textColor}`}>
                                  {compliancePct}%
                                </span>
                              </div>
                              <div className="bg-gray-800 rounded-full h-1.5">
                                <div
                                  className={`${barColor} h-1.5 rounded-full transition-all duration-500`}
                                  style={{ width: `${compliancePct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
