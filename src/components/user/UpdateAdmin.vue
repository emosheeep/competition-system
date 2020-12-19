<template>
  <a-modal
    centered
    title="修改信息"
    ok-text="确认"
    cancel-text="取消"
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="loading"
    :destroy-on-close="true"
    @cancel="onCancel"
    @ok="onOk"
  >
    <EditAdmin
      ref="admin"
      type="update"
      :data="data"
    />
  </a-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { UPDATE_USER } from '@/store/types';
import EditAdmin from '../add-and-update/EditAdmin';
const { mapActions } = createNamespacedHelpers('users');
export default {
  name: 'UpdateAdmin',
  components: { EditAdmin },
  props: {
    visible: Boolean,
    data: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:visible'],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      updateUser: UPDATE_USER,
    }),
    onCancel() {
      !this.loading && this.$emit('update:visible', false);
    },
    onOk() {
      this.$refs.admin.confirm().then(values => {
        this.loading = true;
        return this.updateUser({
          type: 'admin',
          data: values,
        });
      }).then(res => {
        this.$emit('update:visible', false);
      }).catch(console.warn).finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
  },
};
</script>
