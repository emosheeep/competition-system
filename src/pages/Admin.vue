<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      :collapsed="collapsed"
      :collapsible="true"
      :trigger="null"
    >
      <Sidebar :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <Header :collapsed.sync="collapsed" />
      </a-layout-header>
      <a-layout-content style="padding: 10px; background: white; margin: 10px">
        <keep-alive exclude="RaceDetailWithRecords">
          <router-view />
        </keep-alive>
      </a-layout-content>
      <a-layout-footer style="padding: 0 0 10px 0; text-align: center">
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
  name: 'Home',
  components: { Loading, Sidebar, Header },
  metaInfo: {
    title: '管理员'
  },
  provide () {
    return {
      init: this.init
    }
  },
  data () {
    return {
      loading: true,
      collapsed: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.loading = true
      Promise.all([
        this.$store.dispatch(`users/${SET_USER_LIST}`),
        this.$store.dispatch(`races/${SET_RACE_LIST}`),
        this.$store.dispatch(`records/${SET_RECORD_LIST}`)
      ]).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
