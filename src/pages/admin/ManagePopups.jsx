import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';

const ManagePopups = () => {
  const { isDark, colors } = useTheme();
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPopup, setEditingPopup] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    eventDate: '',
    registrationUrl: '',
  });

  // Fetch popups
  const fetchPopups = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('admin/content/popups');
      
      // Backend may return array directly OR wrapped in object
      const popupsData = Array.isArray(response.data) 
        ? response.data 
        : Array.isArray(response.data?.popups)
        ? response.data.popups
        : [];
      
      console.log('ManagePopups - Fetched count:', popupsData.length);
      if (popupsData.length > 0) {
        console.log('ManagePopups - First item has _id:', !!popupsData[0]?._id);
      }
      setPopups(popupsData);
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal for create/edit
  const openModal = (popup = null) => {
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
      setFormData({
        title: '',
        description: '',
        image: '',
        eventDate: '',
        registrationUrl: '',
      });
    }
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingPopup(null);
    setImageFile(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      eventDate: '',
      registrationUrl: '',
    });
  };

  // Handle create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      if (formData.description) formDataToSend.append('description', formData.description);
      if (formData.eventDate) formDataToSend.append('eventDate', formData.eventDate);
      if (formData.registrationUrl) formDataToSend.append('registrationUrl', formData.registrationUrl);
      
      // Add image file if selected, otherwise send existing URL (skip data: previews)
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (formData.image && !formData.image.startsWith('data:')) {
        formDataToSend.append('image', formData.image);
      } else if (editingPopup && editingPopup.image) {
        // Keep existing image when editing without new upload
        formDataToSend.append('image', editingPopup.image);
      }

      if (editingPopup) {
        // Update existing popup - Safe-ID: Handle both _id and id
        const popupId = editingPopup._id || editingPopup.id;
        if (!popupId) {
          alert('Error: Cannot update popup - missing ID');
          return;
        }
        console.log('📝 Updating popup with ID:', popupId);
        await apiClient.patch(`admin/content/popups/${popupId}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Create new popup
        await apiClient.post('admin/content/popups', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      closeModal();
      fetchPopups();
    } catch (err) {
      console.error('Error saving popup:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save popup';
      alert(`Failed to save popup: ${errorMessage}`);
    }
  };

  // Handle delete
  const handleDelete = async (popupId) => {
    if (!popupId) {
      console.error('❌ Delete failed: No popup ID provided');
      alert('Error: Cannot delete popup - missing ID');
      return;
    }
    try {
      console.log('🗑️ Deleting popup with ID:', popupId);
      await apiClient.delete(`admin/content/popups/${popupId}`);
      setDeleteConfirm(null);
      fetchPopups();
    } catch (err) {
      console.error('Error deleting popup:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete popup';
      alert(`Failed to delete popup: ${errorMessage}`);
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (popup) => {
    // Safe-ID: Handle both _id and id
    const popupId = popup?._id || popup?.id;
    if (!popupId) {
      console.error('❌ Toggle failed: No popup ID provided', popup);
      alert('Error: Cannot toggle popup - missing ID');
      return;
    }
    try {
      console.log('🔄 Toggling popup with ID:', popupId);
      await apiClient.post(`admin/content/popups/${popupId}/toggle`);
      fetchPopups();
    } catch (err) {
      console.error('Error toggling popup status:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to toggle popup status';
      alert(`Failed to toggle popup status: ${errorMessage}`);
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
        style={{ 
          backgroundColor: colors.errorBg, 
          borderColor: colors.error + '30' 
        }}
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
          className="px-5 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Popup
        </button>
      </div>

      {/* Popups Grid */}
      {popups.length === 0 ? (
        <div 
          className="rounded-2xl p-12 text-center border"
          style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
        >
          <div 
            className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: colors.bgTertiary }}
          >
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: colors.textMuted }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium" style={{ color: colors.text }}>No popups yet</h3>
          <p className="mt-1 text-sm" style={{ color: colors.textMuted }}>
            Get started by creating your first popup.
          </p>
          <button
            onClick={() => openModal()}
            className="mt-6 px-5 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium"
          >
            Create Popup
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {popups.map((popup) => {
            const popupId = popup._id || popup.id; // Safe-ID
            return (
            <motion.div
              key={popupId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-6 border transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Popup Info */}
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
                            backgroundColor: popup.isActive === true ? colors.successBg : colors.bgTertiary,
                            color: popup.isActive === true ? colors.success : colors.textMuted
                          }}
                        >
                          {popup.isActive === true ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="mt-2 text-sm" style={{ color: colors.textMuted }}>
                        {popup.eventDate && (
                          <p>📅 Event Date: {new Date(popup.eventDate).toLocaleDateString()}</p>
                        )}
                        {popup.registrationUrl && (
                          <p className="truncate">🔗 {popup.registrationUrl}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Vertical Stack on Mobile */}
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                  <button
                    onClick={() => openModal(popup)}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ backgroundColor: colors.infoBg, color: colors.info }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(popup)}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: popup.isActive === true ? colors.errorBg : colors.successBg,
                      color: popup.isActive === true ? colors.error : colors.success
                    }}
                  >
                    {popup.isActive === true ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(popupId)}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ backgroundColor: colors.errorBg, color: colors.error }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      )}

      {/* Create/Edit Modal */}
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
                        borderColor: colors.border, 
                        color: colors.text,
                        border: `1px solid ${colors.border}`
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
                        borderColor: colors.border, 
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                      Image *
                    </label>
                    <input
                      type="file"
                      name="imageFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      style={{ 
                        backgroundColor: colors.bgTertiary, 
                        borderColor: colors.border, 
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                      }}
                    />
                    <p className="text-xs mt-1" style={{ color: colors.textMuted }}>Or enter image URL below</p>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors mt-2"
                      style={{ 
                        backgroundColor: colors.bgTertiary, 
                        borderColor: colors.border, 
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                      }}
                    />
                    {formData.image && formData.image.startsWith('data:') && (
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
                        borderColor: colors.border, 
                        color: colors.text,
                        border: `1px solid ${colors.border}`
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
                        borderColor: colors.border, 
                        color: colors.text,
                        border: `1px solid ${colors.border}`
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
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium"
                    >
                      {editingPopup ? 'Update Popup' : 'Create Popup'}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
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

      {/* Delete Confirmation Modal */}
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
