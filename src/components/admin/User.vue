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
        </a-button-group>
      </template>
      <div class="header-info">
        <a-statistic class="number" title="用户总数" :value="allUsersNum" />
        <a-statistic class="number" title="学生" :value="studentsNum" />
        <a-statistic class="number" title="教师" :value="teachersNum" />
        <a-statistic class="number" title="管理员" :value="adminsNum" />
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

    <ShowUser :type="showUserType"/>

    <!--弹出层表单-->
    <AddUser v-if="addUserVisible" :visible.sync="addUserVisible"/>
    <ImportUser
      v-if="importUserVisible"
      :visible.sync="importUserVisible"
      :type="importUserType"
    />

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ShowUser from './ShowUser'
const { mapState } = createNamespacedHelpers('users')
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
    )
  },
  data () {
    return {
      addUserVisible: false,
      importUserVisible: false,
      importUserType: 'student',
      showUserType: 'student'
    }
  },
  computed: {
    ...mapState({
      studentsNum: state => state.students.length,
      teachersNum: state => state.teachers.length,
      adminsNum: state => state.admins.length
    }),
    allUsersNum () {
      return this.studentsNum + this.teachersNum + this.adminsNum
    }
  },
  methods: {
    changeType (value) {
      this.showUserType = value
    },
    addUser () {
      this.addUserVisible = true
    },
    importUser ({ key }) {
      this.importUserType = key
      this.importUserVisible = true
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
