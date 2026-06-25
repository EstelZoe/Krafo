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
                    const isArray = Array.isArray(val);
                    const optLabel = isArray
                      ? (val.length
                          ? val.map(v => q.options?.find(o => o.value === v)?.label || v).join(', ')
                          : '—')
                      : (q.options?.find(o => o.value === val)?.label || val || '—');
                    const colorClass = isArray
                      ? 'text-orange-400'
                      : val === 'no' ? 'text-red-400' : val === 'yes' ? 'text-green-400' : 'text-orange-400';
                    return (
                      <div key={q.id} className="flex justify-between items-start gap-4 text-sm">
                        <span className="text-gray-400 flex-1">{q.text}</span>
                        <span className={`font-medium flex-shrink-0 text-right ${colorClass}`}>
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
            className="flex-1 border border-gray-700 hover:border-orange-500/50 hover:glow-orange-sm hover:scale-102 text-gray-300 hover:text-white py-3 rounded-lg font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center gap-2 ${
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
            {loading ? 'Submitting...' : 'Confirm & Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
