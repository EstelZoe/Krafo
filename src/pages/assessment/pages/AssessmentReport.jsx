import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAssessment } from '../hooks/useAssessment';
import ToolkitNavbar from '../components/ToolkitNavbar';
import ReportView from '../components/ReportView';

export default function AssessmentReport() {
  const { id } = useParams();
  const { getReport, loading } = useAssessment();
  const [submission, setSubmission] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReport(id).then(setSubmission).catch(err => setError(err.message));
  }, [id]);

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link to="/assessment-toolkit/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-3 transition">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold">
              Cybersecurity <span className="text-orange-500">Risk Report</span>
            </h1>
          </div>
        </div>

        {loading && !submission && (
          <div className="space-y-6" aria-busy="true" aria-label="Loading your report">
            {/* Overall score card */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-8">
              <div className="h-3 w-32 bg-gray-800 rounded animate-pulse mb-4" />
              <div className="h-16 w-40 bg-gray-800 rounded animate-pulse mb-4" />
              <div className="h-2.5 w-full bg-gray-800/70 rounded-full animate-pulse" />
            </div>
            {/* NIST function cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="bg-[#111] border border-gray-800 rounded-xl p-5">
                  <div className="h-4 w-24 bg-gray-800 rounded animate-pulse mb-3" />
                  <div className="h-2 w-full bg-gray-800/70 rounded-full animate-pulse mb-2" />
                  <div className="h-3 w-16 bg-gray-800/70 rounded animate-pulse" />
                </div>
              ))}
            </div>
            {/* Recommendations block */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 space-y-3">
              <div className="h-4 w-40 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-full bg-gray-800/70 rounded animate-pulse" />
              <div className="h-3 w-5/6 bg-gray-800/70 rounded animate-pulse" />
              <div className="h-3 w-4/6 bg-gray-800/70 rounded animate-pulse" />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-6 text-center">
            {error}
          </div>
        )}

        {submission && <ReportView submission={submission} />}
      </div>
    </div>
  );
}
