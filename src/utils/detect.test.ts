import { afterEach, describe, expect, it, vi } from 'vitest';

const UA = {
	iPhone:
		'mozilla/5.0 (iphone; cpu iphone os 17_4_1 like mac os x) applewebkit/605.1.15 (khtml, like gecko) version/17.4 mobile/15e148 safari/604.1',
	oldIPhone:
		'mozilla/5.0 (iphone; cpu iphone os 8_1_2 like mac os x) applewebkit/600.1.4 (khtml, like gecko) version/8.0 mobile/12b440 safari/600.1.4',
	iPad: 'mozilla/5.0 (ipad; cpu os 16_3 like mac os x) applewebkit/605.1.15 (khtml, like gecko) version/16.3 mobile/15e148 safari/604.1',
	android:
		'mozilla/5.0 (linux; android 13; pixel 7) applewebkit/537.36 (khtml, like gecko) chrome/120.0.0.0 mobile safari/537.36',
	oldAndroid:
		'mozilla/5.0 (linux; android 4.4.2; sm-g900f) applewebkit/537.36 (khtml, like gecko) chrome/33.0.0.0 mobile safari/537.36',
	macSafari:
		'mozilla/5.0 (macintosh; intel mac os x 10_15_7) applewebkit/605.1.15 (khtml, like gecko) version/17.4 safari/605.1.15',
	macChrome:
		'mozilla/5.0 (macintosh; intel mac os x 10_15_7) applewebkit/537.36 (khtml, like gecko) chrome/120.0.0.0 safari/537.36',
	macFirefox:
		'mozilla/5.0 (macintosh; intel mac os x 10.15; rv:122.0) gecko/20100101 firefox/122.0',
	edge: 'mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/44.0 safari/537.36 edge/12.246',
} as const;

/**
 * `detect.ts` reads `navigator.userAgent` into a module-level const at import
 * time, so the global has to be stubbed before the module is evaluated and the
 * module registry reset between cases.
 */
const loadDetect = async (userAgent: string) => {
	vi.stubGlobal('navigator', { userAgent });
	vi.resetModules();
	return import('./detect');
};

afterEach(() => {
	vi.unstubAllGlobals();
	vi.resetModules();
});

describe('device family', () => {
	it('detects an iPad', async () => {
		const { isIPad } = await loadDetect(UA.iPad);

		expect(isIPad()).toBe(true);
	});

	it('detects an iPhone but not an iPad', async () => {
		const { isIPad } = await loadDetect(UA.iPhone);

		expect(isIPad()).toBe(false);
	});

	it('treats desktop macOS as not mobile', async () => {
		const { isMacOS } = await loadDetect(UA.macSafari);

		expect(isMacOS).toBe(true);
	});

	// Documents current behavior, not desired behavior. `isAppleDevice` tests
	// `agent.startsWith('ip')`, but every real user agent begins with 'mozilla/',
	// so the check can never pass for an actual browser -- including on the Apple
	// devices it is meant to identify.
	it('isAppleDevice never matches a real user agent', async () => {
		for (const userAgent of [UA.iPad, UA.iPhone, UA.macSafari, UA.android]) {
			const { isAppleDevice } = await loadDetect(userAgent);
			expect(isAppleDevice()).toBe(false);
		}

		const { isAppleDevice } = await loadDetect('ipad-bare-token');
		expect(isAppleDevice()).toBe(true);
	});
});

describe('browser detection', () => {
	it('identifies Firefox on macOS', async () => {
		const { isMacintoshFirefox } = await loadDetect(UA.macFirefox);
		expect(isMacintoshFirefox()).toBe(true);

		const safari = await loadDetect(UA.macSafari);
		expect(safari.isMacintoshFirefox()).toBe(false);
	});
});

describe('OS version parsing', () => {
	it('reads the iOS version', async () => {
		const { iOSVersion } = await loadDetect(UA.iPhone);
		expect(iOSVersion()).toBe(17.4);
	});

	it('reads the Android version', async () => {
		const { androidVersion } = await loadDetect(UA.android);
		expect(androidVersion()).toBe(13);
	});

	it('returns undefined when no version is present', async () => {
		const { iOSVersion, androidVersion } = await loadDetect(UA.macChrome);

		expect(iOSVersion()).toBeUndefined();
		expect(androidVersion()).toBeUndefined();
	});
});

describe('legacy device gates', () => {
	it('flags Android below 6 as old', async () => {
		const old = await loadDetect(UA.oldAndroid);
		expect(old.isOldAndroid()).toBe(true);

		const current = await loadDetect(UA.android);
		expect(current.isOldAndroid()).toBe(false);
	});

	it('flags iOS below 9 as old', async () => {
		const old = await loadDetect(UA.oldIPhone);
		expect(old.isOldApple()).toBe(true);

		const current = await loadDetect(UA.iPhone);
		expect(current.isOldApple()).toBe(false);
	});

	it('uses the centered camera on old and iPad devices only', async () => {
		const iPad = await loadDetect(UA.iPad);
		expect(iPad.useCenteredCamera()).toBe(true);

		const oldAndroid = await loadDetect(UA.oldAndroid);
		expect(oldAndroid.useCenteredCamera()).toBe(true);

		const modern = await loadDetect(UA.macChrome);
		expect(modern.useCenteredCamera()).toBe(false);
	});
});

describe('viewport helpers', () => {
	it('treats widths at or above 1500 as large screens', async () => {
		const { isLargeScreen } = await loadDetect(UA.macChrome);

		window.innerWidth = 1500;
		expect(isLargeScreen()).toBe(true);

		window.innerWidth = 1499;
		expect(isLargeScreen()).toBe(false);
	});
});

describe('supportsWebGl', () => {
	// happy-dom has no WebGL implementation, so this documents the fallback path
	// that real browsers without WebGL would also take.
	it('returns false when no WebGL context is available', async () => {
		const { supportsWebGl } = await loadDetect(UA.macChrome);

		expect(supportsWebGl()).toBe(false);
	});
});
