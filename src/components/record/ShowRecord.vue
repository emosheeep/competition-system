<template>
  <a-table
    v-bind="table"
    :columns="columns"
    :data-source="records"
  >
    <!--表头-->
    <template #title="data">
      <h1>参赛记录 - 共 {{ data.length }} 条</h1>
    </template>
    <!--搜索-->
    <template #filterIcon="filtered">
      <a-icon
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
    </template>
    <template #filterDropdown="options">
      <TableSearch v-bind="options" />
    </template>
    <!--date-->
    <template #date="date">
      {{ formatDate(date) }}
    </template>
    <!--最后一排的操作按钮，只有管理员和教师需要action，学生只能查看,以及Detail也不需要-->
    <template
      v-if="type !== 'student' && type !== 'common'"
      #action="record"
    >
      <a @click="onEdit(record)">
        <a-icon type="edit" />
      </a>
      <a-divider type="vertical" />
      <a-popconfirm
        title="确认删除？"
        ok-text="确认"
        cancel-text="取消"
        @confirm="onDelete(record.id)"
      >
        <template #icon>
          <a-icon
            type="question-circle-o"
            style="color: orange"
          />
        </template>
        <a><a-icon type="delete" /></a>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script>
import ColumnsMixin from '../../table-columns/showrecord-cloumns-mixin'
import moment from 'moment'
import TableSearch from '../common/TableSearch'
export default {
  name: 'ShowRecord',
  components: { TableSearch },
  mixins: [ColumnsMixin],
  props: {
    allowModify: {
      type: Boolean,
      default: true
    },
    records: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'common',
      validator (value) {
        return ['student', 'admin', 'teacher', 'common'].includes(value)
      }
    }
  },
  data () {
    return {
      columns: this.CREATE_COLUMNS(this.type),
      table: {
        bordered: true,
        size: 'small',
        rowKey: '_id',
        pagination: {
          showSizeChanger: true,
          showQuickJumper: true
        }
      }
    }
  },
  methods: {
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    onDelete (id) {
      this.$emit('delete-record', id)
    },
    onEdit (record) {
      this.$emit('update-record', record)
    }
  }
}
</script>

<style scoped lang="stylus">
  h1
    display inline-block
    margin 0
    font-weight bold
    font-size 16px
</style>
