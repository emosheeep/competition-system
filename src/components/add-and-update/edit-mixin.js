import { message } from 'ant-design-vue';

export default {
  props: {
    data: Object,
  },
  data() {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
      changed: false,
    };
  },
  computed: {
    isEdit() {
      return !!this.data;
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      onValuesChange: _ => { this.changed = true; },
    });
  },
  mounted() {
    if (this.isEdit) {
      this.initData();
      this.changed = false; // 修正
    }
  },
  methods: {
    reset() {
      this.form.resetFields();
      this.changed = true;
    },
    validate() {
      if (this.isEdit && !this.changed) {
        message.info('未检测到数据变动');
        return Promise.reject('未检测到数据变动');
      }
      return this.form.validateFields();
    },
  },
};
