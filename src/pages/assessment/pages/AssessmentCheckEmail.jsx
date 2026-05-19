import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail } from 'lucide-react';
import axios from 'axios';
import ToolkitNavbar from '../components/ToolkitNavbar';
import krafoLogo from '../images/krafo-logo1.png';

const BASE = (import.meta.env.VITE_BASE_URL || 'https://krafo-api.onrender.com/api') + '/v1/assessment/auth';

export default function AssessmentCheckEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'your email';
  const [resendMsg, setResendMsg] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);

  async function handleResend() {
    setResendLoading(true);
    setResendMsg(null);
    try {
      await axios.post(`${BASE}/resend-verification`, { email });
      setResendMsg('Verification email sent! Check your inbox.');
    } catch (err) {
      setResendMsg(err.response?.data?.error || 'Could not resend. Try again later.');
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src={krafoLogo} alt="KRAFO Systems" className="h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Check Your Email</h1>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                <Mail size={32} className="text-orange-500" />
              </div>
            </div>

            <p className="text-gray-300 mb-2">We've sent a verification email to</p>
            <p className="text-white font-semibold mb-6">{email}</p>
            <p className="text-gray-400 text-sm mb-6">
              Please check your inbox and click the link to verify your account.
              If you don't see it, check your spam or junk folder.
            </p>

            {resendMsg && (
              <div className={`rounded-lg px-4 py-3 mb-6 text-sm ${
                resendMsg.includes('sent') 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {resendMsg}
              </div>
            )}

            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="text-orange-500 hover:text-orange-400 text-sm font-semibold hover:underline disabled:opacity-50 mb-6 block mx-auto"
            >
              {resendLoading ? 'Sending...' : "Didn't receive it? Resend verification email"}
            </button>

            <div className="border-t border-gray-800 pt-6">
              <Link
                to="/assessment-toolkit/login"
                className="inline-block bg-orange-500 hover:bg-orange-600 hover:scale-105 hover:glow-orange-md active:scale-98 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                Already verified? Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
