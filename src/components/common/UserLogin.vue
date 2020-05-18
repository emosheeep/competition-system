<template>
  <a-form
    class="login-form"
    :form="form"
    layout="vertical"
    @submit="onSubmit"
  >
    <a-form-item label="用户名">
      <a-input
        v-decorator="decorator.account"
        placeholder="Username"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item label="密码">
      <a-input
        v-decorator="decorator.password"
        type="password"
        placeholder="Password"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-radio-group
        v-decorator="decorator.identity"
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
      <span
        class="tips"
        v-text="tips"
      />
      <a
        class="forgot"
        href="#"
      >
        找回密码
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
import { LOGIN } from '../../store/mutation-types'
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      tips: '',
      decorator
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'login_form' })
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.tips = ''
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          this.$store.dispatch(LOGIN, values).then(data => {
            this.$router.replace({ path: values.identity })
          }).catch(e => {
            this.tips = '用户名或密码错误！'
          }).finally(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
const decorator = {
  account: ['account', {
    rules: [{
      required: true,
      message: '请输入用户名！'
    }]
  }],
  password: ['password', {
    rules: [{
      required: true,
      message: '请输入密码！'
    }]
  }],
  identity: ['identity', {
    valuePropName: 'value',
    initialValue: 'student'
  }]
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
    .tips
      color red

  .forgot
    float right
    color dodgerblue
    text-decoration none
    &:hover
      text-decoration underline
</style>
