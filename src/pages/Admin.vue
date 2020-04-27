<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <Sidebar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;">
        <Navbar />
      </a-layout-header>
      <a-layout-content style="margin: 10px">
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
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
  #components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
