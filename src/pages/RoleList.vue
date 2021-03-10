<template>
  <div>
    <SearchForm
      ref="searchForm"
      :options="searchOptions"
      :loading="loading"
      @search="search"
      @reset="search"
    />

    <a-button type="primary" @click="addRole">
      <a-icon type="plus" />添加角色
    </a-button>

    <a-divider style="margin: 10px 0" />

    <AntTable
      :loading="loading"
      :bordered="false"
      :columns="columns"
      :data-source="tableData"
      :pagination="pagination"
      @change="changePage"
    >
      <template #expandedRowRender="record">
        <div class="permissions">
          <div class="item" v-for="item in record.permissions" :key="item.id">
            <span class="name">{{ item.label }}({{ item.type }})</span>
            <a-tag color="green" v-for="action in item.actions" :key="action">{{ action }}</a-tag>
          </div>
        </div>
      </template>
    </AntTable>
  </div>
</template>

<script>
import EditRole from '@/components/edit/EditRole';

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
      this.loading = true;
      this.$api.getRoles({
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
    addRole() {
      let vnode;
      this.$confirm({
        title: '添加权限',
        content: h => (vnode = <EditRole />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.addRole(values).then(({ data }) => {
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
        title: '编辑角色',
        content: h => (vnode = <EditRole data={row} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          values.id = row.id;
          return this.$api.updateRole(values).then(({ data }) => {
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
    remove(row) {
      this.$modal.confirm({
        title: `确认删除 ${row.label}?`,
        onOk: () => this.$api.deleteRole([row.id]).then(({ data }) => {
          if (data.code !== 200) throw data;
          this.$message.success('删除成功');
          this.search();
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
      label: '角色编号',
      key: 'id',
      default: '',
      component: 'input',
    },
    {
      label: '角色名称',
      key: 'label',
      default: '',
      component: 'input',
    },
    {
      label: '角色描述',
      key: 'description',
      default: '',
      component: 'input',
    },
  ];
}

function createTableColumns(h) {
  return [
    { title: '角色编号', dataIndex: 'id' },
    { title: '角色名称', dataIndex: 'label' },
    { title: '角色描述', dataIndex: 'description' },
    {
      title: '操作',
      width: 100,
      customRender: (row) => (
        <div>
          <a onClick={this.edit.bind(this, row)}>编辑</a>
          <a onClick={this.remove.bind(this, row)}>删除</a>
        </div>
      ),
    },
  ];
}
</script>

<style scoped lang="stylus">
.permissions
  display grid
  grid-template-columns repeat(2, 1fr)
  grid-gap 12px
  .item .name
    margin-right 12px
a:not(:last-child)
  margin-right 10px
</style>
