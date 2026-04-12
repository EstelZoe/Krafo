import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAssessmentAuth } from '../hooks/useAssessmentAuth';
import { useAssessmentContext } from '../context/AssessmentContext';
import ToolkitNavbar from '../components/ToolkitNavbar';
import krafoLogo from '../images/krafo-logo1.png';

export default function AssessmentOtpVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyLoginOtp, loading, error } = useAssessmentAuth();
  const { pendingOtpEmail, submissionId } = useAssessmentContext();
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);

  const maskedEmail = location.state?.maskedEmail || pendingOtpEmail;
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (!pendingOtpEmail && !verified) {
      navigate('/assessment-toolkit/login', { replace: true });
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [pendingOtpEmail, navigate, verified]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!pendingOtpEmail) return;
    try {
      setVerified(true);
      await verifyLoginOtp(pendingOtpEmail, otp);
      navigate(submissionId ? '/assessment-toolkit/form' : '/assessment-toolkit/dashboard');
    } catch {
      setVerified(false);
    }
  }

  const inputClass = "w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-[0.5em] placeholder:text-gray-500 placeholder:text-base placeholder:tracking-normal hover:border-gray-600 focus:border-orange-500 focus:glow-orange-sm focus:outline-none transition-all duration-200 ease-out";

  if (!pendingOtpEmail && !verified) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src={krafoLogo} alt="KRAFO Systems" className="h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Verify Your Identity</h1>
            <p className="text-gray-400">
              We sent a 6-digit code to <span className="text-white font-medium">{maskedEmail}</span>
            </p>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-6">
                <label className="block text-sm text-gray-300 mb-1">Enter OTP Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className={inputClass}
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center gap-2 ${
                  loading || otp.length !== 6
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
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>

            <div className="text-center mt-6 space-y-2">
              {timeLeft > 0 ? (
                <p className="text-gray-500 text-sm">
                  Code expires in <span className="text-white font-medium">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
                </p>
              ) : (
                <p className="text-red-400 text-sm">Code expired. Go back to login to request a new one.</p>
              )}
              <p className="text-gray-400 text-sm">
                Didn't receive the code? Check your spam folder or{' '}
                <Link to="/assessment-toolkit/login" className="text-orange-500 hover:underline">go back to login</Link>{' '}
                to request a new one.
              </p>
              <Link to="/assessment-toolkit/login" className="text-orange-500 text-sm hover:underline block">
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
