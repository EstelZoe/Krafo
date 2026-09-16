import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../assets/components/Navbar';
import Footer from '../assets/components/Footer';
import Logo from "../assets/images/signuplogo.png";
import { apiClient } from '../api/client';
import { toast } from 'react-toastify';

// Field chrome, lifted out because it is now repeated across six inputs in
// four steps rather than the original two.
const INPUT_CLASS =
    'block w-full appearance-none rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-white placeholder-gray-500 focus:border-[#F2600B] focus:outline-none focus:ring-2 focus:ring-[#ff8534] sm:text-sm';
const OTP_INPUT_CLASS =
    'block w-full appearance-none rounded-md border border-white/15 bg-white/5 px-3 py-3 text-center text-lg font-semibold tracking-[0.5em] text-white placeholder-gray-500 focus:border-[#F2600B] focus:outline-none focus:ring-2 focus:ring-[#ff8534]';
const PRIMARY_BUTTON_CLASS =
    'flex w-full justify-center rounded-md bg-[#F2600B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d94f00] focus:outline-none focus:ring-2 focus:ring-[#ff8534] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-60';
const QUIET_BUTTON_CLASS =
    'font-medium text-gray-400 transition-colors hover:text-white';
const ACCENT_BUTTON_CLASS =
    'font-medium text-[#ff8534] transition-colors hover:text-[#F2600B] disabled:opacity-60';

// Mirrors resetPasswordSchema on the API (min 8, at least one letter and one
// digit). Checked here too so a weak password fails immediately instead of
// after a round trip — the reset token only lives 15 minutes, and a rejected
// attempt is a wasted slice of it.
const passwordProblem = (password, confirmation) => {
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
        return 'Password must include both letters and numbers';
    }
    if (password !== confirmation) return 'Passwords do not match';
    return null;
};

const HEADINGS = {
    credentials: {
        title: 'Sign in to your account',
        blurb: 'Authorized personnel only. Need access? Contact your administrator.',
    },
    otp: { title: 'Verify it’s you' },
    forgot: {
        title: 'Reset your password',
        blurb: 'Enter the email on your account and we’ll send you a 6-digit code.',
    },
    'reset-otp': { title: 'Enter your reset code' },
    'reset-password': {
        title: 'Choose a new password',
        blurb: 'At least 8 characters, including both letters and numbers.',
    },
};

