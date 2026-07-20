import React from 'react';

/**
 * Reusable icon button used in tables and toolbars.
 *
 * Variants tint the resting and hover states:
 *  - default — neutral gray, orange on hover
 *  - primary — orange accent (default for "View" or "highlight" actions)
 *  - info    — blue accent
 *  - success — green accent
 *  - warning — amber accent
 *  - danger  — red accent (destructive actions)
 *
 * The button always carries:
 *  - a softly tinted background so it reads as interactive (no flat icons)
 *  - hover scale + saturated background + glow
 *  - native title attribute for accessibility
 *
 * Usage:
 *   <IconButton title="View Report" variant="info" onClick={...}>
 *     <Eye size={14} />
 *   </IconButton>
 */
const VARIANTS = {
  default: {
    bg: 'rgba(148, 163, 184, 0.10)',
    color: '#94a3b8',
    hoverBg: 'rgba(242, 96, 11, 0.18)',
    hoverColor: '#F2600B',
    glow: '0 0 0 2px rgba(242, 96, 11, 0.25)',
  },
  primary: {
    bg: 'rgba(242, 96, 11, 0.12)',
    color: '#F2600B',
    hoverBg: 'rgba(242, 96, 11, 0.25)',
    hoverColor: '#F2600B',
    glow: '0 0 12px rgba(242, 96, 11, 0.4)',
  },
  info: {
    bg: 'rgba(59, 130, 246, 0.12)',
    color: '#60a5fa',
    hoverBg: 'rgba(59, 130, 246, 0.25)',
    hoverColor: '#3b82f6',
    glow: '0 0 12px rgba(59, 130, 246, 0.4)',
  },
  success: {
    bg: 'rgba(34, 197, 94, 0.12)',
    color: '#4ade80',
    hoverBg: 'rgba(34, 197, 94, 0.25)',
    hoverColor: '#22c55e',
    glow: '0 0 12px rgba(34, 197, 94, 0.4)',
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.12)',
    color: '#fbbf24',
    hoverBg: 'rgba(245, 158, 11, 0.25)',
    hoverColor: '#f59e0b',
    glow: '0 0 12px rgba(245, 158, 11, 0.4)',
  },
  danger: {
    bg: 'rgba(239, 68, 68, 0.12)',
    color: '#f87171',
    hoverBg: 'rgba(239, 68, 68, 0.25)',
    hoverColor: '#ef4444',
    glow: '0 0 12px rgba(239, 68, 68, 0.4)',
  },
};

export default function IconButton({
  children,
  variant = 'default',
  title,
  disabled = false,
  onClick,
  className = '',
  size = 36,
}) {
  const palette = VARIANTS[variant] || VARIANTS.default;
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`inline-flex items-center justify-center rounded-lg transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: hovered && !disabled ? palette.hoverBg : palette.bg,
        color: hovered && !disabled ? palette.hoverColor : palette.color,
        transform: hovered && !disabled ? 'scale(1.06)' : 'scale(1)',
        boxShadow: hovered && !disabled ? palette.glow : 'none',
        border: '1px solid transparent',
      }}
    >
      {children}
    </button>
  );
}
