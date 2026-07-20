import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Lightweight pulsing skeleton placeholder. Use to fill space while data
 * is loading instead of a "Loading..." text — feels far more responsive.
 *
 * <Skeleton width="60%" />               // single line
 * <Skeleton height={20} width={120} />   // explicit pixel sizes
 * <SkeletonRow columns={6} />            // table row
 * <SkeletonTable rows={5} columns={6} /> // full table
 */
export function Skeleton({ width = '100%', height = 14, className = '', rounded = 6 }) {
  const { isDark } = useTheme();
  return (
    <span
      className={`block animate-pulse ${className}`}
      style={{
        width,
        height,
        borderRadius: rounded,
        backgroundColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
      }}
    />
  );
}

export function SkeletonRow({ columns = 5, padding = 'px-5 py-4' }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className={padding}>
          <Skeleton width={`${50 + Math.floor(Math.random() * 40)}%`} />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonTable({ rows = 5, columns = 5 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} columns={columns} />
      ))}
    </tbody>
  );
}

/**
 * Card-list placeholder for content pages (blogs, events, popups) that render
 * a stack of cards. Mirrors the real layout: thumbnail + title + lines + tags.
 */
export function SkeletonCards({ count = 4 }) {
  const { isDark } = useTheme();
  const bg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  return (
    <div className="grid grid-cols-1 gap-6" aria-busy="true" aria-label="Loading content">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border p-5 flex gap-4"
          style={{ backgroundColor: bg, borderColor: border }}
        >
          <Skeleton width={120} height={90} rounded={12} />
          <div className="flex-1 space-y-3 py-1">
            <Skeleton width="45%" height={16} />
            <Skeleton width="80%" height={12} />
            <Skeleton width="60%" height={12} />
            <div className="flex gap-2 pt-1">
              <Skeleton width={64} height={22} rounded={999} />
              <Skeleton width={64} height={22} rounded={999} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
