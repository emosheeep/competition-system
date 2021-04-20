<template>
  <header>
    <div class="header-left"></div>
    <div class="header-right">
      <LoginState class="header-item" />
    </div>
  </header>
</template>

<script>
import LoginState from '@/components/common/LoginState';
export default {
  name: 'Header',
  components: { LoginState },
};
</script>

<style scoped lang="stylus">
header
  padding 0 10px
  display flex
  justify-content space-between
  & > div[class^=header]
    flex-grow 1

.header-right
  text-align right

.header-item:hover
  background-color rgba(0, 0, 0, 0.025)
</style>
