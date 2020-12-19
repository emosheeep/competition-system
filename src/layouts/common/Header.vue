<template>
  <div>
    <LoginState class="login-state" />
  </div>
</template>

<script>
import LoginState from '../../components/common/LoginState';
export default {
  name: 'Header',
  components: { LoginState },
};
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
