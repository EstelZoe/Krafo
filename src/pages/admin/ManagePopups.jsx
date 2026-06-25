import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Inbox, MessageSquarePlus } from 'lucide-react';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';
import EmptyState from '../../components/EmptyState';

const EMPTY_FORM = {
  title: '',
  description: '',
  image: '',
  eventDate: '',
  registrationUrl: '',
};

const ManagePopups = () => {
  const { colors } = useTheme();
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPopup, setEditingPopup] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Always derive a stable id (Mongo returns _id; the transform plugin exposes id).
  const popupId = (p) => p?._id || p?.id;

  const fetchPopups = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/admin/content/popups');
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.popups)
        ? response.data.popups
        : [];
      setPopups(data);
    } catch (err) {
      console.error('Error fetching popups:', err);
      setError('Failed to load popups');
      setPopups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setFormData((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const openModal = (popup = null) => {
    // Always wipe the previous form state before populating from a fresh
    // popup so a delete-then-edit flow can never carry over stale data.
    setImageFile(null);
    if (popup) {
      setEditingPopup(popup);
      setFormData({
        title: popup.title || '',
        description: popup.description || '',
        image: popup.image || '',
        eventDate: popup.eventDate ? new Date(popup.eventDate).toISOString().split('T')[0] : '',
        registrationUrl: popup.registrationUrl || '',
      });
    } else {
      setEditingPopup(null);
      setFormData(EMPTY_FORM);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setShowModal(false);
    setEditingPopup(null);
    setImageFile(null);
    setFormData(EMPTY_FORM);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      if (formData.description) payload.append('description', formData.description);
      if (formData.eventDate) payload.append('eventDate', formData.eventDate);
      if (formData.registrationUrl) payload.append('registrationUrl', formData.registrationUrl);

      if (imageFile) {
        payload.append('image', imageFile);
      } else if (formData.image && !formData.image.startsWith('data:')) {
        payload.append('image', formData.image);
      } else if (editingPopup?.image) {
        payload.append('image', editingPopup.image);
      }

      if (editingPopup) {
        const id = popupId(editingPopup);
        if (!id) {
          toast.error('Cannot update popup \u2014 missing ID');
          return;
        }
        const res = await apiClient.patch(`/admin/content/popups/${id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const updated = res.data?.popup || res.data;
        // Replace the row in-place so the user sees the change instantly.
        setPopups((prev) =>
          prev.map((p) => (popupId(p) === id ? { ...p, ...updated } : p))
        );
        toast.success('Popup updated');
      } else {
        const res = await apiClient.post('/admin/content/popups', payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const created = res.data?.popup || res.data;
        if (created && popupId(created)) {
          setPopups((prev) => [created, ...prev]);
        } else {
          // Fallback if backend response shape is unexpected.
          fetchPopups();
        }
        toast.success('Popup created');
      }
      closeModal();
    } catch (err) {
      console.error('Error saving popup:', err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Failed to save popup';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error('Cannot delete popup \u2014 missing ID');
      return;
    }
    const previous = popups;
    setPopups((prev) => prev.filter((p) => popupId(p) !== id));
    setDeleteConfirm(null);
    try {
      await apiClient.delete(`/admin/content/popups/${id}`);
      toast.success('Popup deleted');
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        toast.info('Popup already removed');
        return;
      }
      setPopups(previous);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Failed to delete popup';
      toast.error(errorMessage);
    }
  };

  const handleToggleStatus = async (popup) => {
    const id = popupId(popup);
    if (!id) {
      toast.error('Cannot toggle popup \u2014 missing ID');
      return;
    }
    const previous = popups;
    const optimistic = !popup.isActive;
    // Optimistic flip — UI updates the moment the click registers.
    setPopups((prev) =>
      prev.map((p) => (popupId(p) === id ? { ...p, isActive: optimistic } : p))
    );
    try {
      const res = await apiClient.post(`/admin/content/popups/${id}/toggle`);
      const updated = res.data?.popup || res.data;
      // Reconcile with server truth (covers the "only one active at a time"
      // server rule which may have flipped other popups).
      if (updated && popupId(updated)) {
        setPopups((prev) =>
          prev.map((p) => (popupId(p) === id ? { ...p, ...updated } : p))
        );
        // If the server enforces single-active, refetch so other rows reflect it.
        if (updated.isActive) fetchPopups();
      }
      toast.success(optimistic ? 'Popup activated' : 'Popup deactivated');
    } catch (err) {
      setPopups(previous);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Failed to toggle popup status';
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F2600B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-xl p-4 border"
        style={{ backgroundColor: colors.errorBg, borderColor: colors.error + '30' }}
      >
        <p style={{ color: colors.error }}>{error}</p>
        <button
          onClick={fetchPopups}
          className="mt-2 font-medium hover:underline"
          style={{ color: colors.error }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Popups</h2>
          <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
            {popups.length} total popups • Only one can be active at a time
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-5 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all font-medium flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Popup
        </button>
      </div>

      {/* Empty state or grid */}
      {popups.length === 0 ? (
        <EmptyState
          icon={MessageSquarePlus}
          title="No popups yet"
          message="Create your first popup to surface announcements on the public site."
          action={{ label: 'Create Popup', onClick: () => openModal() }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {popups.map((popup) => {
            const id = popupId(popup);
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-6 border transition-all hover:shadow-lg"
                style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {popup.image && (
                        <img
                          src={popup.image}
                          alt={popup.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold" style={{ color: colors.text }}>{popup.title}</h3>
                        <p className="text-sm mt-1 line-clamp-2" style={{ color: colors.textSecondary }}>
                          {popup.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span
                            className="px-2 py-1 text-xs font-medium rounded"
                            style={{
                              backgroundColor: popup.isActive ? colors.successBg : colors.bgTertiary,
                              color: popup.isActive ? colors.success : colors.textMuted,
                            }}
                          >
                            {popup.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="mt-2 text-sm" style={{ color: colors.textMuted }}>
                          {popup.eventDate && (
                            <p className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Event Date: {new Date(popup.eventDate).toLocaleDateString()}
                            </p>
                          )}
                          {popup.registrationUrl && (
                            <p className="flex items-center gap-2 truncate">
                              <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                              {popup.registrationUrl}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                    <button
                      onClick={() => openModal(popup)}
                      className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:opacity-80"
                      style={{ backgroundColor: colors.infoBg, color: colors.info }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(popup)}
                      className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:opacity-80"
                      style={{
                        backgroundColor: popup.isActive ? colors.errorBg : colors.successBg,
                        color: popup.isActive ? colors.error : colors.success,
                      }}
                    >
                      {popup.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(id)}
                      className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:opacity-80"
                      style={{ backgroundColor: colors.errorBg, color: colors.error }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create / Edit modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              key={editingPopup ? `edit-${popupId(editingPopup)}` : 'create-new'}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border"
              style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
                  {editingPopup ? 'Edit Popup' : 'Create New Popup'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      style={{
                        backgroundColor: colors.bgTertiary,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      style={{
                        backgroundColor: colors.bgTertiary,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                      Image
                    </label>
                    <input
                      type="file"
                      name="imageFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      style={{
                        backgroundColor: colors.bgTertiary,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                    <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                      Or paste an image URL below.
                    </p>
                    <input
                      type="text"
                      name="image"
                      value={formData.image && !formData.image.startsWith('data:') ? formData.image : ''}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors mt-2"
                      style={{
                        backgroundColor: colors.bgTertiary,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                    {formData.image && (
                      <img src={formData.image} alt="Preview" className="mt-2 h-20 object-cover rounded" />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      style={{
                        backgroundColor: colors.bgTertiary,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                      Registration URL
                    </label>
                    <input
                      type="url"
                      name="registrationUrl"
                      value={formData.registrationUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/register"
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      style={{
                        backgroundColor: colors.bgTertiary,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                  </div>

                  <div
                    className="rounded-xl p-3 border"
                    style={{ backgroundColor: colors.warningBg, borderColor: colors.warning + '30' }}
                  >
                    <p className="text-sm" style={{ color: colors.warning }}>
                      ⚠️ Note: Only one popup can be active at a time. Activating this popup will
                      deactivate any other active popup.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium disabled:opacity-60"
                    >
                      {submitting
                        ? (editingPopup ? 'Updating\u2026' : 'Creating\u2026')
                        : (editingPopup ? 'Update Popup' : 'Create Popup')}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={submitting}
                      className="flex-1 px-4 py-2.5 rounded-xl transition-colors font-medium"
                      style={{ backgroundColor: colors.bgTertiary, color: colors.text }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirmation modal */}
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="rounded-2xl shadow-xl max-w-md w-full p-6 border"
              style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Delete Popup</h3>
              <p className="mb-6" style={{ color: colors.textSecondary }}>
                Are you sure you want to delete this popup? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl transition-colors font-medium"
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

export default ManagePopups;
