import { injectContactEmailLink, injectContactEmailTextContent } from '@/utils/email';

export default class InjectContactInfo {
	DOM: {
		emailLinkEl: string;
		emailTextEl: string;
	};

	emailLinkModules: NodeListOf<HTMLAnchorElement>;
	emailTextModules: NodeListOf<HTMLElement>;

	constructor() {
		this.DOM = {
			emailLinkEl: '.js-inject-email-link',
			emailTextEl: '.js-inject-email-text',
		};

		this.emailLinkModules = document.querySelectorAll(this.DOM.emailLinkEl);
		this.emailTextModules = document.querySelectorAll(this.DOM.emailTextEl);

		this.init();
	}

	init() {
		if (this.emailLinkModules.length) {
			this.emailLinkModules.forEach(($el) => {
				this.setupEmailLinks($el);
			});
		}

		if (this.emailTextModules.length) {
			this.emailTextModules.forEach(($el) => {
				this.setupEmailText($el);
			});
		}
	}

	setupEmailLinks(emailLinkEl: HTMLAnchorElement) {
		injectContactEmailLink(emailLinkEl);
	}

	setupEmailText(emailTextEl: HTMLElement) {
		injectContactEmailTextContent(emailTextEl);
	}
}
