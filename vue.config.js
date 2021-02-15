const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const resolve = dir => path.join(__dirname, '.', dir);

module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.delete('prefetch'); // 否则懒加载不生效
      config.plugin('lodash').use(LodashWebpackPlugin);
      config.plugin('analyzer').use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static',
        openAnalyzer: false,
      }]);
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
            priority: 10,
          },
          vue: { // vue依赖分离
            name: true,
            test: /vue/,
            priority: 10,
            chunks: 'all',
          },
        },
      },
    },
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
