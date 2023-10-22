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
