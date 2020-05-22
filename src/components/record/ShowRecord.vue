<template>
  <div>
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
      <!--审核状态-->
      <template #reviewed="reviewed">
        <div
          v-if="reviewed"
          style="color: limegreen"
        >
          <a-icon type="check-circle" />
          <span> 已审核</span>
        </div>
        <template v-else>
          <a-icon type="exclamation-circle" />
          <span> 未审核</span>
        </template>
      </template>
      <!--最后一排的操作按钮，只有管理员和教师需要action，学生只能查看,以及Detail也不需要-->
      <template #action="record">
        <ShowRecordAction
          :type="type"
          :record="record"
          @edit-record="onEdit"
          @delete-record="onDelete"
          @upload="onUpload"
        />
      </template>
    </a-table>
    <Upload
      v-if="uploadVisible"
      :visible.sync="uploadVisible"
      :record="curRecord"
    />
  </div>
</template>

<script>
import moment from 'moment'
import ColumnsMixin from '../../table-columns/showrecord-cloumns-mixin'
import TableSearch from '../common/TableSearch'
import ShowRecordAction from './ShowRecordAction'
export default {
  name: 'ShowRecord',
  components: {
    TableSearch,
    ShowRecordAction,
    Upload: () => import(
      /* webpackChunkName: "Upload" */
      /* webpackPrefetch: true */
      '../../components/common/Upload'
    )
  },
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
      table: table,
      uploadVisible: false,
      curRecord: null
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
    },
    onUpload (record) {
      this.uploadVisible = true
      this.curRecord = record
    }
  }
}
const table = {
  bordered: true,
  size: 'small',
  rowKey: '_id',
  pagination: {
    showSizeChanger: true,
    showQuickJumper: true
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
