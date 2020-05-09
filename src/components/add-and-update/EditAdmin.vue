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
        :disabled="type === 'update'"
        v-decorator="decorator.account"
        placeholder="账号"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="密码"
    >
      <a-input ref="password" v-decorator="decorator.password" placeholder="密码">
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
  </a-form>
</template>

<script>
import UserEditMixin from './user-edit-mixin'

export default {
  name: 'EditAdmin',
  mixins: [UserEditMixin],
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
      message: '请输入账号！'
    }]
  }],
  password: ['password', {
    rules: [{
      required: true,
      message: '请输入密码！'
    }]
  }]
}
</script>
