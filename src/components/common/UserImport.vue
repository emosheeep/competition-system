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
      下载上传模板({{ type === "student" ? "学生" : "教师" }})
    </a-button>
    <a-upload
      accept=".xlsx,.xls"
      class="upload"
      :before-upload="getFile"
      :remove="removeFile"
    >
      <a-button> <a-icon type="upload" /> 点击上传表格 </a-button>
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
        showTotal: (total) => `共 ${result.length} 条记录`,
      }"
    />
  </a-modal>
</template>

<script>
import { uniq } from 'lodash-es';
import { readExcel, makeExcel } from '@/utils/excel';
import { sexes, grades, ranks } from '@/utils/const';
import DisplayFailedUser from '@/components/common/DisplayFailedUser';

const sexesRevertMap = mapRevert(sexes);
const gradesRevertMap = mapRevert(grades);
const rankRevertMap = mapRevert(ranks);

export default {
  name: 'UserImport',
  props: {
    type: {
      default: 'student',
      require: true,
      validator: value => ['student', 'teacher'].includes(value),
    },
  },
  data() {
    return {
      visible: false,
      uploading: false,
      result: [],
    };
  },
  computed: {
    primaryKey() {
      return this.type === 'student' ? 'sid' : 'tid';
    },
    keyMap() {
      return new Map(
        [
          ['账号', this.primaryKey],
          ['姓名', 'name'],
        ].concat(
          this.type === 'student'
            ? [['性别', 'sex'], ['年级', 'grade'], ['班级', 'class']]
            : [['职称', 'rank']],
        ),
      );
    },
    columns() {
      const cols = [];
      for (const key of this.keyMap.keys()) {
        cols.push({
          title: key,
          dataIndex: key,
        });
      }
      return cols;
    },
    transformedData() {
      const data = [];
      const strategy = {
        sex: label => sexesRevertMap[label.trim()],
        grade: label => gradesRevertMap[label.trim()],
        rank: label => rankRevertMap[label.trim()],
      };
      for (const item of this.result) {
        const temp = {};
        for (let [key, value] of Object.entries(item)) {
          key = this.keyMap.get(key.trim());
          const revert = strategy[key];
          temp[key] = typeof revert === 'function'
            ? revert(value)
            : value;
        }
        data.push(temp);
      }
      return data;
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
        this.$message.success(
          diff > 0
            ? `账号不能重复，已去重${diff}条数据`
            : '文件读取成功',
        );
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
        onOk: () => this.$api.importUser(this.type, this.transformedData)
          .then(() => {
            this.$message.success('导入成功');
            this.visible = false;
          }).catch(e => {
            const message = e.msg || '导入失败';
            if (e.code === 1) {
              this.$confirm({
                title: message,
                content: () => <DisplayFailedUser
                  primaryKey={this.primaryKey}
                  users={this.result}
                  fail={e.data}
                />,
              });
            } else this.$message.error(message);
          }).finally(() => {
            this.$emit('refresh');
          }),
      });
    },
    writeTemplateFile() {
      makeExcel(({
        student: {
          header: [...this.keyMap.keys()],
          name: '学生上传模板.xlsx',
          data: [
            { 账号: '8002117259', 姓名: '张三', 性别: '男', 年级: '大一', 班级: '171班' },
            { 账号: '8002118360', 姓名: '淑芬', 性别: '女', 年级: '大二', 班级: '172班' },
          ],
        },
        teacher: {
          header: [...this.keyMap.keys()],
          name: '教师上传模板.xlsx',
          data: [
            { 工号: '8002117259', 姓名: '张三', 职称: '教授' },
            { 工号: '8002118360', 姓名: '李四', 职称: '副教授' },
          ],
        },
      })[this.type]);
    },
    /**
     * 外部调用方法
     */
    show() {
      this.visible = true;
    },
  },
};

/**
 * label映射value
 * @param{Array} arr
 */
function mapRevert(arr) {
  const result = {};
  for (const { label, value } of arr) {
    result[label] = value;
  }
  return result;
}
</script>
