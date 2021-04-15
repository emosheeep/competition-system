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
    <a-button type="link" @click="writeTemplateFile">
      下载模板({{ type === 'student' ? '学生' : '教师' }})
    </a-button>
    <a-upload
      accept=".xlsx,.xls"
      class="upload"
      :before-upload="getFile"
      :remove="removeFile"
    >
      <a-button>
        <a-icon type="upload" /> 点击上传表格
      </a-button>
    </a-upload>

    <a-table
      size="small"
      style="margin-top: 10px"
      row-key="账号"
      :columns="columns"
      :data-source="result"
      :loading="uploading"
      :pagination="{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${result.length} 条记录`
      }"
    />
  </a-modal>
</template>

<script>
import { uniq } from 'lodash-es';
import { readExcel, makeExcel } from '@/utils/excel';

export default {
  name: 'UserImport',
  props: {
    type: {
      default: 'student',
      validator: value => ['student', 'teacher'].includes(value),
    },
  },
  data() {
    return {
      visible: true,
      uploading: false,
      result: [],
    };
  },
  computed: {
    columns() {
      return this.config.header.map(key => ({
        title: key,
        dataIndex: key,
      }));
    },
    config() {
      return ({
        student: {
          header: ['账号', '姓名', '性别', '年级', '班级'],
          name: '学生上传模板.xlsx',
          data: [{
            账号: '8002117xxx',
            姓名: '张三',
            性别: '男',
            年级: '大一',
            班级: '171班',
          }],
        },
        teacher: {
          header: ['账号', '姓名', '职称'],
          name: '教师上传模板.xlsx',
          data: [{
            工号: '8002117xxx',
            姓名: '张三',
            职称: '教授',
          }],
        },
      })[this.type];
    },
  },
  methods: {
    getFile(file) {
      this.uploading = true;
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = async e => {
        const result = await readExcel(e.target.result);
        console.log(result);
        this.result = uniq(result, '账号');

        this.uploading = false;
        const diff = result.length - this.result.length;
        this.$message.success(diff > 0 ? `账号不能重复，已去重${diff}条数据` : '文件读取成功');
      };
      reader.onerror = e => {
        this.$message.error('文件读取失败');
      };
      return false; // 阻止上传
    },
    removeFile() {
      this.result.splice(0);
    },
    onCancel() {
      if (!this.result.length) {
        this.visible = false;
        return;
      }
      const modal = this.$modal.confirm({
        title: '警告',
        content: '数据未保存，确认关闭？',
        onOk: () => {
          modal.destroy();
          this.visible = false;
        },
      });
    },
    onOk() {
      if (!this.result.length) {
        return this.$message.warn('暂无数据！');
      }
      this.$modal.confirm({
        title: '提示',
        content: '确认导入吗？',
        centered: true,
        onOk: () => this.$api.importUser(data => {
          console.log(data);
        }),
      });
    },
    writeTemplateFile() {
      makeExcel(this.config);
    },
  },
};
</script>
