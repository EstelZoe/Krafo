import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from '../../api/client';
import Logo from '../../assets/images/signuplogo.png';

/**
 * Forced first-login password change.
 * Reachable only when the logged-in user has `mustChangePassword: true`.
 * The user has just authenticated (post-OTP for admins) but cannot use the
 * console until they replace their temporary password with their own.
 */
export default function ForceChangePassword() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validate = () => {
        const next = {};
        if (!form.currentPassword) next.currentPassword = 'Temporary password is required';
        if (!form.newPassword) next.newPassword = 'New password is required';
        else if (form.newPassword.length < 8) next.newPassword = 'Must be at least 8 characters';
        else if (!/[A-Za-z]/.test(form.newPassword) || !/\d/.test(form.newPassword))
            next.newPassword = 'Must include both letters and numbers';
        if (form.newPassword !== form.confirmNewPassword)
            next.confirmNewPassword = 'Passwords do not match';
        if (form.newPassword && form.newPassword === form.currentPassword)
            next.newPassword = 'New password must be different from the temporary one';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            const res = await apiClient.post('/v1/auth/first-login-change-password', {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
                confirmNewPassword: form.confirmNewPassword,
            });
            // Replace stale token + user (mustChangePassword is now false)
            if (res.data?.token) localStorage.setItem('token', res.data.token);
            if (res.data?.user) localStorage.setItem('user', JSON.stringify(res.data.user));
            toast.success('Password updated. Welcome to the console.');
            navigate('/admin', { replace: true });
        } catch (error) {
            const data = error?.response?.data;
            const messages = data?.messages;
            if (Array.isArray(messages) && messages.length > 0) {
                messages.forEach((m) => toast.error(m));
            } else {
                toast.error(data?.error || 'Could not update password');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
    };

    const inputClass = (field) =>
        `appearance-none block w-full px-3 py-2 border ${
            errors[field] ? 'border-red-500' : 'border-gray-300'
        } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-700 to-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
                <div className="text-center">
                    <img src={Logo} alt="logo" className="mx-auto h-12 w-auto" />
                    <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
                        Set Your Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        For security, you must replace the temporary password before continuing.
                        After this, only you will know your password.
                    </p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Temporary Password
                        </label>
                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            autoComplete="current-password"
                            className={inputClass('currentPassword')}
                            value={form.currentPassword}
                            onChange={handleChange}
                            placeholder="From your invitation email"
                        />
                        {errors.currentPassword && (
                            <p className="mt-1 text-xs text-red-600">{errors.currentPassword}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            autoComplete="new-password"
                            className={inputClass('newPassword')}
                            value={form.newPassword}
                            onChange={handleChange}
                            placeholder="At least 8 characters with letters and numbers"
                        />
                        {errors.newPassword && (
                            <p className="mt-1 text-xs text-red-600">{errors.newPassword}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            type="password"
                            autoComplete="new-password"
                            className={inputClass('confirmNewPassword')}
                            value={form.confirmNewPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmNewPassword && (
                            <p className="mt-1 text-xs text-red-600">{errors.confirmNewPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-60"
                    >
                        {submitting ? 'Updating\u2026' : 'Set Password and Continue'}
                    </button>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
                    >
                        Sign out instead
                    </button>
                </form>
            </div>
        </div>
    );
}
