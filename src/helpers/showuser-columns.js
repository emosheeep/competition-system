export const STUDENT_COLUMNS = [
  { title: '学号', dataIndex: 'sid' },
  { title: '姓名', dataIndex: 'name' },
  { title: '性别', dataIndex: 'sex' },
  { title: '年级', dataIndex: 'grade' },
  { title: '班级', dataIndex: 'class' },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 100,
    scopedSlots: { customRender: 'action' },
  },
];
export const TEACHER_COLUMNS = [
  { title: '工号', dataIndex: 'tid' },
  { title: '姓名', dataIndex: 'name' },
  { title: '职称', dataIndex: 'rank' },
  { title: '描述', dataIndex: 'description', ellipsis: true },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 100,
    scopedSlots: { customRender: 'action' },
  },
];
export const ADMIN_COLUMNS = [
  { title: '账号', dataIndex: 'account' },
  { title: '姓名', dataIndex: 'name' },
  { title: '权限', dataIndex: 'power' },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' },
  },
];
