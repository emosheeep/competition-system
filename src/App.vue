<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '首页',
    titleTemplate: '%s | 竞赛管理系统',
    meta: [
      { name: 'keywords', content: '南昌大学,软件学院,竞赛,管理系统' },
      { name: 'description', content: '南昌大学软件学院竞赛管理系统，用于管理竞赛数据。学生参赛报备、竞赛数据统计、数据导出。' }
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
</style>
