<template>
  <div>这是导航栏</div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      current: ['competition']
    }
  },
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

<style scoped lang="stylus">
  .menu-item
    height 64px
    line-height 64px
</style>
