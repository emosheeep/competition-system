<template>
  <a-form-model
    ref="form"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    :model="formData"
    :rules="rules"
  >
    <a-form-model-item label="审核" prop="status">
      <a-radio-group v-model="formData.status">
        <a-radio-button :value="1">通过</a-radio-button>
        <a-radio-button :value="2">拒绝</a-radio-button>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="备注" prop="description">
      <a-input
        v-model="formData.description"
        placeholder="请输入备注"
        auto-focus
      />
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  name: 'AuditRecord',
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        status: 1,
        description: '',
      },
    };
  },
  computed: {
    rules() {
      return {
        status: { required: true, message: '请选择审核结果' },
        description: {
          required: this.formData.status === 2, // 拒绝时必填拒绝理由
          message: '请填写备注',
        },
      };
    },
  },
  watch: {
    record: {
      immediate: true,
      handler(value) {
        Object.assign(this.formData, {
          status: value.status,
          description: value.description,
        });
      },
    },
    'formData.status'() {
      this.formData.description = '';
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(() => this.formData);
    },
  },
};
</script>
