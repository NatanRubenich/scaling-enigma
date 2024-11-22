// Nome do cache que será utilizado
let cacheName = 'cache-v1';

// Evento 'install': Disparado quando o Service Worker é instalado
self.addEventListener('install', (e) => {

  // Abre o cache e adiciona recursos iniciais (no momento não há recursos listados)
  let cache = caches.open(cacheName).then((c) => {
    c.addAll([
      // Lista de recursos a serem armazenados no cache durante a instalação
      // Por exemplo, '/index.html', '/styles.css', '/script.js'
    ]);
  });

  // Garante que o cache seja configurado antes de concluir a instalação
  e.waitUntil(cache);
});

// Evento 'fetch': Disparado sempre que o navegador faz uma requisição
self.addEventListener('fetch', function (event) {

  // Define como a requisição será respondida
  event.respondWith(

    // Abre o cache
    caches.open(cacheName).then(function (cache) {
      
      // Verifica se a requisição já existe no cache
      return cache.match(event.request).then(function (response) {
        
        // Se a resposta existe no cache, ela é retornada
        // Caso contrário, a requisição é feita na rede
        return response || fetch(event.request).then(function (response) {
          
          // A resposta da rede é armazenada no cache para uso futuro
          cache.put(event.request, response.clone());
          
          // Retorna a resposta da rede
          return response;
        });
      });
    })
  );

});
