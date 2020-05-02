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
      <template #action="{ account }, record, index">
        <a @click="onEdit(record, index)">
          <a-icon type="edit" />
        </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认删除？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="onDelete(account, index)"
        >
          <template #icon>
            <a-icon type="question-circle-o" style="color: orange" />
          </template>
          <a><a-icon type="delete"/></a>
        </a-popconfirm>
      </template>
    </a-table>

    <!--修改用户-->
    <EditUser
      v-if="editUserVisible"
      :visible.sync="editUserVisible"
      :type="type"
      :user="curUser"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { DELETE_USER, SET_USER_LIST } from '../../store/mutation-types'
const { mapActions, mapState } = createNamespacedHelpers('user')

export default {
  name: 'ShowUser',
  components: {
    EditUser: () => import(
      /* webpackChunkName: "EditUser" */
      /* webpackPrefetch: true */
      './EditUser'
    )
  },
  props: {
    type: {
      type: String,
      validator (value) {
        return ['student', 'teacher', 'admin'].includes(value)
      }
    }
  },
  data () {
    return {
      loading: true,
      editUserVisible: false,
      curUser: {},
      searchText: '',
      searchedColumn: 0,
      columns: createColumns.call(this)
    }
  },
  computed: {
    ...mapState({
      students: 'students',
      teachers: 'teachers',
      admins: 'admins'
    }),
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
  mounted () {
    this.setUserList().then(data => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      setUserList: SET_USER_LIST,
      deleteUser: DELETE_USER
    }),
    onEdit (data, index) {
      this.editUserVisible = true
      this.curUser = data
    },
    onDelete (account, index) {
      this.deleteUser({
        type: this.type,
        account,
        index
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

// 生成列参数
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
  return {
    students: [
      {
        title: '学号',
        dataIndex: 'account',
        sorter: (a, b) => a.account > b.account,
        scopedSlots: filterSlots,
        onFilter: filter('account'),
        onFilterDropdownVisibleChange: changeVisible
      },
      {
        title: '姓名',
        dataIndex: 'name',
        scopedSlots: filterSlots,
        onFilter: filter('name'),
        onFilterDropdownVisibleChange: changeVisible
      },
      {
        title: '性别',
        dataIndex: 'sex'
      },
      {
        title: '年级',
        dataIndex: 'grade'
      },
      {
        title: '班级',
        dataIndex: 'classname'
      },
      {
        title: '密码',
        dataIndex: 'password'
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ],
    teachers: [
      {
        title: '工号',
        dataIndex: 'account',
        sorter: (a, b) => a.account > b.account,
        scopedSlots: filterSlots,
        onFilter: filter('account'),
        onFilterDropdownVisibleChange: changeVisible
      },
      {
        title: '姓名',
        dataIndex: 'name',
        scopedSlots: filterSlots,
        onFilter: filter('name'),
        onFilterDropdownVisibleChange: changeVisible
      },
      {
        title: '部门',
        dataIndex: 'dept',
        scopedSlots: filterSlots,
        onFilter: filter('dept'),
        onFilterDropdownVisibleChange: changeVisible
      },
      {
        title: '密码',
        dataIndex: 'password'
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ],
    admins: [
      {
        title: '账号',
        dataIndex: 'account',
        sorter: (a, b) => a.account > b.account
      },
      {
        title: '密码',
        dataIndex: 'password'
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]
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
