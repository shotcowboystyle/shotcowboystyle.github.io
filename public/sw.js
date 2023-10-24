const CACHE='cache-1698122482411-dev';
const ASSETS=[];

/*
	Astro-sw
	File: /Users/shotcowboystyle/www/shotcowboystyle.github.io/src/sw/cache.js
*/
/* eslint-disable no-undef */
this.addEventListener('install', (e) =>
	e.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => {
				console.log(`[SERVICE WORKER install] caching "${CACHE}"`);
				cache.addAll(ASSETS);
			})
			.then(() => {
				sendMessage({ text: 'install' });
				self.skipWaiting();
			}),
	),
);

self.addEventListener('activate', (e) =>
	e.waitUntil(
		caches.keys().then(async (ks) => {
			for (const k of ks) {
				if (k !== CACHE) {
					console.log(`[SERVICE WORKER removing] cache "${k}"`);
					await caches.delete(k);
				}
			}

			sendMessage({ text: 'activate', action: 'reset' });
			self.clients.claim();
		}),
	),
);


/*
	Astro-sw
	File: /Users/shotcowboystyle/www/shotcowboystyle.github.io/src/sw/fetch.js
*/
/* eslint-disable no-undef */
const CONFIG = '/config';

this.addEventListener('fetch', (event) => {
	const {
		request,
		request: { url, method },
	} = event;

	// Save||load json data in Cache Storage CONFIG
	if (url.match(CONFIG)) {
		if (method === 'POST') {
			request
				.json()
				.then((body) =>
					caches.open(CACHE).then((cache) => cache.put(CONFIG, new Response(JSON.stringify(body)))),
				);
			return event.respondWith(new Response('{}'));
		} else {
			return event.respondWith(
				caches.match(CONFIG).then((response) => response || new Response('{}')),
			);
		}
	} else {
		// Get & save request in Cache Storage
		if (method !== 'POST') {
			event.respondWith(
				caches.open(CACHE).then(async (cache) => {
					let response = await cache.match(event.request);
					if (response) {
						return response;
					}

					// To fix 'chrome-extension'
					// if (
					// 	url.startsWith('chrome-extension') ||
					// 	url.includes('extension') ||
					// 	!(url.indexOf('http') === 0)
					// ) {
					// 	return await fetch(event.request);
					// }

					response = await cache.match((event.request.url += 'index.html'));
					if (response) {
						return response;
					}

					response = await cache.match((event.request.url += '/index.html'));
					if (response) {
						return response;
					}

					response = await fetch(event.request);

					// To save the request in the cache.
					// 👇 It can cause problems if not carefully filtered.
					// if (
					// 	ASSETS.length > 0 &&
					// 	(url.startsWith('https://cdn.example.com') || url.startsWith('https://fonts.google.com'))
					// ) {
					// 	cache.put(event.request, response.clone());
					// }

					return response;
				}),
			);
		}
	}
});


/*
	Astro-sw
	File: /Users/shotcowboystyle/www/shotcowboystyle.github.io/src/sw/message.js
*/
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


/*
	Astro-sw
	File: /Users/shotcowboystyle/www/shotcowboystyle.github.io/src/sw/notification.js
*/
this.addEventListener('notificationclick', (event) => {
	event.waitUntil(
		this.clients.matchAll().then((clientList) => {
			console.log(
				'[SERVICE WORKER notification] Notification click Received.',
				clientList,
				event.notification.data,
			);

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
						console.log('[SERVICE WORKER client] OpenWindow: ', c)
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


/*
	Astro-sw
	File: /Users/shotcowboystyle/www/shotcowboystyle.github.io/src/sw/push.js
*/
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

