<template>
  <PageLayout>
    <ContextMenu
      v-model:visible="menuVisible"
      :list="menuItems"
      @select="onMenuSelect"
    />
    <a-tabs
      type="editable-card"
      :hide-add="true"
      :active-key="activePage"
      @change="changePage"
      @edit="editPage"
    >
      <a-tab-pane
        v-for="page in pageList"
        :key="page.fullPath"
      >
        <template #tab>
          <span
            :data-key="page.fullPath"
            style="user-select: none"
            @contextmenu="onContextmenu"
            v-text="page.name"
          />
        </template>
      </a-tab-pane>
    </a-tabs>
    <router-view v-slot="{ Component }">
      <PageToggleTransition name="fadeIn">
        <keep-alive :exclude="dustbin">
          <component :is="Component" />
        </keep-alive>
      </PageToggleTransition>
    </router-view>
  </PageLayout>
</template>

<script>
import { message } from 'ant-design-vue';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from '@ant-design/icons-vue';
import { last } from 'lodash';
import PageLayout from '../PageLayout';
import ContextMenu from '@/components/common/ContextMenu';
import PageToggleTransition from '@/components/transition/PageToggleTransition';
import getTabKey from './getTabKey';

export default {
  name: 'TabLayout',
  components: {
    PageToggleTransition,
    ContextMenu,
    PageLayout,
  },
  data() {
    return {
      pageList: [],
      dustbin: [],
      activePage: '',
      menuVisible: false,
      menuItems: [
        { key: '1', icon: ArrowLeftOutlined, text: '关闭左侧' },
        { key: '2', icon: ArrowRightOutlined, text: '关闭右侧' },
        { key: '3', icon: CloseOutlined, text: '关闭其它' },
      ],
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.activePage = route.fullPath;
        this.putCache(route);
        const index = this.pageList.findIndex(item => item.fullPath === route.fullPath);
        if (index === -1) {
          this.pageList.push(route);
        }
      },
      immediate: true,
    },
  },
  methods: {
    changePage(key) {
      this.activePage = key;
      this.$router.push(key);
    },
    editPage(key, action) {
      if (action === 'remove') {
        this.remove(key);
      }
    },
    remove(key) {
      if (this.pageList.length <= 1) {
        return message.info('最后一页了哦~');
      }
      let curIndex = this.pageList.findIndex(item => item.fullPath === key);
      const { matched } = this.pageList[curIndex];
      const componentName = last(matched).components.default.name;
      this.dustbin.push(componentName);
      this.pageList.splice(curIndex, 1);
      // 如果删除的是当前页才需要跳转
      if (key === this.activePage) {
        // 判断向左跳还是向右跳
        curIndex = curIndex >= this.pageList.length ? this.pageList.length - 1 : curIndex;
        const page = this.pageList[curIndex];
        this.$router.push(page.fullPath).finally(() => {
          this.dustbin.splice(0); // 重置，否则会影响到某些组件的缓存
        });
      }
    },
    /**
     * 右键菜单
     */
    onContextmenu(e) {
      const key = getTabKey(e.target);
      if (!key) return;

      e.preventDefault();
      this.menuVisible = true;
    },
    onMenuSelect(key, target) {
      const tabKey = getTabKey(target);
      switch (key) {
        case '1': this.closeLeft(tabKey); break;
        case '2': this.closeRight(tabKey); break;
        case '3': this.closeOthers(tabKey); break;
        default: break;
      }
    },
    closeOthers(tabKey) {
      const index = this.pageList.findIndex(item => item.fullPath === tabKey);
      for (const route of this.pageList) {
        if (route.fullPath !== tabKey) {
          this.clearCache(route);
        }
      }
      const page = this.pageList[index];
      this.pageList = [page];
      this.activePage = page.fullPath;
      this.$router.push(this.activePage).catch(e => e);
    },
    closeLeft(tabKey) {
      const index = this.pageList.findIndex(item => item.fullPath === tabKey);
      this.pageList.forEach((route, i) => {
        if (i < index) {
          this.clearCache(route);
        }
      });
      const restPages = this.pageList.slice(index);
      this.pageList = restPages;
      // 判断当前activePage是否在将要删除的页面中
      const curActivePage = restPages.find(item => item.fullPath === this.activePage);
      if (!curActivePage) {
        this.activePage = restPages[0].fullPath;
        this.$router.push(this.activePage).catch(e => e);
      }
    },
    closeRight(tabKey) {
      const index = this.pageList.findIndex(item => item.fullPath === tabKey);
      this.pageList.forEach((route, i) => {
        if (i > index) {
          this.clearCache(route);
        }
      });
      const restPages = this.pageList.slice(0, index + 1);
      this.pageList = restPages;
      // 判断当前activePage是否在将要删除的页面中
      const curActivePage = restPages.find(item => item.fullPath === this.activePage);
      if (!curActivePage) {
        this.activePage = last(restPages).fullPath;
        this.$router.push(this.activePage).catch(e => e);
      }
    },
    /**
     * 缓存控制
     */
    clearCache(route) {
      const componentName = last(route.matched).components.default.name;
      this.dustbin.push(componentName); // 清除
    },
    putCache(route) {
      const componentName = last(route.matched).components.default.name;
      if (this.dustbin.includes(componentName)) {
        this.dustbin = this.dustbin.filter(item => item !== componentName);
      }
    },
  },
};
</script>
