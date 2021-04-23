<template>
  <div class="container">
    <UserLogin class="login" />
  </div>
</template>

<script>
import UserLogin from '@/components/common/UserLogin.vue';

export default {
  name: 'Login',
  components: { UserLogin },
  metaInfo: {
    title: '登录',
  },
};
</script>

<style scoped lang="stylus">
.container
  height 100vh
  background #f0f2f5 url('~@/assets/bg.svg') repeat
  .login
    center()
</style>
