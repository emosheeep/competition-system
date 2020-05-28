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

      <!--教师信息（可选）-->
      <template #tid="tid">
        {{ tid || '暂无' }}
      </template>
      <template #tname="tname">
        {{ tname || '暂无' }}
      </template>

      <!--审核状态-->
      <template #state="state">
        <template v-if="state === 'pending'">
          <a-icon type="question-circle" />
          <span> 未审核</span>
        </template>
        <template v-else-if="state === 'fulfilled'">
          <a-icon
            style="color: limegreen"
            type="check-circle"
          />
          <span style="color: limegreen"> 审核通过</span>
        </template>
        <template v-else>
          <a-icon
            style="color: red"
            type="exclamation-circle"
          />
          <span
            style="color: red"
            :title="state"
          >
            审核失败
          </span>
        </template>
      </template>
      <!--最后一排的操作按钮，只有管理员和教师需要action，学生只能查看,以及Detail也不需要-->
      <template #action="record">
        <ShowRecordAction
          :type="type"
          :record="record"
          @update-record="onEdit"
          @delete-record="onDelete"
          @upload="onUpload"
          @detail="onDetail"
        />
      </template>
    </a-table>
    <!--文件上传-->
    <Upload
      :visible.sync="uploadVisible"
      :record="curRecord"
    />
    <!--Record详情-->
    <ShowRecordDetail
      :visible.sync="recordDetailVisible"
      :record="curRecord"
    />
  </div>
</template>

<script>
import moment from 'moment'
import ColumnsMixin from '../../table-columns/showrecord-cloumns-mixin'
import TableSearch from '../common/TableSearch'
import Upload from '../../components/common/Upload'
import ShowRecordAction from './ShowRecordAction'
import ShowRecordDetail from './ShowRecordDetail'
export default {
  name: 'ShowRecord',
  components: {
    Upload,
    TableSearch,
    ShowRecordAction,
    ShowRecordDetail
  },
  mixins: [ColumnsMixin],
  props: {
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
      recordDetailVisible: false,
      curRecord: {}
    }
  },
  methods: {
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    onDelete (record) {
      this.$emit('delete-record', record._id)
    },
    onEdit (record) {
      this.$emit('update-record', record)
    },
    onUpload (record) {
      this.uploadVisible = true
      this.curRecord = record
    },
    onDetail (record) {
      this.curRecord = record
      this.recordDetailVisible = true
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
