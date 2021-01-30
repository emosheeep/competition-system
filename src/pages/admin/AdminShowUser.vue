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
      row-key="sid"
      size="middle"
      :loading="loading"
      :data-source="users"
      :pagination="pagination"
      :columns="tableColumns"
      @change="changePage"
    />

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
      :visible.sync="updateUserVisible"
      :type="userType"
      :data="curUser"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { dropRight } from 'lodash';
import createColumns from '@/helpers/importuser-columns';
import { STUDENT_COLUMNS, TEACHER_COLUMNS } from '@/helpers/showuser-columns';
import resetPassword from '@/utils/reset-password';
import AddUser from '@/components/user/AddUser';
import Import from '@/components/common/Import';
import UpdateUser from '@/components/user/UpdateUser';
import { ADD_USER, DELETE_USER } from '@/store/mutation-types';
import { classes } from '@/utils/const';

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
      searchOptions: createSearchOptions.call(this),
      current: 1,
      pageSize: 10,
      total: 0,
      addUserVisible: false,
      importUserVisible: false,
      updateUserVisible: false,
      isMultiple: false,
      importUserType: 'student',
      userType: 'student',
      curUser: {},
    };
  },
  computed: {
    ...mapState('users', ['students', 'teachers']),
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
    this.$watch(() => [this.pageSize, this.current, this.userType], this.getData);
  },
  methods: {
    ...mapActions('users', [ADD_USER, DELETE_USER]),
    onUpdate(user) {
      this.curUser = user;
      this.updateUserVisible = true;
    },
    reset(account) {
      resetPassword(this.userType, account);
    },
    search() {
      this.current = 1;
      this.getData();
    },
    onDelete(data) {
      this.DELETE_USER({
        type: this.userType,
        data,
      }).finally(() => {
        this.isMultiple = false;
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
        if (data.code !== 0) throw data;
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
        options: [
          { label: '男', value: 'man' },
          { label: '女', value: 'woman' },
        ],
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

<style scoped lang="stylus">
</style>
