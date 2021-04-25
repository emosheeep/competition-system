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
      row-key="sid"
      :loading="loading"
      :data-source="users"
      :pagination="pagination"
      :columns="tableColumns"
      @change="changePage"
    >
      <template #header>
        <a-button-group>
          <a-button v-if="$has('user:add')" type="primary" @click="addUser">
            添加学生
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
            <a v-if="$has('user:update')" @click="editUser(record)">
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
            v-if="$has('user:delete')"
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

    <UserImport type="student" ref="import" @refresh="search" />
  </div>
</template>

<script>
import { grades, gradeMap, sexes, sexMap } from '@/utils/const';
import { exportData } from '@/utils/excel';
import createColumns from '@/helpers/importuser-columns';
import EditStudent from '@/components/edit/EditStudent';
import UserImport from '@/components/common/UserImport';
import GrantRole from '@/components/common/GrantRole';

const STUDENT_COLUMNS = [
  { title: '学号', dataIndex: 'sid' },
  { title: '姓名', dataIndex: 'name' },
  { title: '性别', customRender: ({ sex }) => sexMap[sex] },
  { title: '年级', customRender: ({ grade }) => gradeMap[grade] },
  { title: '班级', dataIndex: 'class' },
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
  const header = STUDENT_COLUMNS.map(v => v.title);
  header.pop(); // 去掉最后一栏操作栏
  return exportData({
    name: '学生信息',
    data,
    header,
    keyMap: {
      sid: '学号',
      name: '姓名',
      sex: ['性别', sex => sexMap[sex]],
      grade: ['年级', grade => gradeMap[grade]],
      class: '班级',
      create_time: '创建时间',
      update_time: '修改时间',
    },
  });
}

export default {
  name: 'Student',
  metaInfo: {
    title: '学生管理',
  },
  components: {
    UserImport,
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
      tableColumns: STUDENT_COLUMNS,
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
        type: 'student',
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
        type: 'student',
        account: row.sid,
      }).then(() => {
        this.$message.success({ content: '已重置', key });
      }).catch(() => {
        this.$message.error({ content: '重置失败', key });
      });
    },
    addUser() {
      let vnode;

      this.$confirm({
        title: '添加学生',
        content: h => (vnode = h(EditStudent)),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.addUser('student', values).then(() => {
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
        content: h => (vnode = <EditStudent type="update" data={row} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.updateUser(
            'student',
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
      this.$api.deleteUser('student', {
        ids: [row.sid],
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
        onOk: () => this.$api.deleteUser('student', {
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
        type: 'student',
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
          type="student"
          role={item.role_id}
          account={item.sid}
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
      label: '学号',
      key: 'sid',
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
      label: '性别',
      key: 'sex',
      default: undefined,
      component: 'select',
      props: {
        options: sexes,
      },
    },
    {
      label: '年级',
      key: 'grade',
      default: undefined,
      component: 'select',
      props: {
        options: grades,
      },
    },
    {
      label: '班级',
      key: 'class',
      default: '',
      component: 'input',
    },
  ];
}
</script>
