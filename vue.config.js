module.exports = {
  // publicPath : "/vue/",
  publicPath: process.env.NODE_ENV === 'production' ? '/vue/' : './',
  outputDir: 'dist/vue',
  devServer: {
    port: 7000,
    hot: true
  }
}