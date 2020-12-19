<template>
  <div class="container">
    <a-input
      ref="input"
      class="search-input"
      :auto-focus="true"
      :placeholder="`查找 ${column.title}`"
      :value="selectedKeys[0]"
      @change="handleInput"
      @pressEnter="confirm"
    />
    <div class="button-group">
      <a-button
        size="small"
        class="reset-button"
        @click="handleReset"
      >
        重置
      </a-button>
      <a-button
        type="primary"
        size="small"
        class="confirm-button"
        @click="confirm"
      >
        <template #icon>
          <SearchOutlined />
        </template>
        <span>搜索</span>
      </a-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types,vue/no-mutating-props */
import { SearchOutlined } from '@ant-design/icons-vue';

export default {
  name: 'TableSearch',
  components: { SearchOutlined },
  props: [
    'setSelectedKeys', // 设置搜索关键词
    'selectedKeys', // 当前关键词
    'confirm', // 执行搜索
    'clearFilters', // 清除搜索状态
    'column', // 当前列的描述
  ],
  mounted() {
    // TODO: 搜索框自动高亮
  },
  methods: {
    handleInput({ target: { value } }) {
      this.setSelectedKeys(value ? [value] : []);
    },
    handleReset() {
      this.clearFilters();
      this.selectedKeys.splice(0);
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  padding 10px
  width 250px
  .search-input
    display block
    margin-bottom 8px
  .button-group
    display flex
    justify-content space-between
    margin-top 10px
    .reset-button
      margin-right 15px
      width 85px
    .confirm-button
      width 85px
</style>
