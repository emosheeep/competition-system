<template>
  <a-drawer
    placement="right"
    width="500px"
    title="参赛记录详情"
    :visible="visible"
    :destroy-on-close="true"
    @close="$emit('update:visible', false)"
  >
    <!--比赛记录详情显示——纯展示-->
    <a-descriptions :title="record.title">
      <a-descriptions-item label="参赛人">
        {{ record.sname }}
      </a-descriptions-item>
      <a-descriptions-item label="学号">
        {{ record.sid }}
      </a-descriptions-item>
      <a-descriptions-item label="举办时间">
        {{ formatDate(record.date) }}
      </a-descriptions-item>
      <a-descriptions-item label="指导教师">
        {{ record.tname || '暂无' }}
      </a-descriptions-item>
      <a-descriptions-item
        :span="2"
        label="教师工号"
      >
        {{ record.tid || '暂无' }}
      </a-descriptions-item>
      <a-descriptions-item
        label="成绩"
        :span="3"
      >
        {{ record.score ? record.score : '暂无详情' }}
      </a-descriptions-item>
      <a-descriptions-item label="当前状态">
        <template v-if="recordState === 'pending'">
          <a-icon type="question-circle" />
          <span> 未审核</span>
        </template>
        <template v-else-if="recordState === 'fulfilled'">
          <a-icon
            style="color: limegreen"
            type="check-circle"
          />
          <span style="color: limegreen">
            {{ record.description || '通过' }}
          </span>
        </template>
        <template v-else>
          <a-icon
            style="color: red"
            type="exclamation-circle"
          />
          <span
            style="color: red"
            :title="record.state"
          >
            {{ record.description || '审核失败' }}
          </span>
        </template>
      </a-descriptions-item>
    </a-descriptions>

    <!--以下内容未上传文件时不显示-->
    <template v-if="record.uploaded">
      <!--附件详情-->
      <a-spin
        tip="Loading..."
        :spinning="loading"
      >
        <a-descriptions
          :column="2"
          title="附件详情"
        >
          <a-descriptions-item label="文件类型">
            {{ info.mimeType }}
          </a-descriptions-item>
          <a-descriptions-item label="文件大小">
            {{ (info.fsize / Math.pow(1024, 2)).toFixed(2) }} MB
          </a-descriptions-item>
          <a-descriptions-item label="修改时间">
            {{ new Date(Math.trunc(info.putTime / 10000)).toLocaleString() }}
          </a-descriptions-item>
        </a-descriptions>
      </a-spin>

      <!--操作按钮-->
      <div class="action">
        <h3>操作</h3>
        <p style="color: grey">
          重新上传后，预览文件若未刷新，可稍后再试，下载不受影响。
        </p>
        <a-button-group>
          <a-button
            type="link"
            style="padding-left: 0"
            @click="download"
          >
            <a-icon type="cloud-download" />
            附件下载
          </a-button>
          <a-button
            type="link"
            @click="preview"
          >
            <a-icon type="eye" />
            文件预览
          </a-button>
        </a-button-group>
      </div>
    </template>
    <template v-else>
      <a-result
        status="404"
        title="暂未上传附件"
        sub-title="上传附件后，才能进行查看和下载"
      />
    </template>
  </a-drawer>
</template>

<script>
import dayjs from 'dayjs';
import { message } from 'ant-design-vue';
import { debounce } from 'lodash-es';
import { saveAs } from 'file-saver';
import { getFileInfo, getDownloadUrl } from '../../api';

export default {
  name: 'ShowRecordDetail',
  props: {
    visible: Boolean,
    record: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      info: {},
    };
  },
  computed: {
    recordState() {
      return this.record.state;
    },
  },
  watch: {
    visible(newVal) {
      // 当前状态为：可见并且已上传文件 时，才请求文件信息
      if (newVal && this.record.uploaded) {
        this.initFileInfo();
      }
    },
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    initFileInfo() {
      this.loading = true;
      getFileInfo({
        name: this.record._id,
      }).then(({ data: result }) => {
        if (result.code === 0) {
          this.info = result.data;
        } else {
          message.warn(result.msg);
        }
      }).catch(() => {
        message.error('文件信息获取失败');
      }).finally(() => {
        this.loading = false;
      });
    },
    download: debounce(download, 300),
    preview: debounce(preview, 300),
  },
};

function preview() {
  const stopLoading = message.loading('获取文件信息');
  getDownloadUrl({
    name: this.record._id,
  }).then(({ data: url }) => {
    window.open(url, '_blank');
  }).catch(e => {
    message.error('预览失败，请重试');
  }).finally(() => {
    stopLoading();
  });
}

function download() {
  const { title, _id } = this.record;
  const { mimeType } = this.info;
  if (!mimeType) {
    return message.error('文件信息获取失败，请重试');
  }
  const type = mimeType.split('/')[1];
  const stopLoading = message.loading('获取文件信息');
  getDownloadUrl({
    name: _id,
  }).then(({ data: url }) => {
    console.log(url + `&t=${Date.now()}`);
    // 下载文件，触发浏览器下载弹框
    saveAs(
      `${url}&t=${Date.now()}`,
      `${title}.${type}`,
    );
  }).catch(e => {
    message.error('下载失败，请重试');
  }).finally(() => {
    stopLoading();
  });
}
</script>

<style scoped lang="stylus">
  .action
    h3
      font-weight bold
</style>
