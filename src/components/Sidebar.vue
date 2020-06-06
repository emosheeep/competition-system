<template>
  <div>
    <div class="logo">
      <img
        src="/logo.png"
        alt="logo"
      >
      <span v-show="!collapsed">竞赛管理系统</span>
    </div>
    <a-menu
      theme="dark"
      mode="inline"
      class="menu"
      :selected-keys="keys"
      @click="handleClick"
    >
      <template v-if="user.identity === 'student'">
        <a-menu-item key="race">
          <a-icon type="project" />
          <span>竞赛列表</span>
        </a-menu-item>
        <a-menu-item key="record">
          <a-icon type="solution" />
          <span>参赛记录</span>
        </a-menu-item>
      </template>
      <template v-else-if="user.identity === 'teacher'">
        <a-menu-item key="race">
          <a-icon type="project" />
          <span>竞赛列表</span>
        </a-menu-item>
        <a-menu-item key="record">
          <a-icon type="solution" />
          <span>学生参赛记录</span>
        </a-menu-item>
      </template>
      <template v-else>
        <a-menu-item key="race">
          <a-icon type="project" />
          <span>赛事管理</span>
        </a-menu-item>
        <a-menu-item key="user">
          <a-icon type="user" />
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="record">
          <a-icon type="solution" />
          <span>参赛记录管理</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      keys: ['race']
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    const { path } = this.$route
    const key = path.split('/').pop()
    this.$set(this.keys, 0, key)
  },
  methods: {
    handleClick ({ key }) {
      this.$set(this.keys, 0, key)
      this.$router.push({
        path: `/${this.user.identity}/${key}`
      }).catch(e => e)
    }
  }
}
</script>

<style scoped lang="stylus">
  .menu li:nth-child(1)
    margin-top 0 !important
  .logo
    width 100%
    height 64px
    line-height 64px
    padding-left 20px
    margin 0 auto
    color white
    background rgba(255, 255, 255, 0.2)
    overflow hidden
    white-space nowrap
    img
      width 40px
      vertical-align middle
    span
      margin-left 5px
      font-size 20px
      vertical-align middle
</style>
