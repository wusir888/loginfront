module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api' // 如果后端API不包含/api前缀，可以改为 '^/api': ''
        }
      }
    }
  }
} 