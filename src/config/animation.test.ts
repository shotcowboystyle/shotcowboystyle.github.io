/**
 * Simple validation test for animation config
 * This ensures all exports are accessible and properly typed
 */

import {
	ANIMATION_DURATION,
	ANIMATION_EASING,
	ANIMATION_STAGGER,
	CSS_CLASSES,
	DOM_SELECTORS,
	LOTTIE_CONFIG,
	OPACITY,
	SCALE,
	SCROLL_CONFIG,
	TRANSFORM_ORIGIN,
	type AnimationDuration,
	type AnimationStagger,
	type LottiePlayControl,
	type ScrollEndPosition,
	type ScrollStartPosition,
	type ScrollToggleAction,
	type TransformOrigin,
} from './animation';

// Type validation tests
void (ANIMATION_DURATION.DEFAULT satisfies AnimationDuration);
void (ANIMATION_EASING.EASE_OUT satisfies string);
void (ANIMATION_STAGGER.TEXT satisfies AnimationStagger);
void (SCROLL_CONFIG.START.TOP_CENTER satisfies ScrollStartPosition);
void (SCROLL_CONFIG.END.BOTTOM_TOP satisfies ScrollEndPosition);
void (SCROLL_CONFIG.TOGGLE_ACTIONS.PLAY_RESET satisfies ScrollToggleAction);
void (LOTTIE_CONFIG.PLAY_CONTROL.HOVER satisfies LottiePlayControl);
void (TRANSFORM_ORIGIN.CENTER satisfies TransformOrigin);

// Runtime validation tests
console.assert(typeof ANIMATION_DURATION.DEFAULT === 'number', 'Duration should be a number');
console.assert(typeof ANIMATION_EASING.EASE_OUT === 'string', 'Easing should be a string');
console.assert(typeof ANIMATION_STAGGER.DEFAULT === 'number', 'Stagger should be a number');
console.assert(typeof DOM_SELECTORS.LOADER.WRAPPER === 'string', 'Selector should be a string');
console.assert(typeof CSS_CLASSES.STATE.LOADING === 'string', 'Class should be a string');
console.assert(typeof OPACITY.VISIBLE === 'number', 'Opacity should be a number');
console.assert(typeof SCALE.NORMAL === 'number', 'Scale should be a number');

console.log('✓ Animation config validation passed');
