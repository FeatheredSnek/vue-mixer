module.exports = {
  publicPath: '',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/variables.scss"; @import "~@/styles/mixins.scss";`
      },
    }
  }
}
