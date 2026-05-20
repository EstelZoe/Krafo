import { useEffect, useState, useCallback } from 'react';
import { Bell, Search, AlertTriangle, RefreshCw, Eye, X, Inbox } from 'lucide-react';
import { toast } from 'react-toastify';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';
import ReportView from '../assessment/components/ReportView';
import ConfirmModal from '../../components/ConfirmModal';
import IconButton from '../../components/IconButton';
import EmptyState from '../../components/EmptyState';
import { SkeletonTable } from '../../components/Skeleton';

const RISK_BADGE = {
  low: 'bg-green-400/10 border-green-400/30 text-green-400',
  moderate: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400',
  high: 'bg-orange-400/10 border-orange-400/30 text-orange-400',
  critical: 'bg-red-400/10 border-red-400/30 text-red-400 animate-pulse-subtle',
};

export default function ManageAssessments() {
  const { colors } = useTheme();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [reportModal, setReportModal] = useState(null);
  const [reminderTarget, setReminderTarget] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [referralFilter, setReferralFilter] = useState('all');

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

      const res = await apiClient.get(`/v1/admin/assessments?${params.toString()}`);
      setSubmissions(res.data.data || res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [search, dateFrom, dateTo, minScore, maxScore]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function handleReminder(id) {
    setReminderTarget(id);
  }

  async function confirmReminder() {
    const id = reminderTarget;
    if (!id) return;
    setActionLoading(prev => ({ ...prev, [`rm_${id}`]: true }));
    try {
      await apiClient.post(`/v1/admin/assessments/${id}/remind`, {});
      toast.success('Reminder sent.');
      setReminderTarget(null);
      fetchSubmissions();
    } catch {
      toast.error('Could not send reminder.');
    } finally {
      setActionLoading(prev => ({ ...prev, [`rm_${id}`]: false }));
    }
  }

  async function handleViewReport(id) {
    setActionLoading(prev => ({ ...prev, [`vr_${id}`]: true }));
    try {
      const res = await apiClient.get(`/v1/admin/assessments/${id}`);
      setReportModal(res.data.submission);
    } catch {
      toast.error('Could not load report.');
    } finally {
      setActionLoading(prev => ({ ...prev, [`vr_${id}`]: false }));
    }
  }

  // Theme-aware reusable styles
  const inputStyle = {
    backgroundColor: colors.bgTertiary,
    color: colors.text,
    border: `1px solid ${colors.border}`,
  };
  const cardStyle = { backgroundColor: colors.bgCard, borderColor: colors.border };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
            Assessment Submissions
          </h1>
          <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
            {submissions.length} submission{submissions.length === 1 ? '' : 's'}
          </p>
        </div>
        <button
          onClick={fetchSubmissions}
          disabled={loading}
          className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border transition-all duration-150 disabled:opacity-60 hover:shadow-md"
          style={{
            color: colors.text,
            borderColor: colors.border,
            backgroundColor: colors.bgCard,
          }}
          onMouseEnter={(e) => {
            if (loading) return;
            e.currentTarget.style.borderColor = '#F2600B';
            e.currentTarget.style.color = '#F2600B';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(242, 96, 11, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = colors.border;
            e.currentTarget.style.color = colors.text;
            e.currentTarget.style.boxShadow = '';
          }}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-xl p-4 border grid sm:grid-cols-2 lg:grid-cols-4 gap-4" style={cardStyle}>
        <div className="relative lg:col-span-2">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: colors.textMuted }}
          />
          <input
            type="text"
            placeholder="Search by company name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            style={inputStyle}
          />
        </div>
        <input
          type="date"
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          className="rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          style={inputStyle}
        />
        <input
          type="date"
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          className="rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          style={inputStyle}
        />
        <div className="flex gap-2 items-center sm:col-span-2 lg:col-span-2">
          <span className="text-xs whitespace-nowrap" style={{ color: colors.textMuted }}>
            Score range:
          </span>
          <input
            type="number" min="0" max="100" placeholder="Min %"
            value={minScore} onChange={e => setMinScore(e.target.value)}
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            style={inputStyle}
          />
          <span style={{ color: colors.textMuted }}>–</span>
          <input
            type="number" min="0" max="100" placeholder="Max %"
            value={maxScore} onChange={e => setMaxScore(e.target.value)}
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            style={inputStyle}
          />
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xs whitespace-nowrap" style={{ color: colors.textMuted }}>
            Referral:
          </span>
          <select
            value={referralFilter}
            onChange={e => setReferralFilter(e.target.value)}
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            style={inputStyle}
          >
            <option value="all">All</option>
            <option value="referred">Referred Only</option>
            <option value="non-referred">Non-Referred Only</option>
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-1 flex justify-end">
          <button
            onClick={fetchSubmissions}
            className="bg-gradient-to-r from-[#F2600B] to-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="flex items-center gap-3 rounded-xl p-4 text-sm border"
          style={{ backgroundColor: colors.errorBg, borderColor: colors.error + '40', color: colors.error }}
        >
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl overflow-hidden border" style={cardStyle}>
        {loading ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: colors.bgTertiary }}>
                <tr>
                  {['User', 'Company', 'Risk', 'Risk %', 'Date', 'Referred By', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3"
                      style={{ color: colors.textMuted }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <SkeletonTable rows={5} columns={7} />
            </table>
          </div>
        ) : submissions.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No assessments yet"
            message="When users submit assessments, they will show up here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: colors.bgTertiary }}>
                <tr>
                  {['User', 'Company', 'Risk', 'Risk %', 'Date', 'Referred By', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3"
                      style={{ color: colors.textMuted }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submissions
                  .filter(s => {
                    if (referralFilter === 'referred') return !!s.userId?.referredByCode;
                    if (referralFilter === 'non-referred') return !s.userId?.referredByCode;
                    return true;
                  })
                  .map((s, idx) => {
                  const badgeClass = RISK_BADGE[s.scores?.riskLevel] || RISK_BADGE.high;
                  const date = s.completedAt
                    ? new Date(s.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                    : '—';
                  const name = s.userId ? `${s.userId.firstName} ${s.userId.lastName}` : '—';
                  const company = s.userId?.companyName || '—';
                  const zebra = idx % 2 === 0
                    ? 'transparent'
                    : (colors.bgTertiary);

                  return (
                    <tr
                      key={s.id}
                      className="border-t group transition-colors"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: zebra,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.primaryLight;
                        e.currentTarget.style.boxShadow = 'inset 3px 0 0 0 #F2600B';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = zebra;
                        e.currentTarget.style.boxShadow = '';
                      }}
                    >
                      <td className="px-5 py-4 font-medium" style={{ color: colors.text }}>{name}</td>
                      <td className="px-5 py-4" style={{ color: colors.textSecondary }}>{company}</td>
                      <td className="px-5 py-4">
                        {s.scores?.riskLevel ? (
                          <span className={`border rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeClass}`}>
                            {s.scores.riskLevel.toUpperCase()}
                          </span>
                        ) : <span style={{ color: colors.textMuted }}>—</span>}
                      </td>
                      <td className="px-5 py-4 font-semibold" style={{ color: colors.textSecondary }}>
                        {s.scores?.percentage != null ? `${s.scores.percentage}%` : '—'}
                      </td>
                      <td className="px-5 py-4" style={{ color: colors.textMuted }}>{date}</td>
                      <td className="px-5 py-4" style={{ color: colors.textSecondary }}>
                        {s.userId?.referredByCode || '—'}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {s.status === 'completed' && (
                            <IconButton
                              variant="info"
                              title="View Report"
                              disabled={actionLoading[`vr_${s.id}`]}
                              onClick={() => handleViewReport(s.id)}
                            >
                              <Eye size={14} />
                            </IconButton>
                          )}
                          <IconButton
                            variant="primary"
                            title="Send Reminder"
                            disabled={actionLoading[`rm_${s.id}`]}
                            onClick={() => handleReminder(s.id)}
                          >
                            <Bell size={14} />
                          </IconButton>
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

      <ConfirmModal
        open={!!reminderTarget}
        title="Send reminder?"
        message="The user will receive a branded reminder email about their pending or completed assessment."
        confirmText="Send Reminder"
        tone="primary"
        loading={!!(reminderTarget && actionLoading[`rm_${reminderTarget}`])}
        onConfirm={confirmReminder}
        onCancel={() => setReminderTarget(null)}
      />

      {/* Report Modal */}
      {reportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div
            className="rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative border"
            style={cardStyle}
          >
            <button
              onClick={() => setReportModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg border hover:border-red-500/50 transition"
              style={{ borderColor: colors.border, color: colors.textSecondary }}
            >
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
              Assessment Report — {reportModal.userId?.companyName || 'Unknown'}
            </h2>
            <ReportView submission={reportModal} isAdmin={true} />
          </div>
        </div>
      )}
    </div>
  );
}
