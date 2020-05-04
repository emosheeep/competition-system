const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    config.externals({
      xlsx: 'XLSX',
      vue: 'Vue',
      moment: 'moment',
      'ant-design-vue': 'antd'
    })
    if (process.env.NODE_ENV === 'production') {
      config.plugin('analyzer').use(BundleAnalyzerPlugin)
      config.plugin('compress').use(CompressionWebpackPlugin, [{
        test: /\.js$|\.html$|\.css$/,
        threshold: 10240, // 超过10kb就压缩
        deleteOriginalAssets: false
      }])
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
  }
}
