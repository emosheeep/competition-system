<script>
import { merge, isFunction } from 'lodash';

export default {
  name: 'AntTable',
  functional: true,
  props: {
    // v-model绑定已选项
    value: {
      type: Array,
      default: () => [],
    },
    rowSelection: {
      type: Object,
      default: null,
    },
  },
  render(h, ctx) {
    const { props, listeners, data, children } = ctx;
    const { input } = listeners;
    const useVModel = isFunction(input) && Array.isArray(props.value);

    data.attrs = merge({
      size: 'middle',
      bordered: true,
      scroll: { x: 1000 },
      rowSelection: useVModel
        ? { selectedRowKeys: props.value, onChange: input }
        : props.rowSelection,
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条记录`,
      },
    }, data.attrs);

    return h('a-table', data, children);
  },
};
</script>
