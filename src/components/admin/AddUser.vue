<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="loading"
    :title="`新增 ${getTitle()}`"
    ok-text='确认添加'
    cancel-text="取消"
    @cancel="onCancel"
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
        <a-input ref="account" v-decorator="decorator.account" placeholder="账号/学号/职工号">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="密码"
      >
        <a-input v-decorator="decorator.password" placeholder="密码">
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
import { ADD_USER } from '../../store/mutation-types'

export default {
  name: 'Add',
  props: {
    visible: Boolean,
    type: String
  },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      loading: false
    }
  },
  beforeCreate () {
    // 这些数据并不需要响应式
    this.form = this.$form.createForm(this, { name: 'add' })
    Reflect.defineProperty(this, 'decorator', {
      writable: false,
      value: decorator
    })
  },
  mounted () {
    this.$refs.account.focus()
  },
  methods: {
    getTitle () {
      switch (this.type) {
        case 'admin':
          return '管理员'
        case 'teacher':
          return '教师'
        default:
          return '学生'
      }
    },
    onOk (e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          this.$store.dispatch(ADD_USER, {
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
    },
    onCancel (e) {
      if (this.loading) return
      this.$emit('update:visible', false)
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
    valuePropName: 'value',
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
