import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import { useAssessment } from '../hooks/useAssessment';
import { useAssessmentContext } from '../context/AssessmentContext';
import ToolkitNavbar from '../components/ToolkitNavbar';
import ReportView from '../components/ReportView';

export default function AssessmentReport() {
  const { id } = useParams();
  const { getReport, getReportDownloadUrl, loading } = useAssessment();
  const { token } = useAssessmentContext();
  const [submission, setSubmission] = useState(null);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    getReport(id).then(setSubmission).catch(err => setError(err.message));
  }, [id]);

  async function handleDownload() {
    setDownloading(true);
    try {
      const url = getReportDownloadUrl(id);
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Report not found. Please contact support.');
        } else if (res.status === 403) {
          throw new Error('Access denied. Please log in again.');
        } else {
          throw new Error(`Download failed (${res.status})`);
        }
      }
      
      const blob = await res.blob();
      const link = document.createElement('a');
      const date = new Date().toISOString().split('T')[0];
      link.href = URL.createObjectURL(blob);
      link.download = `krafo-cybersecurity-report-${date}.pdf`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      setError(err.message || 'Could not download report. Please try again.');
    } finally {
      setDownloading(false);
    }
  }

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
          <button
            onClick={handleDownload}
            disabled={downloading || loading}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            <Download size={18} />
            {downloading ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>

        {loading && (
          <div className="text-center py-20 text-gray-400">Loading your report...</div>
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
