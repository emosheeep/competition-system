<template>
  <a-form
    class="form"
    :form="form"
  >
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="原密码"
    >
      <a-input-password
        v-decorator="decorator.password"
        placeholder="原密码"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input-password>
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="新密码"
    >
      <a-input-password
        v-decorator="decorator.newPass"
        placeholder="新密码"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input-password>
    </a-form-item>
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="再次输入"
    >
      <a-input-password
        v-decorator="decorator.reNewPass"
        placeholder="再次输入"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input-password>
    </a-form-item>
    <a-form-item style="text-align: right">
      <a-button
        style="margin-right: 20px"
        @click="reset"
      >
        重置
      </a-button>
      <a-button
        type="primary"
        :loading="loading"
        @click="modifyPassword"
      >
        保存
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { UPDATE_PASSWORD } from '../../store/mutation-types'

export default {
  name: 'ModifyPassword',
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'password' })
    this.decorator = getDecorator.call(this)
  },
  methods: {
    reset () {
      this.form.resetFields()
    },
    modifyPassword () {
      this.form.validateFields({
        first: true
      }).then(values => {
        this.loading = true
        return this.$store.dispatch(UPDATE_PASSWORD, {
          account: this.user.account,
          identity: this.user.identity,
          oldVal: values.password,
          newVal: values.newPass
        })
      }).then(this.reset)
        .catch(e => e)
        .finally(() => {
          this.loading = false
        })
    }
  }
}
function getDecorator () {
  return {
    password: ['password', {
      rules: [{
        required: true,
        message: '请输入密码！'
      }]
    }],
    newPass: ['newPass', {
      rules: [
        {
          required: true,
          message: '请输入新密码！'
        },
        {
          validator: (rule, value, callback) => {
            const oldPass = this.form.getFieldValue('password')
            if (value === oldPass) {
              // eslint-disable-next-line standard/no-callback-literal
              callback('新密码不能与原密码相同！')
            } else {
              callback()
            }
          }
        }
      ]
    }],
    reNewPass: ['reNewPass', {
      rules: [
        {
          required: true,
          message: '请确认新密码！'
        },
        {
          validator: (rule, value, callback) => {
            const newPass = this.form.getFieldValue('newPass')
            if (value && value !== newPass) {
            // eslint-disable-next-line standard/no-callback-literal
              callback('两次密码不一致')
            } else {
              callback()
            }
          }
        }
      ]
    }]
  }
}
</script>

<style scoped>

</style>
