<template>
  <a-form :form="form">
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="账号"
    >
      <a-input
        ref="account"
        v-decorator="decorator.account"
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
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
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
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="姓名"
    >
      <a-input
        v-decorator="decorator.name"
        placeholder="姓名"
      />
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="职称"
    >
      <a-select
        v-decorator="decorator.rank"
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
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="描述"
    >
      <a-textarea
        v-decorator="decorator.description"
        placeholder="描述"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import EditMixin from './edit-mixin'

export default {
  name: 'EditTeacher',
  mixins: [EditMixin],
  data () {
    return {
      decorator
    }
  },
  methods: {
    initData () {
      const { data } = this
      this.form.setFieldsValue({
        account: data.account,
        password: data.password,
        name: data.name,
        rank: data.rank,
        classname: data.classname,
        description: data.description
      })
    }
  }
}

/**
 * 定义decorator
 */
const decorator = {
  account: ['account', {
    rules: [{
      required: true,
      message: '请输入职工号！'
    }]
  }],
  password: ['password', {
    rules: [{
      required: true,
      message: '请输入密码！'
    }]
  }],
  name: ['name', {
    rules: [{
      required: true,
      message: '请输入姓名！'
    }]
  }],
  rank: ['rank', {
    initialValue: '讲师'
  }],
  description: ['description']
}
</script>
