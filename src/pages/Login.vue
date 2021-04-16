<template>
  <div class="container">
    <UserLogin />
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
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
</style>
