<template>
  <div class="login-form">
    <div class="title">
      <a-avatar src="/logo.png" :size="40" />
      <span>竞赛管理系统</span>
    </div>
    <a-form-model
      layout="vertical"
      ref="form"
      :model="formData"
      :rules="rules"
      @submit="onSubmit"
    >
      <a-form-model-item ref="account" prop="account">
        <a-input v-model="formData.account" placeholder="学号/工号">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="password" prop="password">
        <a-input-password v-model="formData.password" placeholder="密码">
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item ref="code" prop="code">
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
        account: { required: true, message: '请输入学号/工号！' },
        password: { required: true, message: '请输入密码！' },
        code: { required: true, message: '请输入验证码！' },
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
      }).catch(e => {
        this.$message.error(e.msg || '验证码获取失败');
      });
    },
    async onSubmit(e) {
      e.preventDefault();
      try {
        this.loading = true;
        await this.$refs.form.validate();
        await this.$api.login(this.formData);
        await this.$router.replace({ path: '/' }).catch(e => e);
        this.$message.success(`${timeFix()}，欢迎回来`);
      } catch (e) {
        if (!e) return; // 表单校验
        console.error(e);
        this.getCode();
        // 设置校验状态
        if (e.code && e.msg) {
          const field = ({ 1: 'account', 2: 'password', 3: 'code' })[e.code];
          Object.assign(this.$refs[field], {
            validateMessage: e.msg,
            validateState: 'error',
          });
        }
      } finally {
        this.loading = false;
      }
    },
  },
};

function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好';
}
</script>

<style scoped lang="stylus">
.login-form
  width 300px
  padding 20px
  text-align left
  border-radius 5px
  background-color white
  box-shadow 0 0 5px lightgrey

.title
  display flex
  justify-content center
  align-items center
  margin-bottom 24px
  font-size 24px
  *:last-child
    margin-left 10px

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
    min-width 100px
</style>
