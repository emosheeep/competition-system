<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider class="sidebar-container">
      <Sidebar />
    </a-layout-sider>
    <a-layout style="margin-left: 200px">
      <a-affix>
        <a-layout-header class="header-container">
          <Header />
        </a-layout-header>
      </a-affix>
      <a-layout-content class="content-container">
        <keep-alive>
          <router-view />
        </keep-alive>
      </a-layout-content>
      <a-layout-footer class="footer-container">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
    <Loading :loading="loading" />
  </a-layout>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Loading from '../components/common/Loading'
import Header from '../components/Header'
import { SET_RACE_LIST, SET_RECORD_LIST, SET_USER_LIST } from '../store/mutation-types'

export default {
  name: 'Student',
  components: { Loading, Sidebar, Header },
  metaInfo: {
    title: '学生'
  },
  provide () {
    return {
      init: this.init
    }
  },
  data () {
    return {
      loading: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.loading = true
      const { account } = this.$store.state.user
      Promise.all([
        this.$store.dispatch(`races/${SET_RACE_LIST}`),
        this.$store.dispatch(`users/${SET_USER_LIST}`, 'teacher'),
        this.$store.dispatch(`records/${SET_RECORD_LIST}`, {
          sid: account
        })
      ]).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .sidebar-container
    overflow auto
    height 100vh
    position fixed
    left 0
  .header-container
    padding 0
    background #fff
    box-shadow 0 0 5px lightgrey
  .content-container
    padding 10px
    background white
    margin 10px
  .footer-container
    padding 0 0 10px 0
    text-align center
</style>
