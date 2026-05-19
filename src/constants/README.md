# Animation Constants

This directory contains animation timing constants for the Assessment UI Enhancements feature.

## Usage

```javascript
import { ANIMATION_DURATION, EASING, GLOW_INTENSITY } from './animations.js';

// Use in inline styles
<div style={{ 
  transition: `all ${ANIMATION_DURATION.STANDARD}ms ${EASING.OUT}`,
  boxShadow: GLOW_INTENSITY.SUBTLE 
}}>
  Content
</div>

// Use in component logic
setTimeout(() => {
  // Do something after standard animation duration
}, ANIMATION_DURATION.STANDARD);
```

## Available Constants

### ANIMATION_DURATION
- `FAST`: 200ms - Quick interactions (hover, focus)
- `STANDARD`: 300ms - Standard transitions (cards, buttons)
- `SLOW`: 500ms - Page transitions, complex animations
- `PROGRESS`: 700ms - Progress bar fills

### EASING
- `OUT`: 'ease-out' - Decelerating (most interactions)
- `IN_OUT`: 'ease-in-out' - Smooth start and end (collapsibles)
- `LINEAR`: 'linear' - Constant speed (spinners)

### GLOW_INTENSITY
- `AMBIENT`: Subtle ambient glow (20px blur, 30% opacity)
- `SUBTLE`: Small glow effect (8px blur, 40% opacity)
- `MEDIUM`: Medium glow with depth (12px + 24px blur)
- `STRONG`: Strong glow with multiple layers (16px + 32px blur)

## CSS Utility Classes

The following CSS utility classes are available in `src/index.css`:

### Glow Effects
- `.glow-orange-sm` - Small orange glow
- `.glow-orange-md` - Medium orange glow with depth
- `.glow-orange-lg` - Large orange glow with multiple layers
- `.glow-orange-ambient` - Subtle ambient orange glow
- `.glow-green-sm` - Small green glow (success states)
- `.glow-red-sm` - Small red glow (error states)

### Animations
- `.animate-pulse-subtle` - Subtle pulsing animation (2s infinite)
- `.animate-shimmer` - Shimmer effect for skeleton loaders (1.5s infinite)
- `.animate-progress-fill` - Progress bar fill animation (700ms forwards)

## Example Usage

```jsx
// Button with hover glow
<button className="bg-orange-500 hover:glow-orange-md transition-all duration-300">
  Click Me
</button>

// Card with hover effect
<div className="border border-gray-800 hover:border-orange-500/40 hover:glow-orange-sm transition-all duration-300">
  Card Content
</div>

// Input with focus glow
<input className="border border-gray-700 focus:border-orange-500 focus:glow-orange-sm transition-all duration-200" />

// Critical badge with pulse
<span className="bg-red-400/10 border border-red-400/30 text-red-400 animate-pulse-subtle">
  Critical
</span>

// Skeleton loader
<div className="animate-shimmer bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] h-4 rounded" />

// Progress bar
<div className="bg-orange-500 h-2 rounded-full animate-progress-fill" style={{ width: '75%' }} />
```
