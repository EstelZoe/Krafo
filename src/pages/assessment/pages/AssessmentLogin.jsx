import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAssessmentAuth } from '../hooks/useAssessmentAuth';
import { useAssessmentContext } from '../context/AssessmentContext';
import ToolkitNavbar from '../components/ToolkitNavbar';
import krafoLogo from '../images/krafo-logo1.png';

export default function AssessmentLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, loading, error } = useAssessmentAuth();
  const { submissionId } = useAssessmentContext();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const justRegistered = searchParams.get('registered') === '1';

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(form);
      // Redirect to in-progress assessment or dashboard
      navigate(submissionId ? '/assessment-toolkit/form' : '/assessment-toolkit/dashboard');
    } catch { /* error shown via hook */ }
  }

  const inputClass = "w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition";

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src={krafoLogo} alt="KRAFO Systems" className="h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to access your assessment</p>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8">
            {justRegistered && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 mb-6 text-sm">
                Account created successfully. Please sign in.
              </div>
            )}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" className={inputClass} required />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Your password" className={inputClass + ' pr-12'} required />
                  <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="text-right mb-6">
                <Link to="/assessment-toolkit/forgot-password" className="text-orange-500 text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/assessment-toolkit/signup" className="text-orange-500 hover:underline">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
