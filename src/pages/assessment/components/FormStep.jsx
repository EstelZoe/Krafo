/**
 * Renders all questions for a single assessment category.
 * Props: { category, questions, responses, onChange, errors }
 */
export default function FormStep({ category, questions, responses, onChange, errors }) {
  const total = questions.length;

  return (
    <div>
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className={`bg-[#1a1a1a] rounded-xl p-5 border transition-all duration-200 ${
            errors?.[q.field] 
              ? 'border-red-500/50 glow-red-sm' 
              : 'border-gray-800'
          }`}>
            <p className="text-sm text-orange-500 font-semibold mb-1">
              Question {idx + 1} of {total}
            </p>
            <p className="text-white font-medium mb-4 leading-relaxed">{q.text}</p>

            {q.type === 'select' && (
              <select
                value={responses?.[q.field] || ''}
                onChange={e => onChange(q.field, e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-orange-500 focus:glow-orange-sm focus:outline-none transition-all duration-200 ease-out appearance-none cursor-pointer"
                aria-invalid={!!errors?.[q.field]}
                aria-describedby={errors?.[q.field] ? `${q.field}-error` : undefined}
              >
                <option value="" disabled>Select an option...</option>
                {q.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}

            {q.type === 'radio' && (
              <div className="flex gap-4">
                {q.options.map(opt => {
                  const selected = responses?.[q.field] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onChange(q.field, opt.value)}
                      className={`flex-1 py-3 rounded-lg border font-medium transition text-sm ${
                        selected
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'bg-[#111] border-gray-700 text-gray-300 hover:border-orange-500/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}

            {errors?.[q.field] && (
              <p id={`${q.field}-error`} className="text-red-400 text-xs mt-2">{errors[q.field]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
