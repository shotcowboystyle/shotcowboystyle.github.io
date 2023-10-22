export const formatDateMonthYear = (date: Date) =>
	new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
