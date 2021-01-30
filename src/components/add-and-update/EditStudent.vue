<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
  >
    <template v-if="type !== 'self'">
      <a-form-item label="学号">
        <a-input
          ref="account"
          v-decorator="decorator.sid"
          :disabled="type === 'update'"
          placeholder="学号"
          allowClear
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
          ref="password"
          v-decorator="decorator.password"
          placeholder="密码"
          allowClear
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
    </template>
    <a-form-item label="姓名">
      <a-input
        v-decorator="decorator.name"
        placeholder="姓名"
        allowClear
      />
    </a-form-item>
    <a-form-item label="年级">
      <a-select
        v-decorator="decorator.grade"
        :options="classes"
        allowClear
        placeholder="年级"
      />
    </a-form-item>
    <a-form-item label="班级">
      <a-input
        v-decorator="decorator.class"
        placeholder="班级"
        allowClear
      />
    </a-form-item>
    <a-form-item label="性别">
      <a-radio-group v-decorator="decorator.sex">
        <a-radio value="man">
          <span>男 &nbsp;</span>
          <a-icon type="man" />
        </a-radio>
        <a-radio value="woman">
          <span>女 &nbsp;</span>
          <a-icon type="woman" />
        </a-radio>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script>
import EditMixin from './edit-mixin';
import { classes } from '@/utils/const';

export default {
  name: 'EditStudent',
  mixins: [EditMixin],
  data() {
    return {
      classes,
      decorator,
    };
  },
  methods: {
    initData() {
      const { data, type } = this;
      const result = {
        name: data.name,
        sex: data.sex,
        class: data.class,
        grade: data.grade,
      };
      if (type !== 'self') {
        result.sid = data.sid;
      }
      this.form.setFieldsValue(result);
    },
  },
};

/**
 * 定义decorator
 */
const decorator = {
  sid: ['sid', {
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
      message: '请输入姓名！',
    }],
  }],
  sex: ['sex', {
    valuePropName: 'value',
    initialValue: 'man',
  }],
  class: ['class', {
    rules: [{
      required: true,
      message: '请输入班级！',
    }],
  }],
  grade: ['grade', {
    rules: [{
      required: true,
      message: '请选择年级！',
    }],
  }],
};
</script>
