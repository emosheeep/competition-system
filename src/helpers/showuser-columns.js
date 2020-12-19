import { filter, filterSlots } from './columns-helper';

export const STUDENT_COLUMNS = [
  {
    title: '学号',
    dataIndex: 'account',
    sorter: (a, b) => a.account - b.account,
    slots: filterSlots,
    onFilter: filter('account'),
  },
  {
    title: '姓名',
    dataIndex: 'name',
    slots: filterSlots,
    onFilter: filter('name'),
  },
  {
    title: '性别',
    dataIndex: 'sex',
    onFilter: filter('sex'),
    filters: [
      {
        text: '男',
        value: '男',
      },
      {
        text: '女',
        value: '女',
      },
    ],
  },
  {
    title: '年级',
    dataIndex: 'grade',
  },
  {
    title: '班级',
    dataIndex: 'classname',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    slots: { customRender: 'action' },
  },
];
export const TEACHER_COLUMNS = [
  {
    title: '工号',
    dataIndex: 'account',
    sorter: (a, b) => a.account - b.account,
    slots: filterSlots,
    onFilter: filter('account'),
  },
  {
    title: '姓名',
    dataIndex: 'name',
    slots: filterSlots,
    onFilter: filter('name'),
  },
  {
    title: '职称',
    dataIndex: 'rank',
    slots: filterSlots,
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
    slots: { customRender: 'action' },
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
    slots: filterSlots,
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
    slots: { customRender: 'action' },
  },
];
