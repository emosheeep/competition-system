<template>
  <a-dropdown v-model="show" :trigger="['click']">
    <a-icon type="setting" style="cursor: pointer; font-size: 16px" />
    <div slot="overlay" class="ant-dropdown-menu setting ant-dropdown-content">
      <div class="setting-header setting-item">
        <a-checkbox
          :indeterminate="indeterminate"
          :checked="checkAll"
          @change="onCheckAllChange"
        >
          列展示
        </a-checkbox>
        <a @click="init">重置</a>
      </div>
      <a-divider />
      <div class="ant-checkbox-group">
        <draggable v-model="columnSetting" animation="300">
          <div
            class="setting-item"
            v-for="item in columnSetting"
            :key="item.dataIndex"
          >
            <div class="setting-handle">
              <a-icon type="more" />
              <a-icon type="more" />
            </div>
            <a-checkbox v-model="item.checked">
              {{ item.title }}
            </a-checkbox>
          </div>
        </draggable>
      </div>
    </div>
  </a-dropdown>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'ColumnSetting',
  components: {
    draggable,
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      show: false,
      columnSetting: [],
    };
  },
  computed: {
    checkedList() {
      return this.columnSetting.filter(v => v.checked);
    },
    indeterminate() {
      return this.checkedList.length > 0 && this.checkedList.length < this.columnSetting.length;
    },
    checkAll() {
      return this.checkedList.length === this.columnSetting.length;
    },
  },
  watch: {
    checkedList(value) {
      this.$emit('change', value);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.columnSetting = this.columns.map(value => ({ ...value, checked: true }));
    },
    onCheckAllChange(e) {
      const checked = e.target.checked;
      this.columnSetting = this.columns.map(value => ({ ...value, checked }));
    },
  },
};
</script>

<style lang="less" scoped>
.setting-item {
  display: flex;
  align-items: center;
  padding: 4px 16px 4px 4px;
  .ant-checkbox-wrapper {
    flex-grow: 1;
  }
  .setting-handle {
    opacity: 0.8;
    cursor: move;
    .anticon-more {
      font-size: 12px;
      margin-top: 2px;
      & + .anticon-more {
        margin: 2px 4px 0 -8px;
      }
    }
  }
}
.setting-header {
  padding: 5px 16px 10px 24px;
  min-width: 180px;
}
.setting {
  .ant-divider {
    margin: 0;
  }
  .ant-checkbox-group {
    padding: 4px 0;
    display: block;
  }
}
</style>
