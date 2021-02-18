<template>
  <div class="container">
    <SearchForm
      ref="searchForm"
      :loading="loading"
      :options="searchOptions"
      @search="search"
      @reset="search"
    />

    <a-tabs v-model="userType" @change="onChange">
      <a-tab-pane key="student" tab="学生信息" />
      <a-tab-pane key="teacher" tab="教师信息" />
      <template #tabBarExtraContent>
        <a-button-group>
          <a-dropdown :trigger="['hover']">
            <a-button type="primary">添加用户</a-button>
            <template #overlay>
              <a-menu @click="addUser">
                <a-menu-item key="student">学生</a-menu-item>
                <a-menu-item key="teacher">教师</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-button :disabled="!selectedKeys.length" @click="batchDelete">
            批量删除 ({{ selectedKeys.length }})
          </a-button>
          <a-dropdown :trigger="['hover']">
            <a-button>从表格导入<a-icon type="down" /></a-button>
            <template #overlay>
              <a-menu @click="showImportUser">
                <a-menu-item key="student">学生</a-menu-item>
                <a-menu-item key="teacher">教师</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-button-group>
      </template>
    </a-tabs>

    <!--信息列表-->
    <AntTable
      v-model="selectedKeys"
      :row-key="rowKey"
      :loading="loading"
      :data-source="users"
      :pagination="pagination"
      :columns="tableColumns"
      @change="changePage"
    >
      <template #action="record">
        <!--编辑-->
        <a @click="editUser(record)"><a-icon type="edit" /></a>

        <a-divider type="vertical" />

        <!--删除-->
        <a-popconfirm
          title="确认删除？"
          ok-text="确认"
          cancel-text="取消"
          placement="left"
          @confirm="deleteUser(record)"
        >
          <template #icon>
            <a-icon
              type="question-circle-o"
              style="color: orange"
            />
          </template>
          <a><a-icon type="delete" /></a>
        </a-popconfirm>

        <!--重置密码-->
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认重置密码？"
          ok-text="确认"
          cancel-text="取消"
          placement="left"
          @confirm="resetPassword(record)"
        >
          <template #icon>
            <a-icon type="question-circle-o" style="color: orange"/>
          </template>
          <a-tooltip placement="top">
            <template #title>
              <span>重置密码</span>
            </template>
            <a><a-icon type="rollback" /></a>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </AntTable>

    <!--导入用户-->
    <Import
      :visible.sync="importUserVisible"
      :columns="curColumns"
      @confirm="importUser"
    />
  </div>
</template>

<script>
import { grades, gradeMap, rankMap, ranks, sexes, sexMap } from '@/utils/const';
import createColumns from '@/helpers/importuser-columns';
import EditStudent from '@/components/edit/EditStudent';
import EditTeacher from '@/components/edit/EditTeacher';
import Import from '@/components/common/Import';

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

export default {
  name: 'AdminShowUser',
  components: {
    Import,
  },
  data() {
    return {
      loading: false,
      selectedKeys: [],
      users: [],
      current: 1,
      pageSize: 10,
      total: 0,
      addUserVisible: false,
      importUserVisible: false,
      importUserType: 'student',
      userType: 'student',
    };
  },
  computed: {
    rowKey() {
      return this.userType === 'student' ? 'sid' : 'tid';
    },
    searchOptions() {
      return createSearchOptions.call(this, this.userType);
    },
    curColumns() {
      return createColumns(this.importUserType);
    },
    tableColumns() {
      return this.userType === 'student' ? STUDENT_COLUMNS : TEACHER_COLUMNS;
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
  beforeMount() {
    this.$watch(() => [this.pageSize, this.current], this.getData);
  },
  activated() {
    this.getData();
  },
  methods: {
    onChange() {
      this.selectedKeys.splice(0);
      this.search();
    },
    search() {
      this.current = 1;
      this.getData();
    },
    changePage({ pageSize, current }) {
      Object.assign(this, { pageSize, current });
    },
    getData() {
      this.loading = true;
      this.$api.getUserList({
        ...this.$refs.searchForm.getResult(),
        type: this.userType,
        offset: this.current,
        limit: this.pageSize,
      }).then(({ data }) => {
        if (data.code !== 200) throw data;
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
        type: this.userType,
        account: row[this.rowKey],
      }).then(() => {
        this.$message.success({ content: '已重置', key });
      }).catch(() => {
        this.$message.error({ content: '重置失败', key });
      });
    },
    addUser({ key: userType }) {
      let vnode;
      const data = ({
        teacher: { title: '教师', comp: EditTeacher },
        student: { title: '学生', comp: EditStudent },
      })[userType];

      this.$confirm({
        title: `添加${data.title}`,
        content: h => (vnode = h(data.comp)),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.addUser(userType, values).then(({ data }) => {
            if (data.code !== 200) throw data;
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
        content: h => (vnode = this.userType === 'student'
          ? <EditStudent type="update" data={row} />
          : <EditTeacher type="update" data={row} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
          return this.$api.updateUser(
            this.userType,
            values,
          ).then(({ data }) => {
            if (data.code !== 200) throw data;
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
      this.$api.deleteUser(this.userType, {
        ids: [row[this.rowKey]],
      }).then(({ data }) => {
        if (data.code !== 200) throw data;
        this.$message.success({ content: '删除成功!', key });
        this.getData();
      }).catch(e => {
        this.$message.error({ content: e.msg || '删除失败!', key });
      });
    },
    batchDelete() {
      this.$modal.confirm({
        title: `确认删除选中的${this.selectedKeys.length}项数据?`,
        onOk: () => this.$api.deleteUser(this.userType, {
          ids: this.selectedKeys,
        }).then(({ data }) => {
          if (data.code !== 200) throw data;
          this.$message.success('删除成功!');
          this.selectedKeys.splice(0);
          this.getData();
        }).catch(e => {
          this.$message.error(e.msg || '删除失败!');
          throw e;
        }),
      });
    },
    showImportUser({ key }) {
      this.importUserType = key;
      this.importUserVisible = true;
    },
    importUser(users) {
      this.ADD_USER({
        type: this.importUserType,
        users,
      }).then(() => {
        this.importUserVisible = false;
      }).catch(console.warn);
    },
  },
};

function createSearchOptions(type) {
  if (type === 'teacher') {
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
