const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

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
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          antd_icons: { // 分离vue全家桶
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
