<script>
import { merge, isFunction } from 'lodash-es';
import ColumnSetting from '@/components/common/ColumnSetting';

export default {
  name: 'AntTable',
  props: {
    // v-model绑定已选项
    value: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: [String, Function],
      default: 'id',
    },
    columns: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: 'middle',
    },
    rowSelection: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      customSize: this.size,
      customTableColumns: this.columns,
    };
  },
  watch: {
    columns(columns) {
      this.customTableColumns = columns;
    },
    size(size) {
      this.customSize = size;
    },
  },
  render() {
    const { input } = this.$listeners;
    const useVModel = isFunction(input) && Array.isArray(this.value);
    const allProps = {
      scopedSlots: this.$scopedSlots,
      on: this.$listeners,
      props: merge({
        size: this.customSize,
        rowKey: this.rowKey,
        columns: this.customTableColumns,
        bordered: true,
        scroll: { x: 1000 },
        rowSelection: useVModel
          ? { selectedRowKeys: this.value, onChange: input }
          : this.rowSelection,
        pagination: {
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: total => `共 ${total} 条记录`,
        },
      }, this.$attrs),
    };
    return (
      <div class="table-wrapper">
        <div class="table-header">
          <div class="left">{this.$slots.header}</div>
          <div class="right">
            <ColumnSetting
              columns={this.columns}
              onChange={e => { this.customTableColumns = e; }}
            />
          </div>
        </div>
        <a-divider style="margin: 10px 0" />
        <a-table {...allProps}>
          {/* 原样传递插槽 */}
          {Object.keys(this.$slots).map(name => (
            <template slot={name}>{this.$slots[name]}</template>
          ))}
        </a-table>
      </div>
    );
  },
};
</script>

<style lang="stylus" scoped>
.table-header
  display flex
  align-items center
  margin-bottom 10px
  .left, .right
    display flex
    align-items center
  .left
    flex-grow 1
  .right > *:not(:last-child)
    margin-right 10px
</style>
