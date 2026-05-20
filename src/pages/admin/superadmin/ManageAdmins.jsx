import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { RefreshCw, Trash2, Power, Inbox } from 'lucide-react';
import { apiClient } from '../../../api/client';
import { useTheme } from '../../../context/ThemeContext';
import IconButton from '../../../components/IconButton';
import EmptyState from '../../../components/EmptyState';
import { SkeletonTable } from '../../../components/Skeleton';

const currentUserId = (() => {
  try {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    return u?.id || u?._id || null;
  } catch {
    return null;
  }
})();

const ManageAdmins = () => {
  const { colors } = useTheme();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/v1/superadmin/admins');
      setAdmins(res.data?.admins || []);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const resetForm = () => {
    setForm({ firstName: '', lastName: '', email: '' });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await apiClient.post('/v1/superadmin/admins', { ...form, role: 'admin' });
      const wasPromoted = res.data?.promoted;
      toast.success(
        wasPromoted
          ? 'Existing user promoted to admin. Temporary password sent to their email.'
          : 'Admin invited. Temporary password sent to their email.'
      );
      setShowModal(false);
      resetForm();
      await fetchAdmins();
    } catch (err) {
      const msgs = err.response?.data?.messages;
      toast.error(msgs?.[0] || err.response?.data?.error || 'Failed to create admin');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (admin) => {
    if (admin.role === 'superadmin') {
      toast.warn('Cannot change status of a super admin');
      return;
    }
    const previous = admins;
    const nextActive = !admin.isActive;
    // Optimistically flip the row so the UI reflects the change immediately.
    setAdmins((prev) =>
      prev.map((a) => (a.id === admin.id ? { ...a, isActive: nextActive } : a))
    );
    try {
      const res = await apiClient.patch(`/v1/superadmin/admins/${admin.id}/status`, {
        isActive: nextActive,
      });
      // Reconcile with whatever the server returned, in case it differs.
      const updated = res.data?.admin;
      if (updated) {
        setAdmins((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      }
      toast.success(nextActive ? 'Admin enabled' : 'Admin disabled');
    } catch (err) {
      // Roll back on failure.
      setAdmins(previous);
      toast.error(err.response?.data?.error || 'Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    // Snapshot for rollback if the API call fails.
    const previous = admins;
    // Optimistically remove from the list immediately.
    setAdmins((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirm(null);
    try {
      await apiClient.delete(`/v1/superadmin/admins/${id}`);
      toast.success('Admin deleted');
    } catch (err) {
      const status = err.response?.status;
      // 404 = already gone server-side; keep the optimistic delete.
      if (status === 404) {
        toast.info('Admin already removed');
        return;
      }
      // Other error — restore the row.
      setAdmins(previous);
      toast.error(err.response?.data?.error || 'Failed to delete admin');
    }
  };

  const cellStyle = { color: colors.text };
  const mutedStyle = { color: colors.textMuted };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
            Manage Admins
          </h2>
          <p className="text-sm mt-1" style={mutedStyle}>
            {admins.length} admin{admins.length === 1 ? '' : 's'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchAdmins}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl font-medium border transition-all duration-150 flex items-center gap-2 disabled:opacity-60 hover:shadow-md"
            style={{
              backgroundColor: colors.bgCard,
              color: colors.text,
              borderColor: colors.border,
            }}
            title="Reload the list"
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
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all font-medium"
          >
            + Invite Admin
          </button>
        </div>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
      >
        {loading ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: colors.bgTertiary }}>
                <tr>
                  {['Name', 'Email', 'Role', 'Status', 'Created', 'Actions'].map((h) => (
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
              <SkeletonTable rows={4} columns={6} />
            </table>
          </div>
        ) : admins.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No admins yet"
            message="Invite your first admin and they'll appear here."
            action={{ label: '+ Invite Admin', onClick: () => setShowModal(true) }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: colors.bgTertiary }}>
                <tr>
                  {['Name', 'Email', 'Role', 'Status', 'Created', 'Actions'].map((h) => (
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
                {admins.map((admin, idx) => {
                  const isSelf = currentUserId && String(admin.id) === String(currentUserId);
                  const isProtected = admin.role === 'superadmin' || isSelf;
                  const zebra = idx % 2 === 0 ? 'transparent' : colors.bgTertiary;
                  return (
                    <tr
                      key={admin.id}
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
                      <td className="px-4 py-3 text-sm font-medium" style={cellStyle}>
                        {admin.firstName} {admin.lastName}
                        {isSelf && (
                          <span className="ml-2 text-xs" style={mutedStyle}>(you)</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm" style={cellStyle}>{admin.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className="px-2 py-1 text-xs font-medium rounded"
                          style={{
                            backgroundColor: admin.role === 'superadmin' ? colors.primaryLight : colors.infoBg,
                            color: admin.role === 'superadmin' ? colors.primary : colors.info,
                          }}
                        >
                          {admin.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className="px-2 py-1 text-xs font-medium rounded"
                          style={{
                            backgroundColor: admin.isActive ? colors.successBg : colors.errorBg,
                            color: admin.isActive ? colors.success : colors.error,
                          }}
                        >
                          {admin.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm" style={mutedStyle}>
                        {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : '\u2014'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {isProtected ? (
                          <span style={mutedStyle}>protected</span>
                        ) : (
                          <div className="flex gap-2">
                            <IconButton
                              variant={admin.isActive ? 'warning' : 'success'}
                              title={admin.isActive ? 'Disable admin' : 'Enable admin'}
                              onClick={() => handleToggle(admin)}
                            >
                              <Power size={14} />
                            </IconButton>
                            <IconButton
                              variant="danger"
                              title="Delete admin"
                              onClick={() => setDeleteConfirm(admin)}
                            >
                              <Trash2 size={14} />
                            </IconButton>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => !submitting && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="rounded-2xl shadow-xl max-w-md w-full p-6 border"
              style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
                Invite Admin
              </h3>
              <p className="text-sm mb-6" style={{ color: colors.textMuted }}>
                A temporary password will be emailed to the new admin. They will be
                required to set their own password on first sign-in.
              </p>
              <form onSubmit={handleCreate} className="space-y-4">
                {[
                  { name: 'firstName', label: 'First Name', type: 'text', minLength: 2 },
                  { name: 'lastName', label: 'Last Name', type: 'text', minLength: 2 },
                  { name: 'email', label: 'Email', type: 'email' },
                ].map((f) => (
                  <div key={f.name}>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: colors.textSecondary }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={form[f.name]}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      required
                      minLength={f.minLength}
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      style={{
                        backgroundColor: colors.bgTertiary,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl font-medium disabled:opacity-60"
                  >
                    {submitting ? 'Sending invite\u2026' : 'Send Invite'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    disabled={submitting}
                    className="flex-1 px-4 py-2.5 rounded-xl font-medium"
                    style={{ backgroundColor: colors.bgTertiary, color: colors.text }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="rounded-2xl shadow-xl max-w-md w-full p-6 border"
              style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
                Delete Admin
              </h3>
              <p className="mb-6" style={{ color: colors.textSecondary }}>
                Delete <strong>{deleteConfirm.email}</strong>? This is permanent.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(deleteConfirm.id)}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl font-medium"
                  style={{ backgroundColor: colors.bgTertiary, color: colors.text }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageAdmins;
