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
    <EditRecord
      ref="updateRecord"
      type="update"
      :data="record"
    />
  </a-modal>
</template>

<script>
import { UPDATE_RECORD } from '../../store/mutation-types'
import { createNamespacedHelpers } from 'vuex'
import EditRecord from '../add-and-update/EditRecord'
const { mapActions } = createNamespacedHelpers('records')
export default {
  name: 'UpdateRecord',
  components: {
    EditRecord
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
      loading: false
    }
  },
  methods: {
    ...mapActions({
      updateRecord: UPDATE_RECORD
    }),
    async onOk (e) {
      const values = await this.$refs.updateRecord.confirm()
      if (!values) {
        return
      }
      this.loading = true
      values.date = values.date.valueOf() // 将组件默认的moment对象转换为时间戳
      this.updateRecord({
        ...values,
        _id: this.record._id // 本地更新的时候要加上_id作为表格的rowKey，否则更新会出错
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

<style scoped lang="stylus"></style>
