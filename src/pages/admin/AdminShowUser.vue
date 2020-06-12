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
      </div>
    </a-page-header>

    <a-tabs
      type="card"
      :active-key="showUserType"
      @change="changeType"
    >
      <a-tab-pane
        key="student"
        tab="学生信息"
      >
        <ShowUser
          ref="student"
          :data="students"
          :column="STUDENT_COLUMNS"
          :multiple="isMultiple"
          @update-user="onUpdate"
          @delete-user="onDelete"
          @reset="reset"
        />
      </a-tab-pane>
      <a-tab-pane
        key="teacher"
        tab="教师信息"
      >
        <ShowUser
          ref="teacher"
          :data="teachers"
          :column="TEACHER_COLUMNS"
          :multiple="isMultiple"
          @update-user="onUpdate"
          @delete-user="onDelete"
          @reset="reset"
        />
      </a-tab-pane>
      <a-tab-pane
        key="admin"
        tab="管理员信息"
      >
        <ShowUser
          ref="admin"
          :data="admins"
          :column="ADMIN_COLUMNS"
          :multiple="isMultiple"
          @update-user="onUpdate"
          @delete-user="onDelete"
        />
      </a-tab-pane>
      <template #tabBarExtraContent>
        <a-button-group>
          <!--变量来自Mixin-->
          <a-button
            :type="isMultiple ? 'primary' : ''"
            @click="isMultiple = !isMultiple"
          >
            {{ isMultiple ? '取消' : '批量删除' }}
          </a-button>
          <a-popconfirm
            v-if="isMultiple"
            title="确认删除？"
            ok-text="确认"
            cancel-text="取消"
            placement="topRight"
            @confirm="() => $refs[showUserType].multipleDelete()"
          >
            <template #icon>
              <a-icon
                type="question-circle-o"
                style="color: orange"
              />
            </template>
            <a-button>确认删除</a-button>
          </a-popconfirm>
        </a-button-group>
      </template>
    </a-tabs>

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
import createColumns from '../../helpers/importuser-columns'
import ColumnsMixin from '../../helpers/showuser-columns-mixin'
import { makeExcel } from '../../utils/excel'
import resetPassword from '../../utils/reset-password'
import ShowUser from '../../components/user/ShowUser'
import AddUser from '../../components/user/AddUser'
import Import from '../../components/common/Import'
import UpdateUser from '../../components/user/UpdateUser'
import { ADD_USER, DELETE_USER } from '../../store/mutation-types'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('users')

export default {
  name: 'User',
  components: {
    ShowUser,
    AddUser,
    Import,
    UpdateUser
  },
  mixins: [ColumnsMixin],
  inject: ['init'],
  data () {
    return {
      addUserVisible: false,
      importUserVisible: false,
      updateUserVisible: false,
      isMultiple: false,
      importUserType: 'student',
      showUserType: 'student',
      curUser: {}
    }
  },
  computed: {
    ...mapState(['students', 'teachers', 'admins']),
    curColumns () {
      return createColumns(this.importUserType)
    },
    allUsersNum () {
      return this.students.length + this.teachers.length + this.admins.length
    }
  },
  methods: {
    ...mapActions([ADD_USER, DELETE_USER]),
    onUpdate (user) {
      this.curUser = user
      this.updateUserVisible = true
    },
    reset (account) {
      resetPassword(this.showUserType, account)
    },
    onDelete (data) {
      this.DELETE_USER({
        type: this.showUserType,
        data
      }).finally(() => {
        this.isMultiple = false
      })
    },
    changeType (value) {
      this.showUserType = value
    },
    showImportUser ({ key }) {
      this.importUserType = key
      this.importUserVisible = true
    },
    importUser (users) {
      this.ADD_USER({
        type: this.importUserType,
        users: generateDefaultDate(this.importUserType, users)
      }).then(() => {
        this.importUserVisible = false
      }).catch(console.warn)
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
      ...user
    }))
  } else if (type === 'teacher') {
    return users.map(user => ({
      password: '123456',
      ...user
    }))
  }
  throw new Error('type must be of ["student", "teacher"]')
}
</script>

<style scoped lang="stylus">
  .header-info
    .number
      display inline-block
      width 100px
</style>
