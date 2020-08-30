<template>
  <div>
    <a-page-header
      title="管理员数据"
      sub-title="管理管理员账号"
      style="padding: 0; margin-bottom: 10px"
    >
      <template #extra>
        <a-button-group>
          <a-button
            type="primary"
            @click="addAdminVisible = true"
          >
            添加管理员
          </a-button>
          <a-button @click="init">
            刷新
          </a-button>
        </a-button-group>
      </template>
    </a-page-header>
    <p style="padding-left: 5px; font-weight: bold">
      共 {{ admins.length }} 条数据
    </p>
    <ShowUser
      :data="admins"
      :column="ADMIN_COLUMNS"
      @update-user="onUpdate"
      @delete-user="onDelete"
      @reset="reset"
    />
    <AddAdmin v-model:visible="addAdminVisible" />
    <UpdateAdmin
      v-model:visible="updateAdminVisible"
      :data="curAdmin"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { message } from 'ant-design-vue'
import ShowUser from '../../components/user/ShowUser'
import UpdateAdmin from '../../components/user/UpdateAdmin'
import AddAdmin from '../../components/user/AddAdmin'
import resetPassword from '../../utils/reset-password'
import { ADMIN_COLUMNS } from '../../helpers/showuser-columns'
import { ADD_USER, DELETE_USER } from '../../store/types'

export default {
  name: 'RootShowAdmin',
  components: { UpdateAdmin, AddAdmin, ShowUser },
  inject: {
    init: 'init',
  },
  data () {
    return {
      addAdminVisible: false,
      updateAdminVisible: false,
      curAdmin: {},
    }
  },
  computed: {
    ...mapState('users', ['admins']),
    user () {
      return this.$store.state.user
    },
  },
  beforeMount () {
    this.ADMIN_COLUMNS = ADMIN_COLUMNS // 无需响应式的数据
  },
  methods: {
    ...mapActions('users', [ADD_USER, DELETE_USER]),
    onUpdate (user) {
      this.curAdmin = user
      this.updateAdminVisible = true
    },
    reset (account) {
      resetPassword('admin', account)
    },
    onDelete (data) {
      if (this.user.account === data[0]) {
        return message.warn('不能删除自己')
      }
      this.DELETE_USER({
        type: 'admin',
        data,
      })
    },
  },
}
</script>
