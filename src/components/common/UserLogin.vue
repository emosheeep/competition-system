<template>
  <div>
    <a-form
      class="login-form"
      :model="formData"
      :rules="rules"
      layout="vertical"
      @finish="onFinish"
    >
      <a-form-item
        label="用户名"
        name="account"
      >
        <a-input
          v-model:value="formData.account"
          placeholder="Username"
        >
          <template #prefix>
            <UserOutlined style="color: rgba(0,0,0,.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
      >
        <a-input-password
          v-model:value="formData.password"
          placeholder="Password"
        >
          <template #prefix>
            <LockOutlined style="color: rgba(0,0,0,.25)" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="identity">
        <a-radio-group
          v-model:value="formData.identity"
          class="identity"
        >
          <a-radio value="student">
            学生
          </a-radio>
          <a-radio value="teacher">
            教师
          </a-radio>
          <a-radio value="admin">
            管理员
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item class="login-form-bottom">
        <a-button
          type="primary"
          html-type="submit"
          class="login-button"
          :loading="loading"
          block
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <Loading :loading="loading" />
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { LOGIN } from '@/store/types'
import Loading from './Loading'

export default {
  name: 'Login',
  components: {
    Loading,
    UserOutlined,
    LockOutlined,
  },
  data () {
    return {
      loading: false,
      formData: {
        account: '',
        password: '',
        identity: 'student',
      },
    }
  },
  beforeMount () {
    this.rules = rules
  },
  methods: {
    onFinish (values) {
      this.loading = true
      this.$store.dispatch(LOGIN, values).then(data => {
        const { user } = data
        return this.$router.replace({ path: user.identity })
      }).finally(() => {
        this.loading = false
      })
    },
  },
}

const rules = {
  account: [{
    required: true,
    message: '请输入用户名！',
  }],
  password: [{
    required: true,
    message: '请输入密码！',
  }],
}
</script>

<style scoped lang="stylus">
  .login-form
    width 300px
    padding 20px
    text-align left
    border-radius 5px
    border 1px lightgrey solid
    background-color white
    transition box-shadow .5s ease
    &:hover
      box-shadow 0 0 10px grey

  .identity
    display flex
    flex-flow row nowrap
    justify-content space-between

  .login-form-bottom
    margin-bottom 0
    .login-button
      margin-bottom 20px

</style>
