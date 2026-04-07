this.addEventListener('notificationclick', (event) => {
	event.waitUntil(
		this.clients.matchAll().then((clientList) => {
			const data = 'undefined' !== typeof event.notification['data'] ? event.notification.data : {};

			event.notification.close();

			if (clientList.length > 0) {
				clientList[0].focus();
				return clientList[0].postMessage({
					msg: data,
					type: 'clientList[0]',
				});
			} else {
				this.clients
					.openWindow('/profile')
					.then((c) => {
						return c;
					})
					.then((a) => {
						return a.postMessage({
							msg: data,
							type: 'clientList - clients - c',
						});
					});
			}
		}),
	);
});
