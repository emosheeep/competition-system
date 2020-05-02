<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider breakpoint="lg" collapsedWidth="0">
      <Sidebar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <Navbar />
      </a-layout-header>
      <a-layout-content :style="{ background: '#fff', margin: '10px' }">
        <keep-alive>
          <router-view />
        </keep-alive>
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
