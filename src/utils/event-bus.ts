interface ICustomEvent extends Event {
	detail: unknown;
}

export const eventBus = {
	on(event: string, callback: (args: unknown) => void) {
		document.addEventListener(event, (e) => callback((e as ICustomEvent).detail));
	},
	dispatch(event: string, data: unknown) {
		document.dispatchEvent(new CustomEvent(event, { detail: data }));
	},
	remove(event: string, callback: () => void) {
		document.removeEventListener(event, callback);
	},
};
