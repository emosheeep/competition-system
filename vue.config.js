const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const resolve = dir => path.join(__dirname, '.', dir);

module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.delete('prefetch'); // 否则懒加载不生效
      config.plugin('analyzer').use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static',
        openAnalyzer: false,
      }]);
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        resolve('./src/style/mixins.styl'),
        resolve('./src/style/variables.styl'),
      ],
      injector: 'prepend',
    },
  },
};
