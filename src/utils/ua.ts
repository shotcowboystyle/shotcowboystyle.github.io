export const isMobile = () => {
	const ua = navigator.userAgent;
	return /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
		ua,
	);
};
