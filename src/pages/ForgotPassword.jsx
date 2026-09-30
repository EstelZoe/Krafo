// ForgotPassword — the three-step reset the API already supported but nothing
// on the front end reached:
//
//   1. POST   /v1/auth/forgot-password  { email }              → emails a 6-digit OTP
//   2. POST   /v1/auth/verify-otp       { email, otp }         → { resetToken }  (15 min)
//   3. PATCH  /v1/auth/reset-password   { resetToken, password, confirmPassword }
//
// Styled to match LogIn.jsx exactly, since it's the same audience arriving in
// the same frame of mind.

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../assets/components/Navbar';
import Footer from '../assets/components/Footer';
import Logo from '../assets/images/signuplogo.png';
import { apiClient } from '../api/client';
import { toast } from 'react-toastify';

// Mirrors the server's rule for a new password. Kept here as well so the user
// finds out before submitting rather than after a round trip.
const RULES = [
    { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
    { label: 'Contains a letter', test: (pw) => /[A-Za-z]/.test(pw) },
    { label: 'Contains a number', test: (pw) => /\d/.test(pw) },
];

const errorFrom = (error, fallback) =>
    error.response?.data?.messages?.join(' ') ||
    error.response?.data?.error ||
    error.response?.data?.message ||
    fallback;

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState('email'); // 'email' | 'otp' | 'password'
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const unmet = RULES.filter((r) => !r.test(password));
    const passwordsMatch = password.length > 0 && password === confirmPassword;
    const canSubmitPassword = unmet.length === 0 && passwordsMatch;

    // ── Step 1 — request the code ─────────────────────────────────────
    const requestCode = async (e) => {
        e?.preventDefault();
        setLoading(true);
        try {
            await apiClient.post('/v1/auth/forgot-password', { email });
            // The API deliberately answers the same way whether or not the
            // account exists, so the copy has to match that — claiming "sent!"
            // for an address with no account would leak which emails are real.
            toast.info('If that email has an account, a code is on its way.');
            setStep('otp');
        } catch (error) {
            toast.error(errorFrom(error, 'Could not send the code. Try again shortly.'));
        } finally {
            setLoading(false);
        }
    };

    // ── Step 2 — exchange the code for a short-lived reset token ──────
    const verifyCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiClient.post('/v1/auth/verify-otp', { email, otp });
            setResetToken(res.data.resetToken);
            setStep('password');
        } catch (error) {
            toast.error(errorFrom(error, 'That code is invalid or has expired.'));
        } finally {
            setLoading(false);
        }
    };

    // ── Step 3 — set the new password ─────────────────────────────────
    const submitPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiClient.patch('/v1/auth/reset-password', {
                resetToken,
                password,
                confirmPassword,
            });
            toast.success('Password updated. Sign in with your new password.');
            // The API hands back an auth token here, but signing the user in
            // with it would skip the login OTP that admins otherwise go
            // through — and the response carries no user record for the admin
            // layout to read. Sending them to /login is both safer and simpler.
            navigate('/login', { replace: true });
        } catch (error) {
            const status = error.response?.status;
            if (status === 401) {
                // The 15-minute reset token lapsed mid-flow.
                toast.error('That reset link expired. Please request a new code.');
                setStep('email');
                setOtp('');
                setResetToken('');
            } else {
                toast.error(errorFrom(error, 'Could not update the password.'));
            }
        } finally {
            setLoading(false);
        }
    };

    const stepCopy = {
        email: {
            title: 'Reset your password',
            blurb: 'Enter the email on your account and we’ll send a 6-digit code.',
        },
        otp: {
            title: 'Check your email',
            blurb: `Enter the 6-digit code sent to ${email}. It expires in 10 minutes.`,
        },
        password: {
            title: 'Choose a new password',
            blurb: 'Pick something you haven’t used here before.',
        },
    }[step];

    const inputClass =
        'appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm';
    const buttonClass =
        'w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-60';

    return (
        <div className="bg-white text-black">
            <Navbar />
            <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
                    <div>
                        <img src={Logo} alt="logo" className="mx-auto h-12 w-auto" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            {stepCopy.title}
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">{stepCopy.blurb}</p>

                        {/* Where you are in the three steps */}
                        <div className="mt-5 flex items-center justify-center gap-2">
                            {['email', 'otp', 'password'].map((s, i) => {
                                const order = ['email', 'otp', 'password'];
                                const done = order.indexOf(step) > i;
                                const current = step === s;
                                return (
                                    <span
                                        key={s}
                                        className={`h-1.5 rounded-full transition-all ${
                                            current
                                                ? 'w-8 bg-orange-600'
                                                : done
                                                ? 'w-4 bg-orange-300'
                                                : 'w-4 bg-gray-200'
                                        }`}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Step 1 ───────────────────────────────────────── */}
                    {step === 'email' && (
                        <form className="mt-8 space-y-6" onSubmit={requestCode}>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={inputClass}
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <button type="submit" disabled={loading} className={buttonClass}>
                                {loading ? 'Sending…' : 'Send reset code'}
                            </button>

                            <p className="text-center text-sm">
                                <Link
                                    to="/login"
                                    className="font-medium text-gray-600 hover:text-gray-800"
                                >
                                    Back to sign in
                                </Link>
                            </p>
                        </form>
                    )}

                    {/* ── Step 2 ───────────────────────────────────────── */}
                    {step === 'otp' && (
                        <form className="mt-8 space-y-6" onSubmit={verifyCode}>
                            <div>
                                <label htmlFor="otp" className="sr-only">
                                    Reset code
                                </label>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]{6}"
                                    maxLength={6}
                                    autoComplete="one-time-code"
                                    required
                                    className="appearance-none block w-full px-3 py-3 text-center tracking-[0.5em] text-lg font-semibold border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className={buttonClass}
                            >
                                {loading ? 'Verifying…' : 'Verify code'}
                            </button>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep('email');
                                        setOtp('');
                                    }}
                                    className="font-medium text-gray-600 hover:text-gray-800"
                                >
                                    Use a different email
                                </button>
                                <button
                                    type="button"
                                    onClick={requestCode}
                                    disabled={loading}
                                    className="font-medium text-orange-600 hover:text-orange-500 disabled:opacity-60"
                                >
                                    Resend code
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ── Step 3 ───────────────────────────────────────── */}
                    {step === 'password' && (
                        <form className="mt-8 space-y-6" onSubmit={submitPassword}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        New password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className={inputClass}
                                        placeholder="New password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="sr-only">
                                        Confirm new password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className={inputClass}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Requirements, ticked off as they're met */}
                            <ul className="space-y-1.5">
                                {RULES.map((r) => {
                                    const ok = r.test(password);
                                    return (
                                        <li
                                            key={r.label}
                                            className={`flex items-center gap-2 text-xs ${
                                                ok ? 'text-green-600' : 'text-gray-500'
                                            }`}
                                        >
                                            <span
                                                className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                                                    ok
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {ok ? '✓' : '·'}
                                            </span>
                                            {r.label}
                                        </li>
                                    );
                                })}
                                {confirmPassword.length > 0 && !passwordsMatch && (
                                    <li className="flex items-center gap-2 text-xs text-red-600">
                                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-[10px] text-red-600">
                                            !
                                        </span>
                                        Passwords don&apos;t match
                                    </li>
                                )}
                            </ul>

                            <button
                                type="submit"
                                disabled={loading || !canSubmitPassword}
                                className={buttonClass}
                            >
                                {loading ? 'Updating…' : 'Update password'}
                            </button>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
