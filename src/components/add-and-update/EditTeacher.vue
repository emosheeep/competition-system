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
          placeholder="职工号"
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
      label="职称"
      name="rank"
    >
      <a-select
        v-model:value="formData.rank"
        placeholder="请选择职称"
      >
        <a-select-option value="教授">
          教授
        </a-select-option>
        <a-select-option value="副教授">
          副教授
        </a-select-option>
        <a-select-option value="讲师">
          讲师
        </a-select-option>
        <a-select-option value="其他">
          其他
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="描述"
      name="description"
    >
      <a-textarea
        v-model:value="formData.description"
        placeholder="描述"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import EditMixin from './edit-mixin';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

export default {
  name: 'EditTeacher',
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
        rank: '讲师',
        description: '',
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
        rank: data.rank,
        classname: data.classname,
        description: data.description,
      };
      if (type !== 'self') {
        result.account = data.account;
      }
      this.formData = result;
    },
  },
};

const rules = {
  account: [{
    required: true,
    message: '请输入职工号！',
  }],
  password: [{
    required: true,
    message: '请输入密码！',
  }],
  name: [{
    required: true,
    message: '请输入姓名！',
  }],
};
</script>
