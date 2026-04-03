/**
 * Animation timing constants for Assessment UI Enhancements
 * 
 * These constants ensure consistent animation timing and easing
 * across all components in the KRAFO Systems assessment toolkit.
 */

// Animation duration constants (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 200,      // Quick interactions (hover, focus)
  STANDARD: 300,  // Standard transitions (cards, buttons)
  SLOW: 500,      // Page transitions, complex animations
  PROGRESS: 700,  // Progress bar fills
};

// Easing function constants
export const EASING = {
  OUT: 'ease-out',       // Decelerating (most interactions)
  IN_OUT: 'ease-in-out', // Smooth start and end (collapsibles)
  LINEAR: 'linear',      // Constant speed (spinners)
};

// Glow intensity levels (CSS box-shadow values)
export const GLOW_INTENSITY = {
  AMBIENT: '0 0 20px rgba(249, 115, 22, 0.3)',
  SUBTLE: '0 0 8px rgba(249, 115, 22, 0.4)',
  MEDIUM: '0 0 12px rgba(249, 115, 22, 0.5), 0 0 24px rgba(249, 115, 22, 0.2)',
  STRONG: '0 0 16px rgba(249, 115, 22, 0.6), 0 0 32px rgba(249, 115, 22, 0.3)',
};
