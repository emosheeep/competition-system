<template>
  <div>
    <a-form-model
      class="login-form"
      layout="vertical"
      ref="form"
      :model="formData"
      :rules="rules"
      @submit="onSubmit"
    >
      <a-form-model-item prop="account">
        <a-input v-model="formData.account" placeholder="学号/工号">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="password">
        <a-input-password v-model="formData.password" placeholder="密码">
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item prop="code">
        <div class="code-input">
          <a-input v-model="formData.code" placeholder="验证码">
            <a-icon
              slot="prefix"
              type="mail"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
          <div class="code" v-html="svg" @click="getCode" />
        </div>
      </a-form-model-item>
      <a-form-model-item prop="identity">
        <a-radio-group v-model="formData.identity" class="identity">
          <a-radio value="student">学生</a-radio>
          <a-radio value="teacher">教师</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
        class="login-button"
        :loading="loading"
        block
      >
        登录
      </a-button>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      svg: '',
      formData: {
        account: '',
        password: '',
        code: '',
        identity: 'student',
      },
      rules: {
        account: {
          required: true,
          message: '请输入学号/工号！',
        },
        password: {
          required: true,
          message: '请输入密码！',
        },
        code: {
          required: true,
          message: '请输入验证码！',
        },
      },
    };
  },
  mounted() {
    this.getCode();
  },
  methods: {
    getCode() {
      this.formData.code = '';
      this.$api.getAuthCode().then(data => {
        this.svg = data.data;
      });
    },
    onSubmit(e) {
      e.preventDefault();
      this.$refs.form.validate().then(() => {
        this.loading = true;
        return this.$api.login(this.formData).then(() => {
          return this.$router.replace('/race');
        }).catch(e => {
          this.$message.error(e.msg || e.message);
          this.getCode();
        }).finally(() => {
          this.loading = false;
        });
      }).catch(console.error);
    },
  },
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

.code-input
  display flex
  align-items center
  height 32px
  .code >>>
    cursor pointer
</style>
