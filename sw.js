// Service worker: fa funzionare il sito anche senza connessione.
// Strategia "rete prima, poi copia salvata": con internet si vede sempre
// la versione aggiornata; senza internet si usa l'ultima copia salvata.
const CACHE = 'master-tome-v2';
const FILES = [
  './',
  'index.html',
  'css/style.css',
  'js/data.js',
  'js/bestiario.js',
  'js/app.js',
  'manifest.json',
  'img/icon-180.png',
  'img/icon-192.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })
        .then((hit) => hit || caches.match('index.html')))
  );
});
