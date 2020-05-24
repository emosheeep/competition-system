<template>
  <a-drawer
    placement="right"
    width="500px"
    title="参赛记录详情"
    :visible="visible"
    @close="$emit('update:visible', false)"
  >
    <a-descriptions :title="record.title">
      <a-descriptions-item label="参赛人">
        {{ record.sname }}
      </a-descriptions-item>
      <a-descriptions-item label="学号">
        {{ record.sid }}
      </a-descriptions-item>
      <a-descriptions-item label="举办时间">
        {{ $parent.formatDate(record.date) }}
      </a-descriptions-item>
      <a-descriptions-item label="指导教师">
        {{ record.tname }}
      </a-descriptions-item>
      <a-descriptions-item label="教师工号">
        {{ record.tid }}
      </a-descriptions-item>
      <br>
      <a-descriptions-item label="成绩">
        {{ record.score ? record.score : '暂无详情' }}
      </a-descriptions-item>
    </a-descriptions>
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
          <a-icon type="cloud-download" /> 附件下载
        </a-button>
        <a-button
          type="link"
          @click="preview"
        >
          <a-icon type="eye" /> 文件预览
        </a-button>
        <a-button
          type="link"
          @click="uploadVisible = true"
        >
          <a-icon type="cloud-upload" /> 重新上传
        </a-button>
      </a-button-group>
    </div>
    <!--上传-->
    <Upload
      v-if="uploadVisible"
      :visible.sync="uploadVisible"
      :record="record"
      @complete="init"
    />
  </a-drawer>
</template>

<script>
import { message } from 'ant-design-vue'
import { debounce } from 'lodash'
import { saveAs } from 'file-saver'
import { getFileInfo, getDownloadUrl } from '../../api'

export default {
  name: 'ShowRecordDetail',
  components: {
    Upload: () => import(
      /* webpackChunkName: "Upload" */
      /* webpackPrefetch: true */
      '../../components/common/Upload'
    )
  },
  props: {
    visible: Boolean,
    record: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      uploadVisible: false,
      curRecord: {},
      loading: true,
      info: {}
    }
  },
  watch: {
    visible (newVal) {
      if (newVal) {
        this.init()
      }
    }
  },
  methods: {
    init () {
      this.loading = true
      getFileInfo({
        name: this.record._id
      }).then(({ data: info }) => {
        console.log(info)
        this.info = info
      }).catch(() => {
        message.error('文件信息获取失败')
      }).finally(() => {
        this.loading = false
      })
    },
    download: debounce(download, 300),
    preview: debounce(preview, 300)
  }
}

function preview () {
  const stopLoading = message.loading('获取文件信息')
  getDownloadUrl({
    name: this.record._id
  }).then(({ data: url }) => {
    window.open(url, '_blank')
  }).catch(e => {
    message.error('预览失败，请重试')
  }).finally(() => {
    stopLoading()
  })
}

function download () {
  const { title, _id } = this.record
  const { mimeType } = this.info
  if (!mimeType) {
    return message.error('文件信息获取失败，请重试')
  }
  const type = mimeType.split('/')[1]
  const stopLoading = message.loading('获取文件信息')
  getDownloadUrl({
    name: _id
  }).then(({ data: url }) => {
    console.log(url + `&t=${Date.now()}`)
    // 下载文件，触发浏览器下载弹框
    saveAs(
      `${url}&t=${Date.now()}`,
      `${title}.${type}`
    )
  }).catch(e => {
    message.error('下载失败，请重试')
  }).finally(() => {
    stopLoading()
  })
}
</script>

<style scoped lang="stylus">
  .action
    h3
      font-weight bold
</style>
