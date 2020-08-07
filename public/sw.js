// Turn on logging
workbox.setConfig({
  debug: true
});

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute(self.__precacheManifest)

self.addEventListener('push', function(event) {
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const data = JSON.parse(event.data.text());
  const options = {
    body: data.title,
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
