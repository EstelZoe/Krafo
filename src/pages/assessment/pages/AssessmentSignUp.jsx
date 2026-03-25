import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAssessmentAuth } from '../hooks/useAssessmentAuth';
import ToolkitNavbar from '../components/ToolkitNavbar';
import krafoLogo from '../images/krafo-logo1.png';

export default function AssessmentSignUp() {
  const navigate = useNavigate();
  const { register, loading, error } = useAssessmentAuth();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    companyName: '', agreedToTerms: false, agreedToPrivacyPolicy: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.companyName.trim()) errs.companyName = 'Company name is required';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!form.agreedToTerms) errs.agreedToTerms = 'You must accept the terms of use';
    if (!form.agreedToPrivacyPolicy) errs.agreedToPrivacyPolicy = 'You must accept the privacy policy';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    try {
      await register(form);
      navigate('/assessment-toolkit/login?registered=1');
    } catch { /* error shown via hook */ }
  }

  const inputClass = "w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src={krafoLogo} alt="KRAFO Systems" className="h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
            <p className="text-gray-400">Start your free cybersecurity assessment</p>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">First Name *</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jane" className={inputClass} />
                  {fieldErrors.firstName && <p className={errorClass}>{fieldErrors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Last Name *</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" className={inputClass} />
                  {fieldErrors.lastName && <p className={errorClass}>{fieldErrors.lastName}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">Company Name *</label>
                <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Acme Corporation" className={inputClass} />
                {fieldErrors.companyName && <p className={errorClass}>{fieldErrors.companyName}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">Email Address *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" className={inputClass} />
                {fieldErrors.email && <p className={errorClass}>{fieldErrors.email}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">Password *</label>
                <div className="relative">
                  <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Min. 6 characters" className={inputClass + ' pr-12'} />
                  <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldErrors.password && <p className={errorClass}>{fieldErrors.password}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-300 mb-1">Confirm Password *</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" className={inputClass} />
                {fieldErrors.confirmPassword && <p className={errorClass}>{fieldErrors.confirmPassword}</p>}
              </div>

              <div className="space-y-3 mb-6 border-t border-gray-800 pt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="agreedToTerms" checked={form.agreedToTerms} onChange={handleChange} className="mt-1 accent-orange-500" />
                  <span className="text-sm text-gray-400">
                    I agree to the{' '}
                    <Link to="/assessment-toolkit/terms" target="_blank" className="text-orange-500 hover:underline">Terms of Use</Link>
                    {' '}for the Assessment Toolkit *
                  </span>
                </label>
                {fieldErrors.agreedToTerms && <p className={errorClass}>{fieldErrors.agreedToTerms}</p>}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="agreedToPrivacyPolicy" checked={form.agreedToPrivacyPolicy} onChange={handleChange} className="mt-1 accent-orange-500" />
                  <span className="text-sm text-gray-400">
                    I agree to the{' '}
                    <Link to="/assessment-toolkit/privacy" target="_blank" className="text-orange-500 hover:underline">Privacy Policy</Link>
                    {' '}and consent to data processing *
                  </span>
                </label>
                {fieldErrors.agreedToPrivacyPolicy && <p className={errorClass}>{fieldErrors.agreedToPrivacyPolicy}</p>}
              </div>

              <button
                type="submit"
                disabled={loading || !form.agreedToTerms || !form.agreedToPrivacyPolicy}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/assessment-toolkit/login" className="text-orange-500 hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
