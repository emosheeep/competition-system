<template>
  <a-form-model ref="form" :model="formData" :rules="rules">
    <a-form-model-item label="权限名称" prop="label">
      <a-input v-model.trim="formData.label" placeholder="请输入权限名称" />
    </a-form-model-item>
    <a-form-model-item label="权限类型" prop="actions">
      <a-select
        v-model="formData.actions"
        :options="actions"
        mode="multiple"
        placeholder="请选择权限类型"
      />
    </a-form-model-item>
    <a-form-model-item label="描述" prop="description">
      <a-input v-model.trim="formData.description" placeholder="请输入备注" />
    </a-form-model-item>
  </a-form-model>
</template>

<script>

const actions = [
  'add',
  'delete',
  'update',
  'query',
  'import',
  'export',
].map(key => ({
  label: key,
  value: key,
}));

export default {
  name: 'EditPermission',
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      actions,
      formData: {
        label: '',
        description: '',
        actions: [],
      },
      rules: {
        label: { required: true, message: '请输入权限名称' },
        actions: { required: true, message: '请选择权限类型' },
      },
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(data) {
        if (!data) return;
        this.formData = {
          label: data.label,
          actions: data.actions,
          description: data.description,
        };
      },
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(() => this.formData);
    },
  },
};
</script>
