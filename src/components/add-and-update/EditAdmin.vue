<template>
  <a-form
    ref="form"
    :model="formData"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <!--用户自己修改的时候不能改这部分-->
    <template v-if="type !== 'self'">
      <a-form-item
        label="账号"
        name="account"
      >
        <a-input
          ref="account"
          v-model:value="formData.account"
          :disabled="type === 'update'"
          placeholder="账号"
        >
          <UserOutlined style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item
        v-if="type === 'add'"
        label="密码"
        name="password"
      >
        <a-input
          v-model:value="formData.password"
          placeholder="密码"
        >
          <LockOutlined style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item
        v-if="type === 'add'"
        label="权限"
        name="power"
      >
        <a-select
          v-model:value="formData.power"
          placeholder="管理员权限"
        >
          <a-select-option value="admin">
            admin
          </a-select-option>
          <a-select-option value="root">
            root
          </a-select-option>
        </a-select>
      </a-form-item>
    </template>
    <a-form-item
      label="姓名"
      name="name"
    >
      <a-input
        v-model:value="formData.name"
        placeholder="姓名"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import EditMixin from './edit-mixin';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

export default {
  name: 'EditAdmin',
  components: {
    UserOutlined,
    LockOutlined,
  },
  mixins: [EditMixin],
  data() {
    return {
      formData: {
        account: '',
        password: '',
        name: '',
        power: 'admin',
      },
    };
  },
  beforeMount() {
    this.rules = rules;
  },
  methods: {
    initData() {
      const { data, type } = this;
      const result = {
        name: data.name,
      };
      if (type !== 'self') {
        result.account = data.account;
      }
      this.formData = result;
    },
  },
};

/**
 * 定义decorator
 */
const rules = {
  account: [{
    required: true,
    message: '请输入账号！',
  }],
  password: [{
    required: true,
    message: '请输入密码！',
  }],
  name: [{
    required: true,
    message: '请输入管理员姓名！',
  }],
  power: [{
    required: true,
    message: '设置管理员权限！',
  }],
};
</script>
