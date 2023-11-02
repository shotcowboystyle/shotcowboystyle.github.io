import { BASE64_EMAIL } from '@/constants';

const getDecodeContactEmail = () => atob(BASE64_EMAIL);

export const injectContactEmailLink = (elementId: string) => {
	const link = document.getElementById(elementId);
	if (link) {
		link.setAttribute('href', 'mailto:'.concat(getDecodeContactEmail()));
	}
};

export const injectContactEmailTextContent = (elementId: string) => {
	const element = document.getElementById(elementId);
	if (element) {
		element.textContent = getDecodeContactEmail();
	}
};
