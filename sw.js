const CACHE_NAME = 'shree-anjani-v5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './delivery.html',
  './styles.css',
  './app.js',
  './supabase_client.js',
  './seo-schema.js',
  './manifest.json',
  './assets/logo.png',
  './assets/logo.jpg',
  './assets/brand_lockup.png',
  './assets/brand_lockup.jpg',
  './assets/bearings-belts.svg',
  './assets/crusher-machine.svg',
  './assets/rice-mill.svg',
  './assets/workshop-lathe.svg',
  './assets/google-badge.svg',
  './assets/hero-bg.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networked = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networked;
    })
  );
});