export default function LogIn() {
    const navigate = useNavigate();
    // 'credentials' | 'otp' | 'forgot' | 'reset-otp' | 'reset-password'
    const [step, setStep] = useState('credentials');
    const [loading, setLoading] = useState(false);
    const [otpSession, setOtpSession] = useState({ email: '', maskedEmail: '' });
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [otp, setOtp] = useState('');

    // Password-reset state, kept separate from the sign-in form so abandoning
    // one flow cannot leave stale values in the other.
    const [resetEmail, setResetEmail] = useState('');
    const [resetOtp, setResetOtp] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState({ password: '', confirmPassword: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const persistAndRedirect = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Login Successful');
        const role = data.user?.role;
        // Force first-login password change before any other admin route is reachable
        if ((role === 'admin' || role === 'superadmin') && data.mustChangePassword) {
            navigate('/admin/change-password', { replace: true });
            return;
        }
        if (role === 'admin' || role === 'superadmin') navigate('/admin');
        else navigate('/');
    };

    const handleCredentialsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiClient.post('/v1/auth/login', formData);
            if (res.data?.requiresOtp) {
                setOtpSession({
                    email: res.data.email || formData.email,
                    maskedEmail: res.data.maskedEmail || formData.email,
                });
                setStep('otp');
                toast.info('Verification code sent to your email');
            } else if (res.data?.token) {
                persistAndRedirect(res.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.error || error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await apiClient.post('/v1/auth/login', formData);
            if (res.data?.requiresOtp) {
                setOtpSession({
                    email: res.data.email || formData.email,
                    maskedEmail: res.data.maskedEmail || otpSession.maskedEmail,
                });
                setOtp('');
                toast.info('A new verification code has been sent');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Could not resend code');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiClient.post('/v1/auth/verify-login-otp', {
                email: otpSession.email,
                otp,
            });
            persistAndRedirect(res.data);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    const resetToCredentials = () => {
        setStep('credentials');
        setOtp('');
        setOtpSession({ email: '', maskedEmail: '' });
    };

    // ── Password reset ───────────────────────────────────────────────────
    // The API answers 200 with a deliberately vague message whether or not the
    // address exists, so that this form cannot be used to discover who holds an
    // account. The UI advances either way — saying "no such user" here would
    // hand back exactly what the API declines to reveal.
    const requestResetCode = (email) =>
        apiClient.post('/v1/auth/forgot-password', { email });

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await requestResetCode(resetEmail);
            setResetOtp('');
            setStep('reset-otp');
            toast.info('If that account exists, a reset code is on its way');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Could not send the reset code');
        } finally {
            setLoading(false);
        }
    };

    const handleResendResetCode = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await requestResetCode(resetEmail);
            setResetOtp('');
            toast.info('A new reset code has been sent');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Could not resend the code');
        } finally {
            setLoading(false);
        }
    };

    const handleResetOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiClient.post('/v1/auth/verify-otp', {
                email: resetEmail,
                otp: resetOtp,
            });
            setResetToken(res.data.resetToken);
            setNewPassword({ password: '', confirmPassword: '' });
            setStep('reset-password');
        } catch (error) {
            toast.error(error.response?.data?.error || 'That code is invalid or has expired');
        } finally {
            setLoading(false);
        }
    };

    const backToSignIn = () => {
        setStep('credentials');
        setResetEmail('');
        setResetOtp('');
        setResetToken('');
        setNewPassword({ password: '', confirmPassword: '' });
    };

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        const problem = passwordProblem(newPassword.password, newPassword.confirmPassword);
        if (problem) {
            toast.error(problem);
            return;
        }
        setLoading(true);
        try {
            await apiClient.patch('/v1/auth/reset-password', {
                resetToken,
                password: newPassword.password,
                confirmPassword: newPassword.confirmPassword,
            });
            toast.success('Password updated. Sign in with your new password.');
            const email = resetEmail;
            backToSignIn();
            // Carry the address over so the only thing left to type is the
            // password they just chose.
            setFormData({ email, password: '' });
        } catch (error) {
            toast.error(error.response?.data?.error || 'Could not reset the password');
        } finally {
            setLoading(false);
        }
    };

    const heading = HEADINGS[step];

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <main className="relative isolate flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_20%,#F2600B14,transparent_60%)]" />
                <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
                    <div>
                        <img src={Logo} alt="logo" className="mx-auto h-12 w-auto" />
                        <h2 className="hero-display mt-6 text-center text-3xl font-extrabold text-white">
                            {heading.title}
                        </h2>
                        {heading.blurb && (
                            <p className="mt-2 text-center text-sm text-gray-400">{heading.blurb}</p>
                        )}
                        {step === 'otp' && (
                            <p className="mt-2 text-center text-sm text-gray-400">
                                Enter the 6-digit code sent to <span className="font-medium text-white">{otpSession.maskedEmail}</span>
                            </p>
                        )}
                        {step === 'reset-otp' && (
                            <p className="mt-2 text-center text-sm text-gray-400">
                                If an account exists for <span className="font-medium text-white">{resetEmail}</span>, a 6-digit code is in its inbox. It expires in 10 minutes.
                            </p>
                        )}
                    </div>

                    {step === 'credentials' && (
                        <form className="mt-8 space-y-6" onSubmit={handleCredentialsSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className={INPUT_CLASS}
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className={INPUT_CLASS}
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // Carry anything already typed across, so the
                                            // address does not have to be entered twice.
                                            setResetEmail(formData.email);
                                            setStep('forgot');
                                        }}
                                        className={'text-sm ' + ACCENT_BUTTON_CLASS}
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button type="submit" disabled={loading} className={PRIMARY_BUTTON_CLASS}>
                                    {loading ? 'Signing in…' : 'Sign in'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 'otp' && (
                        <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
                            <div>
                                <label htmlFor="otp" className="sr-only">One-time code</label>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]{6}"
                                    maxLength={6}
                                    autoComplete="one-time-code"
                                    required
                                    className={OTP_INPUT_CLASS}
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={loading || otp.length !== 6}
                                    className={PRIMARY_BUTTON_CLASS}
                                >
                                    {loading ? 'Verifying…' : 'Verify and continue'}
                                </button>
                                <div className="flex items-center justify-between text-sm">
                                    <button type="button" onClick={resetToCredentials} className={QUIET_BUTTON_CLASS}>
                                        Use a different account
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={loading}
                                        className={ACCENT_BUTTON_CLASS}
                                    >
                                        Resend code
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    {step === 'forgot' && (
                        <form className="mt-8 space-y-6" onSubmit={handleForgotSubmit}>
                            <div>
                                <label htmlFor="reset-email" className="sr-only">Email address</label>
                                <input
                                    id="reset-email"
                                    name="resetEmail"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={INPUT_CLASS}
                                    placeholder="Email address"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3">
                                <button type="submit" disabled={loading} className={PRIMARY_BUTTON_CLASS}>
                                    {loading ? 'Sending code…' : 'Send reset code'}
                                </button>
                                <div className="text-center text-sm">
                                    <button type="button" onClick={backToSignIn} className={QUIET_BUTTON_CLASS}>
                                        Back to sign in
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    {step === 'reset-otp' && (
                        <form className="mt-8 space-y-6" onSubmit={handleResetOtpSubmit}>
                            <div>
                                <label htmlFor="reset-otp" className="sr-only">Reset code</label>
                                <input
                                    id="reset-otp"
                                    name="resetOtp"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]{6}"
                                    maxLength={6}
                                    autoComplete="one-time-code"
                                    required
                                    className={OTP_INPUT_CLASS}
                                    placeholder="000000"
                                    value={resetOtp}
                                    onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={loading || resetOtp.length !== 6}
                                    className={PRIMARY_BUTTON_CLASS}
                                >
                                    {loading ? 'Verifying…' : 'Verify code'}
                                </button>
                                <div className="flex items-center justify-between text-sm">
                                    <button type="button" onClick={backToSignIn} className={QUIET_BUTTON_CLASS}>
                                        Back to sign in
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResendResetCode}
                                        disabled={loading}
                                        className={ACCENT_BUTTON_CLASS}
                                    >
                                        Resend code
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    {step === 'reset-password' && (
                        <form className="mt-8 space-y-6" onSubmit={handleResetPasswordSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="new-password" className="sr-only">New password</label>
                                    <input
                                        id="new-password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className={INPUT_CLASS}
                                        placeholder="New password"
                                        value={newPassword.password}
                                        onChange={(e) =>
                                            setNewPassword((prev) => ({ ...prev, password: e.target.value }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="sr-only">Confirm new password</label>
                                    <input
                                        id="confirm-password"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className={INPUT_CLASS}
                                        placeholder="Confirm new password"
                                        value={newPassword.confirmPassword}
                                        onChange={(e) =>
                                            setNewPassword((prev) => ({ ...prev, confirmPassword: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button type="submit" disabled={loading} className={PRIMARY_BUTTON_CLASS}>
                                    {loading ? 'Updating…' : 'Update password'}
                                </button>
                                <div className="text-center text-sm">
                                    <button type="button" onClick={backToSignIn} className={QUIET_BUTTON_CLASS}>
                                        Back to sign in
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
