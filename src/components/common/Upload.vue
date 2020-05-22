<template>
  <a-modal
    title="附件上传"
    ok-text="开始上传"
    cancel-text="取消"
    centered
    :visible="visible"
    :mask-closable="false"
    :body-style="{ padding: '10px' }"
    :confirm-loading="loading"
    @cancel="onCancel"
    @ok="uploadFile"
  >
    <a-upload
      ref="uploader"
      class="upload"
      accept=".png,.jpg,.jpeg,.pdf"
      list-type="picture"
      :remove="handleRemove"
      :before-upload="getFile"
      @preview="preview"
    >
      <a-button
        block
        :disabled="!!file"
      >
        <a-icon type="upload" />
        点击上传文件，仅支持 png、.jpg、.jpeg、.pdf，小于2mb
      </a-button>
    </a-upload>
    <a-progress
      v-show="showProgress"
      :status="uploadStatus"
      :percent="uploadPercent"
    />
    <a-modal
      width="min-content"
      centered
      :visible="previewVisible"
      :footer="null"
      :destroy-on-close="true"
      @cancel="previewVisible = false"
    >
      <img
        style="object-fit: scale-down"
        :src="imgUrl"
        alt="预览图片"
      >
    </a-modal>
  </a-modal>
</template>

<script>
import { message } from 'ant-design-vue'
import { createNamespacedHelpers } from 'vuex'
import { UPDATE_RECORD } from '../../store/mutation-types'
import { getToken } from '../../api'
import { uploader } from '../../utils/qiniu'

const { mapActions } = createNamespacedHelpers('records')
export default {
  name: 'Upload',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    record: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      showProgress: false,
      imgUrl: '',
      file: null,
      uploadPercent: 0,
      uploadStatus: 'active',
      previewVisible: false
    }
  },
  computed: {
    showUploadList () {
      return !!this.file
    }
  },
  methods: {
    ...mapActions({
      updateRecord: UPDATE_RECORD
    }),
    onCancel () {
      this.$emit('update:visible', false)
    },
    getFile (file) {
      this.file = file
      this.sizeLimited(file.size)
      return false // 取消自动上传
    },
    handleRemove () {
      this.file = null
    },
    async preview ({ type, originFileObj }) {
      if (!type.includes('image')) {
        return message.warn('该类型暂不支持预览')
      } else if (!this.sizeLimited(originFileObj.size)) {
        return
      }
      this.imgUrl = await createObjectUrl(originFileObj)
      this.previewVisible = true
    },
    sizeLimited (size) {
      const limitIn2M = size / Math.pow(1024, 2) < 2
      if (!limitIn2M) {
        message.warn('图片大小超出限制（2mb）')
        return false
      }
      return true
    },
    uploadFile () {
      if (!this.file) {
        return message.warn('请选择要上传的文件')
      }
      const { file } = this
      if (!this.sizeLimited(file.size)) {
        return
      }
      const name = this.record._id
      const promise = this.record.uploaded
        ? getToken({ name }) // 覆盖上传
        : getToken()
      promise.then(({ data: token }) => {
        const observer = uploader(name, file, token)
        // 开始传输
        this.uploadStatus = 'active'
        this.uploadPercent = 0
        this.loading = true
        this.showProgress = true
        observer.subscribe(
          next.bind(this),
          error.bind(this),
          complete.bind(this)
        )
      })
    }
  }
}
function createObjectUrl (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
}
// 定义传输过程中的状态处理函数
function next ({ total }) {
  this.uploadPercent = +total.percent.toFixed(1) // toNum
}
function error (err) {
  this.uploadStatus = 'exception'
  this.loading = false
  console.error(err)
}
function complete (res) {
  const record = { ...this.record }
  record.uploaded = true // 标记为已上传状态
  this.updateRecord(record).then(() => {
    this.uploadStatus = 'success'
    setTimeout(() => {
      this.loading = false
      this.$emit('update:visible', false)
    }, 800)
  })
}
</script>

<style scoped lang="stylus">
  .upload
    margin-bottom 10px
    >>> div:first-child
      width 100%
</style>
