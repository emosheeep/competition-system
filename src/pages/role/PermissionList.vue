<template>
  <div>
    <SearchForm
      ref="searchForm"
      :options="searchOptions"
      :loading="loading"
      @search="search"
      @reset="search"
    />

    <AntTable
      :loading="loading"
      :bordered="false"
      :columns="columns"
      :data-source="tableData"
      :pagination="pagination"
      @change="changePage"
    >
      <template #header>
        <a-button
          v-if="$has('permission:add')"
          type="primary"
          @click="addPermission"
        >
          <a-icon type="plus" />添加权限
        </a-button>
      </template>
    </AntTable>
  </div>
</template>

<script>
import { permissionTypes, actions } from '@/utils/const';
import EditPermission from '@/components/edit/EditPermission';

export default {
  name: 'PermissionList',
  metaInfo: {
    title: '权限管理',
  },
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
  mounted() {
    this.$watch(() => [this.pageSize, this.current], this.getData, { immediate: true });
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
      this.loading = true;
      this.$api.getPermissions({
        ...this.$refs.searchForm.getResult(),
        offset: this.current,
        limit: this.pageSize,
      }).then(data => {
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
          return this.$api.addPermission(values).then(() => {
            this.getData();
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
          return this.$api.updatePermission(values).then(() => {
            this.getData();
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '修改失败');
            throw e;
          });
        },
      });
    },
    remove(row) {
      this.$modal.confirm({
        title: `确认删除 ${row.label}?`,
        onOk: () => this.$api.deletePermission([row.id]).then(() => {
          this.$message.success('删除成功');
          this.getData();
        }).catch(e => {
          console.error(e);
          this.$message.error(e.msg || '删除失败');
          throw e;
        }),
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
      label: '权限类型',
      key: 'type',
      default: undefined,
      component: 'select',
      props: {
        options: permissionTypes,
      },
    },
    {
      label: '权限动作',
      key: 'action',
      default: undefined,
      component: 'select',
      props: {
        options: actions,
      },
    },
  ];
}

function createTableColumns(h) {
  return [
    { title: '编号', dataIndex: 'id' },
    { title: '权限名称', dataIndex: 'label' },
    { title: '权限类型', dataIndex: 'type' },
    {
      title: 'Action',
      dataIndex: 'action',
      customRender: action => <a-tag>{action}</a-tag>,
    },
    {
      title: '操作',
      width: 100,
      customRender: (row) => {
        const buttons = [
          this.$has('permission:update') && <a onClick={this.edit.bind(this, row)}>编辑</a>,
          this.$has('permission:delete') && <a onClick={this.remove.bind(this, row)}>删除</a>,
        ];
        return <div>{buttons}</div>;
      },
    },
  ];
}
</script>

<style scoped lang="stylus">
a:not(:last-child)
  margin-right 10px
</style>
