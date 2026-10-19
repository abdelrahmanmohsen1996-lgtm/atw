// Around the World — offline/fast-start cache.
// Code libraries, images and fonts: served from the phone's cache instantly, refreshed in the background.
// index.html / config.js / starter pack: network first (max 3 s), so updates on GitHub show up; cache if offline.
// Live game data (Firebase) is never cached.
const CACHE='atw-v3';
const SHELL=['./','index.html','config.js','manifest.webmanifest','lib/firebase-app.js','lib/firebase-database.js',
  'assets/atw-logo.png','assets/logic-logo.png','assets/landmarks.png','assets/map.jpg','icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const put=(req,res)=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(req,cp))}return res};
self.addEventListener('fetch',e=>{
  const req=e.request,u=new URL(req.url);
  if(req.method!=='GET')return;
  const isFont=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if(u.origin!==location.origin&&!isFont)return;
  const isStatic=isFont||/\/(lib|assets)\//.test(u.pathname)||/icon|\.png$|\.jpg$/.test(u.pathname);
  if(isStatic){
    e.respondWith(caches.match(req).then(hit=>{const net=fetch(req).then(r=>put(req,r)).catch(()=>hit);return hit||net}));
    return;
  }
  e.respondWith(new Promise(resolve=>{
    let done=false;const fallback=()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match('index.html'));
    const t=setTimeout(()=>{fallback().then(r=>{if(r&&!done){done=true;resolve(r)}})},3000);
    fetch(req).then(r=>{clearTimeout(t);put(req,r);if(!done){done=true;resolve(r)}})
      .catch(()=>{clearTimeout(t);fallback().then(r=>{if(!done){done=true;resolve(r||Response.error())}})});
  }));
});
