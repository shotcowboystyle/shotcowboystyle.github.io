export const getRandomColor = () => {
	const array = new Uint8Array(3);
	crypto.getRandomValues(array);

	return (
		'#' +
		Array.from(array)
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('')
			.toUpperCase()
	);
};
