import { afterEach, describe, expect, it, vi } from 'vitest';
import { isMobile } from './ua';

describe('isMobile', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	const mobileUAs = [
		'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36',
		'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1',
		'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1',
		'Mozilla/5.0 (iPod touch; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1',
		'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)',
		'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+',
		'Mozilla/5.0 (Linux; U; en-US) AppleWebKit/528.5+ (KHTML, like Gecko, Safari/528.5+) Version/4.0 Kindle/3.0.0',
		'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.0.141.16-Gen4_11004910) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true',
		'Mozilla/5.0 (webOS/1.4.1.1; U; en-US) AppleWebKit/532.2 (KHTML, like Gecko) Version/1.0 Safari/532.2 Pre/1.0',
		'Mozilla/5.0 (hpwOS/2.2.4; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/234.83 Safari/534.6 TouchPad/1.0',
		'Opera/9.80 (Android; Opera Mini/36.2.2254/119.132; U; id) Presto/2.12.423 Version/12.16',
		'Opera/9.80 (Android; Opera Mobi/36.2.2254/119.132; U; id) Presto/2.12.423 Version/12.16',
	];

	const desktopUAs = [
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
		'Mozilla/5.0 (X11; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
	];

	it.each(mobileUAs)('returns true for mobile UA: %s', (ua) => {
		vi.stubGlobal('navigator', { userAgent: ua });
		expect(isMobile()).toBe(true);
	});

	it.each(desktopUAs)('returns false for desktop UA: %s', (ua) => {
		vi.stubGlobal('navigator', { userAgent: ua });
		expect(isMobile()).toBe(false);
	});

	it('returns false when navigator.userAgent is undefined', () => {
		vi.stubGlobal('navigator', { userAgent: undefined });
		expect(isMobile()).toBe(false);
	});

	it('returns false when navigator.userAgent is empty string', () => {
		vi.stubGlobal('navigator', { userAgent: '' });
		expect(isMobile()).toBe(false);
	});
});
