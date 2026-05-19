import { describe, it, expect } from 'vitest';
import { ANIMATION_DURATION, EASING, GLOW_INTENSITY } from './animations.js';

describe('Animation Constants', () => {
  it('should export ANIMATION_DURATION with correct values', () => {
    expect(ANIMATION_DURATION.FAST).toBe(200);
    expect(ANIMATION_DURATION.STANDARD).toBe(300);
    expect(ANIMATION_DURATION.SLOW).toBe(500);
    expect(ANIMATION_DURATION.PROGRESS).toBe(700);
  });

  it('should export EASING with correct values', () => {
    expect(EASING.OUT).toBe('ease-out');
    expect(EASING.IN_OUT).toBe('ease-in-out');
    expect(EASING.LINEAR).toBe('linear');
  });

  it('should export GLOW_INTENSITY with correct values', () => {
    expect(GLOW_INTENSITY.AMBIENT).toBe('0 0 20px rgba(249, 115, 22, 0.3)');
    expect(GLOW_INTENSITY.SUBTLE).toBe('0 0 8px rgba(249, 115, 22, 0.4)');
    expect(GLOW_INTENSITY.MEDIUM).toBe('0 0 12px rgba(249, 115, 22, 0.5), 0 0 24px rgba(249, 115, 22, 0.2)');
    expect(GLOW_INTENSITY.STRONG).toBe('0 0 16px rgba(249, 115, 22, 0.6), 0 0 32px rgba(249, 115, 22, 0.3)');
  });
});
