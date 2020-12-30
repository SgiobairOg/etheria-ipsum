module.exports = {
  devServer: {
    proxy: {
      '^/dialog': {
        target: 'http://localhost:3333'
      }
    }
  },
  chainWebpack: config => {
    // remove vue-cli-service's progress output
    config.plugins.delete('progress')
  },
  configureWebpack: {
    stats: 'errors-only'
  }
}