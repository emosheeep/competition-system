<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
  >
    <template #menuHeaderRender>
      <div class="logo">
        <a-avatar src="/logo.png" :size="40" />
        <h1>竞赛管理系统</h1>
      </div>
    </template>
    <template #rightContentRender>
      <div :class="rightContentClass">
        <LoginState />
      </div>
    </template>
    <template #footerRender>
      <div class="footer-container">Ant Design ©2018 Created by Ant UED</div>
    </template>
    <slot />
  </pro-layout>
</template>

<script>
import ProLayout from '@ant-design-vue/pro-layout';
import { routes } from '@/router';
import LoginState from '@/components/common/LoginState.vue';

export default {
  name: 'GlobalLayout',
  components: {
    ProLayout,
    LoginState,
  },
  data() {
    return {
      menus: [],
      collapsed: false,
      autoHideHeader: false,
      query: {},
      layout: 'sidemenu',
      contentWidth: 'Fluid',
      theme: 'dark',
      isMobile: false,
    };
  },
  computed: {
    rightContentClass() {
      return [
        'ant-pro-global-header-index-right',
        this.layout === 'topmenu' && `ant-pro-global-header-index-${this.theme}`,
      ];
    },
  },
  created() {
    this.menus = routes.find(item => item.path === '/').children;
  },
  methods: {
    handleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    handleMediaQuery(query) {
      this.query = query;
      if (this.isMobile && !query['screen-xs']) {
        this.isMobile = false;
        return;
      }
      if (!this.isMobile && query['screen-xs']) {
        this.isMobile = true;
        this.collapsed = false;
      }
    },
  },
};
</script>

<style lang="less">
@import "~ant-design-vue/es/style/themes/default.less";

.footer-container {
  text-align: center;
}

.ant-layout-footer {
  padding: 16px 24px;
}

.ant-pro-basicLayout-content {
  margin: 10px 10px 0 10px;
  padding: 10px;
  background-color: white;
}

.ant-pro-global-header-index-right {
  margin-right: 8px;

  &.ant-pro-global-header-index-dark {
    .ant-pro-global-header-index-action {
      color: hsla(0, 0%, 100%, 0.85);

      &:hover {
        background: #1890ff;
      }
    }
  }

  .ant-pro-account-avatar {
    .antd-pro-global-header-index-avatar {
      margin: ~"calc((@{layout-header-height} - 24px) / 2)" 0;
      margin-right: 8px;
      color: @primary-color;
      vertical-align: top;
      background: rgba(255, 255, 255, 0.85);
    }
  }

  .menu {
    .anticon {
      margin-right: 8px;
    }

    .ant-dropdown-menu-item {
      min-width: 100px;
    }
  }
}
</style>
