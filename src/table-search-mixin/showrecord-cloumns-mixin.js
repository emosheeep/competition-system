import { filter, filterSlots } from './culumns-helper'

export default {
  methods: {
    CREATE_COLUMNS
  }
}
function CREATE_COLUMNS (type) {
  if (type === 'admin') {
    return [
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
        onFilter: filter('title')
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
        scopedSlots: filterSlots,
        onFilter: filter('tid')
      },
      {
        title: '教师姓名',
        dataIndex: 'tname',
        ellipsis: true,
        scopedSlots: filterSlots,
        onFilter: filter('tname')
      },
      {
        title: '成绩',
        dataIndex: 'score',
        ellipsis: true
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]
  } else if (type === 'teacher') {
    return [
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
        onFilter: filter('title')
      },
      {
        title: '学号',
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
        title: '成绩',
        dataIndex: 'score',
        ellipsis: true
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]
  } else if (type === 'student') {
    return [
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
        onFilter: filter('title')
      },
      {
        title: '教师工号',
        dataIndex: 'tid',
        ellipsis: true,
        sorter: (a, b) => a.tid - b.tid,
        scopedSlots: filterSlots,
        onFilter: filter('tid')
      },
      {
        title: '教师姓名',
        dataIndex: 'tname',
        ellipsis: true,
        scopedSlots: filterSlots,
        onFilter: filter('tname')
      },
      {
        title: '成绩',
        dataIndex: 'score',
        ellipsis: true
      }
    ]
  } else if (type === 'common') {
    return [
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
        scopedSlots: filterSlots,
        onFilter: filter('tid')
      },
      {
        title: '教师姓名',
        dataIndex: 'tname',
        ellipsis: true,
        scopedSlots: filterSlots,
        onFilter: filter('tname')
      },
      {
        title: '成绩',
        dataIndex: 'score',
        ellipsis: true
      }
    ]
  }
  throw new Error("type must be one of ['admin', 'student', 'teacher']")
}
