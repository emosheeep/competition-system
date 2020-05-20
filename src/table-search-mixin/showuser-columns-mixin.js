import { filter, filterSlots } from './culumns-helper'

export default {
  data () {
    return {
      STUDENT_COLUMNS: [
        {
          title: '学号',
          dataIndex: 'account',
          sorter: (a, b) => a.account > b.account,
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
          onFilter: (value, record) => record.sex.includes(value),
          filters: [
            {
              text: '男',
              value: 'man'
            },
            {
              text: '女',
              value: 'woman'
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
          scopedSlots: { customRender: 'action' }
        }
      ],
      TEACHER_COLUMNS: [
        {
          title: '工号',
          dataIndex: 'account',
          sorter: (a, b) => a.account > b.account,
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
          title: '部门',
          dataIndex: 'dept',
          scopedSlots: filterSlots,
          onFilter: filter('dept')
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
          scopedSlots: { customRender: 'action' }
        }
      ],
      ADMIN_COLUMNS: [
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
}
