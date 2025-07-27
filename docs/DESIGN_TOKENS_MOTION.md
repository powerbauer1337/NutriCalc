# NutriCalc Design Tokens: Motion System

## Overview

This document defines the comprehensive motion token system for NutriCalc, ensuring consistent animations, transitions, and micro-interactions across the application. The system includes easing functions, duration scales, and transition patterns that enhance usability without causing motion sickness or accessibility issues.

## Easing Functions

### Standard Easings
```css
--motion-ease-linear: linear;
--motion-ease-in: cubic-bezier(0.4, 0, 1, 1);
--motion-ease-out: cubic-bezier(0, 0, 0.2, 1);
--motion-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Specialized Easings
```css
--motion-ease-entrance: cubic-bezier(0, 0, 0.2, 1);     /* For entering elements */
--motion-ease-exit: cubic-bezier(0.4, 0, 1, 1);         /* For exiting elements */
--motion-ease-emphasized: cubic-bezier(0.2, 0, 0, 1);   /* For emphasized actions */
--motion-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* For bouncy effects */
```

### Natural Easings
```css
--motion-ease-natural-in: cubic-bezier(0.3, 0, 0.7, 1);
--motion-ease-natural-out: cubic-bezier(0.3, 0, 0.7, 1);
--motion-ease-natural-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

## Duration Scale

### Micro-interactions (0-100ms)
```css
--motion-duration-fastest: 50ms;    /* Immediate feedback */
--motion-duration-faster: 100ms;    /* Quick transitions */
```

### Standard Transitions (100-300ms)
```css
--motion-duration-fast: 150ms;      /* Standard UI transitions */
--motion-duration-base: 200ms;      /* Default transitions */
--motion-duration-slow: 300ms;      /* Noticeable transitions */
```

### Deliberate Animations (300ms+)
```css
--motion-duration-slower: 400ms;    /* Deliberate animations */
--motion-duration-slowest: 500ms;   /* Major transitions */
```

### Extended Animations (500ms+)
```css
--motion-duration-extended: 750ms;  /* Extended animations */
--motion-duration-long: 1000ms;     /* Long animations */
```

## Delay Tokens

```css
--motion-delay-none: 0ms;
--motion-delay-short: 50ms;
--motion-delay-base: 100ms;
--motion-delay-long: 200ms;
--motion-delay-longer: 300ms;
```

## Transition Patterns

### Standard Transitions
```css
--motion-transition-button: background-color var(--motion-duration-fast) var(--motion-ease-out),
                            border-color var(--motion-duration-fast) var(--motion-ease-out),
                            color var(--motion-duration-fast) var(--motion-ease-out),
                            box-shadow var(--motion-duration-fast) var(--motion-ease-out);
                            
--motion-transition-input: border-color var(--motion-duration-base) var(--motion-ease-out),
                           box-shadow var(--motion-duration-base) var(--motion-ease-out);
                           
--motion-transition-card: box-shadow var(--motion-duration-base) var(--motion-ease-out),
                          transform var(--motion-duration-base) var(--motion-ease-out);
```

### Animation Patterns
```css
--motion-animation-fade-in: fade-in var(--motion-duration-base) var(--motion-ease-out);
--motion-animation-fade-out: fade-out var(--motion-duration-base) var(--motion-ease-in);
--motion-animation-slide-in: slide-in var(--motion-duration-base) var(--motion-ease-out);
--motion-animation-slide-out: slide-out var(--motion-duration-base) var(--motion-ease-in);
--motion-animation-scale-in: scale-in var(--motion-duration-base) var(--motion-ease-out);
--motion-animation-scale-out: scale-out var(--motion-duration-base) var(--motion-ease-in);
```

## Keyframe Animations

