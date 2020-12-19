<template>
  <a-form
    ref="form"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :model="formData"
    :rules="rules"
  >
    <template v-if="type !== 'self'">
      <a-form-item
        label="账号"
        name="account"
      >
        <a-input
          ref="account"
          v-model:value="formData.account"
          :disabled="type === 'update'"
          placeholder="学号"
        >
          <template #prefix>
            <UserOutlined style="color: rgba(0,0,0,.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        v-if="type === 'add'"
        label="密码"
        name="password"
      >
        <a-input
          ref="password"
          v-model:value="formData.password"
          placeholder="密码"
        >
          <template #prefix>
            <LockOutlined style="color: rgba(0,0,0,.25)" />
          </template>
        </a-input>
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
    <a-form-item
      label="年级"
      name="grade"
    >
      <a-input
        v-model:value="formData.grade"
        placeholder="年级"
      />
    </a-form-item>
    <a-form-item
      label="班级"
      name="classname"
    >
      <a-input
        v-model:value="formData.classname"
        placeholder="班级"
      />
    </a-form-item>
    <a-form-item
      label="性别"
      name="sex"
    >
      <a-radio-group v-model:value="formData.sex">
        <a-radio value="男">
          <span>男 &nbsp;</span>
          <ManOutlined />
        </a-radio>
        <a-radio value="女">
          <span>女 &nbsp;</span>
          <WomanOutlined />
        </a-radio>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script>
import EditMixin from './edit-mixin';
import {
  ManOutlined,
  WomanOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';

export default {
  name: 'EditStudent',
  components: {
    ManOutlined,
    WomanOutlined,
    LockOutlined,
    UserOutlined,
  },
  mixins: [EditMixin],
  data() {
    return {
      formData: {
        account: '',
        password: '',
        name: '',
        sex: '男',
        classname: '',
        grade: '',
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
        sex: data.sex,
        classname: data.classname,
        grade: data.grade,
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
    message: '请输入姓名！',
  }],
  classname: [{
    required: true,
    message: '请输入班级！',
  }],
  grade: [{
    required: true,
    message: '请输入班级！',
  }],
};
</script>
