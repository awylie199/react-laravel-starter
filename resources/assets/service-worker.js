/* eslint no-console: 0 */

const CACHE_NAME = 'react-laravel-starter';

// Delete old caches that are not the current one
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(caches.keys().then(function(keyList) {
        Promise.all(keyList.map(function(key) {
            if (!cacheWhitelist.includes(key)) {
                return caches.delete(key);
            }
        }));
    }));
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', function(event) {
    if (process.env.NODE_ENV !== 'production') {
        event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
            cache.addAll(global.serviceWorkerOption.assets);
        }));
    }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', function(event) {
    if (process.env.NODE_ENV !== 'production') {
        event.respondWith(caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        }));
    }
});
