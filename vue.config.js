// const path = require('path');
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }

module.exports = {

  // // webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
  // chainWebpack (config) {
  //   //修改文件引入自定义路径
  //   config.resolve.alias
  //     .set('@', resolve('src'))
  //     .set('style', resolve('src/assets/style'))
  // },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/classroom',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
