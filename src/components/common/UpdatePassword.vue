<template>
  <a-form
    ref="form"
    class="form"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    :model="formData"
    :rules="rules"
  >
    <a-form-item
      label="原密码"
      name="password"
    >
      <a-input-password
        v-model:value="formData.password"
        placeholder="原密码"
      >
        <template #prefix>
          <LockOutlined style="color: rgba(0,0,0,.25)" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item
      label="新密码"
      name="newPass"
    >
      <a-input-password
        v-model:value="formData.newPass"
        placeholder="新密码"
      >
        <template #prefix>
          <LockOutlined style="color: rgba(0,0,0,.25)" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item
      label="再次输入"
      name="reNewPass"
    >
      <a-input-password
        v-model:value="formData.reNewPass"
        placeholder="再次输入"
      >
        <template #prefix>
          <LockOutlined style="color: rgba(0,0,0,.25)" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item style="text-align: right">
      <a-button
        style="margin-right: 20px"
        @click="reset"
      >
        重置
      </a-button>
      <a-button
        type="primary"
        :loading="loading"
        @click="modifyPassword"
      >
        保存
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { message } from 'ant-design-vue';
import { LockOutlined } from '@ant-design/icons-vue';
import { updatePassword } from '@/api';

export default {
  name: 'UpdatePassword',
  components: { LockOutlined },
  data() {
    return {
      loading: false,
      formData: {
        password: '',
        newPass: '',
        reNewPass: '',
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  beforeCreate() {
    this.rules = createRules.call(this);
  },
  methods: {
    reset() {
      this.$refs.form.resetFields();
    },
    modifyPassword() {
      let stopLoading;
      const key = Date.now();
      const options = {
        key,
        content: '请稍后',
        duration: 0,
      };
      this.$refs.form.validate().then(values => {
        this.loading = true;
        stopLoading = message.loading(options);
        return updatePassword({
          account: this.user.account,
          identity: this.user.identity,
          oldVal: values.password,
          newVal: values.newPass,
        });
      }).then(res => {
        const { code, msg } = res.data;
        if (code === 0) {
          message.success({ content: '修改成功', key });
          this.reset();
        } else {
          message.warn({ content: msg, key });
        }
      }).catch(() => {
        stopLoading && stopLoading();
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};

function createRules() {
  return {
    password: [{ required: true, message: '请输入密码！' }],
    newPass: [
      {
        required: true,
        validator: (rule, value) => {
          const oldPass = this.formData.password;
          if (!oldPass) {
            return Promise.reject('请输入新密码！');
          } else if (value === oldPass) {
            return Promise.reject('新密码不能与原密码相同！');
          } else {
            return Promise.resolve();
          }
        },
      },
    ],
    reNewPass: [{
      required: true,
      validator: (rule, value) => {
        const { newPass } = this.formData;
        if (!value) {
          return Promise.reject('请确认新密码！');
        } else if (value !== newPass) {
          return Promise.reject('两次密码不一致');
        } else {
          return Promise.resolve();
        }
      },
    }],
  };
}
</script>

<style scoped>

</style>
