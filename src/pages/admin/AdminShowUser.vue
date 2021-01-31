<template>
  <div class="container">
    <SearchForm
      immediate
      ref="searchForm"
      :loading="loading"
      :options="searchOptions"
      @search="search"
      @reset="search"
    />

    <a-tabs v-model="userType">
      <a-tab-pane key="student" tab="学生信息" />
      <a-tab-pane key="teacher" tab="教师信息" />
      <template #tabBarExtraContent>
        <a-button-group>
          <a-button
            type="primary"
            @click="addUserVisible = true"
          >
            添加用户
          </a-button>
          <a-dropdown :trigger="['click']">
            <a-button>
              从表格导入<a-icon type="down" />
            </a-button>
            <template #overlay>
              <a-menu @click="showImportUser">
                <a-menu-item key="student">
                  学生
                </a-menu-item>
                <a-menu-item key="teacher">
                  教师
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-button-group>
      </template>
    </a-tabs>

    <!--信息列表-->
    <a-table
      bordered
      size="middle"
      :row-key="rowKey"
      :loading="loading"
      :data-source="users"
      :pagination="pagination"
      :columns="tableColumns"
      @change="changePage"
    >
      <template #action="record">
        <!--编辑-->
        <a @click="editUser(record)">
          <a-icon type="edit" />
        </a>

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
            <a-icon
              type="question-circle-o"
              style="color: orange"
            />
          </template>
          <a-tooltip placement="top">
            <template #title>
              <span>重置密码</span>
            </template>
            <a><a-icon type="rollback" /></a>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </a-table>

    <!--添加用户-->
    <AddUser v-model="addUserVisible" @success="search" />
    <!--导入用户-->
    <Import
      :visible.sync="importUserVisible"
      :columns="curColumns"
      @confirm="importUser"
    />
    <!--修改用户-->
    <UpdateUser
      v-model="updateUserVisible"
      :type="userType"
      :data="curUser"
      @success="getData"
    />
  </div>
</template>

<script>
import { dropRight } from 'lodash';
import { classes, ranks, sexes } from '@/utils/const';
import { STUDENT_COLUMNS, TEACHER_COLUMNS } from '@/helpers/showuser-columns';
import createColumns from '@/helpers/importuser-columns';
import resetPassword from '@/utils/reset-password';
import AddUser from '@/components/user/AddUser';
import Import from '@/components/common/Import';
import UpdateUser from '@/components/user/UpdateUser';

export default {
  name: 'AdminShowUser',
  components: {
    AddUser,
    Import,
    UpdateUser,
  },
  data() {
    return {
      loading: false,
      users: [],
      current: 1,
      pageSize: 10,
      total: 0,
      addUserVisible: false,
      importUserVisible: false,
      updateUserVisible: false,
      importUserType: 'student',
      userType: 'student',
      curUser: {},
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
      const columns = this.userType === 'student' ? STUDENT_COLUMNS : TEACHER_COLUMNS;
      return this.user.power === 'read' ? dropRight(columns) : columns;
    },
    user() {
      return this.$store.state.user;
    },
    pagination() {
      return {
        current: this.current,
        pageSize: this.pageSize,
        total: this.total,
        showQuickJumper: true,
        showSizeChanger: true,
      };
    },
  },
  beforeMount() {
    this.$watch(() => [this.pageSize, this.current], this.getData);
  },
  methods: {
    editUser(row) {
      this.curUser = row;
      this.updateUserVisible = true;
    },
    resetPassword(row) {
      resetPassword(this.userType, row[this.rowKey]);
    },
    search() {
      this.current = 1;
      this.getData();
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
    changePage({ pageSize, current }) {
      Object.assign(this, { pageSize, current });
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
        options: classes,
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
