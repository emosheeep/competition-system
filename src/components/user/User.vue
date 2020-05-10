<template>
  <div class="container">
    <a-page-header
      :back-icon="false"
      title="用户信息"
      subTitle="用户数据概览"
      style="padding: 0; margin-bottom: 20px"
    >
      <template #extra>
        <a-button-group>
          <a-button type="primary" @click="addUser">添加用户</a-button>
          <a-dropdown :trigger="['click']">
            <a-button>从表格导入<a-icon type="down" /></a-button>
            <template #overlay>
              <a-menu @click="importUser">
                <a-menu-item key="student">学生</a-menu-item>
                <a-menu-item key="teacher">教师</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-button @click="exportExcel">导出Excel</a-button>
        </a-button-group>
      </template>
      <div class="header-info">
        <a-statistic class="number" title="用户总数" :value="allUsersNum" />
        <a-statistic class="number" title="学生" :value="students.length" />
        <a-statistic class="number" title="教师" :value="teachers.length" />
        <a-statistic class="number" title="管理员" :value="admins.length" />
        <a-select
          class="selection-box"
          defaultValue="student"
          style="width: 120px"
          @change="changeType"
        >
          <a-select-option value="student">学生信息</a-select-option>
          <a-select-option value="teacher">教师信息</a-select-option>
          <a-select-option value="admin">管理员信息</a-select-option>
        </a-select>
      </div>
    </a-page-header>

    <ShowUser
      :users="users"
      :loaading="loading"
      :type="showUserType"
      @update-user="onUpdate"
      @delete-user="onDelete"
    />

    <!--弹出层表单-->
    <AddUser v-if="addUserVisible" :visible.sync="addUserVisible"/>
    <ImportUser
      v-if="importUserVisible"
      :visible.sync="importUserVisible"
      :type="importUserType"
    />
    <!--修改用户-->
    <EditUser
      v-if="updateUserVisible"
      :visible.sync="updateUserVisible"
      :type="showUserType"
      :user="curUser"
    />
  </div>
</template>

<script>
import { omit } from 'lodash'
import { createNamespacedHelpers } from 'vuex'
import ShowUser from './ShowUser'
import { makeExcel } from '../../utils/excel'
import { DELETE_USER, SET_USER_LIST, UPDATE_USER } from '../../store/mutation-types'
const { mapActions, mapState } = createNamespacedHelpers('users')
export default {
  name: 'User',
  components: {
    ShowUser,
    AddUser: () => import(
      /* webpackChunkName: "AddUser" */
      /* webpackPrefetch: true */
      './AddUser'
    ),
    ImportUser: () => import(
      /* webpackChunkName: "ImportUser" */
      /* webpackPrefetch: true */
      './ImportUser'
    ),
    EditUser: () => import(
      /* webpackChunkName: "EditUser" */
      /* webpackPrefetch: true */
      './UpdateUser'
    )
  },
  data () {
    return {
      loading: true,
      addUserVisible: false,
      importUserVisible: false,
      updateUserVisible: false,
      curUser: null,
      importUserType: 'student',
      showUserType: 'student'
    }
  },
  computed: {
    ...mapState({
      students: 'students',
      teachers: 'teachers',
      admins: 'admins'
    }),
    users () {
      return {
        students: this.students,
        teachers: this.teachers,
        admins: this.admins
      }
    },
    allUsersNum () {
      return this.students.length + this.teachers.length + this.admins.length
    }
  },
  mounted () {
    this.setUserList().then(data => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      setUserList: SET_USER_LIST,
      deleteUser: DELETE_USER,
      updateUser: UPDATE_USER
    }),
    onUpdate (user) {
      this.curUser = user
      this.updateUserVisible = true
    },
    onDelete ({ type, account }) {
      this.deleteUser({ type, account })
    },
    changeType (value) {
      this.showUserType = value
    },
    addUser () {
      this.addUserVisible = true
    },
    importUser ({ key }) {
      this.importUserType = key
      this.importUserVisible = true
    },
    exportExcel () {
      makeExcel({
        students: this.students.map(item => omit(item, ['_id', '__v'])),
        teachers: this.teachers.map(item => omit(item, ['_id', '__v'])),
        admins: this.admins.map(item => omit(item, ['_id', '__v']))
      })
    }
  }
}

</script>

<style scoped lang="stylus">
  .header-info
    .selection-box
      float right
      margin-top 25px
    .number
      display inline-block
      width 100px
</style>
