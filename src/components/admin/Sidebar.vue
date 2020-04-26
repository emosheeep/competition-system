<template>
  <a-menu
    theme="dark"
    mode="inline"
    :defaultSelectedKeys="['race']"
  >
    <a-menu-item key="race" @click="handleClick">
      <a-icon type="project" /><span>赛事管理</span>
    </a-menu-item>
    <a-sub-menu>
      <span slot="title">
        <a-icon type="user" /><span>用户管理</span>
      </span>
      <a-menu-item key="user" @click="handleClick">
        <span>学生信息</span>
      </a-menu-item>
    </a-sub-menu>
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
