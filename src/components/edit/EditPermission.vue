<template>
  <a-form-model ref="form" :model="formData" :rules="rules" layout="vertical">
    <a-form-model-item label="权限名称" prop="label">
      <a-input v-model.trim="formData.label" placeholder="请输入权限名称" />
    </a-form-model-item>
    <a-form-model-item label="权限类型" prop="type">
      <a-select
        v-model="formData.type"
        :options="permissionTypes"
        placeholder="请选择权限类型"
      />
    </a-form-model-item>
    <a-form-model-item label="Action" prop="action">
      <a-select
        v-model="formData.action"
        allowClear
        placeholder="请选择权限动作"
        :options="actions"
      />
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { permissionTypes, actions } from '@/utils/const';

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
      permissionTypes,
      actions,
      formData: {
        type: undefined,
        label: '',
        action: undefined,
      },
      rules: {
        type: { required: true, message: '请选择权限类型' },
        label: { required: true, message: '请输入权限名称' },
        action: { required: true, message: '请选择权限动作' },
      },
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(data) {
        if (!data) return;
        this.formData = {
          type: data.type,
          label: data.label,
          action: data.action,
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
