const CACHE_NAME = "dtec-core-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/offline.html",
  "/icon/icon-192.png",
  "/icon/icon-512.png",
  "/manifest.json",
  "/site.webmanifest"
];

// 1. INSTALL: Pre-cache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("DTEC SW: Pre-caching System Assets");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. ACTIVATE: Purge old system caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("DTEC SW: Purging Legacy Cache", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH: Smart Network-First Strategy
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Navigation requests (Pages)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const offlinePage = await cache.match("/offline.html");
        return offlinePage || new Response("DTEC System Offline. Please reconnect.", {
          status: 200,
          headers: { "Content-Type": "text/html" }
        });
      })
    );
    return;
  }

  // General Assets (Images, CSS, JS)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((networkResponse) => {
        // Only cache valid GET responses
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for images if connection fails completely
        if (event.request.destination === 'image') {
          return caches.match("/icon/icon-192.png");
        }
      });
    })
  );
});