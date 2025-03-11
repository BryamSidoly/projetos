const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // Sua API endpoint
    createProxyMiddleware({
      target: 'https://testescard.limbersoftware.com.br',
      changeOrigin: true,
    })
  );
};