<template>
  <div class="login-state">
    <a-icon type="user" /> {{ user.account | ellipsis }}
    <a-divider type="vertical" />
    <a-popconfirm
      title="切换用户？"
      ok-text="确认"
      cancel-text="取消"
      @confirm="changeUser"
    >
      <template #icon>
        <a-icon
          type="question-circle-o"
          style="color: orange"
        />
      </template>
      <a-tooltip placement="right">
        <template #title>
          切换用户
        </template>
        <a><a-icon type="swap" /></a>
      </a-tooltip>
    </a-popconfirm>
  </div>
</template>

<script>

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
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    changeUser () {
      this.$router.replace({ path: '/' })
    }
  }
}
</script>

<style scoped lang="stylus">
  .login-state
    display block
    height 32px
    margin 15px 10px
    color lightgrey
    background-color rgba(255, 255, 255, 0.2)
    line-height 32px
    font-size 20px
    text-align center
    user-select none
</style>
