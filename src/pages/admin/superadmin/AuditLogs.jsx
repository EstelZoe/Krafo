import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { RefreshCw, FileText } from 'lucide-react';
import { apiClient } from '../../../api/client';
import { useTheme } from '../../../context/ThemeContext';
import EmptyState from '../../../components/EmptyState';
import { SkeletonTable } from '../../../components/Skeleton';

const ACTION_OPTIONS = [
  '',
  'auth.login.success',
  'auth.login.otp_sent',
  'auth.login.otp_failed',
  'auth.login.password_failed',
  'auth.login.locked',
  'auth.first_login.password_changed',
  'auth.first_login.password_failed',
  'admin.created',
  'admin.promoted',
  'admin.enabled',
  'admin.disabled',
  'admin.deleted',
  'admin.password_changed',
  'superadmin.transfer.initiated',
  'superadmin.transfer.confirmed',
  'superadmin.transfer.accepted',
  'superadmin.transfer.cancelled',
];

const AuditLogs = () => {
  const { colors } = useTheme();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    action: '',
    userEmail: '',
    dateFrom: '',
    dateTo: '',
    limit: 100,
  });

  const fetchLogs = useCallback(async (override) => {
    const f = override || filters;
    try {
      setLoading(true);
      const params = {};
      if (f.action) params.action = f.action;
      if (f.userEmail) params.userEmail = f.userEmail;
      if (f.dateFrom) params.dateFrom = f.dateFrom;
      if (f.dateTo) params.dateTo = f.dateTo;
      if (f.limit) params.limit = f.limit;
      const res = await apiClient.get('/v1/superadmin/audit-logs', { params });
      setLogs(res.data?.logs || []);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchLogs();
  };

  const reset = () => {
    const empty = { action: '', userEmail: '', dateFrom: '', dateTo: '', limit: 100 };
    setFilters(empty);
    fetchLogs(empty);
  };

  const cellStyle = { color: colors.text };
  const mutedStyle = { color: colors.textMuted };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Audit Logs</h2>
          <p className="text-sm mt-1" style={mutedStyle}>
            Recent admin actions across the platform.
          </p>
        </div>
        <button
          onClick={() => fetchLogs()}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl font-medium border transition-all duration-150 flex items-center gap-2 disabled:opacity-60 hover:shadow-md"
          style={{
            backgroundColor: colors.bgCard,
            color: colors.text,
            borderColor: colors.border,
          }}
          title="Reload the logs"
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
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <form
        onSubmit={handleFilter}
        className="rounded-xl border p-4 flex flex-wrap gap-3 items-end"
        style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
      >
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-medium mb-1" style={mutedStyle}>Action</label>
          <select
            value={filters.action}
            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
            className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            style={{
              backgroundColor: colors.bgTertiary,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            {ACTION_OPTIONS.map((a) => (
              <option key={a || 'all'} value={a}>
                {a || 'All actions'}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-medium mb-1" style={mutedStyle}>User email</label>
          <input
            type="email"
            value={filters.userEmail}
            onChange={(e) => setFilters({ ...filters, userEmail: e.target.value })}
            placeholder="actor@example.com"
            className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            style={{
              backgroundColor: colors.bgTertiary,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={mutedStyle}>From</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            className="px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            style={{
              backgroundColor: colors.bgTertiary,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={mutedStyle}>To</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            className="px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            style={{
              backgroundColor: colors.bgTertiary,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-lg font-medium"
        >
          Filter
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: colors.bgTertiary, color: colors.text }}
        >
          Reset
        </button>
      </form>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
      >
        {loading ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: colors.bgTertiary }}>
                <tr>
                  {['Timestamp', 'User', 'Action', 'Target', 'IP'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3"
                      style={mutedStyle}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <SkeletonTable rows={6} columns={5} />
            </table>
          </div>
        ) : logs.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No audit entries"
            message="Admin actions and login events will appear here as they happen. Try widening the date range or clearing filters."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: colors.bgTertiary }}>
                <tr>
                  {['Timestamp', 'User', 'Action', 'Target', 'IP'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3"
                      style={mutedStyle}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log, idx) => {
                  const zebra = idx % 2 === 0 ? 'transparent' : colors.bgTertiary;
                  return (
                  <tr
                    key={log.id}
                    className="border-t group transition-colors"
                    style={{ borderColor: colors.border, backgroundColor: zebra }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primaryLight;
                      e.currentTarget.style.boxShadow = 'inset 3px 0 0 0 #F2600B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = zebra;
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <td className="px-4 py-3 text-sm whitespace-nowrap" style={cellStyle}>
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm" style={cellStyle}>
                      <div className="font-medium">
                        {log.userId
                          ? `${log.userId.firstName || ''} ${log.userId.lastName || ''}`.trim() ||
                            log.userEmail
                          : log.userEmail || '\u2014'}
                      </div>
                      {log.userId?.email && (
                        <div className="text-xs" style={mutedStyle}>
                          {log.userId.email}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono" style={cellStyle}>{log.action}</td>
                    <td className="px-4 py-3 text-sm" style={cellStyle}>
                      {log.targetUserId
                        ? `${log.targetUserId.firstName || ''} ${log.targetUserId.lastName || ''}`.trim() ||
                          log.targetUserEmail
                        : log.targetUserEmail || '\u2014'}
                    </td>
                    <td className="px-4 py-3 text-sm" style={mutedStyle}>{log.ipAddress || '\u2014'}</td>
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
};

export default AuditLogs;
