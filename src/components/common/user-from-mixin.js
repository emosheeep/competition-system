import { message } from 'ant-design-vue'

export default {
  props: {
    user: Object,
    type: {
      type: String,
      default: 'add',
      validator (value) {
        return ['add', 'update'].includes(value)
      }
    }
  },
  data () {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
      changed: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, {
      onValuesChange: _ => { this.changed = true }
    })
  },
  mounted () {
    if (this.type === 'add') {
      return this.$refs.account.focus()
    }
    // 更新
    this.$refs.password.focus()
    const temp = {}
    for (const key of Object.keys(this.user)) {
      if (!key.startsWith('_')) {
        temp[key] = this.user[key]
      }
    }
    this.form.setFieldsValue(temp)
    this.changed = false // 修正changed的状态
  },
  methods: {
    confirm () {
      if (this.type === 'update' && !this.changed) {
        message.info('未检测到数据变动')
        return false
      }
      return this.form.validateFields()
    }
  }
}
