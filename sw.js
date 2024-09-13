const CACHE_NAME = 'viernes-13-v1';
const urlsToCache = [
  '/proximo-viernes-13/',
  '/proximo-viernes-13/index.html',
  '/proximo-viernes-13/styles.css',
  '/proximo-viernes-13/script.js',
  '/proximo-viernes-13/jason_voorhess.jpg',
  '/proximo-viernes-13/dancing-jason.gif'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});