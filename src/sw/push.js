this.addEventListener('push', (event) => {
	event.waitUntil(
		this.clients.matchAll().then((clientList) => {
			console.log(`[SERVICE WORKER push] Push had this data: "${event.data.text()}"`);

			const data = event.data.json();

			const title = data.title ?? 'Error';
			const options = {
				body: data.body ?? 'New message from the server!',
				icon: data.icon ?? '/icon/android-chrome-192x192.png',
				badge: data.badge ?? '/icon/favicon-32x32.png',
				image: data.image ?? '/img/og.webp',
				vibrate: data.vibrate ?? [],
				data: data.data ?? {},
			};

			// Focus ...
			const focused = clientList.some((client) => {
				client.postMessage({ msg: data, type: 'push' });
				return client.focused;
			});

			if (focused) {
				// create an action for "focused" on the next line
				options.body += ' [focused]';
			} else if (clientList.length > 0) {
				// create an action for "not focused" on the next line
				options.body += ' [no focused]';
			} else {
				// create an action for "closed" on the next line
				options.body += ' [closed]';
			}

			return this.registration.showNotification(title, options);
		}),
	);
});
