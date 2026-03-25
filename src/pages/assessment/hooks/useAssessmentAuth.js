import { useState } from 'react';
import axios from 'axios';
import { useAssessmentContext } from '../context/AssessmentContext';

const BASE = (import.meta.env.VITE_BASE_URL || 'https://krafo-api.onrender.com/api') + '/v1/assessment/auth';

export function useAssessmentAuth() {
  const { storeAuth, clearAuth, token } = useAssessmentContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function register(data) {
    setLoading(true); setError(null);
    try {
      const res = await axios.post(`${BASE}/register`, data);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.messages?.[0] || 'Registration failed';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  }

  async function login(data) {
    setLoading(true); setError(null);
    try {
      const res = await axios.post(`${BASE}/login`, data);
      storeAuth(res.data.user, res.data.token);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Invalid credentials';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  }

  function logout() {
    clearAuth();
  }

  async function forgotPassword(email) {
    setLoading(true); setError(null);
    try {
      const res = await axios.post(`${BASE}/forgot-password`, { email });
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Request failed';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  }

  async function verifyOtp(email, otp) {
    setLoading(true); setError(null);
    try {
      const res = await axios.post(`${BASE}/verify-otp`, { email, otp });
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'OTP verification failed';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  }

  async function resetPassword(data) {
    setLoading(true); setError(null);
    try {
      const res = await axios.patch(`${BASE}/reset-password`, data);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.error || 'Password reset failed';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  }

  return { register, login, logout, forgotPassword, verifyOtp, resetPassword, loading, error };
}
