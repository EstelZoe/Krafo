import { CATEGORIES } from '../utils/assessmentQuestions';

export default function ProgressBar({ currentStep }) {
  const total = CATEGORIES.length;
  const percentage = Math.round(((currentStep) / total) * 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">
          Step {currentStep + 1} of {total}
        </span>
        <span className="text-sm text-orange-500 font-semibold">{percentage}% Completed</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5">
        <div
          className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
