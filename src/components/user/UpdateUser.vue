<template>
  <a-modal
    v-model="show"
    v-bind="modalProps.props"
    v-on="modalProps.on"
  >
    <EditStudent
      v-if="type === 'student'"
      ref="student"
      type="update"
      :data="data"
    />
    <EditTeacher
      v-else-if="type === 'teacher'"
      ref="teacher"
      type="update"
      :data="data"
    />
  </a-modal>
</template>

<script>
import EditStudent from '../add-and-update/EditStudent';
import EditTeacher from '../add-and-update/EditTeacher';

export default {
  name: 'UpdateUser',
  components: {
    EditStudent,
    EditTeacher,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'admin',
      validator(value) {
        return ['student', 'teacher'].includes(value);
      },
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    show: {
      get() { return this.value; },
      set(val) { this.$emit('input', val); },
    },
    modalProps() {
      return {
        props: {
          maskClosable: false,
          confirmLoading: this.loading,
          destroyOnClose: true,
          title: '修改信息',
          okText: '确认',
          cancelText: '取消',
          centered: true,
          ...this.$attrs,
        },
        on: {
          ok: this.onOk,
          ...this.$listeners,
        },
      };
    },
  },
  methods: {
    onOk() {
      this.$refs[this.type].confirm().then(values => {
        this.loading = true;
        this.$api.updateUser(this.type, values).then(({ data }) => {
          if (data.code !== 200) throw data;
          this.show = false;
          this.$emit('success');
        }).catch(e => {
          console.error(e);
          this.$message.error(e.msg || '修改失败');
        }).finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
      }).catch(console.error);
    },
  },
};
</script>
