import { filter, filterSlots } from './culumns-helper'

export default function () {
  return [
    {
      title: '举办时间',
      dataIndex: 'date',
      ellipsis: true,
      width: 110,
      sorter: (a, b) => a.date - b.date,
      scopedSlots: {
        customRender: 'date'
      }
    },
    {
      title: '赛事名称',
      dataIndex: 'title',
      ellipsis: true,
      scopedSlots: filterSlots,
      onFilter: filter('title')
    },
    {
      title: '级别',
      dataIndex: 'level',
      width: 120,
      align: 'center',
      ellipsis: true,
      onFilter: filter('level'),
      filters: [
        {
          text: '校级',
          value: '校级'
        },
        {
          text: '省级',
          value: '省级'
        },
        {
          text: '国家级一般',
          value: '国家级一般'
        },
        {
          text: '国家级重点',
          value: '国家级重点'
        }
      ]
    },
    {
      title: '类别',
      dataIndex: 'type',
      ellipsis: true,
      width: 80,
      align: 'center',
      onFilter: filter('type'),
      scopedSlots: filterSlots
    },
    {
      title: '主办方',
      dataIndex: 'sponsor',
      ellipsis: true,
      scopedSlots: filterSlots,
      onFilter: filter('sponsor')
    },
    {
      title: '地点',
      dataIndex: 'location',
      ellipsis: true,
      scopedSlots: filterSlots,
      onFilter: filter('location')
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
      scopedSlots: filterSlots,
      onFilter: filter('description')
    },
    {
      title: '操作',
      align: 'center',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ]
}
