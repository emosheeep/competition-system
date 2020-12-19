<template>
  <a-modal
    centered
    :visible="visible"
    :confirm-loading="loading"
    :destroy-on-close="true"
    title="新增赛事"
    ok-text="创建"
    cancel-text="取消"
    @cancel="onCancel"
    @ok="onOk"
  >
    <EditRace
      ref="addUser"
      type="add"
    />
  </a-modal>
</template>

<script>
import EditRace from '../add-and-update/EditRace';
import { ADD_RACE } from '../../store/types';
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('races');
export default {
  name: 'AddRace',
  components: { EditRace },
  props: {
    visible: Boolean,
  },
  emits: ['update:visible'],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      addRace: ADD_RACE,
    }),
    onOk(e) {
      this.$refs.addUser.confirm().then(values => {
        this.loading = true;
        values.date = values.date.valueOf(); // 将组件默认的moment对象转换为时间戳
        return this.addRace(values);
      }).then(_ => {
        this.$emit('update:visible', false);
      }).catch(e => e).finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    onCancel(e) {
      this.$emit('update:visible', false);
    },
  },
};
</script>
