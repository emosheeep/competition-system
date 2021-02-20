export default {
  name: 'FormItemContent',
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  render(h) {
    return this.$parent.createComponent(this.option);
  },
};
