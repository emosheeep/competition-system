<template>
  <div class="login-state">
    <UserOutlined /> {{ account }}
    <a-divider type="vertical" />
    <a-popconfirm
      title="切换用户？"
      ok-text="确认"
      cancel-text="取消"
      placement="bottomRight"
      @confirm="changeUser"
    >
      <template #icon>
        <QuestionCircleOutlined
          style=""
          color:
          orange
        />
      </template>
      <a><SwapOutlined /></a>
    </a-popconfirm>
  </div>
</template>

<script>
import {
  SwapOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { LOGOUT } from '@/store/types'

export default {
  name: 'LoginState',
  components: {
    SwapOutlined,
    UserOutlined,
    QuestionCircleOutlined,
  },
  inject: {
    loadingStart: 'loadingStart',
    loadingEnd: 'loadingEnd',
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    account () {
      const value = this.user.account
      if (value?.toString().length > 10) {
        return value.slice(0, 7) + '...'
      } else {
        return value
      }
    },
  },
  methods: {
    changeUser () {
      this.loadingStart()
      this.$store.commit(LOGOUT)
      this.$router.replace({ path: '/' }).finally(() => {
        this.loadingEnd()
      })
    },
  },
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
