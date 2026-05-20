import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { apiClient } from '../../api/client';
import { useTheme } from '../../context/ThemeContext';
import { replayAdminOnboarding } from './onboarding/useAdminOnboarding';

/**
 * Profile page for the currently authenticated admin/superadmin.
 * Lets the user upload an avatar and update their display name.
 */
const Profile = () => {
  const { colors } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingName, setSavingName] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '' });
  const fileInputRef = useRef(null);

  // Sync localStorage so AdminLayout (avatar in topbar) re-renders fresh.
  const persistUser = (next) => {
    setUser(next);
    localStorage.setItem('user', JSON.stringify(next));
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await apiClient.get('/v1/me/profile');
        const u = res.data?.user;
        persistUser(u);
        setForm({ firstName: u?.firstName || '', lastName: u?.lastName || '' });
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const initial = (() => {
    if (!user) return 'A';
    const first = (user.firstName || '').trim();
    const last = (user.lastName || '').trim();
    if (first) return first[0].toUpperCase();
    if (last) return last[0].toUpperCase();
    return (user.email || 'A')[0].toUpperCase();
  })();

  const handlePickFile = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be 5MB or smaller');
      return;
    }

    setUploading(true);
    try {
      const data = new FormData();
      data.append('image', file);
      const res = await apiClient.patch('/v1/me/avatar', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      persistUser(res.data?.user);
      toast.success('Avatar updated');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to upload avatar');
    } finally {
      setUploading(false);
      // Allow re-uploading the same file again.
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user?.avatar) return;
    setRemoving(true);
    try {
      const res = await apiClient.delete('/v1/me/avatar');
      persistUser(res.data?.user);
      toast.success('Avatar removed');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to remove avatar');
    } finally {
      setRemoving(false);
    }
  };

  const handleSaveName = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.error('First and last name are required');
      return;
    }
    setSavingName(true);
    try {
      const res = await apiClient.patch('/v1/me/profile', {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
      });
      persistUser(res.data?.user);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSavingName(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F2600B]" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
          My Profile
        </h2>
        <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
          Update how you appear in the admin console.
        </p>
      </div>

      {/* Avatar card */}
      <div
        className="rounded-2xl border p-6"
        style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
      >
        <h3 className="text-base font-semibold mb-4" style={{ color: colors.text }}>
          Profile Photo
        </h3>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="relative">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-24 h-24 rounded-2xl object-cover border-2"
                style={{ borderColor: colors.border }}
              />
            ) : (
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center border-2"
                style={{ backgroundColor: colors.primaryLight, borderColor: colors.border }}
              >
                <span className="text-3xl font-bold" style={{ color: colors.primary }}>
                  {initial}
                </span>
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handlePickFile}
              disabled={uploading}
              className="px-4 py-2 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl font-medium disabled:opacity-60"
            >
              {user?.avatar ? 'Change Photo' : 'Upload Photo'}
            </button>
            {user?.avatar && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                disabled={removing || uploading}
                className="px-4 py-2 rounded-xl font-medium text-sm"
                style={{
                  backgroundColor: colors.errorBg,
                  color: colors.error,
                  opacity: removing ? 0.6 : 1,
                }}
              >
                {removing ? 'Removing\u2026' : 'Remove Photo'}
              </button>
            )}
            <p className="text-xs" style={{ color: colors.textMuted }}>
              JPG, PNG or WEBP. 5MB max.
            </p>
          </div>
        </div>
      </div>

      {/* Name card */}
      <form
        onSubmit={handleSaveName}
        className="rounded-2xl border p-6 space-y-4"
        style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
      >
        <h3 className="text-base font-semibold" style={{ color: colors.text }}>
          Display Name
        </h3>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
            First Name
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            style={{
              backgroundColor: colors.bgTertiary,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
            Last Name
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            style={{
              backgroundColor: colors.bgTertiary,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
            Email
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full px-3 py-2 rounded-lg cursor-not-allowed opacity-60"
            style={{
              backgroundColor: colors.bgTertiary,
              color: colors.textMuted,
              border: `1px solid ${colors.border}`,
            }}
          />
          <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
            Contact your super admin to change your email.
          </p>
        </div>

        <button
          type="submit"
          disabled={savingName}
          className="px-5 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl font-medium disabled:opacity-60"
        >
          {savingName ? 'Saving\u2026' : 'Save Changes'}
        </button>
      </form>

      {/* Onboarding tour replay */}
      <div
        className="rounded-2xl border p-6"
        style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
      >
        <h3 className="text-base font-semibold mb-2" style={{ color: colors.text }}>
          Take the tour
        </h3>
        <p className="text-sm mb-4" style={{ color: colors.textMuted }}>
          Replay the welcome tour to revisit the panel basics.
        </p>
        <button
          type="button"
          onClick={replayAdminOnboarding}
          className="px-4 py-2 rounded-xl font-medium border"
          style={{
            backgroundColor: 'transparent',
            color: colors.primary,
            borderColor: colors.primary,
          }}
        >
          Replay tour
        </button>
      </div>
    </div>
  );
};

export default Profile;
