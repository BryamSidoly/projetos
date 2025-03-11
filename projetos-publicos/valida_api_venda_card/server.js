const http = require('http');
const httpServer = require('http-server');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Configuração do proxy
const proxy = createProxyMiddleware('/api', {
  target: 'https://testescard.limbersoftware.com.br',
  changeOrigin: true,
});

// Criação do servidor HTTP
const server = http.createServer((req, res) => {
  // Adapte para atender às suas necessidades (por exemplo, servir arquivos estáticos)
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, this is your local server!');
});

// Aplicação do middleware de proxy
server.on('request', (req, res) => {
  if (req.url.startsWith('/api')) {
    proxy(req, res);
  } else {
    // Lida com outras solicitações, por exemplo, servindo arquivos estáticos
    // Você pode ajustar isso conforme necessário
    httpServer({ root: '.', port: 8080, open: false })(req, res);
  }
});

// Inicia o servidor
server.listen(3000, () => {
  console.log('Servidor local está ouvindo na porta 3000');
});