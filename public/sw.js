const CACHE_NAME = "pukara-360-shell-v1";
const OFFLINE_HTML = `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>PUKARA 360 offline</title>
    <style>
      body{margin:0;min-height:100vh;display:grid;place-items:center;background:#071A2C;color:#E7D3B0;font-family:system-ui,-apple-system,Segoe UI,sans-serif}
      main{max-width:520px;padding:32px;border:1px solid rgba(255,255,255,.12);border-radius:28px;background:rgba(255,255,255,.06)}
      h1{color:white;margin:0 0 12px;font-size:28px}
      p{line-height:1.55}
      b{color:#18B7A4}
    </style>
  </head>
  <body>
    <main>
      <h1>PUKARA 360</h1>
      <p><b>Modo sin conexión.</b> No hay red disponible. Volvé a intentar cuando recuperes conectividad.</p>
    </main>
  </body>
</html>`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(["/", "/demo", "/login", "/icons/pukara-icon.svg", "/icons/pukara-maskable.svg"])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() => new Response(OFFLINE_HTML, { headers: { "Content-Type": "text/html; charset=utf-8" } }))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).catch(() => cached))
  );
});
