const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const cdn = {
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://lib.baomitu.com/moment.js/latest/moment.min.js',
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.2/dist/antd.min.js',
    'https://cdn.staticfile.org/xlsx/0.16.2/xlsx.full.min.js',
    'https://unpkg.com/qiniu-js@2.5.5/dist/qiniu.min.js'
  ],
  css: [
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.2/dist/antd.min.css'
  ]
}
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals({
        vue: 'Vue',
        xlsx: 'XLSX',
        moment: 'moment',
        'qiniu-js': 'qiniu',
        'ant-design-vue': 'antd'
      })
      config.plugins.delete('prefetch') // 否则懒加载不生效
      config.plugin('analyzer').use(BundleAnalyzerPlugin)
      config.plugin('lodash').use(LodashWebpackPlugin)
      config.plugin('compress').use(CompressionWebpackPlugin, [{
        test: /\.js$|\.html$|\.css$/,
        threshold: 10240, // 超过10kb就压缩
        deleteOriginalAssets: false
      }])
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: { // 公共依赖提取
            name: 'common',
            chunks: 'all',
            minChunks: 2,
            priority: 10
          },
          vue: { // vue依赖分离
            name: true,
            test: /vue/,
            priority: 10,
            chunks: 'all'
          }
        }
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
