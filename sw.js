/**
 * Service Worker: SAHABAT PEKA SD - Kabupaten Tabalong
 * Mendukung akses offline 100% baik di Vercel maupun GitHub Pages.
 */

const CACHE_NAME = 'sahabat-peka-v5';

// Aset lokal & CDN penting yang di-cache saat instalasi
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1LklSYTcej0n282IA4zjqXazCcUbdZ0QBZ9Am2yi4cRvoFLmx2vU89loDTwo7yaSatEr9cMG5B9CpJf344OZLtDBnqZ18AS_4WQRRPmG44Y5mgaw6rIPbJQgVLfrc0JgUGpZkM0RcbXYtM-opDmuQblffAmB9uZKx1y47JunIDE9JJ8n5Xi1cfqxhcD7T/s1600/logo%20sahabat%20peka%20new.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './apple-touch-icon-precomposed.png',
  './logo-sahabat-peka-new.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Tinos:ital,wght@0,400;0,700;1,400&display=swap'
];

// 1. Install Event: simpan aset dasar ke cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching app shell & dependencies');
      // Gunakan addAll toleran jika ada URL eksternal yang lambat
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[ServiceWorker] Gagal precache aset:', url, err);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: bersihkan cache versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Menghapus cache versi lama:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Stale-While-Revalidate & Cache-First dengan Offline Fallback
self.addEventListener('fetch', (event) => {
  // Hanya proses request GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Strategi untuk Navigasi Halaman Utama (HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Update cache jika berhasil online
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Jika offline, ambil dari cache
          return caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
            return cachedResponse || caches.match('./index.html') || caches.match('./');
          });
        })
    );
    return;
  }

  // Strategi untuk Aset Statis & CDN (Tailwind, FontAwesome, Fonts, Images)
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        // Jika ada di cache, segera kembalikan & perbarui di background jika online
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Mode offline, biarkan cache bekerja
          });
        return cachedResponse;
      }

      // Jika belum di-cache, fetch dari jaringan dan simpan ke cache
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || (networkResponse.status !== 200 && networkResponse.type !== 'opaque')) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // Fallback offline bila request gambar gagal
          if (event.request.destination === 'image') {
            return caches.match('./icon-192.png');
          }
        });
    })
  );
});

