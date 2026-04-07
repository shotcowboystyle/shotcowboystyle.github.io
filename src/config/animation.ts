/**
 * Centralized Animation Configuration
 *
 * This file consolidates all animation-related constants used across the codebase.
 * Benefits:
 * - Single source of truth for animation values
 * - Consistent timing and easing across components
 * - Easy to adjust global animation feel
 * - Type-safe constants for better IDE support
 */

/**
 * Animation duration constants (in seconds)
 */
export const ANIMATION_DURATION = {
	/** Ultra fast animations (0.1s - 0.2s) */
	INSTANT: 0.1,
	/** Quick interactions (0.2s - 0.5s) */
	FAST: 0.2,
	QUICK: 0.5,
	/** Standard animations (0.5s - 1s) */
	STANDARD: 0.6,
	MEDIUM: 0.8,
	DEFAULT: 1,
	/** Slower, more dramatic animations (1s - 3s) */
	SLOW: 1.2,
	REVEAL: 1.5,
	DRAMATIC: 3,
} as const;

/**
 * GSAP easing functions
 * Common easing presets for consistent motion
 */
export const ANIMATION_EASING = {
	/** Linear motion - constant speed */
	LINEAR: 'none',
	/** Natural ease out - decelerating */
	EASE_OUT: 'power1.out',
	POWER2_OUT: 'power2.out',
	/** Natural ease in - accelerating */
	EASE_IN: 'power1.in',
	/** Ease in and out - accelerate then decelerate */
	EASE_IN_OUT: 'power1.inOut',
	/** Smooth, gentle easing */
	SMOOTH: 'ease-in-out',
	/** Cubic bezier for custom easing */
	CUBIC: (x: number): number => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
	/** Exponential easing for smooth scroll */
	EXPO: (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
} as const;

/**
 * Animation stagger delays (in seconds)
 * Used for sequential animations in groups
 */
export const ANIMATION_STAGGER = {
	/** Very quick succession (0.05s) */
	MICRO: 0.05,
	/** Text reveal stagger (0.08s) */
	TEXT: 0.08,
	/** Standard stagger (0.2s) */
	DEFAULT: 0.2,
	/** Slower, more noticeable stagger (0.4s) */
	SLOW: 0.4,
} as const;

/**
 * ScrollTrigger configuration values
 */
export const SCROLL_CONFIG = {
	/** ScrollTrigger start positions */
	START: {
		TOP_TOP: 'top top',
		TOP_CENTER: 'top center',
		TOP_BOTTOM: 'top bottom',
		CENTER_CENTER: 'center center',
		BOTTOM_TOP: 'bottom top',
		BOTTOM_CENTER: 'bottom center',
		BOTTOM_BOTTOM: 'bottom bottom',
	},
	/** ScrollTrigger end positions */
	END: {
		TOP_TOP: 'top top',
		TOP_CENTER: 'top center',
		BOTTOM_TOP: 'bottom top',
		BOTTOM_CENTER: 'bottom center',
		BOTTOM_BOTTOM: 'bottom bottom',
	},
	/** ScrollTrigger toggle actions */
	TOGGLE_ACTIONS: {
		PLAY_RESET: 'play none none reset',
		PLAY_REVERSE: 'play reverse play reverse',
		PLAY_NONE: 'play none none none',
	},
} as const;

/**
 * Smooth scroll configuration
 */
export const SMOOTH_SCROLL_CONFIG = {
	/** Smooth scroll duration (in seconds) */
	DURATION: 1.2,
	/** Scroll animation duration for scrollTo (in seconds) */
	SCROLL_TO_DURATION: 3,
	/** Touch multiplier for mobile devices */
	TOUCH_MULTIPLIER: 2,
	/** Lerp value for macOS (smoother scrolling) */
	LERP_MAC: 0.4,
	/** Lerp value for other platforms */
	LERP_DEFAULT: 0.1,
	/** Scroll offset (in pixels) */
	OFFSET: 0,
	/** Scroll delay before action (in milliseconds) */
	DELAY_MS: 5,
} as const;

/**
 * Lottie animation configuration
 */
export const LOTTIE_CONFIG = {
	/** Animation play control types */
	PLAY_CONTROL: {
		AUTOPLAY: 'autoplay' as const,
		HOVER: 'hover' as const,
		SCROLL: 'scroll' as const,
	},
	/** Initial state percentage (0-100) */
	INITIAL_STATE: {
		START: 0,
		MIDDLE: 50,
		END: 100,
	},
} as const;

/**
 * Loader animation configuration
 */
export const LOADER_CONFIG = {
	/** Show loader duration (in seconds) */
	SHOW_DURATION: 0.6,
	/** Hide loader duration (in seconds) */
	HIDE_DURATION: 1,
	/** Loader stagger delay (in seconds) */
	STAGGER: 0.2,
	/** Loader delay before hiding (in seconds) */
	HIDE_DELAY: 0.3,
	/** Transform origin for show animation */
	SHOW_ORIGIN: 'bottom left',
	/** Transform origin for hide animation */
	HIDE_ORIGIN: 'top right',
} as const;

/**
 * CSS transition durations (in seconds)
 * Used for non-GSAP CSS transitions
 */
export const CSS_TRANSITION_DURATION = {
	INSTANT: '0.1s',
	FAST: '0.2s',
	STANDARD: '0.5s',
	SLOW: '1s',
	VERY_SLOW: '1.5s',
} as const;

/**
 * DOM selector constants
 * Centralized selectors for animation targets
 */
export const DOM_SELECTORS = {
	/** Loader elements */
	LOADER: {
		WRAPPER: '.js-loader-wrapper',
		ITEM: '.js-loader-item',
	},
	/** Text animation elements */
	TEXT: {
		REVEAL_WRAPPER: '.js-animation-reveal-text-wrapper',
		REVEAL: '.js-animation-reveal-text',
		SPLIT_LINES: '.js-split-lines',
		SPLIT_WORDS: '.js-split-words',
	},
	/** Scroll animation elements */
	SCROLL: {
		LINK: '.scroll-link',
		SECTION_CARD_WRAPPER: '.js-section-card-wrapper',
		SECTION_CARD: '.js-section-card',
	},
	/** Lottie animation elements */
	LOTTIE: {
		MODULE: '.js-lottie-animation',
	},
	/** Swiper/Slider elements */
	SWIPER: {
		CONTAINER: '.js-animation-swiper',
	},
	/** Contact info injection elements */
	CONTACT: {
		EMAIL_LINK: '.js-inject-email-link',
		EMAIL_TEXT: '.js-inject-email-text',
	},
} as const;

/**
 * CSS class constants for animations
 */
export const CSS_CLASSES = {
	/** Animation state classes */
	STATE: {
		LOADING: 'is-loading',
		SCROLLING: 'lenis-scrolling',
		SMOOTH: 'lenis.lenis-scrolling',
	},
	/** Split text classes */
	SPLIT: {
		LINE_PARENT: 'split-line-parent',
		LINE_CHILD: 'split-line-child js-animation-reveal-text',
		WORD_PARENT: 'split-word-parent',
		WORD_CHILD: 'split-word-child js-animation-reveal-text',
	},
	/** Animation utility classes */
	ANIMATION: {
		REVEAL_TEXT: 'js-animation-reveal-text',
		REVEAL_WRAPPER: 'js-animation-reveal-text-wrapper',
		SPIN_SLOW: 'animate-spin-slow',
		FLOATING: 'animate-floating',
		BLINK: 'animate-blink',
		PULSE_SCALE: 'animate-pulse-scale',
	},
	/** Button animation classes */
	BUTTON: {
		SPACE: 'notify-button-space',
		STAR: 'notify-button-star',
		STREAM: 'notify-button-stream',
		PLANE: 'notify-button-plane',
	},
} as const;

/**
 * Animation transform origins
 */
export const TRANSFORM_ORIGIN = {
	TOP_LEFT: 'top left',
	TOP_CENTER: 'top center',
	TOP_RIGHT: 'top right',
	CENTER_LEFT: 'center left',
	CENTER: 'center center',
	CENTER_RIGHT: 'center right',
	BOTTOM_LEFT: 'bottom left',
	BOTTOM_CENTER: 'bottom center',
	BOTTOM_RIGHT: 'bottom right',
} as const;

/**
 * Opacity values for animations
 */
export const OPACITY = {
	HIDDEN: 0,
	VISIBLE: 1,
	SEMI_TRANSPARENT: 0.5,
	PERCENT_100: '100%',
	PERCENT_0: '0%',
} as const;

/**
 * Scale values for animations
 */
export const SCALE = {
	NONE: 0,
	HALF: 0.5,
	NORMAL: 1,
	LARGE: 1.5,
	DOUBLE: 2,
} as const;

/**
 * Animation data attributes
 * Used for configuring animations via HTML attributes
 */
export const DATA_ATTRIBUTES = {
	ANIMATION_SOURCE: 'data-animation-source',
	ANIMATION_NAME: 'data-animation-name',
	ANIMATION_TARGET: 'data-animation-target',
	ANIMATION_LOOP: 'data-animation-loop',
	ANIMATION_INITIAL_STATE: 'data-animation-initial-state',
	ANIMATION_PLAY_CONTROL: 'data-animation-play-control',
} as const;

/**
 * Type definitions for animation configuration
 */
export type AnimationDuration = (typeof ANIMATION_DURATION)[keyof typeof ANIMATION_DURATION];
export type AnimationEasing = (typeof ANIMATION_EASING)[keyof typeof ANIMATION_EASING];
export type AnimationStagger = (typeof ANIMATION_STAGGER)[keyof typeof ANIMATION_STAGGER];
export type ScrollStartPosition = (typeof SCROLL_CONFIG.START)[keyof typeof SCROLL_CONFIG.START];
export type ScrollEndPosition = (typeof SCROLL_CONFIG.END)[keyof typeof SCROLL_CONFIG.END];
export type ScrollToggleAction =
	(typeof SCROLL_CONFIG.TOGGLE_ACTIONS)[keyof typeof SCROLL_CONFIG.TOGGLE_ACTIONS];
export type LottiePlayControl =
	(typeof LOTTIE_CONFIG.PLAY_CONTROL)[keyof typeof LOTTIE_CONFIG.PLAY_CONTROL];
export type TransformOrigin = (typeof TRANSFORM_ORIGIN)[keyof typeof TRANSFORM_ORIGIN];
