import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

/**
 * Reusable confirm dialog used everywhere we previously called window.confirm().
 *
 * Props:
 *   open           - boolean, controls visibility
 *   title          - string heading
 *   message        - string or React node, body copy
 *   confirmText    - button label, defaults to "Confirm"
 *   cancelText     - button label, defaults to "Cancel"
 *   tone           - "danger" | "warning" | "primary" (defaults to "primary")
 *   loading        - disable buttons while async work runs
 *   onConfirm      - called when user clicks confirm
 *   onCancel       - called when user clicks cancel / clicks outside / hits Esc
 */
const TONE = {
  primary: {
    button: 'bg-gradient-to-r from-[#F2600B] to-orange-500 hover:shadow-orange-500/30',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
  },
  warning: {
    button: 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:shadow-yellow-500/30',
    iconBg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
  danger: {
    button: 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-red-500/30',
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
  },
};

export default function ConfirmModal({
  open,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  tone = 'primary',
  loading = false,
  onConfirm,
  onCancel,
}) {
  // Allow Esc to dismiss for keyboard users.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape' && !loading) onCancel?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, loading, onCancel]);

  const palette = TONE[tone] || TONE.primary;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => !loading && onCancel?.()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="bg-[#0d0d0d] border border-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${palette.iconBg}`}>
                <AlertTriangle size={20} className={palette.iconColor} />
              </div>
              <div className="flex-1">
                <h3 id="confirm-title" className="text-lg font-semibold text-white">{title}</h3>
                {message && (
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{message}</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => !loading && onCancel?.()}
                disabled={loading}
                className="px-4 py-2 rounded-lg font-medium text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 transition disabled:opacity-60"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={() => !loading && onConfirm?.()}
                disabled={loading}
                className={`px-5 py-2 rounded-lg font-medium text-sm text-white shadow-lg transition disabled:opacity-60 ${palette.button}`}
              >
                {loading ? 'Working\u2026' : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
