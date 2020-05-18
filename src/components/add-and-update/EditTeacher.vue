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
      label="部门"
    >
      <a-input
        v-decorator="decorator.dept"
        placeholder="部门"
      />
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
  dept: ['dept', {
    rules: [{
      required: true,
      message: '请输入部门！'
    }]
  }],
  description: ['description']
}
</script>
