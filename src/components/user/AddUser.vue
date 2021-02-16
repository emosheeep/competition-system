<template>
  <a-modal v-model="show" v-bind="modalProps.props" v-on="modalProps.on">
    <a-row type="flex" align="middle" style="margin-bottom: 20px; color: black">
      <a-col span="3" style="text-align: right">
        类型：
      </a-col>
      <a-col span="20">
        <a-radio-group
          v-model="type"
          button-style="solid"
        >
          <a-radio-button value="student">
            学生
          </a-radio-button>
          <a-radio-button value="teacher">
            教师
          </a-radio-button>
        </a-radio-group>
      </a-col>
    </a-row>
    <EditStudent
      v-if="type === 'student'"
      ref="student"
    />
    <EditTeacher
      v-else-if="type === 'teacher'"
      ref="teacher"
    />
  </a-modal>
</template>

<script>
import EditStudent from '../edit/EditStudent';
import EditTeacher from '../edit/EditTeacher';

export default {
  name: 'AddUser',
  components: {
    EditStudent,
    EditTeacher,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      type: 'student',
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
          title: '新增用户',
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
      // 调用子组件的confirm方法
      this.$refs[this.type].validate().then(values => {
        this.loading = true;
        this.$api.addUser(this.type, values).then(({ data }) => {
          if (data.code !== 200) throw data;
          this.show = false;
          this.$message.success('添加成功');
          this.$emit('success');
        }).catch(e => {
          console.error(e);
          this.$message.error(e.msg || '添加失败');
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
