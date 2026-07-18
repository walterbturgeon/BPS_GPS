const CACHE = 'bps-gps-v1';
const ASSETS = ['./', './index.html', './manifest.json', './logo.svg'];

self.addEventListener('install', (ev) => {
  ev.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (ev) => {
  ev.respondWith(caches.match(ev.request).then((hit) => hit || fetch(ev.request)));
});
