<template>
  <div>
    <div
      class="logo"
      @click="goHome"
    >
      <span>竞赛管理系统</span>
    </div>
    <a-menu
      theme="dark"
      mode="inline"
      class="menu"
      :selected-keys="keys"
      @click="handleClick"
    >
      <a-menu-item-group title="赛事管理">
        <a-menu-item key="/race">
          <a-icon type="project" />
          <span>赛事</span>
        </a-menu-item>
        <a-menu-item key="/record">
          <a-icon type="solution" />
          <span>参赛记录</span>
        </a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group title="用户管理">
        <a-menu-item key="/student">
          <a-icon type="team" />
          <span>学生列表</span>
        </a-menu-item>
        <a-menu-item key="/teacher">
          <a-icon type="team" />
          <span>教师列表</span>
        </a-menu-item>
      </a-menu-item-group>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      keys: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    $route: {
      handler(to) {
        this.$set(this.keys, 0, to.path);
      },
      immediate: true,
    },
  },
  methods: {
    handleClick({ key: path }) {
      this.$router.push(path).catch(e => e);
    },
    goHome() {
      this.$router.push('/race').catch(e => e);
    },
  },
};
</script>

<style scoped lang="stylus">
  .menu li:nth-child(1)
    margin-top 0 !important
  .logo
    width 100%
    height 64px
    line-height 64px
    margin 0 auto
    color white
    overflow hidden
    white-space nowrap
    cursor pointer
    span
      margin-left 15px
      font-size 20px
</style>
