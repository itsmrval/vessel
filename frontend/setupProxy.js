const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/login',
    createProxyMiddleware({
      target: 'http://localhost:2000', // replace with your backend server URL
      changeOrigin: true,
    })
  );
  app.use(
    '/containers',
    createProxyMiddleware({
      target: 'http://localhost:2000', // replace with your backend server URL
      changeOrigin: true,
    })
  );
  app.use(
    '/images',
    createProxyMiddleware({
      target: 'http://localhost:2000', // replace with your backend server URL
      changeOrigin: true,
    })
  );
};
