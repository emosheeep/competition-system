<template>
  <a-form
    class="form"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    :form="form"
  >
    <a-form-item label="原密码">
      <a-input-password
        v-decorator="decorator.password"
        placeholder="原密码"
      >
        <template #prefix>
          <a-icon
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item label="新密码">
      <a-input-password
        v-decorator="decorator.newPass"
        placeholder="新密码"
      >
        <template #prefix>
          <a-icon
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item label="再次输入">
      <a-input-password
        v-decorator="decorator.reNewPass"
        placeholder="再次输入"
      >
        <template #prefix>
          <a-icon
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </template>
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
import { message, Form } from 'ant-design-vue'
import { updatePassword } from '@/api'

export default {
  name: 'UpdatePassword',
  data () {
    return {
      loading: false,
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
  },
  beforeCreate () {
    this.form = Form.create({ name: 'password' })
    this.decorator = getDecorator.call(this)
  },
  methods: {
    reset () {
      this.form.resetFields()
    },
    modifyPassword () {
      let stopLoading
      const key = Date.now()
      const options = {
        key,
        content: '请稍后',
        duration: 0,
      }
      this.form.validateFields({ first: true }).then(values => {
        this.loading = true
        stopLoading = message.loading(options)
        return updatePassword({
          account: this.user.account,
          identity: this.user.identity,
          oldVal: values.password,
          newVal: values.newPass,
        })
      }).then(res => {
        const { code, msg } = res.data
        if (code === 0) {
          message.success({ content: '修改成功', key })
          this.reset()
        } else {
          message.warn({ content: msg, key })
        }
      }).catch(() => {
        stopLoading && stopLoading()
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
function getDecorator () {
  return {
    password: ['password', {
      rules: [{
        required: true,
        message: '请输入密码！',
      }],
    }],
    newPass: ['newPass', {
      rules: [
        {
          required: true,
          message: '请输入新密码！',
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
          },
        },
      ],
    }],
    reNewPass: ['reNewPass', {
      rules: [
        {
          required: true,
          message: '请确认新密码！',
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
          },
        },
      ],
    }],
  }
}
</script>

<style scoped>

</style>
