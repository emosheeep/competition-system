import Vue from 'vue';
import Form from '@/tool/form';
import { isFunction, isString } from 'lodash-es';

const getPlaceholder = (prefix, label) => `${prefix}${label}`;

Vue.use(Form, { matcher });

function matcher(name) {
  return ({
    'a-input': {
      functional: true,
      render(h, ctx) {
        const { formOption, attrs, on } = ctx.data;
        const label = formOption?.label;
        ctx.data.attrs = Object.assign({
          allowClear: true,
          placeholder: isString(label) ? getPlaceholder('请输入', label) : '',
        }, attrs);

        const { pressEnter, input } = on;
        on.pressEnter = e => {
          isFunction(pressEnter) && pressEnter(e);
          const vm = ctx.parent.$parent; // ctx.parent为AuditForm
          // 当$parent为SearchForm时调用search方法触发搜索
          if (vm && vm.$vnode.componentOptions.tag === 'SearchForm') {
            if (!vm.loading) {
              vm.search();
            }
          }
        };

        on.input = e => {
          isFunction(input) && input(e.target.value.trim());
        };

        return h('a-input', ctx.data);
      },
    },
    'a-select': {
      functional: true,
      render(h, ctx) {
        const { formOption, attrs, on } = ctx.data;
        const label = formOption?.label;
        ctx.data.attrs = Object.assign({
          allowClear: true,
          placeholder: isString(label) ? getPlaceholder('请选择', label) : '',
        }, attrs);
        const { change, input } = on;
        on.change = value => {
          input(value);
          isFunction(change) && change(value);
        };
        return h('a-select', ctx.data);
      },
    },
    'a-range-picker': {
      functional: true,
      render(h, ctx) {
        const { on, attrs } = ctx.data;
        attrs.valueFormat = 'YYYY-MM-DD';

        const { change, input } = on;
        on.change = value => {
          input(value);
          isFunction(change) && change(value);
        };
        return h('a-range-picker', ctx.data);
      },
    },
  })[name?.startsWith('a-') ? name : `a-${name}`];
}
