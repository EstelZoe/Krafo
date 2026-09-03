import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../assets/components/Navbar';
import Footer from '../assets/components/Footer';
import Logo from "../assets/images/signuplogo.png";
import { apiClient } from '../api/client';
import { toast } from 'react-toastify';

export default function LogIn() {
    const navigate = useNavigate();
    const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
    const [loading, setLoading] = useState(false);
    const [otpSession, setOtpSession] = useState({ email: '', maskedEmail: '' });
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [otp, setOtp] = useState('');

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

    return (
        <div className="min-h-screen bg-black text-white">
            <style>{`.hero-display{font-family:'Proxon',sans-serif;}`}</style>
            <Navbar />
            <main className="relative isolate flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_20%,#F2600B14,transparent_60%)]" />
                <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
                    <div>
                        <img src={Logo} alt="logo" className="mx-auto h-12 w-auto" />
                        <h2 className="hero-display mt-6 text-center text-3xl font-extrabold text-white">
                            {step === 'credentials' ? 'Sign in to your account' : 'Verify it\u2019s you'}
                        </h2>
                        {step === 'credentials' ? (
                            <p className="mt-2 text-center text-sm text-gray-400">
                                Authorized personnel only. Need access? Contact your administrator.
                            </p>
                        ) : (
                            <p className="mt-2 text-center text-sm text-gray-400">
                                Enter the 6-digit code sent to <span className="font-medium text-white">{otpSession.maskedEmail}</span>
                            </p>
                        )}
                    </div>

                    {step === 'credentials' ? (
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
                                        className="block w-full appearance-none rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-white placeholder-gray-500 focus:border-[#F2600B] focus:outline-none focus:ring-2 focus:ring-[#ff8534] sm:text-sm"
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
                                        className="block w-full appearance-none rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-white placeholder-gray-500 focus:border-[#F2600B] focus:outline-none focus:ring-2 focus:ring-[#ff8534] sm:text-sm"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center rounded-md bg-[#F2600B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d94f00] focus:outline-none focus:ring-2 focus:ring-[#ff8534] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-60"
                                >
                                    {loading ? 'Signing in\u2026' : 'Sign in'}
                                </button>
                            </div>
                        </form>
                    ) : (
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
                                    className="block w-full appearance-none rounded-md border border-white/15 bg-white/5 px-3 py-3 text-center text-lg font-semibold tracking-[0.5em] text-white placeholder-gray-500 focus:border-[#F2600B] focus:outline-none focus:ring-2 focus:ring-[#ff8534]"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={loading || otp.length !== 6}
                                    className="flex w-full justify-center rounded-md bg-[#F2600B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d94f00] focus:outline-none focus:ring-2 focus:ring-[#ff8534] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-60"
                                >
                                    {loading ? 'Verifying\u2026' : 'Verify and continue'}
                                </button>
                                <div className="flex items-center justify-between text-sm">
                                    <button
                                        type="button"
                                        onClick={resetToCredentials}
                                        className="font-medium text-gray-400 transition-colors hover:text-white"
                                    >
                                        Use a different account
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={loading}
                                        className="font-medium text-[#ff8534] transition-colors hover:text-[#F2600B] disabled:opacity-60"
                                    >
                                        Resend code
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
