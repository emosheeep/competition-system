<template>
  <div>
    <!--数据列表-->
    <a-table
      bordered
      size="small"
      row-key="account"
      :columns="current.column"
      :data-source="current.data"
      :loading="loading"
      :pagination="{
        showSizeChanger: true,
        showQuickJumper: true
      }"
    >
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

      <!--最后一排的操作按钮-->
      <template #action="{ account }, record">
        <a @click="onEdit(record)">
          <a-icon type="edit" />
        </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认删除？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="onDelete(account)"
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
  </div>
</template>

<script>
import TableSearchMixin from '../table-search-mixin'
import createColumns from './craete-showuser-columns'
export default {
  name: 'ShowUser',
  mixins: [TableSearchMixin],
  props: {
    admins: {
      type: Array,
      default () {
        return []
      }
    },
    students: {
      type: Array,
      default () {
        return []
      }
    },
    teachers: {
      type: Array,
      default () {
        return []
      }
    },
    loading: Boolean,
    type: {
      type: String,
      default: 'admin',
      validator (value) {
        return ['student', 'teacher', 'admin'].includes(value)
      }
    }
  },
  data () {
    return {
      columns: createColumns.call(this)
    }
  },
  computed: {
    current () {
      switch (this.type) {
        case 'student':
          return {
            data: this.students,
            column: this.columns.students
          }
        case 'teacher':
          return {
            data: this.teachers,
            column: this.columns.teachers
          }
        default:
          return {
            data: this.admins,
            column: this.columns.admins
          }
      }
    }
  },
  methods: {
    onEdit (user) {
      this.$emit('update-user', user)
    },
    onDelete (account) {
      this.$emit('delete-user', {
        type: this.type,
        account
      })
    }
  }
}

</script>

<style scoped lang="stylus">
  .show-users
    display flex
    justify-content space-between
    flex-grow 1
  .row
    background black
</style>
