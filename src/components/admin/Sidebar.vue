<template>
  <a-menu
    theme="dark"
    mode="inline"
    :defaultSelectedKeys="['race']"
    @click="handleClick"
  >
    <a-menu-item key="race">
      <a-icon type="project" /><span>赛事管理</span>
    </a-menu-item>
    <a-menu-item key="user">
      <a-icon type="user" /><span>用户管理</span>
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    handleClick ({ key }) {
      console.log(key)
      this.$router.push({
        name: key
      })
    }
  }
}
</script>

<style scoped>

</style>
