<template>
  <a-table v-bind="table">
    <template #title="records">
      <h1 style="margin: 0; font-weight: bold; font-size: 16px">
        参赛记录 - {{records.length}}条
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

    <!--date-->
    <template #date="date">{{ formatDate(date) }}</template>
  </a-table>
</template>

<script>
import moment from 'moment'
import { getRecordList } from '../../plugins/api'
export default {
  name: 'ShowRecord',
  data () {
    return {
      searchText: '',
      searchedColumn: 0,
      // 表格配置
      table: {
        dataSource: [],
        columns: createColumns.call(this),
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
  mounted () {
    const { account } = this.$store.state.user
    getRecordList({ sid: account }).then(({ data }) => {
      this.table.dataSource = data
      this.table.loading = false
    })
  },
  methods: {
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
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
      title: '举办时间',
      dataIndex: 'date',
      width: 110,
      sorter: (a, b) => a.date > b.date,
      scopedSlots: {
        customRender: 'date'
      }
    },
    {
      title: '名称',
      dataIndex: 'title',
      ellipsis: true,
      scopedSlots: filterSlots,
      onFilter: filter('sid'),
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
    }
  ]
}
</script>

<style scoped>

</style>
