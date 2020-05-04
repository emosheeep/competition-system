<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="loading"
    title="修改信息"
    ok-text='确认'
    cancel-text="取消"
    @cancel="$emit('update:visible', false)"
    @ok="onOk"
    centered
  >
    <a-form :form="form">
      <!--通用部分：用户名、密码-->
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="账号"
      >
        <a-input disabled v-decorator="decorator.account" placeholder="账号/学号/职工号">
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

      <!--管理员部分：管理员不需要姓名-->
      <a-form-item
        v-if="type !== 'admin'"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="姓名"
      >
        <a-input v-decorator="decorator.name" placeholder="姓名"/>
      </a-form-item>

      <!--学生部分：年级、班级、性别-->
      <a-form-item
        v-if="type === 'student'"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="年级">
        <a-input v-decorator="decorator.grade" placeholder="年级"/>
      </a-form-item>
      <a-form-item
        v-if="type === 'student'"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="班级"
      >
        <a-input v-decorator="decorator.classname" placeholder="班级"/>
      </a-form-item>
      <a-form-item
        v-if="type === 'student'"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="性别"
      >
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

      <!--教师部分：部门-->
      <a-form-item
        v-if="type === 'teacher'"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="部门"
      >
        <a-input v-decorator="decorator.dept" placeholder="部门"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { message } from 'ant-design-vue'
import { createNamespacedHelpers } from 'vuex'
import { UPDATE_USER } from '../../store/mutation-types'
const { mapActions } = createNamespacedHelpers('user')
export default {
  name: 'EditUser',
  props: {
    visible: Boolean,
    user: Object,
    type: String
  },
  data () {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
      loading: false,
      changed: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, {
      name: 'edit',
      onValuesChange: _ => { this.changed = true }
    })
    this.decorator = decorator
    this.$on('hook:mounted', () => {
      this.$refs.password.focus()
      const temp = {}
      for (const key of Object.keys(this.user)) {
        if (!key.startsWith('_')) {
          temp[key] = this.user[key]
        }
      }
      this.form.setFieldsValue(temp)
      this.changed = false // 表单初始化也会触发change事件，这里手动修正
    })
  },
  methods: {
    ...mapActions({
      updateUser: UPDATE_USER
    }),
    onOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (!this.changed) {
            return message.info('未检测到数据变动')
          }
          this.loading = true
          this.updateUser({
            type: this.type,
            data: values
          }).then(res => {
            this.$emit('update:visible', false)
          }).catch(e => e).finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 500)
          })
        }
      })
    }
  }
}

const decorator = {
  account: ['account', {
    rules: [{
      required: true,
      message: '请输入账号/学号/职工号！'
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
  sex: ['sex', {
    initialValue: 'man'
  }],
  dept: ['dept', {
    rules: [{
      required: true,
      message: '请输入部门！'
    }]
  }],
  classname: ['classname', {
    rules: [{
      required: true,
      message: '请输入班级！'
    }]
  }],
  grade: ['grade', {
    rules: [{
      required: true,
      message: '请输入班级！'
    }]
  }]
}
</script>

<style scoped>

</style>
