// Verifica se o navegador suporta Service Workers
if ('serviceWorker' in navigator) {

    // Adiciona um evento ao carregar a página
    window.addEventListener('load', function() {
        
        // Registra o arquivo 'sw.js' como Service Worker
        navigator.serviceWorker.register('sw.js');
    });

}