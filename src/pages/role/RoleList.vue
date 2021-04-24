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
      :scroll="{ x: 500 }"
      @change="changePage"
    >
      <template #header>
        <a-button v-if="$has('role:add')" type="primary" @click="addRole">
          <a-icon type="plus" />添加角色
        </a-button>
      </template>
      <template #expandedRowRender="record">
        <div
          class="permissions"
          v-for="(items, type) in group(record.permissions)"
          :key="type"
        >
          <span class="title">{{ type }}</span>
          <div class="tag-container">
            <a-tag
              v-for="({ label, action }, index) in items"
              :key="index"
              color="green"
            >
              {{ `${label}(${action})` }}
            </a-tag>
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
  metaInfo: {
    title: '角色管理',
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
      this.$api.getRoles({
        ...this.$refs.searchForm.getResult(),
        offset: this.current,
        limit: this.pageSize,
      }).then(data => {
        this.tableData = data.data;
        this.total = data.count;
      }).catch(e => {
        this.$message.error(e.msg || '获取角色列表失败');
      }).finally(() => {
        this.loading = false;
      });
    },
    addRole() {
      let vnode;
      this.$drawer({
        title: '添加角色',
        content: h => (vnode = <EditRole />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.addRole(values).then(() => {
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
      this.$drawer({
        title: '编辑角色',
        content: h => (vnode = <EditRole data={row} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          values.id = row.id;
          return this.$api.updateRole(values).then(() => {
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
        onOk: () => this.$api.deleteRole([row.id]).then(() => {
          this.$message.success('删除成功');
          this.search();
        }).catch(e => {
          console.error(e);
          this.$message.error(e.msg || '删除失败');
          throw e;
        }),
      });
    },
    group(permissions) {
      const result = {};
      for (const { type, action, label } of permissions) {
        const item = { action, label };
        if (!result[type]) result[type] = [];
        result[type].push(item);
      }
      return result;
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
    { title: '角色编号', dataIndex: 'id', width: 80 },
    { title: '角色名称', dataIndex: 'label', ellipsis: true },
    { title: '角色描述', dataIndex: 'description' },
    {
      title: '操作',
      width: 100,
      customRender: (row) => {
        const buttons = [
          this.$has('role:update') && <a onClick={this.edit.bind(this, row)}>编辑</a>,
          this.$has('role:delete') && <a onClick={this.remove.bind(this, row)}>删除</a>,
        ];
        return <div>{buttons}</div>;
      },
    },
  ];
}
</script>

<style scoped lang="stylus">
.permissions
  display flex
  align-items center
  &:not(:last-child)
    margin-bottom 10px
  & > .title
    align-self flex-start
    display inline-block
    min-width 80px
  & >>> .ant-tag
    cursor pointer
    margin-bottom 5px

a:not(:last-child)
  margin-right 10px
</style>
