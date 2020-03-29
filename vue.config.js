module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue/' : './',
  outputDir: 'dist/vue',
  devServer: {
    port: 7000,
    hot: true,
    // 开发环境使用
    proxy: process.env.NODE_ENV === 'production' ? '':"http://127.0.0.1:8080", //开发环境的跨域问题解决，后端springboot服务ip 和 端口
  },
  chainWebpack:(config)=>{
    /* 添加分析工具*/
    if(process.env.NODE_ENV ==='production') {
      if(process.env.npm_config_report){
        config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end();
        config.plugins.delete('prefetch')
      }
    }
  }
}