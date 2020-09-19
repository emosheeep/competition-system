<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="loading"
    :destroy-on-close="true"
    title="新增用户"
    ok-text="确认添加"
    cancel-text="取消"
    centered
    @cancel="onCancel"
    @ok="onOk"
  >
    <a-row
      type="flex"
      align="middle"
      style="margin-bottom: 20px; color: black"
    >
      <a-col
        span="3"
        style="text-align: right"
      >
        类型：
      </a-col>
      <a-col span="20">
        <a-radio-group
          :value="type"
          button-style="solid"
          @change="onChange"
        >
          <a-radio-button value="student">
            学生
          </a-radio-button>
          <a-radio-button value="teacher">
            教师
          </a-radio-button>
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
  </a-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import EditStudent from '../add-and-update/EditStudent'
import EditTeacher from '../add-and-update/EditTeacher'
import { ADD_USER } from '@/store/types'
const { mapActions } = createNamespacedHelpers('users')

export default {
  name: 'AddUser',
  components: {
    EditStudent,
    EditTeacher,
  },
  props: {
    visible: Boolean,
  },
  emits: ['update:visible'],
  data () {
    return {
      type: 'student',
      loading: false,
    }
  },
  methods: {
    ...mapActions([ADD_USER]),
    onOk (e) {
      // 调用子组件的confirm方法
      this.$refs[this.type].confirm().then(values => {
        this.loading = true
        return this.ADD_USER({
          type: this.type,
          users: values,
        })
      }).then(res => {
        this.$emit('update:visible', false)
      }).catch(console.warn).finally(() => {
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
    },
  },
}
</script>
