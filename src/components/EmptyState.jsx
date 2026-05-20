import React from 'react';
import { Inbox } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Empty-state card used inside tables/lists when there's nothing to show.
 * Replaces dull "No items found." text with a centered icon + heading +
 * optional CTA, matching the polish of the rest of the dashboard.
 *
 * Props:
 *   icon      - Lucide icon component (default: Inbox)
 *   title     - heading text
 *   message   - sub-copy
 *   action    - { label, onClick } optional CTA button
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  message,
  action,
}) {
  const { colors } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border"
        style={{
          backgroundColor: colors.bgTertiary,
          borderColor: colors.border,
          color: colors.textMuted,
        }}
      >
        <Icon size={24} />
      </div>
      <h3 className="text-base font-semibold mb-1" style={{ color: colors.text }}>
        {title}
      </h3>
      {message && (
        <p className="text-sm max-w-sm" style={{ color: colors.textMuted }}>
          {message}
        </p>
      )}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-5 px-5 py-2.5 bg-gradient-to-r from-[#F2600B] to-orange-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
