import SplitType from 'split-type';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WordSplitter } from './word-splitter';

// Mock SplitType
const mockRevert = vi.fn();
vi.mock('split-type', () => {
	return {
		default: vi.fn().mockImplementation(function (target) {
			// If target is an array/NodeList of words (nested call), don't return words to avoid infinite loops in test assumptions,
			// or just return words in the first call
			const isNestedCall =
				Array.isArray(target) ||
				target instanceof NodeList ||
				target instanceof HTMLCollection ||
				(typeof target === 'object' && target !== null && 'length' in target);

			return {
				revert: mockRevert,
				words: isNestedCall ? undefined : [document.createElement('div')],
			};
		}),
	};
});

describe('WordSplitter', () => {
	const mockConfig = {
		wrapper: '.test-wrapper',
		classes: {
			parent: 'parent-class',
			child: 'child-class',
		},
	};

	beforeEach(() => {
		// Clean up DOM and mocks
		document.body.innerHTML = '';
		vi.clearAllMocks();
	});

	describe('constructor', () => {
		it('should query elements based on config.wrapper', () => {
			const div1 = document.createElement('div');
			div1.className = 'test-wrapper';
			const div2 = document.createElement('div');
			div2.className = 'test-wrapper';
			document.body.appendChild(div1);
			document.body.appendChild(div2);

			const querySpy = vi.spyOn(document, 'querySelectorAll');
			new WordSplitter(mockConfig);
			expect(querySpy).toHaveBeenCalledWith('.test-wrapper');
		});
	});

	describe('init', () => {
		it('should do nothing if no elements are found', () => {
			const splitter = new WordSplitter(mockConfig);
			splitter.init();
			expect(SplitType).not.toHaveBeenCalled();
		});

		it('should call setup for each found element', () => {
			const div1 = document.createElement('div');
			div1.className = 'test-wrapper';
			document.body.appendChild(div1);

			const splitter = new WordSplitter(mockConfig);
			const setupSpy = vi.spyOn(splitter, 'setup');
			splitter.init();

			expect(setupSpy).toHaveBeenCalledTimes(1);
			expect(setupSpy).toHaveBeenCalledWith(div1);
		});
	});

	describe('setup', () => {
		it('should create SplitType instances with correct configurations', () => {
			const div = document.createElement('div');
			const splitter = new WordSplitter(mockConfig);

			splitter.setup(div);

			// Should have been called twice (once for parent, once for child because we mock words array)
			expect(SplitType).toHaveBeenCalledTimes(2);

			// First call check
			expect(SplitType).toHaveBeenNthCalledWith(1, div, {
				types: 'words',
				wordClass: 'parent-class',
			});

			// Second call check (nested)
			// The target will be the mocked words array
			const firstCallInstance = vi.mocked(SplitType).mock.results[0].value;
			expect(SplitType).toHaveBeenNthCalledWith(2, firstCallInstance.words, {
				types: 'words',
				wordClass: 'child-class',
			});
		});

		it('should not create nested SplitType if no words are returned', () => {
			// Adjust mock for this specific test
			vi.mocked(SplitType).mockImplementationOnce(function () {
				return {
					revert: mockRevert,
					words: [], // empty array means no words
				} as unknown as SplitType;
			});

			const div = document.createElement('div');
			const splitter = new WordSplitter(mockConfig);

			splitter.setup(div);

			// Should only be called once
			expect(SplitType).toHaveBeenCalledTimes(1);
		});
	});

	describe('destroy', () => {
		it('should call revert on all instances and clear them', () => {
			const div1 = document.createElement('div');
			div1.className = 'test-wrapper';
			document.body.appendChild(div1);

			const splitter = new WordSplitter(mockConfig);
			splitter.init(); // Creates instances

			splitter.destroy();

			// We had 1 element, which created 2 instances (parent + nested)
			expect(mockRevert).toHaveBeenCalledTimes(2);

			// If we call destroy again, it shouldn't call revert again since instances array should be empty
			mockRevert.mockClear();
			splitter.destroy();
			expect(mockRevert).not.toHaveBeenCalled();
		});
	});
});
