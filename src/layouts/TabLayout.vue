<template>
  <div class="tab-layout">
    <a-tabs
      type="editable-card"
      class="tab-bar"
      :hide-add="true"
      :active-key="activePage"
      @change="changePage"
      @edit="editPage"
      @contextmenu="onContextmenu"
    >
      <a-tab-pane v-for="page in pageList" :key="page.fullPath">
        <template #tab>
          <span :data-key="page.fullPath">
            {{ page.meta.title }}
          </span>
        </template>
      </a-tab-pane>
    </a-tabs>
    <PageToggleTransition name="fadeIn">
      <keep-alive :exclude="dustbin">
        <router-view />
      </keep-alive>
    </PageToggleTransition>
    <ContextMenu
      :list="menuItems"
      :visible.sync="menuVisible"
      @select="onMenuSelect"
    />
  </div>
</template>

<script>
import { message } from 'ant-design-vue';
import { last } from 'lodash-es';
import ContextMenu from '../components/common/ContextMenu';
import PageToggleTransition from '../components/transition/PageToggleTransition';

export default {
  name: 'TabLayout',
  components: { PageToggleTransition, ContextMenu },
  data() {
    return {
      pageList: [],
      dustbin: [],
      activePage: '',
      menuVisible: false,
      menuItems: [
        { key: '1', icon: 'arrow-left', text: '关闭左侧' },
        { key: '2', icon: 'arrow-right', text: '关闭右侧' },
        { key: '3', icon: 'close', text: '关闭其它' },
      ],
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.activePage = route.fullPath;
        this.putCache(route);
        const index = this.pageList.findIndex(item => item.fullPath === route.fullPath);
        if (index === -1) {
          this.pageList.push(route);
        }
      },
    },
  },
  methods: {
    log(data) {
      console.log(data);
    },
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

/**
 * 获取Tab标签下dom节点中自定义的数据，递归向下查找最多3层（观察Tab组件渲染后的DOM得出）
 * 该方式属于hack手段，不得已为之
 * @param{HTMLElement} target event.target
 * @param depth 深度
 */
function getTabKey(target, depth = 0) {
  if (depth > 2 || !target) {
    return null;
  }
  return target.dataset.key || getTabKey(target.firstElementChild, ++depth);
}
</script>

<style scoped lang="stylus">
.tab-bar >>> .ant-tabs-bar
  margin-bottom 0

.breadcrumb
  margin-bottom 10px
</style>
