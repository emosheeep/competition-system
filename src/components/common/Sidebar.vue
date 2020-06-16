<template>
  <div>
    <div
      class="logo"
      @click="goHome"
    >
      <img
        src="/logo.png"
        alt="logo"
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
      <!--学生侧栏-->
      <template v-if="user.identity === 'student'">
        <a-menu-item key="/student/teacher">
          <a-icon type="experiment" />
          <span>教师信息</span>
        </a-menu-item>
        <a-menu-item key="/student/race">
          <a-icon type="project" />
          <span>竞赛列表</span>
        </a-menu-item>
        <a-menu-item key="/student/record">
          <a-icon type="solution" />
          <span>参赛记录</span>
        </a-menu-item>
        <a-menu-item key="/student/self">
          <a-icon type="smile" />
          <span>个人信息</span>
        </a-menu-item>
      </template>

      <!--教师侧栏-->
      <template v-else-if="user.identity === 'teacher'">
        <a-menu-item key="/teacher/race">
          <a-icon type="project" />
          <span>竞赛列表</span>
        </a-menu-item>
        <a-menu-item key="/teacher/record">
          <a-icon type="solution" />
          <span>学生参赛记录</span>
        </a-menu-item>
        <a-menu-item key="/teacher/self">
          <a-icon type="smile" />
          <span>个人信息</span>
        </a-menu-item>
      </template>

      <!--管理员侧栏-->
      <template v-else-if="user.identity === 'admin'">
        <a-menu-item-group title="赛事管理">
          <a-menu-item key="/admin/race">
            <a-icon type="project" />
            <span>赛事</span>
          </a-menu-item>
          <a-menu-item key="/admin/record">
            <a-icon type="solution" />
            <span>参赛记录</span>
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="用户管理">
          <a-menu-item key="/admin/user">
            <a-icon type="team" />
            <span>学生教师</span>
          </a-menu-item>
          <a-menu-item
            v-if="user.power === 'root'"
            key="/admin/root"
          >
            <a-icon type="user" />
            <span>管理员</span>
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item key="/admin/self">
          <a-icon type="smile" />
          <span>个人信息</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      keys: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    $route: {
      handler (to) {
        this.$set(this.keys, 0, to.path)
      },
      immediate: true
    }
  },
  methods: {
    handleClick ({ key: path }) {
      this.$router.push(path).catch(e => e)
    },
    goHome () {
      const { identity } = this.user
      this.$router.replace(`/${identity}`).catch(e => e)
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
    overflow hidden
    white-space nowrap
    cursor pointer
    img
      width 40px
      vertical-align middle
    span
      margin-left 5px
      font-size 20px
      vertical-align middle
</style>
