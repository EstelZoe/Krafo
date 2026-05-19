import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ClipboardList, BarChart3, CalendarCheck } from 'lucide-react';
import { useAssessmentContext } from '../context/AssessmentContext';
import ToolkitNavbar from '../components/ToolkitNavbar';

const STEPS = [
  { icon: ClipboardList, label: 'Answer 37 questions', desc: 'Covering 7 NIST cybersecurity domains' },
  { icon: BarChart3, label: 'Get your risk score', desc: 'Instant analysis of your security posture' },
  { icon: CalendarCheck, label: 'Book a consultation', desc: 'Talk to an expert about your results' },
];

export default function AssessmentStart() {
  const { token, submissionId } = useAssessmentContext();
  const navigate = useNavigate();

  // If already logged in, redirect to in-progress form or dashboard
  useEffect(() => {
    if (token) {
      navigate(submissionId ? '/assessment-toolkit/form' : '/assessment-toolkit/dashboard', { replace: true });
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />

      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <ShieldCheck size={14} /> NIST-Based Assessment
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Know Your <span className="text-orange-500">Cyber Risk</span> in Minutes
        </h1>
        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
          Our free cybersecurity maturity assessment evaluates your organisation across the five NIST
          Cybersecurity Framework functions and delivers a personalised risk report.
        </p>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {STEPS.map(({ icon: Icon, label, desc }, i) => (
            <div key={i} className="group bg-[#111] border border-gray-800 rounded-2xl p-6 text-left hover:border-orange-500/20 hover:glow-orange-sm transition-all duration-300 ease-out">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 w-fit mb-4 group-hover:glow-orange-sm transition-all duration-300">
                <Icon size={22} className="text-orange-500" />
              </div>
              <p className="text-white font-semibold mb-1">{label}</p>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/assessment-toolkit/signup"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 hover:scale-105 hover:glow-orange-md active:scale-98 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black text-center"
          >
            Create Free Account
          </Link>
          <Link
            to="/assessment-toolkit/login"
            className="w-full sm:w-auto border border-gray-700 hover:border-orange-500/50 hover:glow-orange-sm hover:scale-102 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black text-center"
          >
            Log In
          </Link>
        </div>

        <p className="text-gray-600 text-xs mt-8">
          By creating an account you agree to our{' '}
          <Link to="/assessment-toolkit/terms" className="text-gray-400 hover:text-orange-400 underline">Terms of Use</Link>
          {' '}and{' '}
          <Link to="/assessment-toolkit/privacy" className="text-gray-400 hover:text-orange-400 underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
