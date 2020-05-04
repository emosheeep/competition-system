<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="loading"
    title="新增用户"
    ok-text='确认添加'
    cancel-text="取消"
    @cancel="onCancel"
    @ok="onOk"
    centered
  >
    <a-row
      type="flex"
      align="middle"
      style="margin-bottom: 20px; color: black">
      <a-col
        :span="labelCol.span"
        style="text-align: right">
        类型：
      </a-col>
      <a-col :span="wrapperCol.span">
        <a-radio-group
          default-value="student"
          button-style="solid"
          @change="onChange"
        >
          <a-radio-button value="student">学生</a-radio-button>
          <a-radio-button value="teacher">教师</a-radio-button>
          <a-radio-button value="admin">管理员</a-radio-button>
        </a-radio-group>
      </a-col>
    </a-row>
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
import { createNamespacedHelpers } from 'vuex'
import { ADD_USER } from '../../store/mutation-types'
const { mapActions } = createNamespacedHelpers('users')

export default {
  name: 'Add',
  props: {
    visible: Boolean
  },
  data () {
    return {
      type: 'student',
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
      loading: false,
      decorator
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'add' })
  },
  mounted () {
    this.$refs.account.focus()
  },
  methods: {
    ...mapActions({
      addUser: ADD_USER
    }),
    onOk (e) {
      this.form.validateFields().then(values => {
        this.loading = true
        return this.addUser({
          type: this.type,
          users: values
        })
      }).then(res => {
        this.$emit('update:visible', false)
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    onChange ({ target }) {
      this.type = target.value
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
