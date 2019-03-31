// const path = require('path');
// function resolve(dir) {
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
  // publicPath: process.env.NODE_ENV === 'production' ? '/classroom/' : './'  ,  //根据www.xxx.com/后面的路径写入（比如www.xxx.com/tool）
  publicPath: '/classroom/',  //根据www.xxx.com/后面的路径写入（比如www.xxx.com/tool）
  devServer: {
    proxy: {
      '/api/classroom': {
        target: 'http://god.ngrok.xiaomiqiu.cn/classroom',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api/classroom': '/'
        }
      }
    }
  },
  // chainWebpack: config => {
  //   const svgRule = config.module.rule('svg')
  //   //必须清除已有的所有loader,否则会附加在该规则现有的loader之后
  //   svgRule.uses.clear()
  //   //添加要替换的 loader
  //   svgRule
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: 'icon-[name]'
  //     })
  // }
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', resolve('src'))
  //   config.module.rules.delete("svg");
  //   config.module
  //     .rule('svg-smart')
  //     .test(/\.svg$/)
  //     .include
  //     .add(resolve('src/icons'))
  //     .end()
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: '[name]'
  //     })
  // }
}
