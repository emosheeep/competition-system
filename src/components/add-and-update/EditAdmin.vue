<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
  >
    <!--用户自己修改的时候不能改这部分-->
    <template v-if="type !== 'self'">
      <a-form-item label="账号">
        <a-input
          ref="account"
          v-decorator="decorator.account"
          :disabled="type === 'update'"
          placeholder="账号"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item
        v-if="type === 'add'"
        label="密码"
      >
        <a-input
          v-decorator="decorator.password"
          placeholder="密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item
        v-if="type === 'add'"
        label="权限"
      >
        <a-select
          v-decorator="decorator.power"
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
    <a-form-item label="姓名">
      <a-input
        v-decorator="decorator.name"
        placeholder="姓名"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import EditMixin from './edit-mixin';

export default {
  name: 'EditAdmin',
  mixins: [EditMixin],
  beforeMount() {
    this.decorator = decorator;
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
      this.form.setFieldsValue(result);
    },
  },
};

/**
 * 定义decorator
 */
const decorator = {
  account: ['account', {
    rules: [{
      required: true,
      message: '请输入账号！',
    }],
  }],
  password: ['password', {
    rules: [{
      required: true,
      message: '请输入密码！',
    }],
  }],
  name: ['name', {
    rules: [{
      required: true,
      message: '请输入管理员姓名！',
    }],
  }],
  power: ['power', {
    initialValue: 'admin',
    rules: [{
      required: true,
      message: '设置管理员权限！',
    }],
  }],
};
</script>
