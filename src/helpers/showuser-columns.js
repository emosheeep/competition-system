import { filter, filterSlots } from './culumns-helper';

export const STUDENT_COLUMNS = [
  { title: '学号', dataIndex: 'sid' },
  { title: '姓名', dataIndex: 'name' },
  { title: '性别', dataIndex: 'sex' },
  { title: '年级', dataIndex: 'grade' },
  { title: '班级', dataIndex: 'classname' },
  { title: '操作', key: 'action' },
];
export const TEACHER_COLUMNS = [
  {
    title: '工号',
    dataIndex: 'account',
    sorter: (a, b) => a.account - b.account,
    scopedSlots: filterSlots,
    onFilter: filter('account'),
  },
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: filterSlots,
    onFilter: filter('name'),
  },
  {
    title: '职称',
    dataIndex: 'rank',
    scopedSlots: filterSlots,
    onFilter: filter('rank'),
  },
  {
    title: '描述',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' },
  },
];
export const ADMIN_COLUMNS = [
  {
    title: '账号',
    dataIndex: 'account',
    sorter: (a, b) => a.account - b.account,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: filterSlots,
    onFilter: filter('name'),
  },
  {
    title: '权限',
    dataIndex: 'power',
    onFilter: filter('power'),
    filters: [
      {
        text: 'readable',
        value: 'readable',
      },
      {
        text: 'writeable',
        value: 'writeable',
      },
      {
        text: 'root',
        value: 'root',
      },
    ],
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' },
  },
];
