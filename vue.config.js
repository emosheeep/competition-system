const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const cdn = {
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.staticfile.org/moment.js/2.25.0/moment.min.js',
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.5.4/dist/antd.min.js',
    'https://cdn.staticfile.org/xlsx/0.16.0/xlsx.full.min.js'
  ],
  css: [
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.5.4/dist/antd.min.css'
  ]
}
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals({
        xlsx: 'XLSX',
        moment: 'moment',
        vue: 'Vue',
        'ant-design-vue': 'antd'
      })
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
          antd_icons: { // ant图标分离
            name: true,
            test: /@ant-design/,
            priority: 10,
            chunks: 'all'
          }
        }
      }
    }
  },
  devServer: {
    proxy: {
      '/server': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/server': '/server'
        }
      }
    }
  }
}
