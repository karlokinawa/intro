const CACHE_NAME = 'mega-intro-pwa-v1';
const ASSETS = [
  './',
  './index.html?v=1',
  './manifest.webmanifest?v=1',
  './icon-192.png?v=1',
  './icon-512.png?v=1',
  './apple-touch-icon.png?v=1'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => {
      if (key !== CACHE_NAME && key.startsWith('mega-intro-pwa-v')) {
        return caches.delete(key);
      }
    }));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request, {ignoreSearch: true});
    if (cached) return cached;
    try {
      return await fetch(event.request);
    } catch (e) {
      const fallback = await caches.match('./index.html?v=1', {ignoreSearch: true});
      return fallback || Response.error();
    }
  })());
});