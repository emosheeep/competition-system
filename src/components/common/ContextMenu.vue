<template>
  <a-menu
    v-show="visible"
    class="contextmenu"
    :style="style"
    :selectedKeys="selectedKeys"
    @click="handleClick"
  >
    <a-menu-item v-for="item in list" :key="item.key">
      <a-icon v-if="item.icon" :type="item.icon"/>
      <span>{{ item.text }}</span>
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      left: 0,
      top: 0,
      target: null,
      selectedKeys: [],
    };
  },
  computed: {
    style() {
      return {
        left: this.left + 'px',
        top: this.top + 'px',
      };
    },
  },
  created() {
    const clickHandler = () => this.closeMenu();
    const contextMenuHandler = e => this.setPosition(e);
    window.addEventListener('click', clickHandler);
    window.addEventListener('contextmenu', contextMenuHandler);
    this.$emit('hook:beforeDestroy', () => {
      window.removeEventListener('click', clickHandler);
      window.removeEventListener('contextmenu', contextMenuHandler);
    });
  },
  methods: {
    closeMenu() {
      this.$emit('update:visible', false);
    },
    setPosition(e) {
      this.left = e.clientX;
      this.top = e.clientY;
      this.target = e.target;
    },
    handleClick({ key }) {
      this.$emit('select', key, this.target);
      this.closeMenu();
    },
  },
};
</script>

<style lang="stylus" scoped>
  .contextmenu
    position fixed
    z-index 1000
    border-radius 4px
    border 1px lightgrey solid
    box-shadow 4px 4px 10px lightgrey !important
  .ant-menu-item
    margin 0 !important
</style>
