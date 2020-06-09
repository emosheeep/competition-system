<template>
  <a-form :form="form">
    <!--通用部分：用户名、密码-->
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="账号"
    >
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
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
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
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="姓名"
    >
      <a-input
        v-decorator="decorator.name"
        placeholder="姓名"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import EditMixin from './edit-mixin'

export default {
  name: 'EditAdmin',
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
        name: data.name
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
      message: '请输入账号！'
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
      message: '请输入管理员姓名！'
    }]
  }]
}
</script>
