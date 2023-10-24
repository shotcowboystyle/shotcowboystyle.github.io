// Receive messages from the main script.
this.onmessage = function (e) {
	if (e.data.action === 'skipWaiting') {
		this.skipWaiting();
	}

	if (e.data.action === 'update') {
		this.registration.update();
	}

	if (e.data.action === 'sync') {
		this.registration.sync.register('sync-news').then(() => {
			// ...
		});
	}

	sendMessage({ type: 'receive', msg: e.data });
};

// Send a message to the main script.
function sendMessage(message) {
	this.clients.matchAll().then((a) => {
		if (a[0]) {
			this.clients.get(a[0].id).then((client) => {
				client.postMessage(message);
			});
		}
	});
}
