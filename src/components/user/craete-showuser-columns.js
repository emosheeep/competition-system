import { filterSlots, filter, changeVisible } from '../culumns-helper'

export default function () {
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
