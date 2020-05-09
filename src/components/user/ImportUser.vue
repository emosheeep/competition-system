<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
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
      <a-button :disabled="fileLoaded">
        <a-icon type="upload" /> 点击上传表格
      </a-button>
    </a-upload>
    <a-table
      :columns="curCols"
      :data-source="users"
      :loading="uploading"
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
const { mapActions } = createNamespacedHelpers('users')
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
      users: []
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
      this.uploading = true
      const reader = new FileReader()
      reader.readAsBinaryString(file)
      reader.onload = e => {
        import('xlsx').then(xlsx => {
          const workbook = xlsx.read(e.target.result, {
            type: 'binary'
          })
          const { SheetNames } = workbook
          const sheet = workbook.Sheets[SheetNames[0]] // 只读取第一张表
          const result = xlsx.utils.sheet_to_json(sheet)
          this.generateData(result)
          message.success('文件读取成功')
        }).catch(e => {
          message.error('文件读取失败')
        })
      }
      return false // 阻止上传
    },
    generateData (result) {
      // 防止扩展运算符（...）将不必要的属性展开到最终数据中
      for (const item of result) {
        Reflect.ownKeys(item).forEach(key => {
          if (key.startsWith('_')) {
            Reflect.defineProperty(item, key, { enumerable: false })
          }
        })
      }
      switch (this.type) {
        case 'student':
          this.users = result.map(user => ({
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
          this.users = result.map(user => ({
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
      this.uploading = false
    },
    removeFile (file) {
      this.fileLoaded = false
      this.users.splice(0)
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
        onOk: _confirm.bind(this)
      })
      function _confirm () {
        modal.destroy()
        this.addUser({
          type: this.type,
          users: this.users
        }).then(res => {
          this.$emit('update:visible', false)
        }).catch(users => {
          if (users?.length !== 0) {
            Modal.warning({
              title: '以下用户已存在',
              centered: true,
              content: h => h('div', users.map(user => {
                return [
                  h('span', user),
                  h('a-divider', { props: { type: 'vertical' } })
                ]
              }))
            })
          }
        })
      }
    }
  }
}
const columns = {
  student: [
    {
      title: '学号',
      dataIndex: 'account',
      sort: (a, b) => a.account > b.account
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
      dataIndex: 'account',
      sort: (a, b) => a.account > b.account
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
    },
    {
      title: '描述',
      dataIndex: 'description'
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
