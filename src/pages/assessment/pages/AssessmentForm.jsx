import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES, getQuestionsByCategory } from '../utils/assessmentQuestions';
import { useAssessmentContext } from '../context/AssessmentContext';
import { useAssessment } from '../hooks/useAssessment';
import { useAssessmentAuth } from '../hooks/useAssessmentAuth';
import ToolkitNavbar from '../components/ToolkitNavbar';
import ProgressBar from '../components/ProgressBar';
import FormStep from '../components/FormStep';
import ConfirmationModal from '../components/ConfirmationModal';

export default function AssessmentForm() {
  const navigate = useNavigate();
  const { responses, currentStep, submissionId, user, setCurrentStep, setSubmissionId, updateResponses } = useAssessmentContext();
  const { saveProgress, submitAssessment, loading } = useAssessment();
  const { resendVerification } = useAssessmentAuth();

  const [stepErrors, setStepErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [resendMsg, setResendMsg] = useState(null);
  const formTopRef = useRef(null);

  const category = CATEGORIES[currentStep];
  const questions = getQuestionsByCategory(category.key);
  const stepResponses = responses[category.key] || {};

  function handleChange(field, value) {
    updateResponses(category.key, { [field]: value });
    setStepErrors(prev => ({ ...prev, [field]: '' }));
  }

  function validateStep() {
    const errs = {};
    for (const q of questions) {
      if (!q.required) continue;
      const val = stepResponses[q.field];
      const empty = val == null || val === '' || (Array.isArray(val) && val.length === 0);
      if (empty) errs[q.field] = 'This field is required';
    }
    return errs;
  }

  async function handleNext() {
    const errs = validateStep();
    if (Object.keys(errs).length) { setStepErrors(errs); return; }

    setSaveError(null);
    const result = await saveProgress(category.key, stepResponses, submissionId);
    if (result?.submissionId && !submissionId) {
      setSubmissionId(result.submissionId);
    }
    if (!result) {
      setSaveError('Progress could not be saved. Your answers are retained — you can continue.');
    }

    if (currentStep < CATEGORIES.length - 1) {
      setCurrentStep(currentStep + 1);
      setStepErrors({});
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setShowModal(true);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setStepErrors({});
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  async function handleSubmit() {
    try {
      const result = await submitAssessment(responses, submissionId);
      setShowModal(false);
      navigate(`/assessment-toolkit/report/${result.submission.id}`);
    } catch (err) {
      setShowModal(false);
      setSaveError(err.message || 'Submission failed. Please try again.');
    }
  }

  const isLastStep = currentStep === CATEGORIES.length - 1;
  const allAnswered = questions.every(q => {
    if (!q.required) return true;
    const val = stepResponses[q.field];
    if (Array.isArray(val)) return val.length > 0;
    return val != null && val !== '';
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div ref={formTopRef} />
        {/* Unverified email banner */}
        {user && user.isEmailVerified === false && (
          <div className="flex items-center justify-between gap-4 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-xl px-5 py-4 mb-6">
            <p className="text-sm">Please verify your email address to start assessments.</p>
            <button
              onClick={async () => {
                try { await resendVerification(); setResendMsg('Verification email sent!'); } catch { setResendMsg('Could not resend. Try again later.'); }
              }}
              className="text-sm font-semibold text-orange-500 hover:text-orange-400 whitespace-nowrap hover:underline"
            >
              Resend Verification
            </button>
          </div>
        )}
        {resendMsg && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 mb-6 text-sm">
            {resendMsg}
          </div>
        )}

        <ProgressBar currentStep={currentStep} />

        <div className="mb-8">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-1">
            Step {currentStep + 1} of {CATEGORIES.length}
          </p>
          <h1 className="text-3xl font-bold">
            {category.label.split(' ')[0]}{' '}
            <span className="text-orange-500">{category.label.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Answer all questions to proceed to the next section.
          </p>
        </div>

        {saveError && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg px-4 py-3 mb-6 text-sm">
            {saveError}
          </div>
        )}

        <FormStep
          category={category}
          questions={questions}
          responses={stepResponses}
          onChange={handleChange}
          errors={stepErrors}
        />

        <div className="flex gap-4 mt-8">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 border border-gray-700 hover:border-orange-500/50 hover:glow-orange-sm hover:scale-102 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              <ChevronLeft size={18} /> Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!allAnswered || loading}
            className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black ${
              !allAnswered || loading
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
            {loading ? 'Saving...' : isLastStep ? 'Review & Submit' : 'Continue'}
            {!isLastStep && !loading && <ChevronRight size={18} />}
          </button>
        </div>
      </div>

      {showModal && (
        <ConfirmationModal
          responses={responses}
          onConfirm={handleSubmit}
          onCancel={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
}
