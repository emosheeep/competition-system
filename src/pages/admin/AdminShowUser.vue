<template>
  <div class="container">
    <a-page-header
      :back-icon="false"
      title="用户信息"
      sub-title="用户数据概览"
      style="padding: 0; margin-bottom: 20px"
    >
      <template #extra>
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
          <a-button @click="exportExcel">
            导出Excel
          </a-button>
          <a-button @click="init">
            刷新
          </a-button>
        </a-button-group>
      </template>
      <div class="header-info">
        <a-statistic
          class="number"
          title="用户总数"
          :value="allUsersNum"
        />
        <a-statistic
          class="number"
          title="学生"
          :value="students.length"
        />
        <a-statistic
          class="number"
          title="教师"
          :value="teachers.length"
        />
        <a-statistic
          class="number"
          title="管理员"
          :value="admins.length"
        />
        <a-select
          class="selection-box"
          default-value="student"
          style="width: 120px"
          @change="changeType"
        >
          <a-select-option value="student">
            学生信息
          </a-select-option>
          <a-select-option value="teacher">
            教师信息
          </a-select-option>
          <a-select-option value="admin">
            管理员信息
          </a-select-option>
        </a-select>
      </div>
    </a-page-header>

    <ShowUser
      :students="students"
      :teachers="teachers"
      :admins="admins"
      :type="showUserType"
      @update-user="onUpdate"
      @delete-user="onDelete"
    />

    <!--添加用户-->
    <AddUser :visible.sync="addUserVisible" />
    <!--导入用户-->
    <Import
      row-key="account"
      :visible.sync="importUserVisible"
      :columns="curColumns"
      @confirm="importUser"
    />
    <!--修改用户-->
    <UpdateUser
      :visible.sync="updateUserVisible"
      :type="showUserType"
      :user="curUser"
    />
  </div>
</template>

<script>
import { omit } from 'lodash'
import { Modal } from 'ant-design-vue'
import { createNamespacedHelpers } from 'vuex'
import createColumns from '../../table-columns/importuser-columns'
import { makeExcel } from '../../utils/excel'
import { DELETE_USER, UPDATE_USER, ADD_USER } from '../../store/mutation-types'
import ShowUser from '../../components/user/ShowUser'
import AddUser from '../../components/user/AddUser'
import Import from '../../components/common/Import'
import UpdateUser from '../../components/user/UpdateUser'
const { mapActions, mapState } = createNamespacedHelpers('users')
export default {
  name: 'User',
  components: {
    ShowUser,
    AddUser,
    Import,
    UpdateUser
  },
  inject: ['init'],
  data () {
    return {
      addUserVisible: false,
      importUserVisible: false,
      updateUserVisible: false,
      importUserType: 'student',
      showUserType: 'student',
      curUser: {}
    }
  },
  computed: {
    ...mapState({
      students: 'students',
      teachers: 'teachers',
      admins: 'admins'
    }),
    curColumns () {
      return createColumns(this.importUserType)
    },
    allUsersNum () {
      return this.students.length + this.teachers.length + this.admins.length
    }
  },
  methods: {
    ...mapActions({
      deleteUser: DELETE_USER,
      updateUser: UPDATE_USER,
      addUser: ADD_USER
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
    showImportUser ({ key }) {
      this.importUserType = key
      this.importUserVisible = true
    },
    importUser (users) {
      this.addUser({
        type: this.importUserType,
        users: generateDefaultDate(this.importUserType, users)
      }).then(res => {
        this.importUserVisible = false
      }).catch(users => {
        if (users?.length !== 0) {
          Modal.warning({
            title: '以下用户已存在',
            centered: true,
            content: h => h('div', users.map(user => {
              return [
                h('span', user),
                h('a-divider', { props: { type: 'vertical' } })
              ]
            }))
          })
        }
      })
    },
    exportExcel () {
      makeExcel({
        students: this.students.map(item => omit(item, ['_id'])),
        teachers: this.teachers.map(item => omit(item, ['_id'])),
        admins: this.admins.map(item => omit(item, ['_id']))
      })
    }
  }
}

function generateDefaultDate (type, users) {
  if (type === 'student') {
    return users.map(user => ({
      password: '123456',
      sex: '男',
      grade: '未设置',
      classname: '未设置',
      ...user
    }))
  } else if (type === 'teacher') {
    return users.map(user => ({
      password: '123456',
      dept: '未设置',
      description: '',
      ...user
    }))
  }
  throw new Error('type must be of ["student", "teacher"]')
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
