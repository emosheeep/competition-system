import moment from 'moment';
import { message } from 'ant-design-vue';

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default: 'add',
      validator(value) {
        return ['add', 'update', 'self'].includes(value);
      },
    },
  },
  data() {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
      changed: false,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      onValuesChange: _ => { this.changed = true; },
    });
  },
  mounted() {
    if (this.type !== 'add') {
      this.initData();
      this.changed = false; // 修正
    }
  },
  methods: {
    reset() {
      this.form.resetFields();
      this.changed = true;
    },
    confirm() {
      return new Promise((resolve, reject) => {
        if (this.type !== 'add' && !this.changed) {
          message.info('未检测到数据变动');
          reject('未检测到数据变动');
        } else {
          this.form.validateFields((err, values) => {
            if (err) return reject(err);
            // 转换可能存在的时间属性
            for (const key of Object.keys(values)) {
              if (values[key] instanceof moment) {
                values[key] = values[key].valueOf();
              }
            }
            resolve(values);
          });
        }
      });
    },
  },
};
