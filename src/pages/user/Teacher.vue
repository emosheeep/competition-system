<template>
  <div class="container">
    <SearchForm
      ref="searchForm"
      :loading="loading"
      :options="searchOptions"
      @search="search"
      @reset="search"
    />

    <!--信息列表-->
    <AntTable
      v-model="selectedKeys"
      row-key="tid"
      :loading="loading"
      :data-source="users"
      :pagination="pagination"
      :columns="tableColumns"
      @change="changePage"
    >
      <template #header>
        <a-button-group>
          <a-button v-if="$has('user:add')" type="primary" @click="addUser">
            添加教师
          </a-button>
          <a-button
            v-if="$has('user:delete')"
            :disabled="!selectedKeys.length"
            @click="batchDelete"
          >
            批量删除 ({{ selectedKeys.length }})
          </a-button>
          <a-button v-if="$has('user:import')" @click="$refs.import.show()">
            Excel导入
          </a-button>
          <a-button
            v-if="$has('user:export')"
            :loading="exporting"
            @click="exportAll"
          >
            全量导出
          </a-button>
        </a-button-group>
      </template>
      <template #action="record">
        <a-space>
          <template v-if="$has('user:update')">
            <!--编辑-->
            <a @click="editUser(record)">
              <a-icon type="edit" />
            </a>

            <!--重置密码-->
            <a-popconfirm
              title="确认重置密码？"
              ok-text="确认"
              cancel-text="取消"
              placement="left"
              @confirm="resetPassword(record)"
            >
              <template #icon>
                <a-icon type="question-circle-o" style="color: orange" />
              </template>
              <a-tooltip placement="top">
                <template #title>
                  <span>重置密码</span>
                </template>
                <a><a-icon type="rollback" /></a>
              </a-tooltip>
            </a-popconfirm>

            <!--授权-->
            <a @click="grantRole(record)">
              <a-icon type="key" />
            </a>
          </template>

          <!--删除-->
          <a-popconfirm
            title="确认删除？"
            ok-text="确认"
            cancel-text="取消"
            placement="left"
            @confirm="deleteUser(record)"
          >
            <template #icon>
              <a-icon type="question-circle-o" style="color: orange" />
            </template>
            <a><a-icon type="delete" /></a>
          </a-popconfirm>
        </a-space>
      </template>
    </AntTable>

    <UserImport type="teacher" ref="import" @refresh="search" />
  </div>
</template>

<script>
import { rankMap, ranks } from '@/utils/const';
import { exportData } from '@/utils/excel';
import createColumns from '@/helpers/importuser-columns';
import EditTeacher from '@/components/edit/EditTeacher';
import UserImport from '@/components/common/UserImport.vue';
import GrantRole from '@/components/common/GrantRole';

const TEACHER_COLUMNS = [
  { title: '工号', dataIndex: 'tid' },
  { title: '姓名', dataIndex: 'name' },
  { title: '职称', customRender: ({ rank }) => rankMap[rank] },
  { title: '描述', dataIndex: 'description', ellipsis: true },
  { title: '创建时间', dataIndex: 'create_time' },
  { title: '修改时间', dataIndex: 'update_time' },
  {
    title: '操作',
    align: 'center',
    width: 100,
    scopedSlots: { customRender: 'action' },
  },
];

function exportExcel(data) {
  const header = TEACHER_COLUMNS.map(v => v.title);
  header.pop(); // 去掉最后一栏操作栏
  return exportData({
    name: '教师信息',
    data,
    header,
    keyMap: {
      tid: '工号',
      name: '姓名',
      rank: ['职称', rank => rankMap[rank]],
      description: '描述',
      create_time: '创建时间',
      update_time: '修改时间',
    },
  });
}

export default {
  name: 'Teacher',
  components: { UserImport },
  metaInfo: {
    title: '教师管理',
  },
  data() {
    return {
      loading: false,
      exporting: false,
      query: {},
      selectedKeys: [],
      users: [],
      current: 1,
      pageSize: 10,
      total: 0,
      tableColumns: TEACHER_COLUMNS,
    };
  },
  computed: {
    searchOptions() {
      return createSearchOptions.call(this);
    },
    curColumns() {
      return createColumns(this.importUserType);
    },
    user() {
      return this.$store.state.user;
    },
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
    search() {
      this.current = 1;
      this.getData();
    },
    changePage({ pageSize, current }) {
      Object.assign(this, { pageSize, current });
    },
    getData() {
      this.loading = true;
      this.query = this.$refs.searchForm.getResult();
      this.$api.getUserList({
        ...this.query,
        type: 'teacher',
        offset: this.current,
        limit: this.pageSize,
      }).then(data => {
        this.users = data.data;
        this.total = data.count;
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '获取数据失败');
      }).finally(() => {
        this.loading = false;
      });
    },
    resetPassword(row) {
      const key = Date.now();
      this.$message.loading({
        key,
        content: '请稍后',
        duration: 0,
      });
      this.$api.resetPassword({
        type: 'teacher',
        account: row.tid,
      }).then(() => {
        this.$message.success({ content: '已重置', key });
      }).catch(() => {
        this.$message.error({ content: '重置失败', key });
      });
    },
    addUser() {
      let vnode;

      this.$confirm({
        title: '添加教师',
        content: h => (vnode = h(EditTeacher)),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.addUser('teacher', values).then(() => {
            this.$message.success('添加成功');
            this.getData();
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '添加失败');
            throw e;
          });
        },
      });
    },
    editUser(row) {
      let vnode;
      this.$confirm({
        title: '修改信息',
        content: h => (vnode = <EditTeacher type="update" data={row} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.updateUser(
            'teacher',
            values,
          ).then(() => {
            this.$message.success('修改成功');
            this.getData();
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '修改失败');
            throw e;
          });
        },
      });
    },
    deleteUser(row) {
      const key = Math.random();
      this.$message.loading({ content: '正在删除', duration: 0, key });
      this.$api.deleteUser('teacher', {
        ids: [row.tid],
      }).then(() => {
        this.$message.success({ content: '删除成功!', key });
        this.getData();
      }).catch(e => {
        this.$message.error({ content: e.msg || '删除失败!', key });
      });
    },
    batchDelete() {
      this.$modal.confirm({
        title: `确认删除选中的${this.selectedKeys.length}项数据?`,
        onOk: () => this.$api.deleteUser('teacher', {
          ids: this.selectedKeys,
        }).then(() => {
          this.$message.success('删除成功!');
          this.selectedKeys.splice(0);
          this.getData();
        }).catch(e => {
          this.$message.error(e.msg || '删除失败!');
          throw e;
        }),
      });
    },
    exportAll() {
      this.exporting = true;
      this.$api.getUserList({
        ...this.query,
        type: 'teacher',
      }).then(data => {
        return exportExcel(data.data);
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '导出失败');
      }).finally(() => {
        this.exporting = false;
      });
    },
    grantRole(item) {
      let vnode;
      this.$confirm({
        title: '授权',
        content: () => (vnode = <GrantRole
          type="teacher"
          role={item.role_id}
          account={item.tid}
        />),
        onOk: async () => {
          await vnode.componentInstance.confirm();
          this.getData();
        },
      });
    },
  },
};

function createSearchOptions() {
  return [
    {
      label: '工号',
      key: 'tid',
      default: '',
      component: 'input',
    },
    {
      label: '姓名',
      key: 'name',
      default: '',
      component: 'input',
    },
    {
      label: '职称',
      key: 'rank',
      default: undefined,
      component: 'select',
      props: {
        options: ranks,
      },
    },
  ];
}
</script>
