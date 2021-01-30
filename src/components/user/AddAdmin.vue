<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="loading"
    :destroy-on-close="true"
    title="新增用户"
    ok-text="确认添加"
    cancel-text="取消"
    centered
    @cancel="onCancel"
    @ok="onOk"
  >
    <EditAdmin ref="admin" />
  </a-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import EditAdmin from '../add-and-update/EditAdmin';
import { ADD_USER } from '../../store/mutation-types';
const { mapActions } = createNamespacedHelpers('users');

export default {
  name: 'AddAdmin',
  components: { EditAdmin },
  props: {
    visible: Boolean,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions([ADD_USER]),
    onOk(e) {
      // 调用子组件的confirm方法
      this.$refs.admin.confirm().then(values => {
        this.loading = true;
        return this.ADD_USER({
          type: 'admin',
          users: values,
        });
      }).then(res => {
        this.$emit('update:visible', false);
      }).catch(console.warn).finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    onCancel(e) {
      if (this.loading) return;
      this.$emit('update:visible', false);
    },
  },
};
</script>
