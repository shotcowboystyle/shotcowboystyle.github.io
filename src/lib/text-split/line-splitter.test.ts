import SplitType from 'split-type';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LineSplitter } from './line-splitter';

vi.mock('split-type', () => {
	const SplitTypeMock = vi.fn();
	SplitTypeMock.prototype.revert = vi.fn();
	return { default: SplitTypeMock };
});

describe('LineSplitter', () => {
	let splitter: LineSplitter;
	const mockConfig = {
		wrapper: '.test-wrapper',
		classes: {
			parent: 'parent-class',
			child: 'child-class',
		},
	};

	beforeEach(() => {
		document.body.innerHTML = `
			<div class="test-wrapper">Line 1</div>
			<div class="test-wrapper">Line 2</div>
			<div class="other">Other</div>
		`;
		vi.clearAllMocks();
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	describe('constructor', () => {
		it('should query elements matching the wrapper selector', () => {
			splitter = new LineSplitter(mockConfig);
			// Indirectly testing via init since elements are private
			splitter.init();
			// SplitType should be instantiated for the two .test-wrapper elements
			expect(SplitType).toHaveBeenCalledTimes(2);
		});
	});

	describe('init', () => {
		it('should do nothing if no elements are found', () => {
			document.body.innerHTML = '';
			splitter = new LineSplitter(mockConfig);
			splitter.init();
			expect(SplitType).not.toHaveBeenCalled();
		});

		it('should call setup for each found element', () => {
			splitter = new LineSplitter(mockConfig);
			const setupSpy = vi.spyOn(splitter, 'setup');
			splitter.init();
			expect(setupSpy).toHaveBeenCalledTimes(2);
		});
	});

	describe('setup', () => {
		it('should create SplitType instance for parent', () => {
			splitter = new LineSplitter(mockConfig);
			const element = document.createElement('div');
			splitter.setup(element);

			expect(SplitType).toHaveBeenCalledWith(element, {
				types: 'lines',
				lineClass: mockConfig.classes.parent,
			});
		});

		it('should create nested SplitType instance if parent has lines', () => {
			const mockLines = [document.createElement('div')];

			// Mock the next implementation to return an instance with lines
			vi.mocked(SplitType).mockImplementationOnce(function (this: SplitType) {
				this.lines = mockLines;
				this.revert = vi.fn();
				return this;
			} as unknown as typeof SplitType);

			splitter = new LineSplitter(mockConfig);
			const element = document.createElement('div');
			splitter.setup(element);

			// Should have been called twice - once for parent, once for child
			expect(SplitType).toHaveBeenCalledTimes(2);

			// Second call should be for nested lines
			expect(SplitType).toHaveBeenNthCalledWith(2, mockLines, {
				types: 'lines',
				lineClass: mockConfig.classes.child,
			});
		});
	});

	describe('destroy', () => {
		it('should call revert on all SplitType instances and clear them', () => {
			const mockRevert1 = vi.fn();
			const mockRevert2 = vi.fn();

			vi.mocked(SplitType)
				.mockImplementationOnce(function (this: SplitType) {
					this.lines = [];
					this.revert = mockRevert1;
					return this;
				} as unknown as typeof SplitType)
				.mockImplementationOnce(function (this: SplitType) {
					this.lines = [];
					this.revert = mockRevert2;
					return this;
				} as unknown as typeof SplitType);

			splitter = new LineSplitter(mockConfig);
			splitter.init(); // Creates 2 instances

			splitter.destroy();

			expect(mockRevert1).toHaveBeenCalled();
			expect(mockRevert2).toHaveBeenCalled();

			// Calling destroy again should not throw and not call revert again
			mockRevert1.mockClear();
			mockRevert2.mockClear();

			splitter.destroy();
			expect(mockRevert1).not.toHaveBeenCalled();
			expect(mockRevert2).not.toHaveBeenCalled();
		});
	});
});
