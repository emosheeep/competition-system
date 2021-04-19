e<template lang="pug">
.form-container
  .form-item(
    v-for="option in options",
    :key="option.key",
    :class="{ [errorClass]: !!errors[option.key] }"
  )
    .form-item-label
      FormItemLabel(ref="formItem", :option="option.label")
    .form-item-content
      FormItemContent.content(ref="formItem", :option="option")
      .err-msg(v-if="errors[option.key]") {{ errors[option.key] }}
</template>

<script>
import FormItemLabel from './label';
import FormItemContent from './content';
import AsyncValidator from 'async-validator';
import {
  isFunction,
  isPlainObject,
  cloneDeep,
  isString,
  omit,
  noop,
  has,
} from 'lodash-es';
import {
  getDefaultValue,
  getInjectedEvents,
  getFilterData,
  notEmpty,
} from './helpers';

export default {
  name: 'ConfigForm',
  components: {
    FormItemLabel,
    FormItemContent,
  },
  props: {
    /**
     * 组件核心配置项
     */
    options: {
      type: Array,
      default: () => [],
    },
    /**
     * 用于匹配组件，用户可以根据接收到的组件名称返回想要的组件，返回结果将作为createElement的第一个参数
     */
    matcher: {
      type: Function,
      default: noop,
    },
    /**
     * 简单的i18n处理函数
     */
    locale: {
      type: Function,
      default: key => key,
    },
    /**
     * 为校验失败项添加的默认类名，外部可根据这个类名去定义/修改组件样式
     */
    errorClass: {
      type: String,
      default: 'form-item-error',
    },
  },
  data() {
    return {
      formData: {},
      flatOptions: {}, // 按key将原始选项存储
      validator: null,
      errors: {},
    };
  },
  computed: {
    result() {
      const result = {};
      const { formData, flatOptions } = this;
      for (const [key, value] of Object.entries(flatOptions)) {
        const { mapper } = value;

        // mapper为false代表当前key值不需要加入最终结果
        if (mapper === false) continue;

        // mapper没有返回值的话默认使用当前值 formData[key] 兜底
        const mapperValue = isFunction(mapper) ? mapper(formData) : formData[key];
        // 空值过滤
        if (isPlainObject(mapperValue)) {
          Object.assign(result, getFilterData(mapperValue));
        } else if (notEmpty(mapperValue)) {
          result[key] = mapperValue;
        }
      }
      return result;
    },
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler() {
        this.initFormData();
      },
    },
    formData: {
      deep: true,
      handler(val) {
        this.$emit('change', val);
      },
    },
  },
  methods: {
    match(name) {
      // 匹配组件
      return this.matcher(name) ?? name;
    },
    initFormData() {
      const formData = {};
      const flatOptions = {};
      const descriptor = {};

      for (const item of this.options) {
        const { label, key, rules } = item;

        flatOptions[key] = item;
        if (rules) {
          // rules为函数时视为validator选项
          descriptor[key] = isFunction(rules) ? { validator: rules } : rules;
        }

        // 设置默认值，考虑项目可能没有引入VueRouter
        Object.assign(formData, getDefaultValue(item, this.$route?.query));

        // 处理label
        if (isPlainObject(label)) {
          flatOptions[label.key] = label;
        }
      }

      Object.assign(this, {
        flatOptions,
        formData,
        validator: new AsyncValidator(descriptor),
      });
    },
    getProps(key, options) {
      const { formData } = this;
      const {
        props = {},
        attrs = {},
        on: event = {},
        nativeOn: nativeEvent = {},
        ...otherOptions
      } = options;

      /**
       * 为事件处理函数注入setState参数
       */
      const on = getInjectedEvents(event, this.setState.bind(this));
      const nativeOn = getInjectedEvents(nativeEvent, this.setState.bind(this));

      const update = newVal => {
        this.$set(this.errors, key, null); // 清除错误状态
        this.setState({ [key]: newVal });
      };

      const allAttrs = Object.assign(attrs, props);

      return {
        ...otherOptions, // 其他选项直接原样传递，保证拓展性
        formOption: this.flatOptions[key], // 基本信息，便于用户使用matcher自定义组件
        key,
        nativeOn,
        on: Object.assign({}, on, {
          input: isFunction(on.input)
            ? newVal => { on.input(newVal); update(newVal); }
            : update,
        }),
        /**
         * 合并attrs/props，统一传给attrs
         * Vue内部解析属性时，会将对应组件的`props从所有的attrs中提取出来
         * 并将props传递给组件的props，剩下的attrs放进`$attrs`，所以默认传给attrs没有问题
         * 但是如果默认传给props将可能会导致某些自定义组件无法正确解析得到`$attrs`
         * 比如一些透传属性，组件中如果没有声明对应的props，没有被组件接搜的props属性将不会进入`$attrs`
         * 从而导致内部使用到`$attrs`变量的地方出现问题
         */
        attrs: Object.assign({}, allAttrs, {
          // 优先采用 value
          value: has(allAttrs, 'value')
            ? allAttrs.value
            : formData[key],
        }),
      };
    },
    createComponent(options) {
      const h = this.$createElement;
      const { component, key, ...otherOptions } = options;

      if (!key) {
        console.error('Missing required prop \'key\'');
      }

      // component 要么是string要么是function
      if (isString(component)) {
        return h(
          this.match(component),
          this.getProps(key, otherOptions),
        );
      }

      if (isFunction(component)) {
        const result = component(h, this.formData, this.setState);
        if (result instanceof this.$vnode.constructor) {
          return result;
        }
        // 不是VNode就认为是对象，包含component、props、attrs、on等属性
        return h(
          this.match(result.component),
          this.getProps(key, omit(result, 'component')),
        );
      }

      console.warn('\'component\' must be string or function');
    },
    /**
     * 下列函数外部可调用
     */
    getResult() {
      return cloneDeep(this.result);
    },
    getFormData() {
      return cloneDeep(this.formData);
    },
    setState(callback) {
      const data = isFunction(callback) ? callback(this.formData) : callback;
      if (isPlainObject(data)) {
        Object.assign(this.formData, data);
      }
    },
    reset() {
      const formData = {};
      for (const [key, value] of Object.entries(this.flatOptions)) {
        const { default: defaultValue } = value;
        formData[key] = isFunction(defaultValue)
          ? defaultValue({}) // 外部可能解构，传入空对象防报错
          : defaultValue;
      }
      this.formData = formData;
      this.errors = {};
    },
    toQuery() {
      const query = {};
      for (const key of Object.keys(this.flatOptions)) {
        const { toQuery, mapper } = this.flatOptions[key];
        let value;
        if (toQuery === true && isFunction(mapper)) {
          value = mapper(this.formData) ?? this.formData[key];
        } else if (isFunction(toQuery)) {
          value = toQuery(this.formData);
        }
        // 空值过滤, value不为 undefined 或 null 或 ''
        if (notEmpty(value)) {
          if (isPlainObject(value)) {
            Object.assign(query, getFilterData(value));
          } else {
            query[key] = value;
          }
        }
      }
      return query;
    },
    validate(options = {}) {
      return this.validator?.validate(this.formData, options).then(() => {
        this.errors = {};
        return this.getResult();
      }).catch(e => {
        const { errors } = e;
        if (Array.isArray(errors)) {
          this.errors = errors.reduce((result, item) => {
            result[item.field] = item.message;
            return result;
          }, {});
        }
        throw e;
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.form-container >>>
  display grid
  grid-template-columns repeat(auto-fill, minmax(240px, 1fr))
  grid-gap 12px
  justify-items center

.form-item
  width 100%
  display flex
  flex-direction column

.form-item-label >>>
  height 22px
  line-height 22px
  margin-bottom 10px
  color primary-text-color
  font-size 14px
  .bui-select-wrapper-plain
    display flex
    align-items center
    height 22px
    .bui-select-icon-plain
      margin-bottom 0

.form-item-content
  .content
    width 100%
  .err-msg
    margin-top 5px
    font-size 12px
    color error-color
</style>
