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

export default Skeleton;
