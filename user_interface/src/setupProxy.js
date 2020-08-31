const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api/v1/users/',
        createProxyMiddleware({
            target: 'http://localhost:3005',
            changeOrigin: true,
            pathRewrite : {'^/api/v1/users': ''}
        })
    );
    app.use(
        '/icon-img/',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
    app.use(
        '/socket.io/',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
};