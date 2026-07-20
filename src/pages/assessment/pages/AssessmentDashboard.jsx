import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, FileText, ChevronRight, AlertTriangle, ChevronDown, ChevronUp, LogOut, Lock, Sparkles, RefreshCw } from 'lucide-react';
import { useAssessment } from '../hooks/useAssessment';
import { useAssessmentAuth } from '../hooks/useAssessmentAuth';
import { useAssessmentContext } from '../context/AssessmentContext';
import { calculateAllScores } from '../utils/scoringLogic';
import ToolkitNavbar from '../components/ToolkitNavbar';

const RISK_BADGE = {
  low: 'bg-green-400/10 border-green-400/30 text-green-400',
  moderate: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400',
  high: 'bg-orange-400/10 border-orange-400/30 text-orange-400',
  critical: 'bg-red-400/10 border-red-400/30 text-red-400 animate-pulse-subtle',
};

export default function AssessmentDashboard() {
  const { getMyAssessments, loading } = useAssessment();
  const { resendVerification } = useAssessmentAuth();
  const { user, resetAssessment, clearAuth } = useAssessmentContext();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [error, setError] = useState(null);
  const [expandedAssessments, setExpandedAssessments] = useState({});
  const [resendMsg, setResendMsg] = useState(null);
  const [cooldownUntil, setCooldownUntil] = useState(null);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // User-triggered refresh — lets users pull the latest without re-logging in.
  async function handleRefresh() {
    setRefreshing(true);
    try {
      const data = await getMyAssessments();
      if (data?.assessments) {
        setAssessments(data.assessments);
        setCooldownUntil(data.cooldownUntil || null);
      } else if (Array.isArray(data)) {
        setAssessments(data);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      getMyAssessments()
        .then(data => {
          if (cancelled) return;
          if (data?.assessments) {
            setAssessments(data.assessments);
            setCooldownUntil(data.cooldownUntil || null);
          } else if (Array.isArray(data)) {
            setAssessments(data);
          }
        })
        .catch(err => { if (!cancelled) setError(err.message); });
    };

    load();

    // Re-fetch when the user returns to the page. Without this, the browser's
    // back-forward cache can restore a stale dashboard (no new assessment, no
    // cooldown lock) after a submission — which let users "not see" completed
    // assessments and appear un-throttled until a fresh load days later.
    const onPageShow = (e) => { if (e.persisted) load(); };
    const onVisible = () => { if (document.visibilityState === 'visible') load(); };
    window.addEventListener('pageshow', onPageShow);
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      cancelled = true;
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const isLocked = cooldownUntil && new Date(cooldownUntil) > new Date();
  const daysRemaining = isLocked
    ? Math.ceil((new Date(cooldownUntil) - new Date()) / (1000 * 60 * 60 * 24))
    : 0;

  function handleNewAssessment() {
    if (isLocked) return;
    resetAssessment();
    navigate('/assessment-toolkit/form');
  }

  function handleUnlock() {
    setUnlockOpen(true);
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
          <div className="flex items-center gap-3">
            {assessments.length > 0 && (
              isLocked ? (
                <button
                  onClick={handleUnlock}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 hover:scale-105 text-white font-semibold px-5 py-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
                  title={`Available free in ${daysRemaining} days, or unlock now`}
                >
                  <Sparkles size={18} />
                  Unlock New Assessment
                </button>
              ) : (
                <button
                  onClick={handleNewAssessment}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 hover:scale-105 hover:glow-orange-md active:scale-98 text-white font-semibold px-5 py-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  <PlusCircle size={18} />
                  Start New Assessment
                </button>
              )
            )}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 text-gray-400 hover:text-orange-500 text-sm transition-colors duration-200 border border-gray-700 hover:border-orange-500/50 px-3 py-2 rounded-lg disabled:opacity-60"
              title="Refresh"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing' : 'Refresh'}
            </button>
            {user && (
              <button
                onClick={() => { clearAuth(); navigate('/assessment-toolkit'); }}
                className="flex items-center gap-1.5 text-gray-400 hover:text-orange-500 text-sm transition-colors duration-200 border border-gray-700 hover:border-orange-500/50 px-3 py-2 rounded-lg"
                title="Sign Out"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Paywall notice — shown when cooldown is active */}
        {isLocked && (
          <div className="mb-6 bg-gradient-to-br from-orange-500/10 via-[#111] to-[#111] border border-orange-500/30 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Lock size={18} className="text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm mb-1">Need a fresh assessment now?</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Your next free assessment will be available on{' '}
                  <span className="text-orange-400 font-medium">
                    {new Date(cooldownUntil).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  {' '}({daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} away). Want to reassess sooner? Unlock a paid assessment to address findings without waiting.
                </p>
              </div>
              <button
                onClick={handleUnlock}
                className="flex-shrink-0 hidden sm:flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-sm font-semibold border border-orange-500/40 hover:border-orange-500 px-4 py-2 rounded-lg transition"
              >
                Unlock Now
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Loading — skeleton placeholders instead of a bare spinner so the
            page structure appears instantly (better perceived performance). */}
        {loading && assessments.length === 0 && (
          <div className="space-y-3" aria-busy="true" aria-label="Loading your assessments">
            {[0, 1, 2].map(i => (
              <div key={i} className="bg-[#111] border border-gray-800 rounded-xl px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
                      <div className="h-3 w-16 bg-gray-800/70 rounded animate-pulse" />
                    </div>
                    <div className="h-5 w-20 bg-gray-800 rounded-full animate-pulse" />
                  </div>
                  <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
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
              // Recalculate scores from responses for accuracy
              const scores = a.responses ? calculateAllScores(a.responses) : a.scores;
              const badgeClass = RISK_BADGE[scores?.riskLevel] || RISK_BADGE.high;
              const date = a.completedAt
                ? new Date(a.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                : 'In Progress';

              // Validate id exists for debugging (API returns 'id', not '_id')
              if (!a.id) {
                console.warn('[AssessmentDashboard] Missing id for assessment:', a);
              }

              const isExpanded = expandedAssessments[a.id];
              const nistFunctions = scores?.nistFunctions || {};

              // Calculate risk percentage excluding Company Profile
              const securityScore = (scores?.total || 0) - (scores?.companyProfile || 0);
              const securityMax = (scores?.totalMax || 155) - (scores?.companyProfileMax || 0);
              const securityMin = 31;
              const securityRange = securityMax - securityMin;
              const riskPct = securityRange > 0 ? Math.round(((securityScore - securityMin) / securityRange) * 100) : 0;

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
                      {scores?.riskLevel && (
                        <span className={`border rounded-full px-3 py-0.5 text-xs font-semibold ${badgeClass}`}>
                          {scores.riskLevel.toUpperCase()} RISK
                        </span>
                      )}
                      {a.status === 'completed' && (
                        <span className="text-gray-400 text-sm">
                          Risk: <span className="text-white font-semibold">{riskPct}%</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Expand/Collapse button for completed assessments */}
                      {a.status === 'completed' && (Object.keys(nistFunctions).length > 0 || scores?.governance != null) && (
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
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">NIST Framework — Risk Level</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {/* Governance (not in nistFunctions, scored separately) */}
                        {scores?.governance != null && (() => {
                          const govScore = scores.governance || 0;
                          const govMax = scores.governanceMax || 30;
                          const govMin = 6;
                          const govRange = govMax - govMin;
                          const riskPct = govRange > 0 ? Math.round(((govScore - govMin) / govRange) * 100) : 0;
                          const barColor = riskPct <= 30 ? 'bg-green-400' : riskPct <= 50 ? 'bg-yellow-400' : riskPct <= 70 ? 'bg-orange-400' : 'bg-red-400';
                          const textColor = riskPct <= 30 ? 'text-green-400' : riskPct <= 50 ? 'text-yellow-400' : riskPct <= 70 ? 'text-orange-400' : 'text-red-400';
                          return (
                            <div className="bg-[#111] border border-gray-800 rounded-lg p-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white text-xs font-medium">Governance</span>
                                <span className={`text-xs font-semibold ${textColor}`}>
                                  {riskPct}%
                                </span>
                              </div>
                              <div className="bg-gray-800 rounded-full h-1.5">
                                <div
                                  className={`${barColor} h-1.5 rounded-full transition-all duration-500`}
                                  style={{ width: `${riskPct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })()}
                        {Object.entries(nistFunctions).map(([fn, data]) => {
                          const numQ = { identify: 5, protect: 5, detect: 5, respond: 5, recover: 5 }[fn] || 5;
                          const minScore = numQ * 1;
                          const range = data.maxScore - minScore;
                          const riskPct = range > 0 ? Math.round(((data.score - minScore) / range) * 100) : 0;
                          const barColor = riskPct <= 30 ? 'bg-green-400' : riskPct <= 50 ? 'bg-yellow-400' : riskPct <= 70 ? 'bg-orange-400' : 'bg-red-400';
                          const textColor = riskPct <= 30 ? 'text-green-400' : riskPct <= 50 ? 'text-yellow-400' : riskPct <= 70 ? 'text-orange-400' : 'text-red-400';
                          const label = fn.charAt(0).toUpperCase() + fn.slice(1);

                          return (
                            <div key={fn} className="bg-[#111] border border-gray-800 rounded-lg p-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white text-xs font-medium">{label}</span>
                                <span className={`text-xs font-semibold ${textColor}`}>
                                  {riskPct}%
                                </span>
                              </div>
                              <div className="bg-gray-800 rounded-full h-1.5">
                                <div
                                  className={`${barColor} h-1.5 rounded-full transition-all duration-500`}
                                  style={{ width: `${riskPct}%` }}
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

      {/* Unlock paywall modal */}
      {unlockOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setUnlockOpen(false)}
        >
          <div
            className="bg-[#0d0d0d] border border-orange-500/30 rounded-2xl shadow-2xl max-w-md w-full p-8 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Lock size={22} className="text-orange-400" />
              </div>
              <h2 className="text-xl font-bold">Unlock a Paid Assessment</h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Online payments aren't live yet. To unlock a fresh assessment now, reach out and our team will set it up for you within one business day.
            </p>
            <div className="bg-black/40 border border-gray-800 rounded-xl p-4 mb-6 space-y-2 text-sm">
              <p className="text-gray-400">
                Email{' '}
                <a href="mailto:info@krafosystems.com" className="text-orange-400 hover:underline font-medium">
                  info@krafosystems.com
                </a>
              </p>
              <p className="text-gray-400">
                Or call{' '}
                <a href="tel:+233593196002" className="text-orange-400 hover:underline font-medium">
                  (+233) 59-319-6002
                </a>
              </p>
            </div>
            <button
              onClick={() => setUnlockOpen(false)}
              className="w-full px-4 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-white transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
