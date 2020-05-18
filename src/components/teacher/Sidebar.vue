<template>
  <div>
    <LoginState />
    <a-menu
      theme="dark"
      mode="inline"
      :selected-keys="keys"
      @click="handleClick"
    >
      <a-menu-item key="race">
        <a-icon type="project" /><span>竞赛列表</span>
      </a-menu-item>
      <a-menu-item key="record">
        <a-icon type="solution" /><span>参赛记录</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import LoginState from '../common/LoginState'
export default {
  name: 'Sidebar',
  components: { LoginState },
  data () {
    return {
      keys: ['race']
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
        path: `/teacher/${key}`
      }).catch(e => e)
    }
  }
}
</script>
