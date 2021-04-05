<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
  >
    <a-form-item label="学号">
      <a-input
        v-decorator="decorator.sid"
        :disabled="isEdit"
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
    <a-form-item v-if="!isEdit" label="密码">
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
        :options="grades"
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
      <a-radio-group v-decorator="decorator.sex" :options="sexes" />
    </a-form-item>
  </a-form>
</template>

<script>
import { pick } from 'lodash-es';
import { grades, sexes } from '@/utils/const';
import EditMixin from './edit-mixin';

export default {
  name: 'EditStudent',
  mixins: [EditMixin],
  data() {
    return {
      grades,
      decorator,
      sexes,
    };
  },
  methods: {
    initData() {
      const { data } = this;
      const result = pick(data, ['sid', 'name', 'sex', 'class', 'grade']);
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
    initialValue: 1,
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
