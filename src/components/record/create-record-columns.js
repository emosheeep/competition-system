import { filterSlots, filter, changeVisible } from '../culumns-helper'

export default function createColumns (type) {
  if (type === 'admin') {
    return AdminRecordColumns
  } else if (type === 'teacher') {
    return TeacherRecordColumns
  } else if (type === 'student') {
    return StudentRecordColumns
  }
  throw new Error("type must be one of ['admin', 'student', 'teacher']")
}
const AdminRecordColumns = [
  {
    title: '学生账号',
    dataIndex: 'sid',
    ellipsis: true,
    sorter: (a, b) => a.sid > b.sid,
    scopedSlots: filterSlots,
    onFilter: filter('sid'),
    onFilterDropdownVisibleChange: changeVisible
  },
  {
    title: '学生姓名',
    dataIndex: 'sname',
    ellipsis: true,
    scopedSlots: filterSlots,
    onFilter: filter('sname'),
    onFilterDropdownVisibleChange: changeVisible
  },
  {
    title: '教师工号',
    dataIndex: 'tid',
    ellipsis: true,
    sorter: (a, b) => a.tid > b.tid,
    scopedSlots: filterSlots,
    onFilter: filter('tid'),
    onFilterDropdownVisibleChange: changeVisible
  },
  {
    title: '教师姓名',
    dataIndex: 'tname',
    ellipsis: true,
    scopedSlots: filterSlots,
    onFilter: filter('tname'),
    onFilterDropdownVisibleChange: changeVisible
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
const StudentRecordColumns = [
  {
    title: '举办时间',
    dataIndex: 'date',
    width: 110,
    sorter: (a, b) => a.date > b.date,
    scopedSlots: {
      customRender: 'date'
    }
  },
  {
    title: '名称',
    dataIndex: 'title',
    ellipsis: true,
    scopedSlots: filterSlots,
    onFilter: filter('sid'),
    onFilterDropdownVisibleChange: changeVisible
  },
  {
    title: '教师工号',
    dataIndex: 'tid',
    ellipsis: true,
    sorter: (a, b) => a.tid > b.tid,
    scopedSlots: filterSlots,
    onFilter: filter('tid'),
    onFilterDropdownVisibleChange: changeVisible
  },
  {
    title: '教师姓名',
    dataIndex: 'tname',
    ellipsis: true,
    scopedSlots: filterSlots,
    onFilter: filter('tname'),
    onFilterDropdownVisibleChange: changeVisible
  },
  {
    title: '成绩',
    dataIndex: 'score',
    ellipsis: true
  }
]
const TeacherRecordColumns = [
  {
    title: '举办时间',
    dataIndex: 'date',
    width: 110,
    sorter: (a, b) => a.date > b.date,
    scopedSlots: {
      customRender: 'date'
    }
  },
  {
    title: '名称',
    dataIndex: 'title',
    ellipsis: true,
    scopedSlots: filterSlots,
    onFilter: filter('sid'),
    onFilterDropdownVisibleChange: changeVisible
  },
  {
    title: '学号',
    dataIndex: 'sid',
    ellipsis: true,
    sorter: (a, b) => a.sid > b.sid,
    scopedSlots: filterSlots,
    onFilter: filter('sid'),
    onFilterDropdownVisibleChange: changeVisible
  },
  {
    title: '学生姓名',
    dataIndex: 'sname',
    ellipsis: true,
    scopedSlots: filterSlots,
    onFilter: filter('sname'),
    onFilterDropdownVisibleChange: changeVisible
  },
  {
    title: '成绩',
    dataIndex: 'score',
    ellipsis: true
  }
]
