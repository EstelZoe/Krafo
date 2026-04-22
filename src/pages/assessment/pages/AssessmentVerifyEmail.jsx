import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import ToolkitNavbar from '../components/ToolkitNavbar';

const BASE = (import.meta.env.VITE_BASE_URL || 'https://krafo-api.onrender.com/api') + '/v1/assessment/auth';

export default function AssessmentVerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const hasCalledRef = useRef(false);

  useEffect(() => {
    // Prevent double-call in React Strict Mode
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    async function verify() {
      try {
        const res = await axios.get(`${BASE}/verify-email/${token}`);
        setStatus('success');
        setMessage(res.data?.message || 'Email verified successfully!');
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.error || 'Verification link is invalid or expired.');
      }
    }
    if (token) verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 text-center">
            {status === 'loading' && (
              <>
                <svg className="animate-spin h-12 w-12 mx-auto mb-6 text-orange-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-gray-400">Verifying your email...</p>
              </>
            )}
            {status === 'success' && (
              <>
                <div className="flex justify-center mb-6">
                  <CheckCircle size={48} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
                <p className="text-gray-400 mb-6">{message} You can now sign in.</p>
                <Link
                  to="/assessment-toolkit/login"
                  className="inline-block bg-orange-500 hover:bg-orange-600 hover:scale-105 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Go to Login
                </Link>
              </>
            )}
            {status === 'error' && (
              <>
                <div className="flex justify-center mb-6">
                  <XCircle size={48} className="text-red-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
                <p className="text-gray-400 mb-6">{message}</p>
                <Link
                  to="/assessment-toolkit/login"
                  className="inline-block bg-orange-500 hover:bg-orange-600 hover:scale-105 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Go to Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
