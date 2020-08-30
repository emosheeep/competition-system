<template>
  <a-modal
    centered
    title="修改信息"
    ok-text="确认"
    cancel-text="取消"
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="loading"
    :destroy-on-close="true"
    @cancel="onCancel"
    @ok="onOk"
  >
    <EditStudent
      v-if="type === 'student'"
      ref="student"
      type="update"
      :data="data"
    />
    <EditTeacher
      v-else-if="type === 'teacher'"
      ref="teacher"
      type="update"
      :data="data"
    />
  </a-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { UPDATE_USER } from '@/store/types'
import EditStudent from '../add-and-update/EditStudent'
import EditTeacher from '../add-and-update/EditTeacher'

export default {
  name: 'UpdateUser',
  components: {
    EditStudent,
    EditTeacher,
  },
  props: {
    visible: Boolean,
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'admin',
      validator (value) {
        return ['student', 'teacher'].includes(value)
      },
    },
  },
  emits: ['update:visible'],
  data () {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
      loading: false,
    }
  },
  methods: {
    ...mapActions('users', {
      updateUser: UPDATE_USER,
    }),
    onCancel () {
      if (!this.loading) {
        this.$emit('update:visible', false)
      }
    },
    onOk () {
      this.$refs[this.type].confirm().then(values => {
        this.loading = true
        return this.updateUser({
          type: this.type,
          data: values,
        })
      }).then(res => {
        this.$emit('update:visible', false)
      }).catch(console.warn).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
  },
}
</script>
