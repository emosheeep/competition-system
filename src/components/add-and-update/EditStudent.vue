<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
  >
    <template v-if="type !== 'self'">
      <a-form-item label="账号">
        <a-input
          ref="account"
          v-decorator="decorator.account"
          :disabled="type === 'update'"
          placeholder="学号"
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
    <a-form-item label="年级">
      <a-input
        v-decorator="decorator.grade"
        placeholder="年级"
      />
    </a-form-item>
    <a-form-item label="班级">
      <a-input
        v-decorator="decorator.classname"
        placeholder="班级"
      />
    </a-form-item>
    <a-form-item label="性别">
      <a-radio-group v-decorator="decorator.sex">
        <a-radio value="男">
          <span>男 &nbsp;</span>
          <a-icon type="man" />
        </a-radio>
        <a-radio value="女">
          <span>女 &nbsp;</span>
          <a-icon type="woman" />
        </a-radio>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script>
import EditMixin from './edit-mixin'

export default {
  name: 'EditStudent',
  mixins: [EditMixin],
  beforeMount () {
    this.decorator = decorator
  },
  methods: {
    initData () {
      const { data, type } = this
      const result = {
        name: data.name,
        sex: data.sex,
        classname: data.classname,
        grade: data.grade
      }
      if (type !== 'self') {
        result.account = data.account
      }
      this.form.setFieldsValue(result)
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
      message: '请输入姓名！'
    }]
  }],
  sex: ['sex', {
    valuePropName: 'value',
    initialValue: '男'
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
