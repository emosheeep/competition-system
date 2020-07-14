<template>
  <div>
    <a-table
      bordered
      :row-key="rowKey"
      :row-selection="rowSelection"
      :columns="columns"
      :data-source="data"
      :pagination="{
        showSizeChanger: true,
        showQuickJumper: true
      }"
    >
      <!--表头-->
      <template #title="records">
        <h1>参赛记录 - 共 {{ records.length }} 条</h1>
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
import TableSearch from '../common/TableSearch'
import Upload from '../../components/common/Upload'
import ShowRecordAction from './ShowRecordAction'
import ShowRecordDetail from './ShowRecordDetail'
import createColumns from '../../helpers/showrecord-cloumns'
import MultipleDelete from '../../helpers/multiple-delete-mixin'

export default {
  name: 'ShowRecord',
  components: {
    Upload,
    TableSearch,
    ShowRecordAction,
    ShowRecordDetail
  },
  mixins: [MultipleDelete],
  props: {
    data: {
      type: Array,
      required: true
    },
    rowKey: {
      type: String,
      default: '_id'
    },
    type: {
      type: String,
      default: 'readonly',
      validator (value) {
        return ['student', 'admin', 'teacher', 'readonly'].includes(value)
      }
    }
  },
  data () {
    return {
      uploadVisible: false,
      recordDetailVisible: false,
      curRecord: {}
    }
  },
  beforeMount () {
    this.columns = createColumns(this.type)
  },
  methods: {
    onDelete (record) {
      if (!this.multiple) {
        this.$emit('delete-record', [record._id])
      }
    },
    multipleDelete () {
      this.$emit('delete-record', [...this.selectedKeys])
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
</script>

<style scoped lang="stylus">
  h1
    display inline-block
    margin 0
    font-weight bold
    font-size 16px
</style>
