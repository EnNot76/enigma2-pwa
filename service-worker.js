const CACHE_NAME = 'enigma2-cache-v1';
const urlsToCache = [
'/enigma2-pwa/',
'/enigma2-pwa/index.html'
];

self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
return cache.addAll(urlsToCache);
})
);
});

self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => {
return response || fetch(event.request);
})
);
});

self.addEventListener('activate', event => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (!cacheWhitelist.includes(cacheName)) {
return caches.delete(cacheName);
}
})
);
})
);
});
