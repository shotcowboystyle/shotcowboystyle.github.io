export const agent = navigator.userAgent.toLowerCase();

export const isLargeScreen = (): boolean => window.innerWidth >= 1500;

export const isIPad = (): boolean => agent.includes('ipad');

export const isSafari = (): boolean => agent.includes('safari') && !agent.includes('chrome');

export const isEdge = (): boolean => agent.includes('edge/');

export const isMobile = (): boolean =>
	agent.includes('android') || agent.includes('iphone') || agent.includes('ipad');

export const isTablet = () => isMobile() && window.innerWidth >= 640;

export const isMacOS = agent.indexOf('mac os x') !== -1;

export const isMacintoshFirefox = (): boolean => agent.includes('mac') && agent.includes('firefox');

export function iOSVersion(): number | undefined {
	const match = /os (\d+)_(\d+)_?(\d+?)/.exec(agent);

	if (match != null && match.length > 1 && match[1] && match[2]) {
		const version = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3] || '0', 10)];
		return parseFloat(version.join('.'));
	}
}

export function androidVersion(): number | undefined {
	const split = agent.split('android');
	if (split.length > 1) {
		return parseFloat(split[1].split(';')[0]);
	}
}

export const isAppleDevice = (): boolean => agent.startsWith('ip');

// Older mobile devices will default to non-centred camera mode
export function isOldAndroid(): boolean {
	const version = androidVersion();
	return !!version && version < 6;
}

export function isOldApple(): boolean {
	const version = iOSVersion();
	return !!version && version < 9;
}

export function supportsWebGl(): boolean {
	try {
		const canvas = document.createElement('canvas');
		return !!(!!window.WebGLRenderingContext && canvas.getContext('webgl'));
	} catch {
		return false;
	}
}

export const useCenteredCamera = (): boolean => isOldAndroid() || isOldApple() || isIPad();
