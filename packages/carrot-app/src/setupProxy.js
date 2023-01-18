const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware({
      target: "https://api.bunnyscarrot.com",
      changeOrigin: true,
    })
  );
};