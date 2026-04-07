import SplitType from 'split-type';
import type { SplitConfig, TextSplitter } from './types';

/**
 * Handles line-based text splitting operations
 * Responsibility: Split text into lines with nested line wrapping
 */
export class LineSplitter implements TextSplitter {
	private readonly config: SplitConfig;
	private elements: NodeListOf<HTMLElement> | null;

	constructor(config: SplitConfig) {
		this.config = config;
		this.elements = document.querySelectorAll<HTMLElement>(this.config.wrapper);
	}

	/**
	 * Initialize line splitting for all matching elements
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
	 * Setup line splitting for a specific element
	 * Creates nested line structure: parent lines containing child lines
	 */
	setup(element: HTMLElement): void {
		const splitInstance = new SplitType(element, {
			types: 'lines',
			lineClass: this.config.classes.parent,
		});

		if (splitInstance.lines?.length) {
			new SplitType(splitInstance.lines, {
				types: 'lines',
				lineClass: this.config.classes.child,
			});
		}
	}
}
