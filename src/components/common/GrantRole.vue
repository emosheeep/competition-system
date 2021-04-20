<template>
  <a-form-model :model="formData">
    <a-form-model-item
      required
      label="当前角色"
      prop="role_id"
      :rules="{ required: true, message: '请选择目标角色' }"
    >
      <a-select
        v-model="formData.role_id"
        :options="options"
        placeholder="请选择目标角色"
      />
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  name: 'GrantRole',
  props: {
    type: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      options: [],
      formData: {
        role_id: this.role,
      },
    };
  },
  watch: {
    role: {
      immediate: true,
      handler(role) {
        this.formData.role_id = role;
      },
    },
  },
  mounted() {
    this.$api.getRoles({
      offset: 1,
      limit: 100,
    }).then(data => {
      this.options = data.data.map(v => ({
        label: v.label,
        value: v.id,
      }));
    }).catch(e => {
      this.$message.error(e.msg || '获取角色列表失败');
    });
  },
  methods: {
    async confirm() {
      if (this.role === this.formData.role_id) return;
      try {
        await this.$api.grantRole({
          type: this.type,
          account: this.account,
          role_id: this.formData.role_id,
        });
      } catch (e) {
        this.$message.error(e.msg || '授权失败');
        throw e;
      }
    },
  },
};
</script>
