import Vue from 'vue'

export default Vue.extend({
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedKeys: [] // 表格主键
    }
  },
  computed: {
    rowSelection () {
      if (!this.multiple) {
        return null
      }
      const { selectedKeys } = this
      return {
        selectedRowKeys: selectedKeys,
        onChange: keys => {
          this.selectedKeys = keys
        }
      }
    }
  },
  watch: {
    multiple (newVal) {
      if (!newVal) {
        this.selectedKeys.splice(0)
      }
    }
  }
})
