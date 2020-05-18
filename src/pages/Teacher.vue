<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
    >
      <Sidebar />
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="padding: 10px; background: white; margin: 10px">
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
import Sidebar from '../components/teacher/Sidebar'
export default {
  name: 'Teacher',
  components: { Sidebar },
  metaInfo: {
    title: '教师'
  }
}
</script>

<style scoped>

</style>
