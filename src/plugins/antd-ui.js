import Vue from 'vue'
import AntDesign from 'ant-design-vue'

if (process.env.NODE_ENV !== 'production') {
  require('ant-design-vue/dist/antd.min.css')
  Vue.use(AntDesign)
}
