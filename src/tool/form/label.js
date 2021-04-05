import { isString } from 'lodash-es';

export default {
  name: 'FormItemLabel',
  props: {
    option: {
      type: [Object, String, Function],
      required: true,
    },
  },
  render(h) {
    const label = this.option;
    const { createComponent, locale } = this.$parent;

    if (isString(label)) {
      return h('div', locale(label));
    }

    return createComponent(label);
  },
};
