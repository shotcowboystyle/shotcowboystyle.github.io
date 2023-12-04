export const formatDateMonthYear = (date: Date) =>
	new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);

export const timeSince = (date: Date) => {
	const seconds = Math.floor((Number(new Date()) - Number(date)) / 1000);
	let interval = seconds / 31536000; // seconds in a year

	if (interval > 1) {
		return Math.floor(interval) <= 1
			? Math.floor(interval) + ' year ago'
			: Math.floor(interval) + ' years ago';
	}

	interval = seconds / 2592000; // seconds in a month
	if (interval > 1) {
		return Math.floor(interval) <= 1
			? Math.floor(interval) + ' month ago'
			: Math.floor(interval) + ' months ago';
	}

	interval = seconds / 86400; // seconds in a day
	if (interval > 1) {
		return Math.floor(interval) <= 1
			? Math.floor(interval) + ' day ago'
			: Math.floor(interval) + ' days ago';
	}

	interval = seconds / 3600; // seconds in an hour
	if (interval > 1) {
		return Math.floor(interval) <= 1
			? Math.floor(interval) + ' hour ago'
			: Math.floor(interval) + ' hours ago';
	}

	interval = seconds / 60; // seconds in a minute
	if (interval > 1) {
		return Math.floor(interval) <= 1
			? Math.floor(interval) + ' minute ago'
			: Math.floor(interval) + ' minutes ago';
	}

	return seconds <= 60 ? 'Just now' : Math.floor(seconds) + ' seconds ago';
};
