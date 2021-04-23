<template lang="pug">
.search-form-container
  .form
    ConfigForm(
      ref="form",
      :options="options",
      :matcher="matcher",
      @change="$emit('change', $event)"
    )
  .operate-button-group
    a-button(type="primary", :loading="loading", @click="search") 查询
    a-button(type="link", @click="reset") 重置
</template>

<script>
import ConfigForm from './ConfigForm';
import { noop } from 'lodash-es';

export default {
  name: 'SearchForm',
  components: {
    ConfigForm,
  },
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    immediate: {
      type: Boolean,
      default: false,
    },
    matcher: {
      type: Function,
      default: noop,
    },
    locale: {
      type: Function,
      default: key => key,
    },
  },
  computed: {
    result() {
      return this.$refs.form.getResult();
    },
    formData() {
      return this.$refs.form.getFormData();
    },
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler() {
        if (this.immediate) {
          // 等待Form初始化完成
          this.$nextTick(this.search);
        }
      },
    },
  },
  methods: {
    getResult() {
      return this.result;
    },
    getFormData() {
      return this.formData;
    },
    setState(...args) {
      this.$refs.form.setState(...args);
    },
    search() {
      this.$emit('search', this.getResult(), this.getFormData());
    },
    reset() {
      this.$refs.form.reset();
      this.$emit('reset', this.getResult(), this.getFormData());
    },
    toQuery() {
      return this.$refs.form.toQuery();
    },
  },
};
</script>

<style scoped lang="stylus">
.search-form-container
  display flex
  padding 20px
  background-color white

.form
  flex-grow 1
  padding-right 20px

.operate-button-group >>>
  position relative
  display flex
  flex-direction column
  justify-content center
  padding-left 20px
  border-left 1px solid divider-color
  .ant-btn
    min-width 100px
    &:first-child
      border-radius 2px
      margin-bottom 20px
</style>
