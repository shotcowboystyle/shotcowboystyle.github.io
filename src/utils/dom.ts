export const isVisible = (element: HTMLElement) => {
	const object = element.getBoundingClientRect();
	return object.top < window.innerHeight && object.bottom > 0;
};

export const isElement = (element: HTMLElement) => {
	return typeof HTMLElement === 'object'
		? element instanceof HTMLElement //DOM2
		: element &&
				typeof element === 'object' &&
				element !== null &&
				element.nodeType === 1 &&
				typeof element.nodeName === 'string';
};

export async function isTypoReady() {
	return await document.fonts.ready;
}

/** The ancestor `levels` steps above `element`, or `null` past the root. */
export function ancestorAt(element: Element, levels: number): HTMLElement | null {
	let current: Element | null = element;
	for (let i = 0; i < levels && current; i++) {
		current = current.parentElement;
	}
	return current === element ? null : (current as HTMLElement | null);
}
