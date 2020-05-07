<template>
  <a-table
    bordered
    size="small"
    row-key="sid"
    :columns="columns"
    :data-source="records"
    :loading="loading"
    :pagination="{
      showSizeChanger: true,
      showQuickJumper: true
    }"
  >
    <template #title="records">
      <h1 style="margin: 0; font-weight: bold; font-size: 16px">
        参赛选手 - {{records.length}}人
      </h1>
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

    <!--最后一排的操作按钮-->
    <template #action="record">
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
export default {
  name: 'ShowRecord',
  props: {
    id: String
  },
  data () {
    return {
      records: [],
      loading: true,
      columns: createColumns.call(this),
      searchText: '',
      searchedColumn: 0
    }
  },
  mounted () {
    getRecordList({ id: this.id }).then(({ data }) => {
      this.records = data
      this.loading = false
    })
  },
  methods: {
    onEdit (record) {
      this.curRecord = record
    },
    onDelete (id) {
      const stopLoading = message.loading('请稍后')
      deleteRecord(id).then(res => {
        this.records = this.records.filter(item => item.id !== id)
        message.success('删除成功')
      }).catch(e => {
        message.error('系统错误')
      }).finally(() => {
        stopLoading()
      })
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    }
  }
}

function createColumns () {
  const filterSlots = {
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon',
    customRender: 'filter'
  }
  const changeVisible = visible => {
    if (visible) {
      setTimeout(() => {
        this.$refs.searchInput.focus()
      }, 0)
    }
  }
  const filter = key => {
    return (value, record) => {
      return record[key]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
    }
  }
  return [
    {
      title: '学生账号',
      dataIndex: 'sid',
      ellipsis: true,
      sorter: (a, b) => a.sid > b.sid,
      scopedSlots: filterSlots,
      onFilter: filter('sid'),
      onFilterDropdownVisibleChange: changeVisible
    },
    {
      title: '学生姓名',
      dataIndex: 'sname',
      ellipsis: true,
      scopedSlots: filterSlots,
      onFilter: filter('sname'),
      onFilterDropdownVisibleChange: changeVisible
    },
    {
      title: '教师工号',
      dataIndex: 'tid',
      ellipsis: true,
      sorter: (a, b) => a.tid > b.tid,
      scopedSlots: filterSlots,
      onFilter: filter('tid'),
      onFilterDropdownVisibleChange: changeVisible
    },
    {
      title: '教师姓名',
      dataIndex: 'tname',
      ellipsis: true,
      scopedSlots: filterSlots,
      onFilter: filter('tname'),
      onFilterDropdownVisibleChange: changeVisible
    },
    {
      title: '成绩',
      dataIndex: 'score',
      ellipsis: true
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]
}
</script>

<style scoped>

</style>
