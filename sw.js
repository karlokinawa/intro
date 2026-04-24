const CACHE_NAME = 'mega4-i150-light-v1';
const ASSETS = [
  "./",
  "./apple-touch-icon.png",
  "./asset_001_0030f0fd.png",
  "./asset_002_1ea255d9.png",
  "./asset_003_131559b4.png",
  "./asset_004_2bfc7189.png",
  "./asset_005_a3f68b2d.png",
  "./asset_006_500ccab5.png",
  "./asset_007_f4ec7b67.png",
  "./asset_008_0919d9dd.png",
  "./asset_009_13a5a9e3.png",
  "./asset_010_74d95042.png",
  "./asset_011_baae323d.png",
  "./asset_012_10fe266d.png",
  "./asset_013_31558f05.png",
  "./asset_014_d624eda7.png",
  "./asset_015_3adea599.png",
  "./asset_016_3adea599.png",
  "./asset_017_107bea15.png",
  "./asset_018_e3b86364.png",
  "./asset_019_576ba167.png",
  "./asset_020_4ee8f3e7.png",
  "./asset_021_907b62c7.png",
  "./asset_022_4ee8f3e7.png",
  "./asset_023_f86d0572.webp",
  "./asset_024_5e3191f0.png",
  "./asset_025_a6a55508.png",
  "./asset_026_e6533cc6.png",
  "./asset_027_c51d5122.png",
  "./asset_028_791ef13f.png",
  "./asset_029_8faa4e94.png",
  "./asset_030_adcd25b8.png",
  "./asset_031_e65546ca.png",
  "./asset_032_0934d48a.png",
  "./asset_033_03d83908.png",
  "./asset_034_e1922c9f.png",
  "./asset_035_d906ede6.png",
  "./asset_036_8f33bf46.png",
  "./asset_037_16431ad2.png",
  "./asset_038_5e9bc658.png",
  "./asset_039_8ababfb4.png",
  "./asset_040_8ababfb4.png",
  "./asset_041_08e16e80.png",
  "./asset_042_08e16e80.png",
  "./asset_043_68c1f5ab.png",
  "./asset_044_4db14c2f.png",
  "./asset_045_559515bb.png",
  "./asset_046_559515bb.png",
  "./asset_047_13ed92e0.png",
  "./asset_048_576ba167.png",
  "./asset_049_6c43ce49.png",
  "./asset_050_b27cc9d6.png",
  "./icon-192.png",
  "./icon-512.png",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key === CACHE_NAME ? null : caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match('./index.html'))
    )
  );
});
