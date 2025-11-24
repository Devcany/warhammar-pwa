// WarhammAR Service Worker - Offline Support (Performance Optimized)
const CACHE_NAME = 'warhammar-v1.0.1'; // Bumped version for new optimizations
const RUNTIME_CACHE = 'warhammar-runtime';
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const MAX_RUNTIME_CACHE_SIZE = 50; // Limit runtime cache items

// Performance: Enable debug logs only in development
const DEBUG = false; // Set to true for debugging
const log = (...args) => DEBUG && console.log(...args);

// Files to cache immediately on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install event - precache static resources
self.addEventListener('install', (event) => {
  log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        log('[SW] Precaching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        log('[SW] Skip waiting');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Install failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  log('[SW] Activating service worker...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        log('[SW] Claiming clients');
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('[SW] Activation failed:', error);
      })
  );
});

// Fetch event - network-first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          log('[SW] Cache hit:', event.request.url);

          // Performance: Background fetch for stale-while-revalidate (with error handling)
          fetch(event.request)
            .then((response) => {
              if (response && response.status === 200) {
                return caches.open(RUNTIME_CACHE).then((cache) => {
                  cache.put(event.request, response.clone());
                });
              }
            })
            .catch((error) => {
              // Network failed silently - we already returned cache
              log('[SW] Background fetch failed:', error);
            });

          return cachedResponse;
        }

        // Not in cache, fetch from network
        log('[SW] Fetching from network:', event.request.url);

        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses or opaque responses
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clone the response before caching
            const responseToCache = response.clone();

            // Performance: Cache in background, don't block response
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                return cache.put(event.request, responseToCache);
              })
              .catch((error) => {
                log('[SW] Cache put failed:', error);
              });

            return response;
          })
          .catch((error) => {
            log('[SW] Fetch failed:', event.request.url, error);

            // Return offline page or fallback
            return new Response(
              '<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Offline - WarhammAR</title><style>body{font-family:sans-serif;background:#0a0e27;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center}h1{color:#e94560}</style></head><body><div><h1>⚔️ Offline</h1><p>Du bist offline. Bitte überprüfe deine Internetverbindung.</p><button onclick="location.reload()" style="padding:10px 20px;background:#e94560;border:none;color:#fff;border-radius:5px;cursor:pointer;margin-top:20px">Erneut versuchen</button></div></body></html>',
              {
                headers: { 'Content-Type': 'text/html' },
                status: 503,
                statusText: 'Service Unavailable'
              }
            );
          });
      })
  );
});

// Background sync for future features
self.addEventListener('sync', (event) => {
  log('[SW] Background sync:', event.tag);

  if (event.tag === 'sync-collection') {
    event.waitUntil(syncCollection());
  }
});

async function syncCollection() {
  // Placeholder for future cloud sync
  log('[SW] Syncing collection data...');
  return Promise.resolve();
}

// Push notifications (for future premium features)
self.addEventListener('push', (event) => {
  log('[SW] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Neue Warhammer Updates!',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Öffnen'
      },
      {
        action: 'close',
        title: 'Schließen'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('WarhammAR', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  log('[SW] Notification clicked:', event.action);

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

log('[SW] Service Worker loaded successfully');
