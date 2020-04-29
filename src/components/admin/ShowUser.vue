<template>
  <div>
    <!--数据列表-->
    <a-table
      bordered
      size="small"
      :row-key="rowKey"
      :columns="curCol"
      :data-source="curData"
      :loading="loading"
      :pagination="{
        showSizeChanger: true,
        showQuickJumper: true
      }"
    >
      <template #action="text, record, index">
        <a @click="onEdit(record, index)">
          <a-icon type="edit" />
        </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认删除？"
          @confirm="onDelete(text)"
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
import { GET_USER_LIST } from '../../store/mutation-types'
const { mapActions, mapState } = createNamespacedHelpers('admin')

export default {
  name: 'ShowUser',
  props: {
    type: {
      type: String,
      validator (value) {
        return ['students', 'teachers', 'admins'].includes(value)
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
    curData () {
      return this[this.type]
    },
    curCol () {
      return columns[this.type]
    }
  },
  mounted () {
    this.getUserList().then(({ data }) => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      getUserList: GET_USER_LIST
    }),
    onEdit (data, index) {
      console.log('编辑', data, index)
    },
    onDelete (data) {
      console.log('删除', data)
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
