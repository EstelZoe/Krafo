import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiClient } from '../../../api/client';
import { useTheme } from '../../../context/ThemeContext';

const passwordChecks = (pwd) => ({
  length: pwd.length >= 8,
  letter: /[A-Za-z]/.test(pwd),
  number: /\d/.test(pwd),
});

const ChangePassword = () => {
  const { colors } = useTheme();
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const checks = passwordChecks(form.newPassword);
  const allChecksPass = checks.length && checks.letter && checks.number;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (!allChecksPass) {
      toast.error('Password must be at least 8 characters and include letters and numbers');
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.patch('/v1/superadmin/me/password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmNewPassword: form.confirmNewPassword,
      });
      toast.success('Password updated');
      setForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      const msgs = err.response?.data?.messages;
      toast.error(msgs?.[0] || err.response?.data?.error || 'Failed to update password');
    } finally {
      setSubmitting(false);
    }
  };

  const fieldStyle = {
    backgroundColor: colors.bgTertiary,
    color: colors.text,
    border: `1px solid ${colors.border}`,
  };

  const Bullet = ({ ok, label }) => (
    <li className="flex items-center gap-2 text-xs" style={{ color: ok ? colors.success : colors.textMuted }}>
      <span>{ok ? '\u2713' : '\u00b7'}</span>
      {label}
    </li>
  );

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Change Password</h2>
        <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
          Use a strong, unique password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-6 border space-y-4"
        style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
      >
        {[
          { name: 'currentPassword', label: 'Current Password', autoComplete: 'current-password' },
          { name: 'newPassword', label: 'New Password', autoComplete: 'new-password' },
          { name: 'confirmNewPassword', label: 'Confirm New Password', autoComplete: 'new-password' },
        ].map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
              {f.label}
            </label>
            <input
              type="password"
              value={form[f.name]}
              onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
              required
              autoComplete={f.autoComplete}
              minLength={f.name === 'currentPassword' ? undefined : 8}
              className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              style={fieldStyle}
            />
          </div>
        ))}

        <ul className="space-y-1 pl-1">
          <Bullet ok={checks.length} label="At least 8 characters" />
          <Bullet ok={checks.letter} label="Contains a letter" />
          <Bullet ok={checks.number} label="Contains a number" />
        </ul>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white rounded-xl font-medium disabled:opacity-60"
        >
          {submitting ? 'Updating\u2026' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
