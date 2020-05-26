<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="loading"
    :destroy-on-close="true"
    title="修改信息"
    ok-text="确认"
    cancel-text="取消"
    centered
    @cancel="onCancel"
    @ok="onOk"
  >
    <EditStudent
      v-if="type === 'student'"
      ref="student"
      type="update"
      :data="user"
    />
    <EditTeacher
      v-else-if="type === 'teacher'"
      ref="teacher"
      type="update"
      :data="user"
    />
    <EditAdmin
      v-else
      ref="admin"
      type="update"
      :data="user"
    />
  </a-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { UPDATE_USER } from '../../store/mutation-types'
import EditStudent from '../add-and-update/EditStudent'
import EditAdmin from '../add-and-update/EditAdmin'
import EditTeacher from '../add-and-update/EditTeacher'
const { mapActions } = createNamespacedHelpers('users')
export default {
  name: 'EditUser',
  components: {
    EditStudent,
    EditAdmin,
    EditTeacher
  },
  props: {
    visible: Boolean,
    user: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'admin',
      validator (value) {
        return ['student', 'teacher', 'admin'].includes(value)
      }
    }
  },
  data () {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
      loading: false
    }
  },
  methods: {
    ...mapActions({
      updateUser: UPDATE_USER
    }),
    onCancel () {
      !this.loading && this.$emit('update:visible', false)
    },
    async onOk () {
      const values = await this.$refs[this.type].confirm()
      if (!values) {
        return
      }
      this.loading = true
      this.updateUser({
        type: this.type,
        data: values
      }).then(res => {
        this.$emit('update:visible', false)
      }).catch(e => e).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    }
  }
}
</script>
