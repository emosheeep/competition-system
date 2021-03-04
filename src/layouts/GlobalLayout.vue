<template>
  <a-layout class="container">
    <a-layout-sider class="sidebar-container">
      <slot name="sidebar">
        <Sidebar /> <!-- Sidebar -->
      </slot>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header-container">
        <slot name="header">
          <Header /> <!-- Header -->
        </slot>
      </a-layout-header>
      <a-layout-content class="content-container">
        <slot /> <!-- Content -->
      </a-layout-content>
      <a-layout-footer class="footer-container">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
    <Loading :loading="loading" />
  </a-layout>
</template>

<script>
import Loading from '../components/common/Loading';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
export default {
  name: 'Layout',
  components: { Loading, Header, Sidebar },
  props: {
    loading: Boolean,
  },
};
</script>

<style lang="stylus" scoped>
.container
  height 100vh
.header-container
  padding 0
  background #fff
  box-shadow 0 0 5px lightgrey
.content-container
  padding 10px
  background white
  margin 10px
  overflow auto
.footer-container
  padding 0 0 10px 0
  text-align center
</style>
