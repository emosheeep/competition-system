import { filter, filterSlots } from './culumns-helper'

export default {
  methods: {
    CREATE_COLUMNS (type) {
      if (type === 'admin') {
        return allColumns
      } else if (type === 'teacher') {
        return allColumns.filter(item => {
          return item.dataIndex !== 'tid' && item.dataIndex !== 'tname'
        })
      } else if (type === 'student') {
        return allColumns.filter(item => {
          return item.dataIndex !== 'sid' && item.dataIndex !== 'sname'
        })
      } else if (type === 'common') {
        return allColumns.slice(0, allColumns.length - 1) // 去掉action
      }
      throw new Error(
        "type must be one of ['admin', 'student', 'teacher', 'common']"
      )
    }
  }
}

const allColumns = [
  {
    title: '举办时间',
    dataIndex: 'date',
    width: 110,
    sorter: (a, b) => a.date - b.date,
    scopedSlots: {
      customRender: 'date'
    }
  },
  {
    title: '名称',
    dataIndex: 'title',
    ellipsis: true,
    scopedSlots: filterSlots,
    onFilter: filter('sid')
  },
  {
    title: '学生账号',
    dataIndex: 'sid',
    ellipsis: true,
    sorter: (a, b) => a.sid - b.sid,
    scopedSlots: filterSlots,
    onFilter: filter('sid')
  },
  {
    title: '学生姓名',
    dataIndex: 'sname',
    ellipsis: true,
    scopedSlots: filterSlots,
    onFilter: filter('sname')
  },
  {
    title: '教师工号',
    dataIndex: 'tid',
    ellipsis: true,
    sorter: (a, b) => a.tid - b.tid,
    onFilter: filter('tid'),
    scopedSlots: {
      customRender: 'tid',
      ...filterSlots
    }
  },
  {
    title: '教师姓名',
    dataIndex: 'tname',
    ellipsis: true,
    onFilter: filter('tname'),
    scopedSlots: {
      customRender: 'tname',
      ...filterSlots
    }
  },
  {
    title: '状态',
    dataIndex: 'state',
    ellipsis: true,
    onFilter: filter('state'),
    filters: [
      {
        text: '未审核',
        value: 'pending'
      },
      {
        text: '成功',
        value: 'fulfilled'
      },
      {
        text: '失败',
        value: 'rejected'
      }
    ],
    scopedSlots: {
      customRender: 'state'
    }
  },
  {
    title: '成绩',
    dataIndex: 'score',
    ellipsis: true
  },
  {
    title: '备注',
    dataIndex: 'description',
    ellipsis: true
  },
  {
    title: '操作',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
