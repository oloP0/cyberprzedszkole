self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('static-v1').then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((response) => {
          if (event.request.method === 'GET' && response.status === 200 && response.type === 'basic') {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});
