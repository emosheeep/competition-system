<template>
  <div id="app">
    <router-view />
    <Loading :loading="loading" />
  </div>
</template>

<script>
import Loading from './components/common/Loading'
export default {
  name: 'Root',
  components: { Loading },
  provide () {
    return {
      loadingStart: this.loadingStart,
      loadingEnd: this.loadingEnd
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    loadingStart () {
      this.loading = true
    },
    loadingEnd () {
      this.loading = false
    }
  },
  metaInfo: {
    title: '首页',
    titleTemplate: '%s | 竞赛管理系统',
    meta: [
      {
        name: 'keywords',
        content: '南昌大学,软件学院,竞赛,管理系统'
      },
      {
        name: 'description',
        content: '南昌大学软件学院竞赛管理系统，用于管理竞赛数据。学生参赛报备、竞赛数据统计、数据导出。'
      }
    ]
  }
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50

::-webkit-scrollbar
  width 5px
  height 5px
  cursor pointer

::-webkit-scrollbar-thumb
  border-radius 5px
  -webkit-box-shadow inset 0 0 5px rgba(0, 0, 0, 0.2)
  background #e0e5eb

::-webkit-scrollbar-track
    box-shadow inset 0 0 5px rgba(0, 0, 0, 0.1)
    border-radius 0
</style>
