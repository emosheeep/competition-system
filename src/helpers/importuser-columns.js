const columns = {
  student: [
    {
      title: '学号',
      dataIndex: 'account',
      sort: (a, b) => a.account - b.account,
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '年级',
      dataIndex: 'grade',
    },
    {
      title: '班级',
      dataIndex: 'classname',
    },
  ],
  teacher: [
    {
      title: '工号',
      dataIndex: 'account',
      sort: (a, b) => a.account - b.account,
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '职称',
      dataIndex: 'rank',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
  ],
};

const types = Object.keys(columns);

export default function(type) {
  if (!types.includes(type)) {
    throw new Error(`type must in ${types.toString()}`);
  }
  return columns[type];
}
