<template>
  <GlobalLayout :loading="loading">
    <TabLayout />
  </GlobalLayout>
</template>

<script>
import GlobalLayout from '../layouts/GlobalLayout'
import TabLayout from '../layouts/tab/TabLayout'
import {
  SET_RACE_LIST,
  SET_RECORD_LIST,
} from '@/store/types'

export default {
  name: 'Teacher',
  components: { GlobalLayout, TabLayout },
  metaInfo: {
    title: '教师',
  },
  provide () {
    return {
      init: this.init,
    }
  },
  data () {
    return {
      loading: true,
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
        this.$store.dispatch(`records/${SET_RECORD_LIST}`, {
          tid: account,
        }),
      ]).finally(() => {
        this.loading = false
      })
    },
  },
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
