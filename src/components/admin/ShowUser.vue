<template>
  <div>
    <!--数据列表-->
    <a-table
      bordered
      size="small"
      :row-key="rowKey"
      :columns="current.column"
      :data-source="current.data"
      :loading="loading"
      :pagination="{
        showSizeChanger: true,
        showQuickJumper: true
      }"
    >
      <template #action="{ account }, record, index">
        <a @click="onEdit(record, index)">
          <a-icon type="edit" />
        </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认删除？"
          @confirm="onDelete(account, index)"
          ok-text="确认"
          cancel-text="取消"
        >
          <template #icon>
            <a-icon type="question-circle-o" style="color: orange" />
          </template>
          <a><a-icon type="delete"/></a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { DELETE_USER, GET_USER_LIST } from '../../store/mutation-types'
const { mapActions, mapState } = createNamespacedHelpers('admin')

export default {
  name: 'ShowUser',
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
      rowKey: 'account'
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
            column: columns.students
          }
        case 'teacher':
          return {
            data: this.teachers,
            column: columns.teachers
          }
        default:
          return {
            data: this.admins,
            column: columns.admins
          }
      }
    }
  },
  mounted () {
    this.getUserList().then(({ data }) => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      getUserList: GET_USER_LIST,
      deleteUser: DELETE_USER
    }),
    onEdit (data, index) {
      console.log('编辑', data, index)
    },
    onDelete (account, index) {
      console.log('删除', account, index)
      this.deleteUser({
        type: this.type,
        account,
        index
      }).then()
    }
  }
}
const columns = {
  students: [
    {
      title: '学号',
      dataIndex: 'account'
    },
    {
      title: '姓名',
      dataIndex: 'name'
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
      dataIndex: 'account'
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '部门',
      dataIndex: 'dept'
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
      dataIndex: 'account'
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
</script>

<style scoped lang="stylus">
  .show-users
    display flex
    justify-content space-between
    flex-grow 1
  .row
    background black
</style>
