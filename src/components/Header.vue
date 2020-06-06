<template>
  <div>
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="$emit('update:collapsed', !collapsed)"
    />
    <LoginState class="login-state" />
  </div>
</template>

<script>
import LoginState from './common/LoginState'
export default {
  name: 'Header',
  components: { LoginState },
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
  .login-state
    float right
  .trigger
    font-size 18px
    line-height 64px
    padding 0 24px
    cursor pointer
    transition color 0.3s
    &:hover
      color #1890ff
</style>
