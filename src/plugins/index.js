// import VueMeta from 'vue-meta'
import AntDesign from 'ant-design-vue';

export default function initPlugins(app) {
  if (process.env.NODE_ENV !== 'production') {
    require('ant-design-vue/dist/antd.min.css');
    require('animate.css');
    app.use(AntDesign);
  }
  // app.use(VueMeta)
}
