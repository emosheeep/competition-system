<template>
  <div>
    <div class="logo" @click="goHome">
      <a-avatar src="/logo.png" :size="40" />
      <span>竞赛管理系统</span>
    </div>
    <a-menu
      theme="dark"
      mode="inline"
      class="menu"
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      :inline-collapsed="collapsed"
      @click="handleClick"
    >
      <a-sub-menu v-for="item in config" :key="item.key">
        <span slot="title">
          <a-icon v-if="item.icon" :type="item.icon" />
          {{ item.title }}
        </span>
        <a-menu-item v-for="child in item.children" :key="child.key">
          {{ child.title }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedKeys: [],
      openKeys: [],
      config: [
        {
          title: '赛事管理',
          icon: 'appstore',
          key: 'race',
          children: [
            { key: '/race', title: '赛事' },
            { key: '/record', title: '参赛记录' },
          ],
        },
        {
          title: '用户管理',
          icon: 'user',
          key: 'user',
          children: [
            { key: '/student', title: '学生列表' },
            { key: '/teacher', title: '教师列表' },
          ],
        },
        {
          title: '权限管理',
          icon: 'key',
          key: 'permission',
          children: [
            { key: '/role_list', title: '角色列表' },
            { key: '/permission_list', title: '权限列表' },
          ],
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        const selectedKey = to.path;
        this.selectedKeys = [selectedKey];
        for (const parent of this.config) {
          for (const child of parent.children) {
            if (child.key === selectedKey) {
              this.openKeys = [parent.key];
              return;
            }
          }
        }
      },
    },
  },
  methods: {
    handleClick(data) {
      const { key: path } = data;
      this.$router.push(path).catch(e => e);
    },
    goHome() {
      this.$router.push('/race').catch(e => e);
    },
  },
};
</script>

<style scoped lang="stylus">
.menu li:nth-child(1)
  margin-top 0 !important

.logo
  display flex
  align-items center
  width 100%
  height 64px
  margin 0 auto
  color white
  overflow hidden
  white-space nowrap
  cursor pointer
  background-color #002140
  span
    margin-left 10px
    font-size 18px
</style>
