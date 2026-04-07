import SplitType from 'split-type';
import type { SplitConfig, TextSplitter } from './types';

/**
 * Handles word-based text splitting operations
 * Responsibility: Split text into words with nested word wrapping
 */
export class WordSplitter implements TextSplitter {
	private readonly config: SplitConfig;
	private elements: NodeListOf<HTMLElement> | null;

	constructor(config: SplitConfig) {
		this.config = config;
		this.elements = document.querySelectorAll<HTMLElement>(this.config.wrapper);
	}

	/**
	 * Initialize word splitting for all matching elements
	 */
	init(): void {
		if (!this.elements?.length) {
			return;
		}

		this.elements.forEach((element) => {
			this.setup(element);
		});
	}

	/**
	 * Setup word splitting for a specific element
	 * Creates nested word structure: parent words containing child words
	 */
	setup(element: HTMLElement): void {
		const splitInstance = new SplitType(element, {
			types: 'words',
			wordClass: this.config.classes.parent,
		});

		if (splitInstance.words?.length) {
			new SplitType(splitInstance.words, {
				types: 'words',
				wordClass: this.config.classes.child,
			});
		}
	}
}
