<template>
  <a-form-model ref="form" :model="formData" :rules="rules">
    <a-form-model-item label="角色名称" prop="label">
      <a-input v-model.trim="formData.label" placeholder="请输入权限名称" />
    </a-form-model-item>
    <a-form-model-item label="权限" prop="permissions">
      <a-select
        v-model="formData.permissions"
        allow-clear
        :filter-option="filterOption"
        :options="permissions"
        mode="multiple"
        placeholder="请选择权限"
      />
    </a-form-model-item>
    <a-form-model-item label="描述" prop="description">
      <a-input v-model.trim="formData.description" placeholder="请输入备注" />
    </a-form-model-item>
  </a-form-model>
</template>

<script>

export default {
  name: 'EditRole',
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      permissions: [],
      formData: {
        label: '',
        description: '',
        permissions: [],
      },
      rules: {
        label: { required: true, message: '请输入角色名称' },
        permissions: { required: true, message: '请选择权限' },
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
          description: data.description,
          permissions: data.permissions.map(i => i.id),
        };
      },
    },
  },
  mounted() {
    this.$api.getPermissions().then(({ data }) => {
      if (data.code !== 200) throw data;
      this.permissions = data.data.map(item => ({
        label: item.label,
        value: item.id,
      }));
    }).catch(e => {
      console.error(e);
      this.$message.error(e.msg || '权限列表获取失败');
    });
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(() => this.formData);
    },
    filterOption(query, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    },
  },
};
</script>
