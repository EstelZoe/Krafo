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
        <div className="bg-white text-black">
            <Navbar />
            <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
                    <div>
                        <img src={Logo} alt="logo" className="mx-auto h-12 w-auto" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            {step === 'credentials' ? 'Sign in to your account' : 'Verify it\u2019s you'}
                        </h2>
                        {step === 'credentials' ? (
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Authorized personnel only. Need access? Contact your administrator.
                            </p>
                        ) : (
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Enter the 6-digit code sent to <span className="font-medium">{otpSession.maskedEmail}</span>
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
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-60"
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
                                    className="appearance-none block w-full px-3 py-3 text-center tracking-[0.5em] text-lg font-semibold border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={loading || otp.length !== 6}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-60"
                                >
                                    {loading ? 'Verifying\u2026' : 'Verify and continue'}
                                </button>
                                <div className="flex items-center justify-between text-sm">
                                    <button
                                        type="button"
                                        onClick={resetToCredentials}
                                        className="font-medium text-gray-600 hover:text-gray-800"
                                    >
                                        Use a different account
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={loading}
                                        className="font-medium text-orange-600 hover:text-orange-500 disabled:opacity-60"
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
