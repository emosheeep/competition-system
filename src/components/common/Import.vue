<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :body-style="{ padding: '10px' }"
    :destroy-on-close="true"
    :after-close="removeFile"
    title="导入数据"
    ok-text="确认导入"
    cancel-text="取消"
    centered
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-upload
      accept=".xlsx,.xls"
      class="upload"
      :before-upload="getFile"
      :remove="removeFile"
    >
      <a-button :disabled="fileLoaded">
        <a-icon type="upload" /> 点击上传表格
      </a-button>
    </a-upload>
    <a-table
      size="small"
      style="margin-top: 10px"
      :columns="columns"
      :data-source="result"
      :loading="uploading"
      :row-key="rowKey"
      :pagination="{
        showSizeChanger: true,
        showQuickJumper: true
      }"
    />
  </a-modal>
</template>

<script>
import { uniqBy } from 'lodash';
import { message, Modal } from 'ant-design-vue';
import { readExcel } from '../../utils/excel';
export default {
  name: 'Import',
  props: {
    visible: Boolean,
    rowKey: {
      type: String,
      default: 'account',
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      uploading: false,
      fileLoaded: false,
      result: [],
    };
  },
  methods: {
    getFile(file) {
      this.uploading = true;
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = e => {
        const result = readExcel(e.target.result);
        this.generateData(result);
        message.success('文件读取成功');
      };
      reader.onerror = e => {
        message.error('文件读取失败');
      };
      return false; // 阻止上传
    },
    generateData(result) {
      const length = result.length;
      try {
        result = uniqBy(result, item => item.account);
      } catch (e) {
        message.error('表格数据格式有误');
      }
      if (result.length !== length) {
        message.warn('学号有重复，已按学号去重');
      }
      // 防止将不必要的属性展开到最终数据中
      result = result.map(item => {
        Reflect.ownKeys(item).forEach(key => {
          if (key.startsWith('_')) {
            Reflect.deleteProperty(item, key);
          }
        });
        return { ...item };
      });
      this.result = result.map(user => ({
        password: '123456',
        ...user,
      }));
      this.fileLoaded = true;
      this.uploading = false;
    },
    removeFile(file) {
      this.fileLoaded = false;
      this.result.splice(0);
    },
    onCancel(e) {
      if (!this.fileLoaded) {
        return this.$emit('update:visible', false);
      }
      const modal = Modal.confirm({
        title: '警告',
        content: '数据未保存，确认关闭？',
        onOk: () => {
          modal.destroy();
          this.$emit('update:visible', false);
        },
      });
    },
    onOk(e) {
      if (!this.fileLoaded) {
        return message.warn('请先上传表格文件！');
      }
      const modal = Modal.confirm({
        title: '提示',
        content: '确认导入吗？',
        centered: true,
        onOk: () => {
          modal.destroy();
          this.$emit('confirm', this.result);
        },
      });
    },
  },
};
</script>

<style scoped lang="stylus">
  .upload
    display flex
    margin-bottom 10px
    >>> div:last-child
      order -1
      flex-grow 1
</style>
