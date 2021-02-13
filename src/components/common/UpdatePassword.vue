<template>
  <a-form-model
    ref="form"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    :model="formData"
    :rules="rules"
  >
    <a-form-model-item label="原密码" prop="password">
      <a-input-password v-model="formData.password" placeholder="原密码">
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input-password>
    </a-form-model-item>
    <a-form-model-item label="新密码" prop="newPass">
      <a-input-password v-model="formData.newPass" placeholder="新密码">
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input-password>
    </a-form-model-item>
    <a-form-model-item label="再次输入" prop="reNewPass">
      <a-input-password v-model="formData.reNewPass" placeholder="再次输入">
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input-password>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  name: 'UpdatePassword',
  data() {
    return {
      rules: getRules.call(this),
      formData: {
        password: '',
        newPass: '',
        reNewPass: '',
      },
    };
  },
  methods: {
    validate() {
      // 依次校验表单字段，遇到失败项就停止
      const promise = Object.keys(this.rules).reduce((promise, key) => {
        return promise.then(() => new Promise((resolve, reject) => {
          this.$refs.form.validateField(key, msg => {
            if (msg) reject(new Error(msg));
            else resolve();
          });
        }));
      }, Promise.resolve());
      return promise.then(() => ({
        oldVal: this.formData.password,
        newVal: this.formData.newPass,
      }));
    },
  },
};

function getRules() {
  return {
    password: {
      required: true,
      message: '请输入密码！',
    },
    newPass: {
      required: true,
      validator: (rule, value, callback) => {
        const oldPass = this.formData.password;
        if (!value) {
          callback(new Error('请输入新密码！'));
        } else if (value === oldPass) {
          callback(new Error('新密码不能与原密码相同！'));
        } else {
          callback();
        }
      },
    },
    reNewPass: {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请确认新密码！'));
        } if (value && value !== this.formData.newPass) {
          callback(new Error('两次密码不一致'));
        } else {
          callback();
        }
      },
    },
  };
}
</script>