### Fade Animations
```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

### Slide Animations
```css
@keyframes slide-in-top {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-in-bottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
```

### Scale Animations
```css
@keyframes scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scale-out {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.95);
    opacity: 0;
  }
}
```

### Pulse Animations
```css
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes pulse-subtle {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
```

### Spin Animations
```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-linear {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## Animation Composition

### Enter Animations
```css
--motion-enter-fade: fade-in var(--motion-duration-base) var(--motion-ease-out);
--motion-enter-slide-up: slide-in-top var(--motion-duration-base) var(--motion-ease-out);
--motion-enter-slide-down: slide-in-bottom var(--motion-duration-base) var(--motion-ease-out);
--motion-enter-scale: scale-in var(--motion-duration-base) var(--motion-ease-out);
```

### Exit Animations
```css
--motion-exit-fade: fade-out var(--motion-duration-base) var(--motion-ease-in);
--motion-exit-slide-up: slide-out-top var(--motion-duration-base) var(--motion-ease-in);
--motion-exit-slide-down: slide-out-bottom var(--motion-duration-base) var(--motion-ease-in);
--motion-exit-scale: scale-out var(--motion-duration-base) var(--motion-ease-in);
```

## Reduced Motion Support

### Prefers Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-duration-fastest: 0ms;
    --motion-duration-faster: 0ms;
    --motion-duration-fast: 0ms;
    --motion-duration-base: 0ms;
    --motion-duration-slow: 0ms;
    --motion-duration-slower: 0ms;
    --motion-duration-slowest: 0ms;
    --motion-duration-extended: 0ms;
    --motion-duration-long: 0ms;
  }
}
```

### Reduced Motion Transitions
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Motion Usage Guidelines

### When to Animate
- **Feedback**: Button clicks, form submissions
- **Transitions**: Page changes, modal openings
- **Attention**: Notifications, loading states
- **Spatial relationships**: Expanding cards, dropdowns

### When NOT to Animate
- **Decorative only**: Animations without functional purpose
- **Cognitive load**: Complex animations that confuse users
- **Performance impact**: Animations that cause jank
- **Accessibility conflicts**: Animations that trigger motion sickness

## Component-Specific Motion

### Buttons
```css
.button {
  transition: var(--motion-transition-button);
}

.button:active {
  transform: translateY(1px);
  transition: transform var(--motion-duration-fastest) var(--motion-ease-in);
}
```

### Cards
```css
.card {
  transition: var(--motion-transition-card);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### Modals
```css
.modal-overlay {
  animation: var(--motion-animation-fade-in);
}

.modal-content {
  animation: var(--motion-animation-scale-in);
}
```

### Loading Spinners
```css
.spinner {
  animation: var(--motion-animation-spin) linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

## Performance Considerations

### Optimal Properties to Animate
1. **Opacity** - GPU accelerated
2. **Transform** - GPU accelerated
3. **Filter** - GPU accelerated

### Properties to Avoid Animating
1. **Width/Height** - Triggers layout
2. **Margin/Padding** - Triggers layout
3. **Border** - Can trigger paint
4. **Color/Background** - Can trigger paint

### Will-Change Property
```css
.optimized-animation {
  will-change: transform, opacity;
}
```

## Accessibility Considerations

### Motion Sensitivity
- All animations respect `prefers-reduced-motion` media query
- Users can disable animations in settings
- No critical functionality depends on animations

### Focus Management
```css
.focus-transition {
  transition: box-shadow var(--motion-duration-base) var(--motion-ease-out);
}
```

### Screen Reader Compatibility
- Animations don't interfere with screen reader announcements
- Sufficient time for users to perceive changes
- No autoplaying animations without controls

## Implementation Examples

### CSS Transitions
```css
.element {
  transition: var(--motion-transition-button);
}

.element:hover {
  background-color: var(--color-primary-600);
}
```

### CSS Animations
```css
.animated-element {
  animation: var(--motion-animation-fade-in);
}
```

### JavaScript Integration
```javascript
// Example of using motion tokens in JavaScript
const modalAnimation = {
  enter: {
    keyframes: fade-in,
    duration: 'var(--motion-duration-base)',
    easing: 'var(--motion-ease-out)'
  },
  exit: {
    keyframes: fade-out,
    duration: 'var(--motion-duration-base)',
    easing: 'var(--motion-ease-in)'
  }
};
```

## Do's and Don'ts

### Do's
- Use consistent easing functions
- Respect user motion preferences
- Animate only GPU-accelerated properties
- Provide sufficient duration for perception
- Test animations with various users

### Don'ts
- Don't create custom easing functions
- Don't ignore reduced motion preferences
- Don't animate layout-triggering properties
- Don't use excessive animation durations
- Don't forget accessibility considerations

## Browser Support

The motion system uses standard CSS animations and transitions which are supported in all modern browsers. For older browsers, graceful degradation should be implemented.

All motion values use standard CSS units and functions ensuring broad compatibility.