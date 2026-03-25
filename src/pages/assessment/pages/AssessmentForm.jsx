import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES, getQuestionsByCategory } from '../utils/assessmentQuestions';
import { useAssessmentContext } from '../context/AssessmentContext';
import { useAssessment } from '../hooks/useAssessment';
import ToolkitNavbar from '../components/ToolkitNavbar';
import ProgressBar from '../components/ProgressBar';
import FormStep from '../components/FormStep';
import ConfirmationModal from '../components/ConfirmationModal';

export default function AssessmentForm() {
  const navigate = useNavigate();
  const { responses, currentStep, submissionId, setCurrentStep, setSubmissionId, updateResponses } = useAssessmentContext();
  const { saveProgress, submitAssessment, loading } = useAssessment();

  const [stepErrors, setStepErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [saveError, setSaveError] = useState(null);

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
      if (q.required && !stepResponses[q.field]) {
        errs[q.field] = 'This field is required';
      }
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowModal(true);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setStepErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
  const allAnswered = questions.every(q => !q.required || stepResponses[q.field]);

  return (
    <div className="min-h-screen bg-black text-white">
      <ToolkitNavbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
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
              className="flex items-center gap-2 border border-gray-600 text-gray-300 hover:border-white px-6 py-3 rounded-lg font-medium transition"
            >
              <ChevronLeft size={18} /> Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!allAnswered || loading}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? 'Saving...' : isLastStep ? 'Review & Submit' : 'Continue'}
            {!isLastStep && <ChevronRight size={18} />}
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
