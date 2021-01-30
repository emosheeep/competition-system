const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const resolve = dir => path.join(__dirname, '.', dir);
const cdn = {
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://lib.baomitu.com/moment.js/latest/moment.min.js',
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.2/dist/antd.min.js',
    'https://cdn.staticfile.org/xlsx/0.16.2/xlsx.full.min.js',
    'https://unpkg.com/qiniu-js@2.5.5/dist/qiniu.min.js',
  ],
  css: [
    'https://cdn.staticfile.org/normalize/8.0.1/normalize.min.css',
    'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.2/dist/antd.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css',
  ],
};
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals({
        vue: 'Vue',
        xlsx: 'XLSX',
        moment: 'moment',
        'qiniu-js': 'qiniu',
        'ant-design-vue': 'antd',
      });
      config.plugins.delete('prefetch'); // 否则懒加载不生效
      config.plugin('lodash').use(LodashWebpackPlugin);
      config.plugin('analyzer').use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static',
        openAnalyzer: false,
      }]);
      config.plugin('compress').use(CompressionWebpackPlugin, [{
        test: /\.js$|\.html$|\.css$/,
        threshold: 10240, // 超过10kb就压缩
        deleteOriginalAssets: false,
      }]);
      config.plugin('html').tap(args => {
        args[0].cdn = cdn;
        return args;
      });
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
