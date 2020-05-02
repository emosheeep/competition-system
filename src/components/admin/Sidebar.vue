<template>
  <div>
    <span class="logo">竞赛管理系统</span>
    <a-menu
      theme="dark"
      mode="inline"
      :selectedKeys="keys"
      @click="handleClick"
    >
      <a-menu-item key="race">
        <a-icon type="project" /><span>赛事管理</span>
      </a-menu-item>
      <a-menu-item key="user">
        <a-icon type="user" /><span>用户管理</span>
      </a-menu-item>
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
  mounted () {
    const { path } = this.$route
    const key = path.split('/').pop()
    this.$set(this.keys, 0, key)
  },
  methods: {
    handleClick ({ key }) {
      this.$set(this.keys, 0, key)
      this.$router.push({
        name: key
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .logo
    display block
    height 32px
    margin 16px
    color lightgrey
    line-height 32px
    font-size 20px
    text-align center
    user-select none
</style>
