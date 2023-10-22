export const random = (n?: number): string => ('number' == typeof n ? n : Date.now()).toString(36);

export const report = (
	text: string,
	type: string = '',
	extra: unknown = undefined,
	timeoutMs: number | undefined = undefined,
): void => {
	extra = extra || undefined;
	timeoutMs = timeoutMs || 2000 + text.length * 40;
	type =
		'rep-' +
		(type == 'info' || type == 'i' ? 'info' : type == 'warn' || type == 'w' ? 'warn' : 'alert');

	const id = random();
	const c = document.createElement('DIV');
	c.className = `rep-content ${type}`;
	c.id = id;
	c.innerHTML = '<span class="material-symbols-outlined">close</span>' + text + '<br />' + extra;
	c.addEventListener('click', function (e: Event): void {
		const target = e.target as HTMLElement;
		const x = target?.nodeName == 'I' ? target?.parentElement : target;
		x?.classList.remove('active');
		setTimeout(() => x?.remove(), 400);
	});

	document.getElementById('#report')?.append(c);

	setTimeout(function () {
		document.getElementById(id)?.classList.add('active');
		setTimeout(function () {
			const e = document.getElementById(id);
			if (e) {
				e.classList.remove('active');
				setTimeout(() => e.remove(), 400);
			}
		}, timeoutMs);
	}, 500);
};

export function swMessage(e: MessageEvent) {
	if (e.data.action == 'reset') {
		report('New version found!<br>Installing...');
	}
}
