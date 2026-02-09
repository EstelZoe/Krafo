import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';

const ManageEvents = () => {
  const { isDark, colors } = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateRange: '',
    time: '',
    location: '',
    category: '',
    image: '',
    registrationUrl: '',
    featured: false,
  });

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('admin/content/events');
      
      // Backend may return array directly OR wrapped in object
      const eventsData = Array.isArray(response.data) 
        ? response.data 
        : Array.isArray(response.data?.events)
        ? response.data.events
        : [];
      
      console.log('ManageEvents - Fetched count:', eventsData.length);
      if (eventsData.length > 0) {
        console.log('ManageEvents - First item has _id:', !!eventsData[0]?._id);
      }
      setEvents(eventsData);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
  const openModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title || '',
        description: event.description || '',
        dateRange: event.dateRange || '',
        time: event.time || '',
        location: event.location || '',
        category: event.category || '',
        image: event.image || '',
        registrationUrl: event.registrationUrl || '',
        featured: event.featured || false,
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        dateRange: '',
        time: '',
        location: '',
        category: '',
        image: '',
        registrationUrl: '',
        featured: false,
      });
    }
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setImageFile(null);
    setFormData({
      title: '',
      description: '',
      dateRange: '',
      time: '',
      location: '',
      category: '',
      image: '',
      registrationUrl: '',
      featured: false,
    });
  };

  // Handle create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('dateRange', formData.dateRange);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('registrationUrl', formData.registrationUrl);
      formDataToSend.append('featured', formData.featured);
      
      // Add image file if selected, otherwise send existing URL (skip data: previews)
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (formData.image && !formData.image.startsWith('data:')) {
        formDataToSend.append('image', formData.image);
      } else if (editingEvent && editingEvent.image) {
        // Keep existing image when editing without new upload
        formDataToSend.append('image', editingEvent.image);
      }

      if (editingEvent) {
        // Update existing event - Safe-ID: Handle both _id and id
        const eventId = editingEvent._id || editingEvent.id;
        if (!eventId) {
          alert('Error: Cannot update event - missing ID');
          return;
        }
        console.log('📝 Updating event with ID:', eventId);
        await apiClient.patch(`admin/content/events/${eventId}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Create new event
        await apiClient.post('admin/content/events', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      closeModal();
      fetchEvents();
    } catch (err) {
      console.error('Error saving event:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save event';
      alert(`Failed to save event: ${errorMessage}`);
    }
  };

  // Handle delete
  const handleDelete = async (eventId) => {
    if (!eventId) {
      console.error('❌ Delete failed: No event ID provided');
      alert('Error: Cannot delete event - missing ID');
      return;
    }
    try {
      console.log('🗑️ Deleting event with ID:', eventId);
      await apiClient.delete(`admin/content/events/${eventId}`);
      setDeleteConfirm(null);
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete event';
      alert(`Failed to delete event: ${errorMessage}`);
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (event) => {
    // Safe-ID: Handle both _id and id
    const eventId = event?._id || event?.id;
    if (!eventId) {
      console.error('❌ Toggle failed: No event ID provided', event);
      alert('Error: Cannot toggle event - missing ID');
      return;
    }
    try {
      console.log('🔄 Toggling event with ID:', eventId);
      await apiClient.post(`admin/content/events/${eventId}/toggle`);
      fetchEvents();
    } catch (err) {
      console.error('Error toggling event status:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to toggle event status';
      alert(`Failed to toggle event status: ${errorMessage}`);
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
          onClick={fetchEvents}
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
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Events</h2>
          <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
            {events.length} total events
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-5 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Event
        </button>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium" style={{ color: colors.text }}>No events yet</h3>
          <p className="mt-1 text-sm" style={{ color: colors.textMuted }}>
            Get started by creating your first event.
          </p>
          <button
            onClick={() => openModal()}
            className="mt-6 px-5 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium"
          >
            Create Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => {
            const eventId = event._id || event.id; // Safe-ID
            return (
            <motion.div
              key={eventId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-6 border transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Event Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold" style={{ color: colors.text }}>{event.title}</h3>
                      <p className="text-sm mt-1 line-clamp-2" style={{ color: colors.textSecondary }}>
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {event.category && (
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded"
                            style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
                          >
                            {event.category}
                          </span>
                        )}
                        {event.featured && (
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded"
                            style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}
                          >
                            Featured
                          </span>
                        )}
                        <span
                          className="px-2 py-1 text-xs font-medium rounded"
                          style={{ 
                            backgroundColor: event.isActive !== false ? colors.successBg : colors.bgTertiary,
                            color: event.isActive !== false ? colors.success : colors.textMuted
                          }}
                        >
                          {event.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="mt-2 text-sm flex flex-col gap-1" style={{ color: colors.textMuted }}>
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {event.dateRange}
                          <span className="mx-1">•</span>
                          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Vertical Stack on Mobile */}
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                  <button
                    onClick={() => openModal(event)}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ backgroundColor: colors.infoBg, color: colors.info }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(event)}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: event.isActive !== false ? colors.errorBg : colors.successBg,
                      color: event.isActive !== false ? colors.error : colors.success
                    }}
                  >
                    {event.isActive !== false ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(eventId)}
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
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
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
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                        Date Range *
                      </label>
                      <input
                        type="text"
                        name="dateRange"
                        value={formData.dateRange}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., November 12-14"
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
                        Time *
                      </label>
                      <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 12:00PM-04:00PM GMT"
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                        style={{ 
                          backgroundColor: colors.bgTertiary, 
                          borderColor: colors.border, 
                          color: colors.text,
                          border: `1px solid ${colors.border}`
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
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
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      style={{ 
                        backgroundColor: colors.bgTertiary, 
                        borderColor: colors.border, 
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                      }}
                    >
                      <option value="">Select a category</option>
                      <option value="Technology">Technology</option>
                      <option value="Business">Business</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Marketing">Marketing</option>
                      <option value="AI">AI</option>
                      <option value="Education">Education</option>
                    </select>
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

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                      style={{ accentColor: colors.primary }}
                    />
                    <label className="ml-2 text-sm font-medium" style={{ color: colors.textSecondary }}>
                      Featured Event
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium"
                    >
                      {editingEvent ? 'Update Event' : 'Create Event'}
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
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Delete Event</h3>
              <p className="mb-6" style={{ color: colors.textSecondary }}>
                Are you sure you want to delete this event? This action cannot be undone.
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

export default ManageEvents;
