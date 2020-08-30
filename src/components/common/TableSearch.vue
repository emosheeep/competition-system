<template>
  <div style="padding: 8px">
    <a-input
      ref="input"
      class="search-input"
      :auto-focus="true"
      :placeholder="`查找 ${column.title}`"
      :value="selectedKeys[0]"
      @change="handleInput"
      @pressEnter="confirm"
    />
    <a-button
      size="small"
      class="reset-button"
      @click="handleReset"
    >
      重置
    </a-button>
    <a-button
      type="primary"
      icon="search"
      size="small"
      class="confirm-button"
      @click="confirm"
    >
      搜索
    </a-button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'TableSearch',
  props: [
    'setSelectedKeys', // 设置搜索关键词
    'selectedKeys', // 当前关键词
    'confirm', // 执行搜索
    'clearFilters', // 清除搜索状态
    'column' // 当前列的描述
  ],
  methods: {
    handleInput ({ target: { value } }) {
      this.setSelectedKeys(value ? [value] : [])
    },
    handleReset () {
      this.clearFilters()
      this.selectedKeys.splice(0)
    }
  },
  mounted () {
    // this.$parent.$on('hook:updated', () => {
    //   this.$refs.input.focus()
    // })
  },
}
</script>

<style lang="stylus" scoped>
  .search-input
    display block
    width 188px
    margin-bottom 8px
  .reset-button
    margin-right 15px
    width 85px
  .confirm-button
    width 85px
</style>
