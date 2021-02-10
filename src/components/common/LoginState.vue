<template>
  <a-dropdown>
    <div class="header-avatar">
      <a-icon class="avatar" type="user" />
      <span class="name">{{user.name}}</span>
    </div>
    <a-menu slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: 'LoginState',
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$message.success('功能正在开发中...');
    },
  },
};
</script>

<style scoped lang="stylus">
.header-avatar
  display inline-flex
  align-items center
  cursor pointer
  padding 0 10px
  .avatar
    position relative
    top -1px
    margin-right 8px
  .name
    font-weight 500
</style>
