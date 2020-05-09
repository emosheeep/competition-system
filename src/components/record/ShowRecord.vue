<template>
  <a-table v-bind="table" :columns="columns">
    <template #title="records">
      <div class="title">
        <h1>参赛记录 - {{records.length}}条</h1>
        <a-button
          size="small"
          type="primary"
          @click="refresh"
          class="fresh-button"
        >刷新</a-button>
      </div>
    </template>
    <template #filterIcon="filtered">
      <a-icon type="search" :style="{ color: filtered ? '#108ee9' : undefined }"/>
    </template>
    <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          style="width: 188px; margin-bottom: 8px; display: block;"
        />
        <a-button
          size="small"
          style="margin-right: 10px; width: 90px"
          @click="() => handleReset(clearFilters)"
        >重置</a-button>
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >搜索</a-button>
      </div>
    </template>

    <!--具体参见ant-design-vue的表格搜索用法-->
    <template #filter="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i">
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
      <template v-else>{{ text }}</template>
    </template>
    <!--date-->
    <template v-if="type !== 'admin'" #date="date">{{ formatDate(date) }}</template>
    <!--最后一排的操作按钮，action操作只有管理员和教师需要，学生只能查看不能操作-->
    <template v-if="type === 'teacher'" #action="record">
      {{ record }}
    </template>
    <template v-else #action="record">
      <a-popconfirm
        title="确认删除？"
        ok-text="确认"
        cancel-text="取消"
        @confirm="onDelete(record.id)"
      >
        <template #icon>
          <a-icon type="question-circle-o" style="color: orange" />
        </template>
        <a><a-icon type="delete"/></a>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script>
import { message } from 'ant-design-vue'
import { getRecordList, deleteRecord } from '../../plugins/api'
import TableSearchMixin from '../table-search-mixin'
import CreateColumns from './create-record-columns'
import { throttle } from 'lodash'
import moment from 'moment'
export default {
  name: 'ShowRecord',
  mixins: [TableSearchMixin],
  props: {
    id: String,
    type: {
      type: String,
      default: 'admin',
      validator (value) {
        return ['student', 'admin', 'teacher'].includes(value)
      }
    }
  },
  data () {
    return {
      columns: [],
      table: {
        dataSource: [],
        bordered: true,
        size: 'small',
        rowKey: 'id',
        loading: true,
        pagination: {
          showSizeChanger: true,
          showQuickJumper: true
        }
      }
    }
  },
  created () {
    this.columns = CreateColumns(this.type)
    this.$on('hook:activated', this.init) // 注意组件是被缓存过的
  },
  methods: {
    init () {
      let promise
      const { account } = this.$store.state.user
      this.table.loading = true
      switch (this.type) {
        case 'student':
          promise = getRecordList({ type: 'sid', value: account })
          break
        case 'teacher':
          promise = getRecordList({ type: 'tid', value: account })
          break
        default: // admin
          promise = getRecordList({ type: 'id', value: this.id })
      }
      promise.then(({ data }) => {
        this.table.dataSource = data
        this.table.loading = false
      })
    },
    refresh: throttle(function () {
      this.init()
    }, 500),
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    onDelete (id) {
      const stopLoading = message.loading('请稍后')
      deleteRecord(id).then(res => {
        this.table.dataSource = this.table.dataSource.filter(item => item.id !== id)
        message.success('删除成功')
      }).catch(e => {
        message.error('系统错误')
      }).finally(() => {
        stopLoading()
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .title
    h1
      display inline-block
      margin 0
      font-weight bold
      font-size 16px
    .fresh-button
      float right
</style>
