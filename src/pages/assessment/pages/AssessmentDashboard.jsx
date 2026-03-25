import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, FileText, ChevronRight, AlertTriangle } from 'lucide-react';
import { useAssessment } from '../hooks/useAssessment';
import { useAssessmentContext } from '../context/AssessmentContext';
import ToolkitNavbar from '../components/ToolkitNavbar';

const RISK_BADGE = {
  low: 'bg-green-400/10 border-green-400/30 text-green-400',
  moderate: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400',
  high: 'bg-orange-400/10 border-orange-400/30 text-orange-400',
  critical: 'bg-red-400/10 border-red-400/30 text-red-400',
};

export default function AssessmentDashboard() {
  const { getMyAssessments, loading } = useAssessment();
  const { user, resetAssessment } = useAssessmentContext();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyAssessments()
      .then(setAssessments)
      .catch(err => setError(err.message));
  }, []);

  function handleNewAssessment() {
    resetAssessment();
    navigate('/assessment-toolkit/form');
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />

      <div className="max-w-5xl mx-auto px-4 py-12">
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
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition"
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
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
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

              return (
                <div
                  key={a._id}
                  className="flex items-center justify-between bg-[#111] border border-gray-800 rounded-xl px-6 py-4 hover:border-orange-500/40 transition flex-wrap gap-4"
                >
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

                  {a.status === 'completed' ? (
                    <Link
                      to={`/assessment-toolkit/report/${a._id}`}
                      className="flex items-center gap-1 text-orange-500 hover:text-orange-400 text-sm font-medium transition"
                    >
                      View Report <ChevronRight size={16} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => navigate('/assessment-toolkit/form')}
                      className="flex items-center gap-1 text-gray-400 hover:text-white text-sm font-medium transition"
                    >
                      Continue <ChevronRight size={16} />
                    </button>
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
