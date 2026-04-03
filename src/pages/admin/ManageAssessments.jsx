import { useEffect, useState, useCallback } from 'react';
import { Download, Bell, Search, AlertTriangle, RefreshCw } from 'lucide-react';
import { apiClient } from '../../api/client';

const RISK_BADGE = {
  low: 'bg-green-400/10 border-green-400/30 text-green-400',
  moderate: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400',
  high: 'bg-orange-400/10 border-orange-400/30 text-orange-400',
  critical: 'bg-red-400/10 border-red-400/30 text-red-400 animate-pulse-subtle',
};

export default function ManageAssessments() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  // Filters
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.set('company', search);
      if (dateFrom) params.set('dateFrom', dateFrom);
      if (dateTo) params.set('dateTo', dateTo);
      if (minScore) params.set('minScore', minScore);
      if (maxScore) params.set('maxScore', maxScore);

      const res = await apiClient.get(`/api/v1/admin/assessments?${params.toString()}`);
      setSubmissions(res.data.data || res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [token, search, dateFrom, dateTo, minScore, maxScore]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function handleDownload(id) {
    setActionLoading(prev => ({ ...prev, [`dl_${id}`]: true }));
    try {
      const res = await apiClient.get(`/api/v1/admin/assessments/${id}/report`, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `krafo-report-${id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Could not download report.');
    } finally {
      setActionLoading(prev => ({ ...prev, [`dl_${id}`]: false }));
    }
  }

  async function handleReminder(id) {
    if (!window.confirm('Send a reminder to this user?')) return;
    setActionLoading(prev => ({ ...prev, [`rm_${id}`]: true }));
    try {
      await apiClient.post(`/api/v1/admin/assessments/${id}/remind`, {});
      alert('Reminder sent.');
      fetchSubmissions();
    } catch {
      alert('Could not send reminder.');
    } finally {
      setActionLoading(prev => ({ ...prev, [`rm_${id}`]: false }));
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-white">Assessment Submissions</h1>
        <button
          onClick={fetchSubmissions}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg transition"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative lg:col-span-2">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by company name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
          />
        </div>
        <input
          type="date"
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
        />
        <input
          type="date"
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
        />
        <div className="flex gap-2 items-center sm:col-span-2 lg:col-span-2">
          <span className="text-gray-500 text-xs whitespace-nowrap">Score range:</span>
          <input
            type="number" min="0" max="100" placeholder="Min %"
            value={minScore} onChange={e => setMinScore(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
          />
          <span className="text-gray-600">–</span>
          <input
            type="number" min="0" max="100" placeholder="Max %"
            value={maxScore} onChange={e => setMaxScore(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-2 flex justify-end">
          <button
            onClick={fetchSubmissions}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 text-sm">
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-500 text-sm">Loading submissions...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">No submissions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3">User</th>
                  <th className="text-left px-5 py-3">Company</th>
                  <th className="text-left px-5 py-3">Risk</th>
                  <th className="text-left px-5 py-3">Score</th>
                  <th className="text-left px-5 py-3">Date</th>
                  <th className="text-left px-5 py-3">Reminder</th>
                  <th className="text-left px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {submissions.map(s => {
                  const badgeClass = RISK_BADGE[s.scores?.riskLevel] || RISK_BADGE.high;
                  const date = s.completedAt
                    ? new Date(s.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                    : '—';
                  const name = s.userId ? `${s.userId.firstName} ${s.userId.lastName}` : '—';
                  const company = s.userId?.companyName || '—';

                  return (
                    <tr key={s._id} className="hover:bg-white/[0.02] transition">
                      <td className="px-5 py-4 text-white">{name}</td>
                      <td className="px-5 py-4 text-gray-300">{company}</td>
                      <td className="px-5 py-4">
                        {s.scores?.riskLevel ? (
                          <span className={`border rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeClass}`}>
                            {s.scores.riskLevel.toUpperCase()}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-5 py-4 text-gray-300">
                        {s.scores?.percentage != null ? `${s.scores.percentage}%` : '—'}
                      </td>
                      <td className="px-5 py-4 text-gray-400">{date}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium ${s.reminderSent ? 'text-green-400' : 'text-gray-500'}`}>
                          {s.reminderSent ? 'Sent' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDownload(s._id)}
                            disabled={actionLoading[`dl_${s._id}`]}
                            title="Download PDF"
                            className="p-2 rounded-lg border border-gray-700 hover:border-orange-500/50 text-gray-400 hover:text-orange-400 transition disabled:opacity-40"
                          >
                            <Download size={14} />
                          </button>
                          <button
                            onClick={() => handleReminder(s._id)}
                            disabled={actionLoading[`rm_${s._id}`] || s.reminderSent}
                            title="Send Reminder"
                            className="p-2 rounded-lg border border-gray-700 hover:border-orange-500/50 text-gray-400 hover:text-orange-400 transition disabled:opacity-40"
                          >
                            <Bell size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
