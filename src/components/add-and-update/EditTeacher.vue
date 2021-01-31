<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
  >
    <template v-if="type !== 'self'">
      <a-form-item label="工号">
        <a-input
          ref="account"
          v-decorator="decorator.tid"
          :disabled="type === 'update'"
          placeholder="职工号"
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
      />
    </a-form-item>
    <a-form-item label="职称">
      <a-select
        v-decorator="decorator.rank"
        placeholder="请选择职称"
        :options="ranks"
      />
    </a-form-item>
    <a-form-item label="描述">
      <a-textarea
        v-decorator="decorator.description"
        placeholder="描述"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import EditMixin from './edit-mixin';
import { ranks } from '@/utils/const';

export default {
  name: 'EditTeacher',
  mixins: [EditMixin],
  data() {
    return {
      ranks,
      decorator,
    };
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
        result.tid = data.tid;
      }
      this.form.setFieldsValue(result);
    },
  },
};

/**
 * 定义decorator
 */
const decorator = {
  tid: ['tid', {
    rules: [{
      required: true,
      message: '请输入职工号！',
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
  rank: ['rank', {
    initialValue: 0,
  }],
  description: ['description'],
};
</script>
