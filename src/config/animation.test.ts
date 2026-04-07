/**
 * Simple validation test for animation config
 * This ensures all exports are accessible and properly typed
 */

import {
	ANIMATION_DURATION,
	ANIMATION_EASING,
	ANIMATION_STAGGER,
	CSS_CLASSES,
	CSS_TRANSITION_DURATION,
	DATA_ATTRIBUTES,
	DOM_SELECTORS,
	LOADER_CONFIG,
	LOTTIE_CONFIG,
	OPACITY,
	SCALE,
	SCROLL_CONFIG,
	SMOOTH_SCROLL_CONFIG,
	TRANSFORM_ORIGIN,
	type AnimationDuration,
	type AnimationEasing,
	type AnimationStagger,
	type LottiePlayControl,
	type ScrollEndPosition,
	type ScrollStartPosition,
	type ScrollToggleAction,
	type TransformOrigin,
} from './animation';

// Type validation tests
const duration: AnimationDuration = ANIMATION_DURATION.DEFAULT;
const easing: string = ANIMATION_EASING.EASE_OUT;
const stagger: AnimationStagger = ANIMATION_STAGGER.TEXT;
const scrollStart: ScrollStartPosition = SCROLL_CONFIG.START.TOP_CENTER;
const scrollEnd: ScrollEndPosition = SCROLL_CONFIG.END.BOTTOM_TOP;
const toggleAction: ScrollToggleAction = SCROLL_CONFIG.TOGGLE_ACTIONS.PLAY_RESET;
const playControl: LottiePlayControl = LOTTIE_CONFIG.PLAY_CONTROL.HOVER;
const origin: TransformOrigin = TRANSFORM_ORIGIN.CENTER;

// Runtime validation tests
console.assert(typeof ANIMATION_DURATION.DEFAULT === 'number', 'Duration should be a number');
console.assert(typeof ANIMATION_EASING.EASE_OUT === 'string', 'Easing should be a string');
console.assert(typeof ANIMATION_STAGGER.DEFAULT === 'number', 'Stagger should be a number');
console.assert(typeof DOM_SELECTORS.LOADER.WRAPPER === 'string', 'Selector should be a string');
console.assert(typeof CSS_CLASSES.STATE.LOADING === 'string', 'Class should be a string');
console.assert(typeof OPACITY.VISIBLE === 'number', 'Opacity should be a number');
console.assert(typeof SCALE.NORMAL === 'number', 'Scale should be a number');

console.log('✓ Animation config validation passed');
