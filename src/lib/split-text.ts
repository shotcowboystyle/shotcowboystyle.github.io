import SplitType from 'split-type';

export default class SplitText {
	DOM: {
		lines: {
			wrapper: string;
			classes: {
				parent: string;
				child: string;
			};
		};
		words: {
			wrapper: string;
			classes: {
				parent: string;
				child: string;
			};
		};
	};

	splitLineModules: NodeListOf<HTMLElement> | null;
	splitWordModules: NodeListOf<HTMLElement> | null;

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

		this.splitLineModules = document.querySelectorAll<HTMLElement>(this.DOM.lines.wrapper);
		this.splitWordModules = document.querySelectorAll<HTMLElement>(this.DOM.words.wrapper);

		this.init();
	}

	init() {
		if (this.splitLineModules?.length) {
			for (const $el of this.splitLineModules) {
				this.setupLines($el);
			}
		}

		if (this.splitWordModules?.length) {
			for (const $el of this.splitWordModules) {
				this.setupWords($el);
			}
		}
	}

	setupLines($el: HTMLElement) {
		let SplitTypeInstance = new SplitType($el, {
			types: 'lines',
			lineClass: this.DOM.lines.classes.parent,
		});

		if (SplitTypeInstance.lines?.length) {
			SplitTypeInstance = new SplitType(SplitTypeInstance.lines, {
				types: 'lines',
				lineClass: this.DOM.lines.classes.child,
			});
		}
	}

	setupWords($el: HTMLElement) {
		let SplitTypeInstance = new SplitType($el, {
			types: 'words',
			wordClass: this.DOM.words.classes.parent,
		});

		if (SplitTypeInstance.words?.length) {
			SplitTypeInstance = new SplitType(SplitTypeInstance.words, {
				types: 'words',
				wordClass: this.DOM.words.classes.child,
			});
		}
	}
}
