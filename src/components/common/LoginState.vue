<template>
  <div class="login-state">
    <a-icon type="user" /> {{ user.account | ellipsis }}
    <a-divider type="vertical" />
    <a-popconfirm
      title="切换用户？"
      ok-text="确认"
      cancel-text="取消"
      placement="bottomRight"
      @confirm="changeUser"
    >
      <template #icon>
        <a-icon
          type="question-circle-o"
          style="color: orange"
        />
      </template>
      <a><a-icon type="swap" /></a>
    </a-popconfirm>
  </div>
</template>

<script>
import { LOGOUT } from '../../store/mutation-types'

export default {
  name: 'LoginState',
  filters: {
    ellipsis (value) {
      if (value?.toString().length > 10) {
        return value.slice(0, 7) + '...'
      } else {
        return value
      }
    }
  },
  inject: {
    loadingStart: 'loadingStart',
    loadingEnd: 'loadingEnd'
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    changeUser () {
      this.loadingStart()
      this.$store.commit(LOGOUT)
      this.$router.replace({ path: '/' }).finally(() => {
        this.loadingEnd()
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .login-state
    display inline-block
    height 32px
    margin 15px 10px
    line-height 32px
    font-size 20px
    text-align center
    user-select none
</style>
