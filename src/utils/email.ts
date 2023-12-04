import { BASE64_EMAIL } from '@/constants';

const getDecodeContactEmail = () => atob(BASE64_EMAIL);

export const injectContactEmailLink = (linkContainer: HTMLAnchorElement) => {
	if (linkContainer) {
		linkContainer.setAttribute('href', 'mailto:'.concat(getDecodeContactEmail()));
	}
};

export const injectContactEmailTextContent = (textEl: HTMLElement) => {
	if (textEl) {
		textEl.textContent = getDecodeContactEmail();
	}
};
