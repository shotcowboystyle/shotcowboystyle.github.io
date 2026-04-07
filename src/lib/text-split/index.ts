import { LineSplitter } from './line-splitter';
import type { SplitDOM } from './types';
import { WordSplitter } from './word-splitter';

/**
 * Facade for text splitting operations
 * Responsibility: Compose line and word splitters, maintain backward compatibility
 */
export default class SplitText {
	DOM: SplitDOM;

	splitLineModules: NodeListOf<HTMLElement> | null;
	splitWordModules: NodeListOf<HTMLElement> | null;

	private lineSplitter: LineSplitter;
	private wordSplitter: WordSplitter;

	constructor() {
		this.DOM = {
			lines: {
				wrapper: '.js-split-lines',
				classes: {
					parent: 'split-line-parent',
					child: 'split-line-child js-animation-reveal-text',
				},
			},
			words: {
				wrapper: '.js-split-words',
				classes: {
					parent: 'split-word-parent',
					child: 'split-word-child js-animation-reveal-text',
				},
			},
		};

		this.lineSplitter = new LineSplitter(this.DOM.lines);
		this.wordSplitter = new WordSplitter(this.DOM.words);

		// Maintain backward compatibility with original API
		this.splitLineModules = document.querySelectorAll<HTMLElement>(this.DOM.lines.wrapper);
		this.splitWordModules = document.querySelectorAll<HTMLElement>(this.DOM.words.wrapper);

		this.init();
	}

	/**
	 * Initialize both line and word splitting
	 */
	init(): void {
		this.lineSplitter.init();
		this.wordSplitter.init();
	}

	/**
	 * Setup line splitting for a specific element
	 * Maintained for backward compatibility
	 */
	setupLines(element: HTMLElement): void {
		this.lineSplitter.setup(element);
	}

	/**
	 * Setup word splitting for a specific element
	 * Maintained for backward compatibility
	 */
	setupWords(element: HTMLElement): void {
		this.wordSplitter.setup(element);
	}
}

// Export types and individual splitters for advanced usage
export { LineSplitter } from './line-splitter';
export { WordSplitter } from './word-splitter';
export type { SplitConfig, SplitDOM, TextSplitter } from './types';
