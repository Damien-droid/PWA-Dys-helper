/* eslint-disable no-restricted-globals */

// Service Worker pour PWA Dys-Helper
const CACHE_NAME = 'dys-helper-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Installation du service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Récupération des ressources
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Retourner la ressource mise en cache si elle existe
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});