import Vue from 'vue';

export default Vue.extend({
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedKeys: [], // 表格主键
    };
  },
  computed: {
    rowSelection() {
      if (!this.multiple) {
        return null;
      }
      const { selectedKeys } = this;
      return {
        selectedRowKeys: selectedKeys,
        hideDefaultSelections: true,
        onChange: keys => {
          this.selectedKeys = keys;
        },
        selections: [
          {
            text: '全选',
            onSelect: () => {
              this.selectedKeys = this.data.map(item => item[this.rowKey]);
            },
          },
          {
            text: '反选',
            onSelect: () => {
              this.selectedKeys.splice(0);
            },
          },
        ],
      };
    },
  },
  watch: {
    multiple(newVal) {
      if (!newVal) {
        this.selectedKeys.splice(0);
      }
    },
  },
});
