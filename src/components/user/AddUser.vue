<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="loading"
    title="新增用户"
    ok-text='确认添加'
    cancel-text="取消"
    @cancel="onCancel"
    @ok="onOk"
    centered
  >
    <a-row
      type="flex"
      align="middle"
      style="margin-bottom: 20px; color: black">
      <a-col
        :span="labelCol.span"
        style="text-align: right">
        类型：
      </a-col>
      <a-col :span="wrapperCol.span">
        <a-radio-group
          default-value="student"
          button-style="solid"
          @change="onChange"
        >
          <a-radio-button value="student">学生</a-radio-button>
          <a-radio-button value="teacher">教师</a-radio-button>
          <a-radio-button value="admin">管理员</a-radio-button>
        </a-radio-group>
      </a-col>
    </a-row>
    <EditStudent
      v-if="type === 'student'"
      ref="student"
    />
    <EditTeacher
      v-else-if="type === 'teacher'"
      ref="teacher"
    />
    <EditAdmin v-else ref="admin" />
  </a-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import EditStudent from '../add-and-update/EditStudent'
import EditAdmin from '../add-and-update/EditAdmin'
import EditTeacher from '../add-and-update/EditTeacher'
import { ADD_USER } from '../../store/mutation-types'
const { mapActions } = createNamespacedHelpers('users')

export default {
  name: 'AddUser',
  components: {
    EditStudent,
    EditAdmin,
    EditTeacher
  },
  props: {
    visible: Boolean
  },
  data () {
    return {
      type: 'student',
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
      loading: false
    }
  },
  methods: {
    ...mapActions({
      addUser: ADD_USER
    }),
    onOk (e) {
      // 调用子组件的confirm方法
      this.$refs[this.type].confirm().then(values => {
        this.loading = true
        return this.addUser({
          type: this.type,
          users: values
        })
      }).then(res => {
        this.$emit('update:visible', false)
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    onChange ({ target: { value } }) {
      this.type = value
    },
    onCancel (e) {
      if (this.loading) return
      this.$emit('update:visible', false)
    }
  }
}
</script>
