<template>
  <a-layout id="container">
    <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <span class="logo">竞赛管理系统</span>
      <Sidebar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <Navbar />
      </a-layout-header>
      <a-layout-content :style="{ background: '#fff', margin: '10px' }">
        <router-view />
      </a-layout-content>
      <a-layout-footer style="padding: 0 0 10px 0; text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/admin/Sidebar'
export default {
  name: 'Home',
  components: { Sidebar, Navbar },
  data () {
    return {
      collapsed: false
    }
  }
}
</script>

<style scoped lang="stylus">
  #container
    min-height: 100vh
    .logo
      display block
      height 32px
      margin 16px
      color white
      line-height 32px
      font-size 20px
      text-align center
      background-color rgba(255, 255, 255, 0.2)
</style>
