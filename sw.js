// Around the World — app shell cache. Network first, so updates on GitHub show immediately;
// falls back to the cached copy when the phone is offline. Firebase traffic is never touched.
const CACHE='atw-v2';
const SHELL=['./','index.html','config.js','manifest.webmanifest','lib/firebase-app.js','lib/firebase-database.js','lib/firebase-auth.js','lib/qrcode.js',
  'assets/atw-logo.png','assets/logic-logo.png','assets/landmarks.png','assets/map.jpg','icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});
