<template>
  <a-modal
    centered
    :visible="visible"
    :confirm-loading="loading"
    title="更新数据"
    ok-text="更新"
    cancel-text="取消"
    @cancel="onCancel"
    @ok="onOk"
  >
    <EditRace ref="updateRace" type="update" :race="race" />
  </a-modal>
</template>

<script>
import EditRace from '../add-and-update/EditRace'
import { UPDATE_RACE } from '../../store/mutation-types'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('races')
export default {
  name: 'UpdateRace',
  components: { EditRace },
  props: {
    visible: Boolean,
    race: Object
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions({
      updateRace: UPDATE_RACE
    }),
    async onOk (e) {
      const values = await this.$refs.updateRace.confirm()
      if (!values) {
        return
      }
      this.loading = true
      values.date = values.date.valueOf() // 将组件默认的moment对象转换为时间戳
      this.updateRace({
        ...values,
        _id: this.race._id // 手动添加_id属性，否则会出错
      }).then(_ => {
        this.$emit('update:visible', false)
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    onCancel (e) {
      this.$emit('update:visible', false)
    }
  }
}
</script>
