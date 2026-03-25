import { CATEGORIES, getQuestionsByCategory } from '../utils/assessmentQuestions';

export default function ConfirmationModal({ responses, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Review Your Responses</h2>
          <p className="text-gray-400 text-sm mt-1">Please review before submitting your assessment.</p>
        </div>

        <div className="p-6 space-y-6">
          {CATEGORIES.map(cat => {
            const questions = getQuestionsByCategory(cat.key);
            const catResponses = responses?.[cat.key] || {};
            const answered = Object.keys(catResponses).length;
            return (
              <div key={cat.key}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-orange-500 font-semibold text-sm uppercase tracking-wide">{cat.label}</h3>
                  <span className="text-gray-500 text-xs">{answered}/{questions.length} answered</span>
                </div>
                <div className="space-y-2">
                  {questions.map(q => {
                    const val = catResponses[q.field];
                    const optLabel = q.options?.find(o => o.value === val)?.label || val || '—';
                    return (
                      <div key={q.id} className="flex justify-between items-start gap-4 text-sm">
                        <span className="text-gray-400 flex-1">{q.text}</span>
                        <span className={`font-medium flex-shrink-0 ${val === 'no' ? 'text-red-400' : val === 'yes' ? 'text-green-400' : 'text-orange-400'}`}>
                          {optLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 border-t border-gray-800 flex gap-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 border border-gray-600 text-gray-300 hover:border-white py-3 rounded-lg font-medium transition"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? 'Submitting...' : 'Confirm & Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
