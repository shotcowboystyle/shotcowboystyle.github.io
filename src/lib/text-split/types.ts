/**
 * Configuration for text splitting operations
 */
export interface SplitConfig {
	wrapper: string;
	classes: {
		parent: string;
		child: string;
	};
}

/**
 * DOM configuration for text splitting
 */
export interface SplitDOM {
	lines: SplitConfig;
	words: SplitConfig;
}

/**
 * Interface for text splitter implementations
 */
export interface TextSplitter {
	/**
	 * Initialize the text splitter and process DOM elements
	 */
	init(): void;

	/**
	 * Setup splitting for a specific element
	 */
	setup(element: HTMLElement): void;
}
