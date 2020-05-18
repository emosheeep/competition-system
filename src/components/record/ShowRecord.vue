<template>
  <a-table
    v-bind="table"
    :loading="loading"
    :columns="columns"
    :data-source="records"
  >
    <template #title="data">
      <h1>参赛记录 - {{ data.length }}条</h1>
    </template>
    <template #filterIcon="filtered">
      <a-icon
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
    </template>
    <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          size="small"
          style="margin-right: 10px; width: 90px"
          @click="() => handleReset(clearFilters)"
        >
          重置
        </a-button>
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          搜索
        </a-button>
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
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>
    <!--date-->
    <template
      v-if="type !== 'admin'"
      #date="date"
    >
      {{ formatDate(date) }}
    </template>
    <!--最后一排的操作按钮，action操作只有管理员和教师需要，学生只能查看不能操作-->
    <template
      v-if="type === 'teacher'"
      #action="record"
    >
      {{ record }}
    </template>
    <template
      v-else
      #action="record"
    >
      <a @click="onEdit(record)"><a-icon type="edit" /></a>
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
import TableSearchMixin from '../table-search-mixin'
import createColumns from './create-record-columns'
import moment from 'moment'
export default {
  name: 'ShowRecord',
  mixins: [TableSearchMixin],
  props: {
    loading: Boolean,
    records: {
      type: Array,
      required: true
    },
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
      columns: createColumns(this.type),
      table: {
        bordered: true,
        size: 'small',
        rowKey: 'id',
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
