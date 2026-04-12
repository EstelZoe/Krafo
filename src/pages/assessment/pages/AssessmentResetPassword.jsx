import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAssessmentAuth } from '../hooks/useAssessmentAuth';
import ToolkitNavbar from '../components/ToolkitNavbar';
import krafoLogo from '../images/krafo-logo1.png';

export default function AssessmentResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const resetToken = location.state?.resetToken;
  const { resetPassword, loading, error } = useAssessmentAuth();

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldError, setFieldError] = useState('');

  useEffect(() => {
    if (!resetToken) {
      navigate('/assessment-toolkit/forgot-password', { replace: true });
    }
  }, [resetToken, navigate]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password.length < 6) {
      setFieldError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setFieldError('Passwords do not match');
      return;
    }
    try {
      await resetPassword({
        resetToken,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });
      setSuccess(true);
      setTimeout(() => navigate('/assessment-toolkit/login'), 2000);
    } catch { /* error shown via hook */ }
  }

  const inputClass = "w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-orange-500 focus:glow-orange-sm focus:outline-none transition-all duration-200 ease-out";

  if (!resetToken) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src={krafoLogo} alt="KRAFO Systems" className="h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-gray-400">Enter your new password below</p>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8">
            {success && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 mb-6 text-sm">
                Password reset successfully! Redirecting to login...
              </div>
            )}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            {!success && (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label className="block text-sm text-gray-300 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min. 6 characters"
                      className={inputClass + ' pr-12'}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-300 mb-1">Confirm New Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    className={inputClass}
                    required
                  />
                  {fieldError && <p className="text-red-400 text-xs mt-1">{fieldError}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center gap-2 ${
                    loading
                      ? 'bg-orange-500 opacity-75 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600 hover:scale-105 hover:glow-orange-md active:scale-98 text-white'
                  }`}
                >
                  {loading && (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}

            <p className="text-center text-gray-400 text-sm mt-6">
              <Link to="/assessment-toolkit/login" className="text-orange-500 hover:underline">← Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
