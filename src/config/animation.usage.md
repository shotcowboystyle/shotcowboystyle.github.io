# Animation Configuration Usage Guide

This guide demonstrates how to use the centralized animation configuration in your components.

## Import Examples

### Basic Usage

```typescript
import { ANIMATION_DURATION, ANIMATION_EASING, DOM_SELECTORS } from '@/config/animation';
import { gsap } from 'gsap';

// Use in GSAP animations
gsap.to('.element', {
	duration: ANIMATION_DURATION.DEFAULT,
	ease: ANIMATION_EASING.EASE_OUT,
	opacity: 1,
});
```

### Text Reveal Animation

```typescript
import {
	ANIMATION_DURATION,
	ANIMATION_EASING,
	ANIMATION_STAGGER,
	DOM_SELECTORS,
} from '@/config/animation';
import { gsap } from 'gsap';

const animationDefaults = {
	y: 0,
	duration: ANIMATION_DURATION.QUICK,
	ease: ANIMATION_EASING.EASE_OUT,
	stagger: ANIMATION_STAGGER.TEXT,
};

const revealTextEls = gsap.utils.toArray(DOM_SELECTORS.TEXT.REVEAL);
gsap.to(revealTextEls, animationDefaults);
```

### Loader Animation

```typescript
import { DOM_SELECTORS, LOADER_CONFIG, TRANSFORM_ORIGIN } from '@/config/animation';
import { gsap } from 'gsap';

gsap.to(DOM_SELECTORS.LOADER.ITEM, {
	duration: LOADER_CONFIG.SHOW_DURATION,
	scaleY: 1,
	transformOrigin: TRANSFORM_ORIGIN.BOTTOM_LEFT,
	stagger: LOADER_CONFIG.STAGGER,
});
```

### Smooth Scroll Configuration

```typescript
import { ANIMATION_EASING, SMOOTH_SCROLL_CONFIG } from '@/config/animation';
import Lenis from 'lenis';

const smoothScroll = new Lenis({
	duration: SMOOTH_SCROLL_CONFIG.DURATION,
	easing: ANIMATION_EASING.EXPO,
	smoothWheel: true,
});
```

### ScrollTrigger Configuration

```typescript
import { SCROLL_CONFIG } from '@/config/animation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.to('.card', {
	scale: 0.5,
	autoAlpha: 0,
	scrollTrigger: {
		trigger: '.wrapper',
		start: SCROLL_CONFIG.START.BOTTOM_BOTTOM,
		end: SCROLL_CONFIG.END.BOTTOM_TOP,
		scrub: true,
		toggleActions: SCROLL_CONFIG.TOGGLE_ACTIONS.PLAY_RESET,
	},
});
```

### Lottie Animation Configuration

```typescript
import { DATA_ATTRIBUTES, DOM_SELECTORS, LOTTIE_CONFIG } from '@/config/animation';
import lottie from 'lottie-web';

const container = document.querySelector(DOM_SELECTORS.LOTTIE.MODULE);
const playControl = container?.getAttribute(DATA_ATTRIBUTES.ANIMATION_PLAY_CONTROL);

const animation = lottie.loadAnimation({
	container,
	loop: playControl !== LOTTIE_CONFIG.PLAY_CONTROL.HOVER,
	autoplay: playControl === LOTTIE_CONFIG.PLAY_CONTROL.AUTOPLAY,
	path: '/animations/example.json',
});
```

### CSS Transitions

```typescript
import { CSS_TRANSITION_DURATION, OPACITY } from '@/config/animation';

// In your component styles
const styles = {
	transition: `opacity ${CSS_TRANSITION_DURATION.STANDARD}`,
	opacity: OPACITY.HIDDEN,
};

// Or use in Astro component <style> tag
// transition: opacity ${CSS_TRANSITION_DURATION.STANDARD};
```

### Type-Safe Animation Props

```typescript
import type { AnimationDuration, AnimationEasing } from '@/config/animation';

interface AnimationProps {
	duration?: AnimationDuration;
	easing?: AnimationEasing;
	delay?: number;
}

function createAnimation(props: AnimationProps) {
	// props.duration and props.easing are type-safe
}
```

## Benefits

1. **Consistency**: All animations use the same timing and easing values
2. **Maintainability**: Change animation feel globally by updating one file
3. **Type Safety**: TypeScript ensures you use valid values
4. **Discoverability**: IDE autocomplete shows all available options
5. **Documentation**: Centralized location for all animation constants
6. **Performance**: Reusing constants is more efficient than magic numbers

## Migration Guide

### Before (Direct Values)

```typescript
gsap.to('.element', {
	duration: 0.6,
	ease: 'power1.out',
	stagger: 0.2,
});

const selector = '.js-loader-item';
```

### After (Config Constants)

```typescript
import {
	ANIMATION_DURATION,
	ANIMATION_EASING,
	ANIMATION_STAGGER,
	DOM_SELECTORS,
} from '@/config/animation';

gsap.to(DOM_SELECTORS.LOADER.ITEM, {
	duration: ANIMATION_DURATION.STANDARD,
	ease: ANIMATION_EASING.EASE_OUT,
	stagger: ANIMATION_STAGGER.DEFAULT,
});
```

## Best Practices

1. **Always prefer config constants** over hardcoded values
2. **Use type imports** for function parameters and props
3. **Document custom values** if you must deviate from config
4. **Add new constants** to config file rather than duplicating values
5. **Use meaningful names** that describe the animation purpose

## Constants Overview

### Duration Hierarchy (fastest to slowest)

- `INSTANT` (0.1s) - Ultra fast, barely perceptible
- `FAST` (0.2s) - Quick interactions
- `QUICK` (0.5s) - Standard quick animation
- `STANDARD` (0.6s) - Default animation speed
- `MEDIUM` (0.8s) - Slightly slower
- `DEFAULT` (1s) - Standard duration
- `SLOW` (1.2s) - Deliberate, noticeable
- `REVEAL` (1.5s) - Dramatic reveals
- `DRAMATIC` (3s) - Very slow, theatrical

### Easing Functions

- `LINEAR` - Constant speed
- `EASE_OUT` / `POWER2_OUT` - Natural deceleration
- `EASE_IN` - Natural acceleration
- `EASE_IN_OUT` - Smooth start and end
- `CUBIC` - Custom cubic bezier
- `EXPO` - Exponential for smooth scroll

### Common Selectors

All common animation target selectors are in `DOM_SELECTORS`:

- Loader elements
- Text animation elements
- Scroll animation elements
- Lottie animation elements
- Contact form elements

### CSS Classes

Common animation-related classes in `CSS_CLASSES`:

- State classes (loading, scrolling)
- Split text classes
- Animation utility classes
- Button animation classes
