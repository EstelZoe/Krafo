import { useEffect, useState, useCallback } from 'react';
import { AlertTriangle, RefreshCw, Plus, X, Eye, Tag } from 'lucide-react';
import { apiClient } from '../../api/client';

export default function ManagePromoCodes() {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  // Create form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({ code: '', assignedTo: '', maxUses: '', expiresAt: '' });
  const [formError, setFormError] = useState(null);
  const [creating, setCreating] = useState(false);

  // Referrals modal state
  const [referrals, setReferrals] = useState(null);
  const [referralsLoading, setReferralsLoading] = useState(false);
  const [referralsCode, setReferralsCode] = useState('');

  const fetchPromoCodes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get('/api/v1/admin/promo-codes');
      setPromoCodes(res.data.data || res.data || []);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPromoCodes();
  }, []);

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

      await apiClient.post('/api/v1/admin/promo-codes', payload);
      setFormData({ code: '', assignedTo: '', maxUses: '', expiresAt: '' });
      setShowCreateForm(false);
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
      await apiClient.patch(`/api/v1/admin/promo-codes/${id}/deactivate`);
      fetchPromoCodes();
    } catch {
      alert('Could not deactivate promo code.');
    } finally {
      setActionLoading(prev => ({ ...prev, [`deact_${id}`]: false }));
    }
  }

  async function handleViewReferrals(id, code) {
    setReferralsLoading(true);
    setReferralsCode(code);
    setReferrals(null);
    try {
      const res = await apiClient.get(`/api/v1/admin/promo-codes/${id}/referrals`);
      setReferrals(res.data.data || res.data || []);
    } catch {
      setReferrals([]);
    } finally {
      setReferralsLoading(false);
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-white">Promo Codes</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPromoCodes}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg transition"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={14} /> Create Promo Code
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">New Promo Code</h2>
            <button onClick={() => setShowCreateForm(false)} className="text-gray-500 hover:text-white">
              <X size={18} />
            </button>
          </div>
          {formError && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 text-sm mb-4">
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
              className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
            />
            <input
              type="text"
              placeholder="Assigned To (employee name)"
              value={formData.assignedTo}
              onChange={e => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
              required
              className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
            />
            <input
              type="number"
              placeholder="Max Uses (optional)"
              value={formData.maxUses}
              onChange={e => setFormData(prev => ({ ...prev, maxUses: e.target.value }))}
              min="1"
              className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
            />
            <input
              type="date"
              placeholder="Expires At (optional)"
              value={formData.expiresAt}
              onChange={e => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
              className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
            />
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
              <button
                type="submit"
                disabled={creating}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 text-sm">
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-500 text-sm">Loading promo codes...</div>
        ) : promoCodes.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">No promo codes found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3">Code</th>
                  <th className="text-left px-5 py-3">Assigned To</th>
                  <th className="text-left px-5 py-3">Usage</th>
                  <th className="text-left px-5 py-3">Max Uses</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-left px-5 py-3">Expires</th>
                  <th className="text-left px-5 py-3">Created</th>
                  <th className="text-left px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {promoCodes.map(pc => (
                  <tr key={pc._id || pc.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-5 py-4 text-white font-mono font-semibold">{pc.code}</td>
                    <td className="px-5 py-4 text-gray-300">{pc.assignedTo}</td>
                    <td className="px-5 py-4 text-gray-300">{pc.usageCount}</td>
                    <td className="px-5 py-4 text-gray-300">{pc.maxUses ?? 'Unlimited'}</td>
                    <td className="px-5 py-4">
                      <span className={`border rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        pc.isActive
                          ? 'bg-green-400/10 border-green-400/30 text-green-400'
                          : 'bg-red-400/10 border-red-400/30 text-red-400'
                      }`}>
                        {pc.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400">{formatDate(pc.expiresAt)}</td>
                    <td className="px-5 py-4 text-gray-400">{formatDate(pc.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {pc.isActive && (
                          <button
                            onClick={() => handleDeactivate(pc._id || pc.id)}
                            disabled={actionLoading[`deact_${pc._id || pc.id}`]}
                            title="Deactivate"
                            className="p-2 rounded-lg border border-gray-700 hover:border-red-500/50 text-gray-400 hover:text-red-400 transition disabled:opacity-40"
                          >
                            <X size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => handleViewReferrals(pc._id || pc.id, pc.code)}
                          title="View Referrals"
                          className="p-2 rounded-lg border border-gray-700 hover:border-orange-500/50 text-gray-400 hover:text-orange-400 transition"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Referrals Modal */}
      {(referrals !== null || referralsLoading) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => { setReferrals(null); setReferralsCode(''); }}>
          <div className="bg-[#111] border border-gray-800 rounded-xl max-w-lg w-full max-h-[70vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Tag size={16} className="text-orange-400" /> Referrals for {referralsCode}
              </h2>
              <button onClick={() => { setReferrals(null); setReferralsCode(''); }} className="text-gray-500 hover:text-white">
                <X size={18} />
              </button>
            </div>
            {referralsLoading ? (
              <div className="text-center py-8 text-gray-500 text-sm">Loading referrals...</div>
            ) : referrals && referrals.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">No referrals found for this code.</div>
            ) : (
              <div className="space-y-3">
                {referrals && referrals.map((user, i) => (
                  <div key={user._id || user.id || i} className="bg-black/50 border border-gray-800 rounded-lg p-3">
                    <p className="text-white font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                    <p className="text-gray-500 text-xs mt-1">Signed up: {formatDate(user.createdAt)}</p>
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
