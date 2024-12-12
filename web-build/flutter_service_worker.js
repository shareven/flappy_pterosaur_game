'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "77a2bd99c7352290783dcca5bacccf19",
"version.json": "ce433d7181e6503c4e82c16781b38904",
"splash/img/light-2x.png": "8e4258a83f52a110a4f8e267341cb44d",
"splash/img/dark-4x.png": "c5c76dcbc4226f28be2b48dfc6538ad3",
"splash/img/light-3x.png": "850d5cff8349e086ce3f2ef1f0794218",
"splash/img/dark-3x.png": "850d5cff8349e086ce3f2ef1f0794218",
"splash/img/light-4x.png": "c5c76dcbc4226f28be2b48dfc6538ad3",
"splash/img/dark-2x.png": "8e4258a83f52a110a4f8e267341cb44d",
"splash/img/dark-1x.png": "01b463080d6dad65a1a9b23d332dbb56",
"splash/img/light-1x.png": "01b463080d6dad65a1a9b23d332dbb56",
"index.html": "02fa0e1ddac5b2a28fb2e49b2e144e9c",
"/": "02fa0e1ddac5b2a28fb2e49b2e144e9c",
"main.dart.js": "a7ea0821e8ceff0bf95d170de3979a25",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"favicon.png": "2941157abbb3a2e0fce887731daa4d9e",
"icons/Icon-192.png": "a54dbb80b65fd1015839b3f4b464901c",
"icons/Icon-maskable-192.png": "a54dbb80b65fd1015839b3f4b464901c",
"icons/Icon-maskable-512.png": "6a844925fae3d54430f1991cea9f2ec7",
"icons/Icon-512.png": "6a844925fae3d54430f1991cea9f2ec7",
"manifest.json": "8f3f7440e0cbd5d8a70a031ba6cd8276",
"assets/AssetManifest.json": "c347f68b90180edee7f1aebd53fae320",
"assets/NOTICES": "a9dfbbe1be259d9c9f0a3691e1a1e7e3",
"assets/FontManifest.json": "9b66b99f794436da7c47a64013645f15",
"assets/AssetManifest.bin.json": "772d97fef485ca36e3c1a0f5d809898f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "837d4b4745d80b76789148ead2a70b8e",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/assets/images/pterosaur_midflap.png": "695120e879df1d6d6f71a48014f48f88",
"assets/assets/images/pterosaur_upflap.png": "87bfc423298b8f17cb9d911c89587fe4",
"assets/assets/images/clouds.png": "374513ba0744127e31d02df48b4b5612",
"assets/assets/images/background.png": "214a0a70e9ae043a415827cac6e18193",
"assets/assets/images/menu.jpg": "f9eb96bf64f9eba99fdc3433b628de79",
"assets/assets/images/logo.jpg": "37d5107ecacec9c10be21b01d1632168",
"assets/assets/images/gameover.png": "b82eea6dbb4771dd5e9cd1cd7dc39648",
"assets/assets/images/ground.png": "177b44c637520dc293a834c27a9d7778",
"assets/assets/images/pipe.png": "091333756afc93b5b7990b1ee4c43e63",
"assets/assets/images/pterosaur_downflap.png": "8f363454d31ad1dd7a7ffda806722cad",
"assets/assets/images/message.png": "05ca0752d1d30c504cbfa39fdd4b371a",
"assets/assets/images/pipe_rotated.png": "fe5ae3384732b22c8bb0ce7eabfbecf1",
"assets/assets/audio/point.wav": "5a6c267d6743faf5069536fda2553b27",
"assets/assets/audio/collision.wav": "0941f389fbd65a06291a90dd17ef2e36",
"assets/assets/audio/fly.wav": "4355dd665aa14ae22458f03e6b5643f8",
"assets/assets/fonts/Game.ttf": "d67d06f7d85dbc599e8e422605c25130",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
