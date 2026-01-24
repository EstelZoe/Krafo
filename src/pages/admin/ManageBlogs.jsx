import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';

const ManageBlogs = () => {
  const { isDark, colors } = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    author: '',
    thumbnail: '',
  });

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('admin/content/blogs');
      
      // Backend may return array directly OR wrapped in object
      const blogsData = Array.isArray(response.data) 
        ? response.data 
        : Array.isArray(response.data?.posts)
        ? response.data.posts
        : [];
      
      console.log('ManageBlogs - Fetched count:', blogsData.length);
      if (blogsData.length > 0) {
        console.log('ManageBlogs - First item has _id:', !!blogsData[0]?._id);
      }
      setBlogs(blogsData);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
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
        setFormData(prev => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal for create/edit
  const openModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || '',
        description: blog.description || '',
        content: blog.content || '',
        category: blog.category || '',
        author: typeof blog.author === 'string' ? blog.author : blog.author?.firstName + ' ' + blog.author?.lastName || '',
        thumbnail: blog.thumbnail || '',
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        description: '',
        content: '',
        category: '',
        author: '',
        thumbnail: '',
      });
    }
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    setImageFile(null);
    setFormData({
      title: '',
      description: '',
      content: '',
      category: '',
      author: '',
      thumbnail: '',
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
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category || 'Uncategorized');
      
      // Add image file if selected, otherwise send existing URL (skip data: previews)
      if (imageFile) {
        formDataToSend.append('thumbnail', imageFile);
      } else if (formData.thumbnail && !formData.thumbnail.startsWith('data:')) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      } else if (editingBlog && editingBlog.thumbnail) {
        // Keep existing thumbnail when editing without new upload
        formDataToSend.append('thumbnail', editingBlog.thumbnail);
      }
      
      if (editingBlog) {
        // Update existing blog - Safe-ID: Handle both _id and id
        const blogId = editingBlog._id || editingBlog.id;
        if (!blogId) {
          alert('Error: Cannot update blog - missing ID');
          return;
        }
        console.log('📝 Updating blog with ID:', blogId);
        await apiClient.patch(`admin/content/blogs/${blogId}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Create new blog - use regular blog endpoint which handles author from token
        await apiClient.post('blogs', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      closeModal();
      fetchBlogs();
    } catch (err) {
      console.error('Error saving blog:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save blog';
      alert(`Failed to save blog: ${errorMessage}`);
    }
  };

  // Handle delete
  const handleDelete = async (blogId) => {
    if (!blogId) {
      console.error('❌ Delete failed: No blog ID provided');
      alert('Error: Cannot delete blog - missing ID');
      return;
    }
    try {
      console.log('🗑️ Deleting blog with ID:', blogId);
      await apiClient.delete(`admin/content/blogs/${blogId}`);
      setDeleteConfirm(null);
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete blog';
      alert(`Failed to delete blog: ${errorMessage}`);
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (blog) => {
    // Safe-ID: Handle both _id and id
    const blogId = blog?._id || blog?.id;
    if (!blogId) {
      console.error('❌ Toggle failed: No blog ID provided', blog);
      alert('Error: Cannot toggle blog - missing ID');
      return;
    }
    try {
      console.log('🔄 Toggling blog with ID:', blogId);
      await apiClient.post(`admin/content/blogs/${blogId}/toggle`);
      fetchBlogs();
    } catch (err) {
      console.error('Error toggling blog status:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to toggle blog status';
      alert(`Failed to toggle blog status: ${errorMessage}`);
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
          onClick={fetchBlogs}
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
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Blogs</h2>
          <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
            {blogs.length} total posts
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-5 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Blog
        </button>
      </div>

      {/* Blogs Grid */}
      {blogs.length === 0 ? (
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium" style={{ color: colors.text }}>No blogs yet</h3>
          <p className="mt-1 text-sm" style={{ color: colors.textMuted }}>
            Get started by creating your first blog post.
          </p>
          <button
            onClick={() => openModal()}
            className="mt-6 px-5 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium"
          >
            Create Blog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {blogs.map((blog) => {
            const blogId = blog._id || blog.id; // Safe-ID
            return (
            <motion.div
              key={blogId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-6 border transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Blog Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    {blog.thumbnail && (
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold" style={{ color: colors.text }}>{blog.title}</h3>
                      <p className="text-sm mt-1 line-clamp-2" style={{ color: colors.textSecondary }}>
                        {blog.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {blog.category && (
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded"
                            style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
                          >
                            {blog.category}
                          </span>
                        )}
                        <span
                          className="px-2 py-1 text-xs font-medium rounded"
                          style={{ 
                            backgroundColor: blog.isActive !== false ? colors.successBg : colors.bgTertiary,
                            color: blog.isActive !== false ? colors.success : colors.textMuted
                          }}
                        >
                          {blog.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {blog.author && (
                        <div className="mt-2 text-sm" style={{ color: colors.textMuted }}>
                          <p>
                            ✍️ By{' '}
                            {typeof blog.author === 'string'
                              ? blog.author
                              : `${blog.author.firstName} ${blog.author.lastName}`}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Vertical Stack on Mobile */}
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                  <button
                    onClick={() => openModal(blog)}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ backgroundColor: colors.infoBg, color: colors.info }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(blog)}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: blog.isActive !== false ? colors.errorBg : colors.successBg,
                      color: blog.isActive !== false ? colors.error : colors.success
                    }}
                  >
                    {blog.isActive !== false ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(blogId)}
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
                  {editingBlog ? 'Edit Blog' : 'Create New Blog'}
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
                      rows="2"
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
                      Content *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows="6"
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
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Data Privacy">Data Privacy</option>
                        <option value="Education">Education</option>
                        <option value="Protection">Protection</option>
                        <option value="Small Business">Small Business</option>
                        <option value="AI">AI</option>
                        <option value="Uncategorized">Uncategorized</option>
                      </select>
                    </div>

                    {!editingBlog && (
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                          Author
                        </label>
                        <p className="text-sm py-2" style={{ color: colors.textMuted }}>
                          Author will be set automatically from your login
                        </p>
                      </div>
                    )}
                    {editingBlog && (
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                          Author
                        </label>
                        <p className="text-sm py-2" style={{ color: colors.textSecondary }}>
                          {formData.author || 'Unknown'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                      Thumbnail
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
                      name="thumbnail"
                      value={formData.thumbnail}
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
                    {formData.thumbnail && formData.thumbnail.startsWith('data:') && (
                      <img src={formData.thumbnail} alt="Preview" className="mt-2 h-20 object-cover rounded" />
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium"
                    >
                      {editingBlog ? 'Update Blog' : 'Create Blog'}
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
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Delete Blog</h3>
              <p className="mb-6" style={{ color: colors.textSecondary }}>
                Are you sure you want to delete this blog post? This action cannot be undone.
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

export default ManageBlogs;
