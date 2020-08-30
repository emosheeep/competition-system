<template>
  <GlobalLayout :loading="loading">
    <TabLayout />
  </GlobalLayout>
</template>

<script>
import GlobalLayout from '../layouts/GlobalLayout'
import TabLayout from '../layouts/TabLayout'
import { SET_RACE_LIST, SET_RECORD_LIST, SET_USER_LIST } from '@/store/types'

export default {
  name: 'Student',
  components: { GlobalLayout, TabLayout },
  metaInfo: {
    title: '学生',
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
        this.$store.dispatch(`users/${SET_USER_LIST}`, 'teacher'),
        this.$store.dispatch(`records/${SET_RECORD_LIST}`, {
          sid: account,
        }),
      ]).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>
