<template>
  <div>
    <a-form
      class="login-form"
      :form="form"
      layout="vertical"
      @submit="onSubmit"
    >
      <a-form-item label="用户名">
        <a-input v-decorator="decorator.account" placeholder="Username">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item label="密码">
        <a-input-password
          v-decorator="decorator.password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-radio-group v-decorator="decorator.identity" class="identity">
          <a-radio value="student">学生</a-radio>
          <a-radio value="teacher">教师</a-radio>
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
import Loading from './Loading';

export default {
  name: 'Login',
  components: { Loading },
  data() {
    return {
      loading: false,
      decorator,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'login_form' });
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields().then(values => {
        this.loading = true;
        return this.$api.login(values).then(() => {
          return this.$router.replace('/race');
        }).catch(e => {
          this.$message.error(e.msg || e.message);
        }).finally(() => {
          this.loading = false;
        });
      }).catch(console.error);
    },
  },
};
const decorator = {
  account: ['account', {
    rules: [{
      required: true,
      message: '请输入用户名！',
    }],
  }],
  password: ['password', {
    rules: [{
      required: true,
      message: '请输入密码！',
    }],
  }],
  identity: ['identity', {
    valuePropName: 'value',
    initialValue: 'student',
  }],
};
</script>

<style scoped lang="stylus">
.login-form
  width 300px
  padding 20px
  text-align left
  border-radius 5px
  background-color white
  box-shadow 0 0 5px lightgrey

.identity
  display flex
  flex-flow row nowrap
  justify-content space-between

.login-form-bottom
  margin-bottom 0
  .login-button
    margin-bottom 20px
</style>
