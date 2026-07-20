import { useEffect, useState, useCallback } from 'react';
import { AlertTriangle, RefreshCw, Plus, X, Eye, Tag, Inbox } from 'lucide-react';
import { toast } from 'react-toastify';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';
import IconButton from '../../components/IconButton';
import EmptyState from '../../components/EmptyState';
import { SkeletonTable } from '../../components/Skeleton';

export default function ManagePromoCodes() {
  const { colors } = useTheme();
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({ code: '', assignedTo: '', maxUses: '', expiresAt: '' });
  const [formError, setFormError] = useState(null);
  const [creating, setCreating] = useState(false);

  const [referrals, setReferrals] = useState(null);
  const [referralsLoading, setReferralsLoading] = useState(false);
  const [referralsCode, setReferralsCode] = useState('');

  const fetchPromoCodes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get('/v1/admin/promo-codes');
      const data = res.data?.promoCodes || res.data?.data || res.data || [];
      setPromoCodes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPromoCodes(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    setFormError(null);
    try {
      const payload = {
        code: formData.code,
        assignedTo: formData.assignedTo,
      };
      if (formData.maxUses) payload.maxUses = Number(formData.maxUses);
      if (formData.expiresAt) payload.expiresAt = formData.expiresAt;
      await apiClient.post('/v1/admin/promo-codes', payload);
      setFormData({ code: '', assignedTo: '', maxUses: '', expiresAt: '' });
      setShowCreateForm(false);
      toast.success('Promo code created');
      fetchPromoCodes();
    } catch (err) {
      setFormError(err.response?.data?.error || err.message);
    } finally {
      setCreating(false);
    }
  }

  async function handleDeactivate(id) {
    setActionLoading(prev => ({ ...prev, [`deact_${id}`]: true }));
    try {
      await apiClient.patch(`/v1/admin/promo-codes/${id}/deactivate`);
      toast.success('Promo code deactivated');
      fetchPromoCodes();
    } catch {
      toast.error('Could not deactivate promo code.');
    } finally {
      setActionLoading(prev => ({ ...prev, [`deact_${id}`]: false }));
    }
  }

  async function handleViewReferrals(id, code) {
    setReferralsLoading(true);
    setReferralsCode(code);
    setReferrals(null);
    try {
      const res = await apiClient.get(`/v1/admin/promo-codes/${id}/referrals`);
      const data = res.data?.referrals || res.data?.data || res.data || [];
      setReferrals(Array.isArray(data) ? data : []);
    } catch {
      setReferrals([]);
    } finally {
      setReferralsLoading(false);
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

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
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Promo Codes</h1>
          <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
            {promoCodes.length} code{promoCodes.length === 1 ? '' : 's'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPromoCodes}
            disabled={loading}
            className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border transition-all duration-150 disabled:opacity-60 hover:shadow-md"
            style={{ color: colors.text, borderColor: colors.border, backgroundColor: colors.bgCard }}
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
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-[#F2600B] to-orange-500 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus size={14} /> Create Promo Code
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="rounded-xl p-5 border" style={cardStyle}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: colors.text }}>New Promo Code</h2>
            <button
              onClick={() => setShowCreateForm(false)}
              style={{ color: colors.textMuted }}
              className="hover:opacity-80"
            >
              <X size={18} />
            </button>
          </div>
          {formError && (
            <div
              className="flex items-center gap-2 rounded-lg p-3 text-sm mb-4 border"
              style={{ backgroundColor: colors.errorBg, borderColor: colors.error + '40', color: colors.error }}
            >
              <AlertTriangle size={14} /> {formError}
            </div>
          )}
          <form onSubmit={handleCreate} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Code (e.g. EMPLOYEE2024)"
              value={formData.code}
              onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
              required
              className="rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Assigned To (employee name)"
              value={formData.assignedTo}
              onChange={e => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
              required
              className="rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Max Uses (optional)"
              value={formData.maxUses}
              onChange={e => setFormData(prev => ({ ...prev, maxUses: e.target.value }))}
              min="1"
              className="rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={inputStyle}
            />
            <input
              type="date"
              placeholder="Expires At (optional)"
              value={formData.expiresAt}
              onChange={e => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
              className="rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={inputStyle}
            />
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
              <button
                type="submit"
                disabled={creating}
                className="bg-gradient-to-r from-[#F2600B] to-orange-500 text-white text-sm font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50 hover:shadow-lg hover:shadow-orange-500/30"
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

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
                  {['Code', 'Assigned To', 'Usage', 'Max Uses', 'Status', 'Expires', 'Created', 'Actions'].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: colors.textMuted }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <SkeletonTable rows={5} columns={8} />
            </table>
          </div>
        ) : promoCodes.length === 0 ? (
          <EmptyState
            icon={Tag}
            title="No promo codes yet"
            message="Create your first code to track referrals or grant unlocks."
            action={{ label: '+ Create Promo Code', onClick: () => setShowCreateForm(true) }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: colors.bgTertiary }}>
                <tr>
                  {['Code', 'Assigned To', 'Usage', 'Max Uses', 'Status', 'Expires', 'Created', 'Actions'].map((h) => (
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
                {promoCodes.map((pc, idx) => {
                  const zebra = idx % 2 === 0 ? 'transparent' : colors.bgTertiary;
                  return (
                  <tr
                    key={pc._id || pc.id}
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
                    <td className="px-5 py-4 font-mono font-semibold" style={{ color: colors.text }}>{pc.code}</td>
                    <td className="px-5 py-4" style={{ color: colors.textSecondary }}>{pc.assignedTo}</td>
                    <td className="px-5 py-4" style={{ color: colors.textSecondary }}>{pc.usageCount}</td>
                    <td className="px-5 py-4" style={{ color: colors.textSecondary }}>{pc.maxUses ?? 'Unlimited'}</td>
                    <td className="px-5 py-4">
                      <span className={`border rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        pc.isActive
                          ? 'bg-green-400/10 border-green-400/30 text-green-400'
                          : 'bg-red-400/10 border-red-400/30 text-red-400'
                      }`}>
                        {pc.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4" style={{ color: colors.textMuted }}>{formatDate(pc.expiresAt)}</td>
                    <td className="px-5 py-4" style={{ color: colors.textMuted }}>{formatDate(pc.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {pc.isActive && (
                          <IconButton
                            variant="danger"
                            title="Deactivate"
                            disabled={actionLoading[`deact_${pc._id || pc.id}`]}
                            onClick={() => handleDeactivate(pc._id || pc.id)}
                          >
                            <X size={14} />
                          </IconButton>
                        )}
                        <IconButton
                          variant="info"
                          title="View Referrals"
                          onClick={() => handleViewReferrals(pc._id || pc.id, pc.code)}
                        >
                          <Eye size={14} />
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

      {/* Referrals Modal */}
      {(referrals !== null || referralsLoading) && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => { setReferrals(null); setReferralsCode(''); }}
        >
          <div
            className="rounded-xl max-w-lg w-full max-h-[70vh] overflow-y-auto p-6 border"
            style={cardStyle}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: colors.text }}>
                <Tag size={16} className="text-orange-400" /> Referrals for {referralsCode}
              </h2>
              <button
                onClick={() => { setReferrals(null); setReferralsCode(''); }}
                style={{ color: colors.textMuted }}
              >
                <X size={18} />
              </button>
            </div>
            {referralsLoading ? (
              <div className="text-center py-8 text-sm" style={{ color: colors.textMuted }}>Loading referrals...</div>
            ) : referrals && referrals.length === 0 ? (
              <div className="text-center py-8 text-sm" style={{ color: colors.textMuted }}>No referrals found for this code.</div>
            ) : (
              <div className="space-y-3">
                {referrals && referrals.map((user, i) => (
                  <div
                    key={user._id || user.id || i}
                    className="rounded-lg p-3 border"
                    style={{ backgroundColor: colors.bgTertiary, borderColor: colors.border }}
                  >
                    <p className="font-medium" style={{ color: colors.text }}>
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>{user.email}</p>
                    <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                      Signed up: {formatDate(user.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
