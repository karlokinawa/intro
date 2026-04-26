const CACHE_NAME = 'mega4-i171-v1';
const ASSETS = [
  "./",
  "./ZIFFERBLATT.png?v=171",
  "./ZIFFERBLATT_low.webp?v=171",
  "./apple-touch-icon.png?v=171",
  "./asset_001_0030f0fd.png?v=171",
  "./asset_002_1ea255d9.png?v=171",
  "./asset_003_131559b4.png?v=171",
  "./asset_004_2bfc7189.png?v=171",
  "./asset_005_500ccab5.png?v=171",
  "./asset_006_f4ec7b67.png?v=171",
  "./asset_007_0919d9dd.png?v=171",
  "./asset_008_13a5a9e3.png?v=171",
  "./asset_009_74d95042.png?v=171",
  "./asset_010_baae323d.png?v=171",
  "./asset_011_10fe266d.png?v=171",
  "./asset_012_31558f05.png?v=171",
  "./asset_013_d624eda7.png?v=171",
  "./asset_014_3adea599.png?v=171",
  "./asset_015_3adea599.png?v=171",
  "./asset_016_107bea15.png?v=171",
  "./asset_017_e3b86364.png?v=171",
  "./asset_018_576ba167.png?v=171",
  "./asset_019_4ee8f3e7.png?v=171",
  "./asset_020_907b62c7.png?v=171",
  "./asset_021_4ee8f3e7.png?v=171",
  "./asset_022_f86d0572.webp?v=171",
  "./asset_023_5e3191f0.png?v=171",
  "./asset_024_a6a55508.png?v=171",
  "./asset_025_e6533cc6.png?v=171",
  "./asset_026_c51d5122.png?v=171",
  "./asset_027_791ef13f.png?v=171",
  "./asset_028_8faa4e94.png?v=171",
  "./asset_029_adcd25b8.png?v=171",
  "./asset_030_e65546ca.png?v=171",
  "./asset_031_0934d48a.png?v=171",
  "./asset_032_03d83908.png?v=171",
  "./asset_033_e1922c9f.png?v=171",
  "./asset_034_d906ede6.png?v=171",
  "./asset_035_8f33bf46.png?v=171",
  "./asset_036_16431ad2.png?v=171",
  "./asset_037_5e9bc658.png?v=171",
  "./asset_038_8ababfb4.png?v=171",
  "./asset_039_8ababfb4.png?v=171",
  "./asset_040_08e16e80.png?v=171",
  "./asset_041_08e16e80.png?v=171",
  "./asset_042_68c1f5ab.png?v=171",
  "./asset_043_4db14c2f.png?v=171",
  "./asset_044_559515bb.png?v=171",
  "./asset_045_559515bb.png?v=171",
  "./asset_046_13ed92e0.png?v=171",
  "./asset_047_576ba167.png?v=171",
  "./asset_048_6c43ce49.png?v=171",
  "./asset_049_b27cc9d6.png?v=171",
  "./icon-192.png?v=171",
  "./icon-512.png?v=171",
  "./index.html?v=171",
  "./m_light.html?v=171",
  "./manifest.webmanifest?v=171"
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
      }).catch(() => caches.match('./index.html?v=171'))
    )
  );
});
