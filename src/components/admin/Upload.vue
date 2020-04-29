<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="uploading"
    :body-style="{ padding: '10px' }"
    :title="`导入 ${curType}`"
    ok-text='确认导入'
    cancel-text="取消"
    @cancel="onCancel"
    @ok="onOk"
    centered
  >
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
      :columns="curCols"
      :data-source="data"
      :pagination="{ showSizeChanger: true, showQuickJumper: true }"
      size="small"
      row-key="account"
      style="margin-top: 10px"
    />
  </a-modal>
</template>

<script>
import { message, Modal } from 'ant-design-vue'
import { createNamespacedHelpers } from 'vuex'
import { ADD_USER } from '../../store/mutation-types'
const { mapActions } = createNamespacedHelpers('admin')
export default {
  name: 'Upload',
  props: {
    visible: Boolean,
    type: {
      validator (value) {
        return ['student', 'teacher'].includes(value)
      }
    }
  },
  data () {
    return {
      uploading: false,
      fileLoaded: false,
      data: []
    }
  },
  computed: {
    curCols () {
      return columns[this.type]
    },
    curType () {
      return this.type === 'student' ? '学生' : '教师'
    }
  },
  methods: {
    ...mapActions({
      addUser: ADD_USER
    }),
    getFile (file) {
      const reader = new FileReader()
      reader.readAsBinaryString(file)
      reader.onload = e => {
        import(
          /* webpackChunkName: "xlsx_helper" */
          /* webpackPrefetch: true */
          'xlsx'
        ).then(xlsx => {
          const workbook = xlsx.read(e.target.result, {
            type: 'binary'
          })
          const { SheetNames } = workbook
          const sheet = workbook.Sheets[SheetNames[0]] // 只读取第一张表
          const result = xlsx.utils.sheet_to_json(sheet)
          console.log(result)
          this.generateData(result)
          message.success('文件读取成功')
        }).catch(e => {
          message.error('文件读取失败')
        })
      }
      return false // 阻止上传
    },
    generateData (result) {
      // 防止扩展运算符（...）将不必要的属性展开
      for (const item of result) {
        Reflect.ownKeys(item).forEach(key => {
          if (key.startsWith('_')) {
            Reflect.defineProperty(item, key, { enumerable: false })
          }
        })
      }
      switch (this.type) {
        case 'student':
          this.data = result.map(user => ({
            account: '',
            name: '',
            password: '123456',
            sex: 'man',
            grade: '17级',
            classname: '未设置',
            ...user
          }))
          break
        case 'teacher':
          this.data = result.map(user => ({
            account: '',
            name: '',
            password: '123456',
            dept: '未设置',
            ...user
          }))
          break
        default:
          break
      }
      this.fileLoaded = true
    },
    removeFile (file) {
      this.fileLoaded = false
      this.data.splice(0)
    },
    onCancel (e) {
      if (!this.fileLoaded) {
        return this.$emit('update:visible', false)
      }
      const modal = Modal.confirm({
        title: '警告',
        content: '数据未保存，确认关闭？',
        onOk: () => {
          modal.destroy()
          this.$emit('update:visible', false)
        }
      })
    },
    onOk (e) {
      if (!this.fileLoaded) {
        return message.warn('请先上传表格文件！')
      }
      const modal = Modal.confirm({
        title: '提示',
        content: '确认导入吗？',
        onOk: () => {
          modal.destroy()
          // const close = message.loading()
          this.addUser({
            type: this.type,
            data: this.data
          }).then(res => {
            this.$emit('update:visible', false)
            console.log(res)
          })
        }
      })
    }
  }
}
const columns = {
  student: [
    {
      title: '学号',
      dataIndex: 'account'
    },
    {
      title: '密码',
      dataIndex: 'password'
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '性别',
      dataIndex: 'sex'
    },
    {
      title: '年级',
      dataIndex: 'grade'
    },
    {
      title: '班级',
      dataIndex: 'classname'
    }
  ],
  teacher: [
    {
      title: '工号',
      dataIndex: 'account'
    },
    {
      title: '密码',
      dataIndex: 'password'
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '部门',
      dataIndex: 'dept'
    }
  ]
}
</script>

<style scoped lang="stylus">
  .upload
    display flex
    margin-bottom 10px
    >>> div:last-child
      order -1
      flex-grow 1
</style>
