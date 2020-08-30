import moment from 'moment'
import { message } from 'ant-design-vue'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: 'add',
      validator (value) {
        return ['add', 'update', 'self'].includes(value)
      },
    },
  },
  data () {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
    }
  },
  mounted () {
    if (this.type !== 'add') {
      this.initData()
    }
  },
  methods: {
    reset () {
      this.$refs.form.resetFields()
    },
    confirm () {
      if (this.type !== 'add' && !this.changed) {
        message.info('未检测到数据变动')
        return Promise.reject('未检测到数据变动')
      }
      return this.$refs.form.validate().then(values => {
        // 转换可能存在的时间属性
        for (const key of Object.keys(values)) {
          if (values[key] instanceof moment) {
            values[key] = values[key].valueOf()
          }
        }
        return values
      })
    },
  },
}
