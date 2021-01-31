import { dropRight } from 'lodash';
import { filter, filterSlots } from './culumns-helper';
import dayjs from 'dayjs';

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
    width: 110,
    sorter: (a, b) => a.date - b.date,
    customRender: date => dayjs(date).format('YYYY-MM-DD'),
  },
  {
    title: '名称',
    dataIndex: 'title',
    ellipsis: true,
    scopedSlots: filterSlots,
    onFilter: filter('title'),
  },
  {
    title: '学生姓名',
    dataIndex: 'sname',
    ellipsis: true,
    scopedSlots: filterSlots,
    onFilter: filter('sname'),
  },
  {
    title: '成绩',
    dataIndex: 'score',
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'state',
    ellipsis: true,
    onFilter: filter('state'),
    filters: [
      {
        text: '未审核',
        value: 'pending',
      },
      {
        text: '成功',
        value: 'fulfilled',
      },
      {
        text: '失败',
        value: 'rejected',
      },
    ],
    scopedSlots: {
      customRender: 'state',
    },
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
