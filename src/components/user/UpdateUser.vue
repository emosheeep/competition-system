<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :confirm-loading="loading"
    title="修改信息"
    ok-text='确认'
    cancel-text="取消"
    @cancel="onCancel"
    @ok="onOk"
    centered
  >
    <EditStudent
      v-if="type === 'student'"
      ref="student"
      type="update"
      :user="user"
    />
    <EditTeacher
      v-else-if="type === 'teacher'"
      ref="teacher"
      type="update"
      :user="user"
    />
    <EditAdmin
      v-else
      ref="admin"
      type="update"
      :user="user"
    />
  </a-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import EditStudent from '../add-and-update/EditStudent'
import EditAdmin from '../add-and-update/EditAdmin'
import EditTeacher from '../add-and-update/EditTeacher'
import { UPDATE_USER } from '../../store/mutation-types'
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
    user: Object,
    type: String
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
