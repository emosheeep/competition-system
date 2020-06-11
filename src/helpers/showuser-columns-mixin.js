import Vue from 'vue'
import { filter, filterSlots } from './culumns-helper'

export default Vue.extend({
  created () {
    Object.assign(this, {
      STUDENT_COLUMNS,
      TEACHER_COLUMNS,
      ADMIN_COLUMNS
    })
  }
})

const STUDENT_COLUMNS = [
  {
    title: '学号',
    dataIndex: 'account',
    sorter: (a, b) => a.account - b.account,
    scopedSlots: filterSlots,
    onFilter: filter('account')
  },
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: filterSlots,
    onFilter: filter('name')
  },
  {
    title: '性别',
    dataIndex: 'sex',
    onFilter: filter('sex'),
    filters: [
      {
        text: '男',
        value: '男'
      },
      {
        text: '女',
        value: '女'
      }
    ]
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
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
const TEACHER_COLUMNS = [
  {
    title: '工号',
    dataIndex: 'account',
    sorter: (a, b) => a.account - b.account,
    scopedSlots: filterSlots,
    onFilter: filter('account')
  },
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: filterSlots,
    onFilter: filter('name')
  },
  {
    title: '职称',
    dataIndex: 'rank',
    scopedSlots: filterSlots,
    onFilter: filter('rank')
  },
  {
    title: '密码',
    dataIndex: 'password'
  },
  {
    title: '描述',
    dataIndex: 'description',
    ellipsis: true
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
const ADMIN_COLUMNS = [
  {
    title: '账号',
    dataIndex: 'account',
    sorter: (a, b) => a.account - b.account
  },
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: filterSlots,
    onFilter: filter('name')
  },
  {
    title: '密码',
    dataIndex: 'password'
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
