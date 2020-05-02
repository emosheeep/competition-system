const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  chainWebpack: config => {
    config.externals({
      xlsx: 'XLSX'
    })
    if (process.env.NODE_ENV === 'production') {
      config.plugin('analyzer').use(BundleAnalyzerPlugin)
    }
  }
}
