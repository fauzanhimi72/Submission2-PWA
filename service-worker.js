const CACHE_NAME = "supersoccerv2";
var urlsToCache = [
  "/",
  "push.js",
  "nav.html",
  "index.html",
  "images/favicon.png",
  "images/icon-512px.png",
  "images/icon-192px.png",
  "images/home-banner.jpg",
  "css/webfonts/fa-brands-400.eot",
  "css/webfonts/fa-brands-400.svg",
  "css/webfonts/fa-brands-400.ttf",
  "css/webfonts/fa-brands-400.woff",
  "css/webfonts/fa-brands-400.woff2",
  "css/webfonts/fa-regular-400.eot",
  "css/webfonts/fa-regular-400.svg",
  "css/webfonts/fa-regular-400.ttf",
  "css/webfonts/fa-regular-400.woff",
  "css/webfonts/fa-regular-400.woff2",
  "css/webfonts/fa-solid-900.eot",
  "css/webfonts/fa-solid-900.svg",
  "css/webfonts/fa-solid-900.ttf",
  "css/webfonts/fa-solid-900.woff",
  "css/webfonts/fa-solid-900.woff2",
  "css/webfonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "css/webfonts/7Aujp_0qiz-afTfcIyoiGtm2P0wG05Fz4eqVww.woff2",
  "css/webfonts/7Aujp_0qiz-afTfcIyoiGtm2P0wG05Fz4eSVw0iC.woff2",
  "css/webfonts/7Aujp_0qiz-afTfcIyoiGtm2P0wG05Fz4eWVw0iC.woff2",
  "css/webfonts/7Aulp_0qiz-aVz7u3PJLcUMYOFnOkEk30eg.woff2",
  "css/webfonts/7Aulp_0qiz-aVz7u3PJLcUMYOFnOkEk40eiNxw.woff2",
  "css/webfonts/7Aulp_0qiz-aVz7u3PJLcUMYOFnOkEk50eiNxw.woff2",
  "pages/home.html",
  "pages/jadwal.html",
  "pages/favorit.html",
  "css/materialize.min.css",
  "css/custom.css",
  "css/fontawesome/fontawesome.min.css",
  "css/fontawesome/all.min.css",
  "js/materialize.js",
  "js/materialize.min.js",
  "js/nav.js",
  "js/idb.js",
  "js/api.js",
  "js/jquery.min.js",
  "js/main.js",
  "js/pertandingan_terakhir.js",
  "js/pertandingan_mendatang.js",
  "js/jadwal_pertandingan.js",
  "js/detail_pertandingan.js",
  "js/dbfunction.js",
  "js/dbfootball.js",
  "detail_pertandingan.html",
  "manifest.json"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
