import { dropRight } from 'lodash';

export default function(type) {
  if (type === 'admin') {
    return allColumns;
  } else if (type === 'teacher') {
    return allColumns.filter(item => {
      return item.dataIndex !== 'tid' && item.dataIndex !== 'tname';
    });
  } else if (type === 'student') {
    return allColumns.filter(item => {
      return item.dataIndex !== 'sid' && item.dataIndex !== 'sname';
    });
  } else if (type === 'readonly') {
    return dropRight(allColumns); // 去掉action
  }
  throw new Error(
    "type must be one of ['admin', 'student', 'teacher', 'readonly']",
  );
}

const allColumns = [
  {
    title: '举办时间',
    dataIndex: 'date',
  },
  {
    title: '名称',
    dataIndex: 'title',
  },
  {
    title: '学生姓名',
    dataIndex: 'sname',
  },
  {
    title: '成绩',
    dataIndex: 'score',
  },
  {
    title: '状态',
    dataIndex: 'state',
  },
  {
    title: '备注',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: {
      customRender: 'action',
    },
  },
];
