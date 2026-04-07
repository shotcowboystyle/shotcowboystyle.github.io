export const random = (n?: number): string => ('number' == typeof n ? n : Date.now()).toString(36);

export const report = (
	text: string,
	type: string = '',
	extra: unknown = undefined,
	timeoutMs: number | undefined = undefined,
): void => {
	extra = extra || undefined;
	timeoutMs = timeoutMs || 2000 + text.length * 40;
	const TYPE_PREFIX = 'rep-';
	const TYPE_MAP: Record<string, string> = { info: 'info', i: 'info', warn: 'warn', w: 'warn' };
	type = TYPE_PREFIX + (TYPE_MAP[type] ?? 'alert');

	const id = random();
	const c = document.createElement('DIV');
	c.className = `rep-content ${type}`;
	c.id = id;

	// Create close icon safely
	const closeIcon = document.createElement('span');
	closeIcon.className = 'material-symbols-outlined';
	closeIcon.textContent = 'close';
	c.appendChild(closeIcon);

	// Add text content safely using textContent to prevent XSS
	const textNode = document.createElement('span');
	textNode.textContent = text;
	c.appendChild(textNode);

	// Add line break and extra content if present
	if (extra !== undefined) {
		c.appendChild(document.createElement('br'));
		const extraNode = document.createElement('span');
		extraNode.textContent = String(extra);
		c.appendChild(extraNode);
	}

	c.addEventListener('click', function (e: Event): void {
		const target = e.target as HTMLElement;
		const x = target?.nodeName == 'I' ? target?.parentElement : target;
		x?.classList.remove('active');
		setTimeout(() => x?.remove(), 400);
	});

	document.getElementById('report')?.append(c);

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
		report('New version found! Installing...');
	}
}
