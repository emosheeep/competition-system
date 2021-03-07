<template>
  <div>
    <SearchForm
      immediate
      ref="searchForm"
      :options="searchOptions"
      :loading="loading"
      @search="search"
      @reset="search"
    />

    <a-button type="primary" @click="addPermission">
      <a-icon type="plus" />添加权限
    </a-button>

    <a-divider style="margin: 10px 0" />

    <AntTable
      :loading="loading"
      :bordered="false"
      :columns="columns"
      :data-source="tableData"
      :pagination="pagination"
      @change="changePage"
    />
  </div>
</template>

<script>
import EditPermission from '@/components/edit/EditPermission';

export default {
  name: 'PermissionList',
  data() {
    return {
      loading: false,
      current: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      searchOptions: createSearchOptions.call(this),
      columns: createTableColumns.call(this, this.$createElement),
    };
  },
  computed: {
    pagination() {
      return {
        current: this.current,
        pageSize: this.pageSize,
        total: this.total,
      };
    },
  },
  beforeMount() {
    this.$watch(() => [this.pageSize, this.current], this.getData);
  },
  activated() {
    this.getData();
  },
  methods: {
    changePage({ pageSize, current }) {
      Object.assign(this, { pageSize, current });
    },
    search() {
      this.current = 1;
      this.getData();
    },
    getData() {
      this.$api.getPermissions({
        ...this.$refs.searchForm.getResult(),
        offset: this.current,
        limit: this.pageSize,
      }).then(({ data }) => {
        if (data.code !== 200) throw data;
        this.tableData = data.data;
        this.total = data.count;
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '获取数据失败');
      }).finally(() => {
        this.loading = false;
      });
    },
    addPermission() {
      let vnode;
      this.$confirm({
        title: '添加权限',
        content: h => (vnode = <EditPermission />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.addPermission(values).then(({ data }) => {
            if (data.code !== 200) throw data;
            this.search();
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '添加失败');
            throw e;
          });
        },
      });
    },
    edit(row) {
      let vnode;
      this.$confirm({
        title: '编辑权限',
        content: h => (vnode = <EditPermission data={row} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          values.id = row.id;
          return this.$api.updatePermission(values).then(({ data }) => {
            if (data.code !== 200) throw data;
            this.search();
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '修改失败');
            throw e;
          });
        },
      });
    },
  },
};

function createSearchOptions() {
  return [
    {
      label: '权限编号',
      key: 'id',
      default: '',
      component: 'input',
    },
    {
      label: '权限名称',
      key: 'label',
      default: '',
      component: 'input',
    },
    {
      label: '权限描述',
      key: 'description',
      default: '',
      component: 'input',
    },
  ];
}

function createTableColumns(h) {
  return [
    { title: '编号', dataIndex: 'id' },
    { title: '权限名称', dataIndex: 'label' },
    {
      title: 'Action',
      dataIndex: 'actions',
      width: 400,
      customRender: actions => actions.map((key, index) => <a-tag key={index}>{ key }</a-tag>),
    },
    { title: '备注', dataIndex: 'description' },
    {
      title: '操作',
      width: 50,
      customRender: (row) => <a onClick={this.edit.bind(this, row)} >编辑</a>,
    },
  ];
}
</script>
